// minhook_injector.cpp
// DLL injector using MinHook to hook a function by address and modify returned JSON.
// Requires MinHook library. Compile as DLL and inject into target process (or place as proxy and let loader load it).
//
// Usage: adjust TARGET_FUNC_ADDR with the function VA (e.g., 0x18012CABC) and build.

#include <windows.h>
#include <iostream>
#include <vector>
#include <string>
#include <mutex>
#include "MinHook.h" // include MinHook headers
#include "json.hpp"  // nlohmann::json
using json = nlohmann::json;

typedef const char* (__cdecl *t_targetFunc)();
t_targetFunc orig_targetFunc = nullptr;
std::mutex g_mutex;

const char* __cdecl hk_targetFunc() {
    // call original
    const char* res = orig_targetFunc();
    if (!res) return res;
    std::string s(res);
    std::lock_guard<std::mutex> lock(g_mutex);
    try {
        json j = json::parse(s);
        if (j.is_array()) {
            j.push_back({ {"endpoint","127.0.0.1"}, {"id",999999}, {"identifiers", {"license:..."}}, {"name","Injected"}, {"ping",5} });
            std::string ns = j.dump();
            char* out = (char*)CoTaskMemAlloc(ns.size()+1);
            memcpy(out, ns.c_str(), ns.size()+1);
            return out;
        } else if (j.is_object() && j.contains("data") && j["data"].is_array()) {
            j["data"].push_back({ {"endpoint","127.0.0.1"}, {"id",999999}, {"identifiers", {"license:..."}}, {"name","Injected"}, {"ping",5} });
            std::string ns = j.dump();
            char* out = (char*)CoTaskMemAlloc(ns.size()+1);
            memcpy(out, ns.c_str(), ns.size()+1);
            return out;
        }
    } catch(...) {}
    return res;
}

BOOL SetupHook(LPVOID targetAddr) {
    if (MH_Initialize() != MH_OK) return FALSE;
    if (MH_CreateHook(targetAddr, &hk_targetFunc, reinterpret_cast<LPVOID*>(&orig_targetFunc)) != MH_OK) return FALSE;
    if (MH_EnableHook(targetAddr) != MH_OK) return FALSE;
    return TRUE;
}

BOOL RemoveHook(LPVOID targetAddr) {
    MH_DisableHook(targetAddr);
    MH_RemoveHook(targetAddr);
    MH_Uninitialize();
    return TRUE;
}

BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpReserved) {
    if (fdwReason == DLL_PROCESS_ATTACH) {
        // Example: use hardcoded address (update as needed)
        LPVOID target = (LPVOID)0x18012CABC; // REPLACE with real VA
        SetupHook(target);
    } else if (fdwReason == DLL_PROCESS_DETACH) {
        LPVOID target = (LPVOID)0x18012CABC;
        RemoveHook(target);
    }
    return TRUE;
}
