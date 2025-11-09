Windows DLL Proxy & Injection Bundle - Instructions
==================================================

This bundle contains skeleton projects and scripts to create a Windows DLL proxy
(or MinHook injector) that can intercept and modify the players JSON endpoint
served by a FiveM server component (citizen-server-impl.dll). It also includes
a Linux .so wrapper and a small admin tool.

WARNING: Work only in test environments. Backup originals before replacing.

Contents:
 - dll_proxy.cpp            -> Windows DLL proxy skeleton (uses nlohmann::json)
 - minhook_injector.cpp     -> MinHook-based hook-by-address skeleton
 - admin_tool.cpp           -> Simple console tool to call proxy exports
 - so_wrapper.cpp           -> Linux .so wrapper skeleton
 - injected.json            -> Sample injected entries
 - deploy_backup.ps1        -> PowerShell helper to backup & deploy proxy DLL
 - build_instructions.txt   -> step-by-step build instructions
 - LICENSE.txt              -> MIT

Prerequisites (Windows):
 - Visual Studio 2019/2022 (Desktop C++ workload)
 - nlohmann::json header (https://github.com/nlohmann/json) - place json.hpp next to sources or install via vcpkg
 - (Optional) MinHook library for minhook_injector.cpp

Build (Windows - Visual Studio):
1) Create a new "DLL" project (x64) in Visual Studio.
2) Add dll_proxy.cpp to the project.
3) Add include path for nlohmann::json (or drop single header json.hpp).
4) Set runtime and character set options similar to the original project if known (/MD, Multi-Byte/Unicode).
5) Build -> produces citizen-server-impl.dll
6) Backup original:
   - copy citizen-server-impl.dll citizen-server-impl.real.dll
7) Deploy: copy your built citizen-server-impl.dll to the server directory and restart server process.

If the target function is NOT exported:
 - Use minhook_injector.cpp approach. Build MinHook, add it to your project, set target function VA in the code (from Ghidra), compile as DLL, and inject with an injector or place as startup-loaded DLL if possible.

Admin tool:
 - Build admin_tool.cpp as console app.
 - Use it to call proxy_add_injected_entry or proxy_clear_entries:
   Example: admin_tool.exe "C:\path\to\citizen-server-impl.dll" add "{"endpoint":"127.0.0.1","id":123456,...}"

PowerShell deploy script (deploy_backup.ps1):
 - Use this to safely backup and replace DLLs and restart service/process. Edit as needed.

Rollbacks:
 - To rollback: copy citizen-server-impl.real.dll back to citizen-server-impl.dll and restart server.

Next steps (recommended):
1) Run the scanner (find_dll_hits.py) I gave you earlier on the server folder to find strings and VAs.
2) Open the DLL in Ghidra, find the function that builds players JSON, get its VA.
3) If function is exported, use dll_proxy skeleton and adjust exported name.
4) If not exported, use MinHook skeleton: set target VA and compile.
5) Test in controlled environment. Check logs, use tcpdump/wireshark and FiveM client to confirm injection.

If you want, I can:
 - produce a Visual Studio solution (.sln) with project files preconfigured,
 - or produce a ready-to-build MSVC project with vcpkg integration for nlohmann::json and MinHook.
Tell me if you want the full VS solution generated as well.
