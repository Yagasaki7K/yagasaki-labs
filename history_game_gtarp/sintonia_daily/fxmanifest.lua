fx_version 'adamant'
game "gta5"

author       '@seven7s.___'
version      '1.0.0'
description  'Script refeito pelos desenvolvedores da Nikito Community'

shared_scripts {"@vrp/lib/utils.lua", "lib/*.lua", "shared/*"}
client_scripts {"@vrp/lib/utils.lua", "client/**/*"}
server_scripts {"@vrp/lib/utils.lua", "server/**/*"}

ui_page_preload "yes"
ui_page "nui/build/index.html"

files { "nui/build/**/*" }