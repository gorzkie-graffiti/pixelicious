#!/usr/bin/env python3
"""Final validation of recovered assets: sniff real content, rebuild manifest."""
import hashlib, json, os

WS = "/workspace/chats/7df4861ccb64a779ba21ce50"
RAW = os.path.join(WS, "recovery", "raw")

def sniff(path):
    head = open(path, "rb").read(2048)
    if head[:8] == b"\x89PNG\r\n\x1a\n": return "image/png"
    if head[:6] in (b"GIF87a", b"GIF89a"): return "image/gif"
    if head[:3] == b"\xff\xd8\xff": return "image/jpeg"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP": return "image/webp"
    if head[:4] == b"wOF2": return "font/woff2"
    if head[:4] == b"wOFF": return "font/woff"
    t = head.lstrip()
    if t.startswith(b"<svg") or t.startswith(b"<?xml"): return "image/svg+xml"
    if t.startswith(b"<!DOCTYPE") or t.startswith(b"<!doctype") or t[:5].lower() == b"<html":
        return "text/html (ERROR PAGE)"
    if head[:2] == b"\x1f\x8b": return "GZIP (not decompressed)"
    return "text/javascript" if b"\x00" not in head else "application/octet-stream"

EXPECT = {".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml",
          ".png": "image/png", ".json": "application/json"}
rows = []
bad = []
for root, _, files in os.walk(RAW):
    for fn in sorted(files):
        p = os.path.join(root, fn)
        rel = os.path.relpath(p, RAW)
        size = os.path.getsize(p)
        kind = sniff(p)
        ext = os.path.splitext(fn)[1].lower()
        exp = EXPECT.get(ext, "?")
        status = "ok"
        if kind.startswith("text/html") or kind.startswith("GZIP"):
            status = "INVALID"
        elif exp == "image/svg+xml" and kind != "image/svg+xml":
            status = "INVALID"
        elif exp in ("image/png",) and kind != "image/png":
            status = "INVALID"
        elif exp == "text/css" and kind not in ("text/css", "text/javascript"):
            status = "SUSPECT"
        elif exp == "text/javascript" and kind != "text/javascript":
            status = "INVALID"
        if status != "ok":
            bad.append((rel, kind, size, status))
        rows.append({
            "path": rel, "bytes": size, "detected": kind, "status": status,
            "sha256": hashlib.sha256(open(p, "rb").read()).hexdigest(),
        })
json.dump(rows, open(os.path.join(WS, "recovery/manifest-validated.json"), "w"), indent=1)
print(f"files={len(rows)} bad={len(bad)}")
for rel, kind, size, st in bad:
    print("  !", st, rel, kind, size)
