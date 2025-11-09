import socket, threading, time, random, hashlib, base64
from datetime import datetime

SERVER_IP = "128.201.228.211"
SERVER_PORT = 30120
KEYMASTER = "cfxk_RCudDvyjDUNB3l3keSB_1McPEk"
MIN_FAKE = 3
MAX_FAKE = 8
NAMES = "Lucas_SP Ana_RJ Pedro_MG Maria_PR Joao_BH Carlos_SC Sofia_DF Player_USA".split()

PROXY_HOST = "gate.decodo.com"
PROXY_PORT = 10001  # Agora funciona!
PROXY_USER = "spc559uovo"
PROXY_PASS = "gjejN7+Vbx6Aeo78Vl"

bots = {}
lock = threading.Lock()
running = True

def log(m): print(f"[{datetime.now().strftime('%H:%M:%S')}] {m}")

def gen_license(seed):
    h = hashlib.sha256()
    h.update(f"{KEYMASTER}:{seed}".encode())
    return "license:" + h.hexdigest()

def send_packet(s, data):
    length = len(data).to_bytes(2, 'big')
    s.send(length + data)

def create_proxy_socket():
    try:
        print(f"[DEBUG] Conectando ao DECODO (VERIFICADO)...")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(15)
        s.connect((PROXY_HOST, PROXY_PORT))
        
        auth = f"{PROXY_USER}:{PROXY_PASS}"
        auth_b64 = base64.b64encode(auth.encode()).decode()
        
        connect_cmd = f"CONNECT {SERVER_IP}:{SERVER_PORT} HTTP/1.1\r\nProxy-Authorization: Basic {auth_b64}\r\n\r\n".encode()
        s.send(connect_cmd)
        
        resp = s.recv(4096)
        if b"200" in resp:
            print(f"[DEBUG] DECODO conectado!")
            return s
        else:
            print(f"[ERRO] Rejeitado:\n{resp.decode(errors='ignore')}")
            s.close()
            return None
    except Exception as e:
        print(f"[ERRO] {e}")
        return None

def connect(name):
    s = create_proxy_socket()
    if not s: return False

    # Handshake
    send_packet(s, b'\xFF\xFF\xFF\xFFgetInfo ' + b'cfx.re' + b'\x00')
    try: s.recv(2); s.recv(int.from_bytes(s.recv(2), 'big'))
    except: s.close(); return False

    # Connect
    lic = gen_license(f"{name}_{time.time()}")
    msg = f'connect {{ "name": "{name}", "identifiers": ["{lic}"] }}\n'.encode()
    send_packet(s, msg)

    try:
        header = s.recv(2)
        if header:
            resp = s.recv(int.from_bytes(header, 'big')).decode(errors='ignore')
            if "accept" in resp.lower():
                with lock: bots[name] = s
                log(f"[+] {name} entrou!")
                threading.Thread(target=keep_alive, args=(s,), daemon=True).start()
                return True
    except: pass
    s.close()
    return False

def keep_alive(s):
    while running:
        try: s.send(b'\x00'); time.sleep(10)
        except: break

def manager():
    used = set()
    while running:
        cur = len(bots)
        if cur < MIN_FAKE and NAMES:
            name = random.choice([n for n in NAMES if n not in used])
            if connect(name): used.add(name)
        time.sleep(3)

if __name__ == "__main__":
    print("AGUARDE A VERIFICAÇÃO ID...")
    print("DEPOIS DISSO, OS BOTS ENTRAM EM 30s!")
    threading.Thread(target=manager, daemon=True).start()
    try: time.sleep(999999)
    except: running = False