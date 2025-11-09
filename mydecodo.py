import socket
import threading
import time
import random
import base64
from datetime import datetime

# ===================== CONFIGURAÇÕES =====================
SERVER_IP = "128.201.228.211"
SERVER_PORT = 30120

PROXY_HOST = "gate.decodo.com"
PROXY_PORT = 10001
PROXY_USER = "spc559uovo"
PROXY_PASS = "gjejN7+Vbx6Aeo78Vl"

MIN_FAKE = 3
MAX_FAKE = 8
NAMES = "Lucas_SP Ana_RJ Pedro_MG Maria_PR Joao_BH Carlos_SC Sofia_DF Player_USA Player_EU".split()

# ========================================================

bots = {}
lock = threading.Lock()
running = True

def log(m):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {m}")

def create_proxy_socket():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(15)
        s.connect((PROXY_HOST, PROXY_PORT))

        auth = f"{PROXY_USER}:{PROXY_PASS}"
        auth_b64 = base64.b64encode(auth.encode()).decode()
        connect_cmd = f"CONNECT {SERVER_IP}:{SERVER_PORT} HTTP/1.1\r\nHost: {SERVER_IP}:{SERVER_PORT}\r\nProxy-Authorization: Basic {auth_b64}\r\n\r\n".encode()

        s.send(connect_cmd)
        response = s.recv(4096)

        if b"200" in response:
            return s
        else:
            log(f"[ERRO] Proxy rejeitou: {response.decode(errors='ignore')[:200]}")
            s.close()
            return None
    except Exception as e:
        log(f"[ERRO] Falha no proxy: {e}")
        return None

def send_packet(s, data):
    length = len(data).to_bytes(2, 'big')
    s.send(length + data)

def connect(name):
    s = create_proxy_socket()
    if not s:
        return False

    try:
        # === Handshake inicial (getInfo) ===
        send_packet(s, b'\xFF\xFF\xFF\xFFgetInfo ' + b'cfx.re' + b'\x00')
        try:
            s.recv(2)  # Ignora header de resposta
            length = int.from_bytes(s.recv(2), 'big')
            s.recv(length)  # Descarta info
        except:
            s.close()
            return False

        # === Conexão com nome simples (sem license) ===
        connect_msg = f'connect {{ "name": "{name}" }}\n'.encode()
        send_packet(s, connect_msg)

        # === Verifica aceitação ===
        header = s.recv(2)
        if not header:
            s.close()
            return False

        length = int.from_bytes(header, 'big')
        response = s.recv(length).decode(errors='ignore')

        if "accept" in response.lower():
            with lock:
                bots[name] = s
            log(f"[+] {name} entrou com sucesso!")
            threading.Thread(target=keep_alive, args=(s,), daemon=True).start()
            return True
        else:
            log(f"[-] {name} rejeitado: {response[:100]}")
    except Exception as e:
        log(f"[ERRO] Erro ao conectar {name}: {e}")
    finally:
        if s and name not in bots:
            try: s.close()
            except: pass
    return False

def keep_alive(s):
    while running:
        try:
            s.send(b'\x00')  # Pacote keep-alive
            time.sleep(10)
        except:
            break

def manager():
    used_names = set()
    while running:
        current = len(bots)
        target = random.randint(MIN_FAKE, MAX_FAKE)

        # Remove bots desconectados
        with lock:
            disconnected = [name for name, sock in bots.items() if sock.fileno() == -1]
            for name in disconnected:
                del bots[name]
                if name in used_names:
                    used_names.remove(name)
                log(f"[-] {name} desconectado.")

        # Adiciona novos bots se necessário
        if current < target:
            available = [n for n in NAMES if n not in used_names]
            if available:
                name = random.choice(available)
                if connect(name):
                    used_names.add(name)

        time.sleep(3)

def main():
    log("Iniciando botnet FiveM via proxy (sem licença)...")
    log("Aguarde 30 segundos para os bots começarem a entrar...")
    time.sleep(30)

    threading.Thread(target=manager, daemon=True).start()

    try:
        while running:
            time.sleep(1)
    except KeyboardInterrupt:
        log("Desligando bots...")
        global running
        running = False
        with lock:
            for sock in bots.values():
                try: sock.close()
                except: pass

if __name__ == "__main__":
    main()
