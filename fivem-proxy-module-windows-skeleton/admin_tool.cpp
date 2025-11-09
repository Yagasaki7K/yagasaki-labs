// admin_tool.cpp
// Simple Windows console admin tool that loads the proxy DLL and calls proxy_add_injected_entry
// Build as console app (x64) and run on the server host (same bitness as DLL).
#include <windows.h>
#include <iostream>
#include <string>

typedef void (__cdecl *t_proxy_add)(const char*);
typedef void (__cdecl *t_proxy_clear)();

int main(int argc, char** argv) {
    if (argc < 3) {
        std::cout << "Usage: admin_tool <proxy_dll_path> add <json_entry> | clear\n";
        return 1;
    }
    std::string dllpath = argv[1];
    HMODULE h = LoadLibraryA(dllpath.c_str());
    if (!h) { std::cout << "Failed to load DLL\n"; return 1; }
    t_proxy_add addf = (t_proxy_add)GetProcAddress(h, "proxy_add_injected_entry");
    t_proxy_clear clearf = (t_proxy_clear)GetProcAddress(h, "proxy_clear_entries");
    if (!addf || !clearf) { std::cout << "Required exports not found\n"; return 1; }
    std::string cmd = argv[2];
    if (cmd == "add" && argc >= 4) {
        addf(argv[3]);
        std::cout << "Added entry\n";
    } else if (cmd == "clear") {
        clearf();
        std::cout << "Cleared entries\n";
    } else {
        std::cout << "Unknown command\n";
    }
    FreeLibrary(h);
    return 0;
}
