#!/usr/bin/env python3
"""Decompress gzip-encoded archived responses in-place and re-validate."""
import gzip, hashlib, os, subprocess, sys, time

WS = "/workspace/chats/7df4861ccb64a779ba21ce50"
RAW = os.path.join(WS, "recovery", "raw")

def is_gzip(p):
    with open(p, "rb") as fh:
        return fh.read(2) == b"\x1f\x8b"

def gunzip_inplace(p):
    with gzip.open(p, "rb") as fh:
        data = fh.read()
    with open(p, "wb") as fh:
        fh.write(data)
    return len(data)

# retry missing (curl returned 000) once
missing = ["_app/immutable/chunks/index-fd111bee.js",
           "_app/immutable/chunks/index-5e145417.js",
           "_app/immutable/chunks/5-f54f384e.js",
           "_app/immutable/chunks/Login-2c7bb3ae.js",
           "_app/immutable/assets/_layout-4df55af4.css",
           "_app/immutable/assets/checkIcon-79b1ffb7.svg",
           "_app/immutable/assets/googleLogo-3fcd6c65.svg",
           "_app/immutable/components/pages/user/auth/signup/_page.svelte-4e63b0ac.js"]
ts_for = {
 "_app/immutable/chunks/index-fd111bee.js": "20230317112244",
 "_app/immutable/chunks/index-5e145417.js": "20230106165858",
 "_app/immutable/chunks/5-f54f384e.js": "20230803162646",
 "_app/immutable/chunks/Login-2c7bb3ae.js": "20230803162644",
 "_app/immutable/assets/_layout-4df55af4.css": "20230106151259",
 "_app/immutable/assets/checkIcon-79b1ffb7.svg": "20230804010117",
 "_app/immutable/assets/googleLogo-3fcd6c65.svg": "20230508133057",
 "_app/immutable/components/pages/user/auth/signup/_page.svelte-4e63b0ac.js": "20230508133057",
}
for rel in missing:
    dest = os.path.join(RAW, rel)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    url = f"https://web.archive.org/web/{ts_for[rel]}id_/https://www.pixelicious.xyz/{rel}"
    r = subprocess.run(["curl", "-sS", "-m", "180", "--retry", "3", "--retry-delay", "3", "--compressed",
                        "-o", dest, "-w", "%{http_code} %{content_type} %{size_download}", url],
                       capture_output=True, text=True)
    print("retry", rel, r.stdout.strip(), file=sys.stderr)
    if os.path.getsize(dest) == 0:
        os.remove(dest)
        print("  still missing:", rel, file=sys.stderr)

n = 0
for root, _, files in os.walk(RAW):
    for fn in files:
        p = os.path.join(root, fn)
        if os.path.getsize(p) and is_gzip(p):
            size = gunzip_inplace(p)
            print("gunzip", os.path.relpath(p, WS), "->", size, file=sys.stderr)
            n += 1
print(f"decompressed {n} files")
