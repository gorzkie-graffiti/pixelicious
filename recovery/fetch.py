#!/usr/bin/env python3
"""Download archived pixelicious.xyz assets from the Wayback Machine.

Reads CDX JSON dumps, fetches raw (id_) replays, validates that the response
looks like the expected content type, and writes a manifest TSV.
"""
import hashlib, json, os, subprocess, sys, time

ROOT = os.path.dirname(os.path.abspath(__file__))
WS = os.path.dirname(ROOT)

def dest_for(original: str) -> str:
    p = original.split("pixelicious.xyz/", 1)[1]
    return os.path.join(WS, "recovery", "raw", p)

def sniff(path: str) -> str:
    try:
        with open(path, "rb") as fh:
            head = fh.read(4096)
    except OSError:
        return "unreadable"
    if head.startswith(b"<!DOCTYPE") or head.startswith(b"<!doctype") or head[:200].lstrip().lower().startswith(b"<html"):
        return "HTML(error-page)"
    if head[:8] == b"\x89PNG\r\n\x1a\n":
        return "png"
    if head[:6] in (b"GIF87a", b"GIF89a"):
        return "gif"
    if head[:3] == b"\xff\xd8\xff":
        return "jpeg"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "webp"
    if head[:4] == b"wOFF":
        return "woff"
    if head[:4] == b"wOF2":
        return "woff2"
    if head[:4] == b"\x00\x01\x00\x00":
        return "ttf"
    t = head.lstrip()
    if t[:5] == b"<?xml" or t[:4] == b"<svg":
        return "svg"
    if t[:1] in (b"{", b"[", b"!", b"(", b"/", b"i", b"c", b"v", b"f", b"l", b"s") and b"\x00" not in head:
        return "js/css-ish"
    return "unknown"

OK_CT = {
    "application/javascript": {"js/css-ish"},
    "text/javascript": {"js/css-ish"},
    "text/css": {"js/css-ish"},
    "image/svg+xml": {"svg"},
    "image/png": {"png"},
    "image/jpeg": {"jpeg"},
    "image/webp": {"webp"},
    "font/woff2": {"woff2"},
}

def main():
    rows = []
    seen_urls = {}
    for name in ("immutable.json", "chunks.json", "components.json", "assets.json"):
        p = os.path.join(ROOT, "cdx", name)
        if not os.path.exists(p):
            continue
        data = json.load(open(p))
        for ts, original, mime, status, length in data[1:]:
            # keep the newest capture per URL when duplicates exist across dumps
            if original in seen_urls and seen_urls[original][0] >= ts:
                continue
            seen_urls[original] = (ts, mime, status, length)

    # order: newest snapshot first so we can prioritise
    items = sorted(seen_urls.items(), key=lambda kv: kv[1][0], reverse=True)
    manifest = []
    for original, (ts, mime, status, length) in items:
        dest = dest_for(original)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            print("skip(exists)", dest)
        else:
            url = f"https://web.archive.org/web/{ts}id_/{original}"
            for attempt in range(3):
                r = subprocess.run(
                    ["curl", "-sS", "-m", "120", "-L", "--retry", "2", "--retry-delay", "2",
                     "-o", dest, "-w", "%{http_code} %{content_type} %{size_download}", url],
                    capture_output=True, text=True)
                if r.returncode == 0:
                    break
                time.sleep(2 + attempt * 3)
            print(r.stdout.strip(), original, file=sys.stderr)
        size = os.path.getsize(dest) if os.path.exists(dest) else -1
        digest = ""
        if size > 0:
            digest = hashlib.sha256(open(dest, "rb").read()).hexdigest()
        kind = sniff(dest) if size > 0 else "missing"
        expected = OK_CT.get(mime, set())
        ok = "ok" if (kind in expected and (mime != "image/svg+xml" or kind == "svg")) else "MISMATCH"
        if size <= 0:
            ok = "MISSING"
        manifest.append((ts, original, mime, status, length, kind, digest[:16], size, ok))

    with open(os.path.join(ROOT, "manifest-downloads.tsv"), "w") as fh:
        fh.write("timestamp\turl\tcdx_mimetype\tcdx_status\tcdx_length\tsniffed\tsha256_16\tbytes\tvalidation\n")
        for row in sorted(manifest, key=lambda r: r[1]):
            fh.write("\t".join(str(c) for c in row) + "\n")
    bad = [r for r in manifest if r[8] != "ok"]
    print(f"\n== {len(manifest)} assets, {len(bad)} problems ==")
    for r in bad:
        print("  !", r[8], r[1], r[5], r[7])

if __name__ == "__main__":
    main()
