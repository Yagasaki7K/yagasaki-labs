// dll_proxy.cpp
// Windows DLL proxy skeleton for citizen-server-impl.dll
// - Loads the real DLL renamed to citizen-server-impl.real.dll
// - Forwards a placeholder export getPlayersJson (adjust name/mangled as needed)
// - Supports reading injected entries from injected.json and exposes API functions
//
// Build: Visual Studio (x64) - create a DLL project and add this file.
// Note: Adjust exported function names to match real symbols, or use MinHook if not exported.

#include <windows.h>
#include <string>
#include <vector>
#include <mutex>
#include <fstream>
#include <sstream>
#include <iostream>
#include <combaseapi.h> // CoTaskMemAlloc
#include <filesystem>
#include "json.hpp" // nlohmann::json single-header, place json.hpp in project

using json = nlohmann::json;
namespace fs = std::filesystem;

typedef const char* (__cdecl *t_getPlayersJson)(); // adjust calling convention if needed

static HMODULE realDll = nullptr;
static t_getPlayersJson real_getPlayersJson = nullptr;
static std::mutex g_mutex;
static std::vector<json> injected_entries;
static const char* REAL_DLL_NAME = "citizen-server-impl.real.dll";
static const char* INJECTED_JSON_FILE = "injected.json";

void load_injected_entries() {
    std::lock_guard<std::mutex> lock(g_mutex);
    injected_entries.clear();
    try {
        if (!fs::exists(INJECTED_JSON_FILE)) return;
        std::ifstream in(INJECTED_JSON_FILE);
        json arr;
        in >> arr;
        if (arr.is_array()) {
            for (auto &it : arr) injected_entries.push_back(it);
        }
    } catch (...) {
        // ignore parse errors
    }
}

void persist_injected_entries() {
    std::lock_guard<std::mutex> lock(g_mutex);
    try {
        json arr = json::array();
        for (auto &j : injected_entries) arr.push_back(j);
        std::ofstream out(INJECTED_JSON_FILE);
        out << arr.dump(2);
    } catch (...) {}
}

char* allocate_result_copy(const std::string& s) {
    size_t len = s.size();
    char* out = (char*)CoTaskMemAlloc(len + 1);
    if (!out) return nullptr;
    memcpy(out, s.c_str(), len + 1);
    return out;
}

// Exported control functions
extern "C" __declspec(dllexport) void proxy_add_injected_entry(const char* entryJson) {
    std::lock_guard<std::mutex> lock(g_mutex);
    try {
        json j = json::parse(entryJson);
        injected_entries.push_back(j);
        persist_injected_entries();
    } catch (...) {}
}

extern "C" __declspec(dllexport) void proxy_clear_entries() {
    std::lock_guard<std::mutex> lock(g_mutex);
    injected_entries.clear();
    persist_injected_entries();
}

// NOTE: The exported function below is a placeholder name.
// Replace "getPlayersJson" with the actual exported symbol name or hook address.
extern "C" __declspec(dllexport) const char* getPlayersJson() {
    if (!real_getPlayersJson) return nullptr;
    const char* orig = real_getPlayersJson();
    if (!orig) return orig;

    load_injected_entries(); // refresh on each call (or cache as needed)

    std::string jsonStr(orig);
    std::lock_guard<std::mutex> lock(g_mutex);
    if (!injected_entries.empty()) {
        // Try naive insertion for "array" style [ ... ]
        size_t pos = jsonStr.rfind(']');
        if (pos != std::string::npos) {
            std::string injection;
            for (size_t i = 0; i < injected_entries.size(); ++i) {
                if (i) injection += ",";
                injection += injected_entries[i].dump();
            }
            jsonStr.insert(pos, injection);
        } else {
            // If it's object with data: parse and insert properly
            try {
                json parsed = json::parse(jsonStr);
                if (parsed.is_object() && parsed.contains("data") && parsed["data"].is_array()) {
                    for (auto &it : injected_entries) parsed["data"].push_back(it);
                    jsonStr = parsed.dump();
                }
            } catch (...) {}
        }
    }

    char* out = allocate_result_copy(jsonStr);
    return out;
}

BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpReserved) {
    if (fdwReason == DLL_PROCESS_ATTACH) {
        // load the real dll (backup must be renamed to citizen-server-impl.real.dll)
        realDll = LoadLibraryA(REAL_DLL_NAME);
        if (!realDll) {
            // fail silently; server may still want to continue
            return TRUE;
        }
        // Resolve the real function - adjust name if mangled or ordinal required
        real_getPlayersJson = (t_getPlayersJson)GetProcAddress(realDll, "getPlayersJson");
        // If this fails, you'll need to use MinHook or resolve by ordinal/address.
    } else if (fdwReason == DLL_PROCESS_DETACH) {
        if (realDll) FreeLibrary(realDll);
    }
    return TRUE;
}
