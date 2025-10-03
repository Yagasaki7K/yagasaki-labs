@echo off
title CipherLab™ - Inicialização Automática do Bot
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Node.js não está instalado.
    echo Instalando Node.js automaticamente...
    powershell -Command "Start-Process 'https://nodejs.org/dist/v18.19.1/node-v18.19.1-x64.msi' -Wait"
    echo Aguarde a instalação ser concluída e pressione qualquer tecla para continuar...
    pause >nul
    cls
)
if not exist package.json (
    echo [X] ERRO: package.json não encontrado.
    echo Verifique se o script está na pasta correta do projeto.
    pause
    exit
)
echo ========================================
echo [BOT] Instalando recursos, aguarde...
echo ========================================
call npm install >nul 2>&1
cls
:iniciar
echo ========================================
echo [BOT] Iniciando CipherLab...
echo ========================================
timeout /t 1 >nul
node .
set "exitcode=%errorlevel%"
if %exitcode% NEQ 0 (
    echo [ERRO] O bot encerrou com código %exitcode%.
    echo Reiniciando em 2 segundos...
    timeout /t 2 >nul
    goto iniciar
) else (
    echo [INFO] Bot finalizado com sucesso. Nenhum erro detectado.
    pause
    exit
)