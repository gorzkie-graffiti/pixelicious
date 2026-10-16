import json, re, sys

src = open("recovery/raw/_app/immutable/components/pages/_page.svelte-e11325da.js").read()
i = src.index("defaultPalettes = readable(")
j = src.index("(", i) + 1
depth = 1
k = j
while depth:
    if src[k] == "(": depth += 1
    elif src[k] == ")": depth -= 1
    k += 1
body = src[j:k-1]
data = json.loads(re.sub(r"\s+", "", body))
print("palettes:", len(data), file=sys.stderr)
for n, p in enumerate(data):
    print(f"  [{n}] {len(p)} colors", file=sys.stderr)
json.dump(data, open("recovery/palettes-default.json", "w"), indent=1)
