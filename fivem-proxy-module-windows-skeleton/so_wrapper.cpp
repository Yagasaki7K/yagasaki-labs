// so_wrapper.cpp - Linux shared object wrapper skeleton
// Build: g++ -shared -fPIC -o libcitizen-server-impl.so so_wrapper.cpp -ldl
#include <dlfcn.h>
#include <string>
#include <vector>
#include <mutex>
#include <fstream>
#include <iostream>
#include "json.hpp" // nlohmann::json single-header
using json = nlohmann::json;
typedef const char* (*t_getPlayersJson)();

static void* real_handle = nullptr;
static t_getPlayersJson real_getPlayersJson = nullptr;
static std::mutex g_mutex;
static std::vector<json> injected_entries;
static const char* REAL_SO_NAME = "libcitizen-server-impl.real.so";
static const char* INJECTED_FILE = "injected.json";

void load_injected_entries() {
    std::lock_guard<std::mutex> lock(g_mutex);
    injected_entries.clear();
    std::ifstream in(INJECTED_FILE);
    if (!in.good()) return;
    json arr;
    try { in >> arr; if (arr.is_array()) for (auto &it: arr) injected_entries.push_back(it); } catch(...) {}
}

void persist_injected_entries() {
    std::lock_guard<std::mutex> lock(g_mutex);
    json arr = json::array();
    for (auto &j: injected_entries) arr.push_back(j);
    std::ofstream out(INJECTED_FILE); out << arr.dump(2);
}

extern "C" const char* getPlayersJson() {
    if (!real_getPlayersJson) return nullptr;
    const char* orig = real_getPlayersJson();
    if (!orig) return orig;
    load_injected_entries();
    std::string s(orig);
    std::lock_guard<std::mutex> lock(g_mutex);
    if (!injected_entries.empty()) {
        size_t pos = s.rfind(']');
        if (pos != std::string::npos) {
            std::string inj;
            for (size_t i=0;i<injected_entries.size();++i) {
                if (i) inj += ",";
                inj += injected_entries[i].dump();
            }
            s.insert(pos, inj);
        } else {
            try {
                json parsed = json::parse(s);
                if (parsed.is_object() && parsed.contains("data") && parsed["data"].is_array()) {
                    for (auto &it: injected_entries) parsed["data"].push_back(it);
                    s = parsed.dump();
                }
            } catch(...) {}
        }
    }
    char* out = (char*)malloc(s.size()+1);
    memcpy(out, s.c_str(), s.size()+1);
    return out;
}

__attribute__((constructor)) void init_proxy() {
    real_handle = dlopen(REAL_SO_NAME, RTLD_NOW);
    if (!real_handle) {
        // try other names...
        return;
    }
    real_getPlayersJson = (t_getPlayersJson)dlsym(real_handle, "getPlayersJson");
}
__attribute__((destructor)) void fini_proxy() {
    if (real_handle) dlclose(real_handle);
}
