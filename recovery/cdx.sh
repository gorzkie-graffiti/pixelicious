#!/bin/bash
# Query Wayback CDX for pixelicious.xyz assets and dump JSON lists
set -u
BASE="https://web.archive.org/cdx/search/cdx"
q() {
  local out="$1"; shift
  local url="$1"; shift
  local extra="$1"
  echo "== $out :: $url =="
  curl -s -m 180 --retry 3 --retry-delay 2 \
    "$BASE?url=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1],safe=''))" "$url")&output=json&fl=timestamp,original,mimetype,statuscode,length&filter=statuscode:200&collapse=urlkey&limit=2000&$extra" \
    -o "$out"
  local rc=$?
  echo "curl rc=$rc bytes=$(wc -c < "$out" 2>/dev/null)"
  head -c 300 "$out"; echo
}
mkdir -p recovery/cdx
q recovery/cdx/chunks.json      'www.pixelicious.xyz/_app/immutable/chunks/*' ''
q recovery/cdx/components.json  'www.pixelicious.xyz/_app/immutable/components/*' ''
q recovery/cdx/assets.json      'www.pixelicious.xyz/_app/immutable/assets/*' ''
q recovery/cdx/immutable.json   'www.pixelicious.xyz/_app/immutable/*' ''
