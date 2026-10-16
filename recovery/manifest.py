#!/usr/bin/env python3
"""Build the final recovered-asset manifest (source URL, timestamp, type, status)."""
import hashlib, json, os

WS = "/workspace/chats/7df4861ccb64a779ba21ce50"
RAW = os.path.join(WS, "recovery", "raw")

# timestamp per URL: newest capture we downloaded from
ts_map = {}
for name in ("immutable.json", "chunks.json", "components.json", "assets.json", "domain.json"):
    p = os.path.join(WS, "recovery", "cdx", name)
    if not os.path.exists(p):
        continue
    for row in json.load(open(p))[1:]:
        ts, original, mime = row[0], row[1], row[2]
        if original not in ts_map or ts_map[original][0] < ts:
            ts_map[original] = (ts, mime)
# explicit overrides for the retried/extra fetches
ts_map["https://www.pixelicious.xyz/favicon.png"] = ("20230106151309", "image/png")
for rel, ts in {
    "chunks/index-fd111bee.js": "20230317112244", "chunks/index-5e145417.js": "20230106165858",
    "chunks/5-f54f384e.js": "20230803162646", "chunks/Login-2c7bb3ae.js": "20230803162644",
    "assets/_layout-4df55af4.css": "20230106151259", "assets/checkIcon-79b1ffb7.svg": "20230804010117",
    "assets/googleLogo-3fcd6c65.svg": "20230508133057",
    "components/pages/user/auth/signup/_page.svelte-4e63b0ac.js": "20230508133057",
}.items():
    ts_map[f"https://www.pixelicious.xyz/_app/immutable/{rel}"] = (ts, None)

sniff_map = {r["path"]: r for r in json.load(open(os.path.join(WS, "recovery/manifest-validated.json")))}

lines = ["path\tbytes\tsha256\tsource_url\twayback_timestamp\twayback_replay_url\tdetected_type\tvalidation"]
unmatched = []
for root, _, files in os.walk(RAW):
    for fn in sorted(files):
        p = os.path.join(root, fn)
        rel = os.path.relpath(p, RAW)
        src = "https://www.pixelicious.xyz/" + rel
        ts, _ = ts_map.get(src, (None, None))
        if ts is None and rel != "favicon.png":
            unmatched.append(rel)
        entry = sniff_map[rel]
        replay = f"https://web.archive.org/web/{ts}id_/{src}" if ts else ""
        lines.append("\t".join([rel, str(entry["bytes"]), entry["sha256"][:16], src, ts or "", replay,
                                entry["detected"], entry["status"]]))
open(os.path.join(WS, "recovery/manifest-assets.tsv"), "w").write("\n".join(lines) + "\n")
print("wrote manifest-assets.tsv with", len(lines) - 1, "rows")
if unmatched:
    print("no timestamp recorded for:", unmatched)
