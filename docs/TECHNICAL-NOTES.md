# Technical notes

What was recovered, what was inferred, what was changed, and what is missing.

Everything in this document is traceable to files under `recovery/`. Where a statement is
an inference rather than evidence, it says so explicitly.

---

## 1. Sources

| Source | Detail |
| --- | --- |
| Primary HTML snapshot | `https://web.archive.org/web/20241014165640/https://www.pixelicious.xyz/` → `recovery/html/index-20241014165640.html` (14,577 bytes) |
| Asset discovery | Wayback CDX API, four queries (`recovery/cdx/*.json`) |
| Asset bodies | Raw `id_` replays, `https://web.archive.org/web/{timestamp}id_/{original-url}` |
| Downloader / validation | `recovery/fetch.py`, `recovery/postprocess.py`, `recovery/validate.py` |
| Asset manifest | `recovery/manifest-assets.tsv` (100 rows: path, size, sha256, source URL, timestamp, replay URL, detected type, validation) |

**100 files recovered and validated** — 67 JavaScript, 8 CSS, 16 SVG, 8 PNG, plus `favicon.png`.
None of them is a Wayback error page or an undecompressed stream: `recovery/validate.py`
sniffs real content and asserts the detected type matches the filename's extension
(`files=100 bad=0`).

Two mechanical surprises worth recording, because they are easy to get wrong:

1. **The archived JavaScript is gzip-encoded.** `/{timestamp}id_/` returns the bytes as
   the origin stored them, and the origin (SvelteKit on Vercel) stored its JS with
   `Content-Encoding: gzip`. Written to disk unchanged every `.js` file is gzip data, and
   `file` reports it, but a naive `grep` finds nothing. `recovery/postprocess.py`
   decompresses the 25 affected files in place
   (e.g. `_page.svelte-e11325da.js`: 172,489 → 617,041 bytes).
2. **`collapse=urlkey` returns only the *oldest* capture per URL**, not the newest. The
   timestamps are therefore not all from the same deployment, and the reconstruction
   checks each bundle's imports before relying on it.

## 2. What the evidence establishes

### 2.1 The deployment the HTML describes

The October 2024 page loads these bundles, which fixes the release under study:

```
_app/immutable/chunks/0-323bbe79.js
_app/immutable/chunks/_layout-eca538f1.js
_app/immutable/chunks/index-fd111bee.js
_app/immutable/chunks/browser-ponyfill-82cba527.js
_app/immutable/components/pages/_layout.svelte-3a15c019.js
_app/immutable/chunks/index-def40737.js
_app/immutable/chunks/toast-e4c2af5c.js
_app/immutable/chunks/singletons-d38e8de3.js
_app/immutable/chunks/supabase-1dccee07.js
_app/immutable/chunks/navigation-46f208ea.js
_app/immutable/chunks/scenarioLogo-928ddd99.js
_app/immutable/chunks/1-d5b969c8.js
_app/immutable/components/error.svelte-cba8c38b.js
_app/immutable/chunks/stores-5af73cf6.js
_app/immutable/chunks/2-42161baf.js
_app/immutable/components/pages/_page.svelte-e11325da.js     <- the whole page
_app/immutable/chunks/environment-9aa685ef.js
_app/immutable/chunks/checkIcon-aa2334e1.js
_app/immutable/chunks/bgRemovalExample2-7c4dfee8.js
_app/immutable/chunks/loadingIconWhite-601de10e.js
_app/immutable/start-0e20a21a.js
```

The manifest's captured timestamps for these are 2023-03-17 and 2023-07-11/2023-08-03 /
2024-03-10, but the **content hashes match the HTML's references exactly**, so they are
the right bytes even though the captures are older than the HTML. Older variants
(`_page.svelte-a34347f8.js`, `_page.svelte-ce90db2b.js`, `singletons-3d25e50c.js`, …)
belong to earlier releases: `_page.svelte-a34347f8.js` (Jan 2023) posts `pixelSize` to the
API where the October 2024 bundle posts `gridSize`, and it has no palette editor. They are
kept in `recovery/raw` for reference but are **not** the basis for the reconstruction.

### 2.2 Design tokens

Taken from the compiled stylesheet `_app/immutable/assets/_layout-1ebb0720.css`, which
records every utility the original build emitted:

| Token | Value | Source in the CSS |
| --- | --- | --- |
| `Deep-blue` | `#140836` | `.bg-Deep-blue` — also `theme-color` and the `<body>` background |
| `Medium-Blue` | `#1F143D` | `.bg-Medium-Blue` |
| `Light-Blue` | `#45376C` | `.bg-Light-Blue`, `.border-Light-Blue` |
| `Grey-White` | `#F9F9FB` | `.text-Grey-White` |
| `Grey` | `#AFA6C9` | `.text-Grey` |
| `Grey-Dark` | `#483E66` | `.bg-Grey-Dark` — also the recovered toast border and switch track |
| `Orange` | `#EA4D30` | `.bg-Orange`, `.border-Orange` |
| — | `#0A041B` | banner background, written inline as `bg-[#0A041B]` |
| — | `#3A3053`, `#483E61` | the two checkerboard colours (`se()`) |
| — | `#251849` | drop-zone hover background (`handleDragEnter`) |
| — | `#7E6AB3` | glow behind the selected grid-size button |
| — | `#978DBA` | dimmed label on unselected grid-size buttons |
| — | `#EC5B41` | `hover:bg-[#EC5B41]` on the orange button |
| — | `#4E3E79` | `hover:bg-[#4E3E79]` on the light-blue button |
| — | `#FF5E41`/`#fe5e41` | switch "on" colour |
| — | `#FFF1E3` | the header wordmark colour |

Fonts: Calistoga, Merriweather (400/700) and Poppins (400/500/700), loaded from Google
Fonts by `<link>` exactly as the original did. `font-calistoga`, `font-merriweather` were
Tailwind font families; Poppins was applied with an inline `style` in the footer.

### 2.3 The conversion contract

`_app/immutable/components/pages/_page.svelte-e11325da.js`, in `instance()`:

```js
const redimConstant = 512;

// on upload (recovered Ue()), after choosing a default grid size in ue():
Fe = (await Image.load(Fe)).resize({ width: redimConstant }).toDataURL();
const ot = await fetch('/api/computeImage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: Fe,
    gridSize: G,
    colorPalette: q ? it : void 0,
    removeNoise: et,
    removeBackground: tt
  })
});
if (ot.status === 401) { const mt = await ot.json(); throw new Error(mt.error); }
if (ot.status === 400) { const mt = await ot.json(); console.log(mt); throw new Error('Server error: ' + mt); }
const { result: gt } = await ot.json();
A(4, (O = gt)), tt && se();
```

So: **normalise to 512px wide → POST → receive a 512px-wide PNG data URL.** The
reconstruction keeps that shape end to end (`src/lib/image.js` →
`src/lib/processor.js` → `src/lib/pixelate.js`).

`gridSize` is the width of the pixel grid, not a divisor. The four buttons call
`pe(32)`, `pe(64)`, `pe(128)`, `pe(256)` and the recovered setter is
`function pe(Fe) { G = Fe; X = redimConstant / G; }` — so `X` (`pixelSize`) is always
`512 / gridSize`, which is why `pe(32)` highlights the button labelled `32px` when
`E[9] === 16`. Reconstructed in `pixelSizeMultiplier()` and asserted in the unit tests.

The default grid width comes from the recovered `ue()`:

```js
async function ue(Fe) {
  const We = await Image.load(Fe), et = We.height, tt = We.width, it = et * tt;
  switch (!0) {
    case it <= 65536: A(9, (X = 2)), A(10, (G = 256)); break;
    default:          A(9, (X = 4)), A(10, (G = 128)); break;
  }
}
```

i.e. area ≤ 65536px² → 256px, otherwise 128px. Reconstructed as `defaultGridSize()`
and asserted in the unit tests.

Download (`ve()` + `Se()`), including the recovered "Reduce size" branch:

```js
async function Se(Fe, We) {
  if (Q) {                                        // Q = "Reduce size"
    const it = (await Image.load(Fe)).resize({ width: redimConstant / X }).toDataURL(),
      nt = document.createElement('a');
    (nt.href = it), (nt.download = We), document.body.appendChild(nt), nt.click(), document.body.removeChild(nt);
  } else { /* fetch the data URL as a blob and download it unchanged */ }
}
// filename: `${Z}-pixelicious.png` where Z = the uploaded filename without its extension
```

image-js' `resize()` defaults to `nearestNeighbor` interpolation (visible in the bundled
`resize()` implementation), which is what makes the exported sprite crisp. The
reconstruction does the equivalent with a canvas whose `imageSmoothingEnabled` is off
(`nearestResizeDataURL`).

### 2.4 The 20 built-in palettes

`_page.svelte-e11325da.js` declares `const defaultPalettes = readable([ … ])` with 20
palettes (5–64 colours each, ending with the 16-colour PICO-8 palette). They were
extracted programmatically (`recovery/extract_palettes.py` →
`recovery/palettes-default.json`) and are used verbatim in `src/lib/palettes.js`.

The page applies `defaultPalettes[4]` (16 colours) automatically on every upload —
`const Y = JSON.parse(JSON.stringify(T[4]))` — and `defaultPalettes[7]` supplies the random
light colours for the animated banner letters (`filter(c => c[0] > 100 && c[1] > 100 && c[2] > 100)`).

The `paletteIcon` button opens `CommunityPalettesModal`, whose recovered instance
subscribes to `defaultPalettes` and renders one card per palette, each click doing
`set_store_value(colorPalette, palette, palette); dispatch('checkPalette');`. That is
where all 20 are surfaced, and the reconstruction reproduces it.

### 2.5 UI structure

Recovered verbatim (structure and copy): the Scenario announcement banner, the header
wordmark with its inline base64 logo, "New: Remove background" with per-letter
`char-0…char-9` spans, the `max-w-[656px]` heading block, the dashed `h-60` upload zone
with the "Snowy direction!" mascot, the Original/Result preview pair with the 6×6
checkerboard and the blurred glow copy of the result, the two `#modal` drawers, the
controls column, the "Reduce size" + "Preview" row, the orange Download button, the
Discord "Share your results" link, the footer, and the empty `.toaster`.

Verified mechanically: of the 46 distinct class-attribute groups in the archived HTML,
**44 appear verbatim** in the served page. The two that do not are
`grid grid-cols-6 grid-rows-6 …` (the checkerboard, which the original filled from
JavaScript after hydration — the raw HTML's div is empty) and `svelte-jyff3d toaster`
(Svelte's scope hash, which a fresh build does not reproduce).

### 2.6 State

`instance()` returns a 54-slot array; every slot was mapped to its handler, which is how
the reconstruction knows that:

* the "Remove background" switch does **not** remove a background — on Generate the
  recovered `ke()` does `if (tt) { A(7, (z = !0)); return; }`, i.e. it opens
  `BGremovalModal` ("Background removal is only available on the Scenario app") without
  ever calling the API. The reconstruction behaves identically.
* `min-width: 768px` decides whether the community-palette modal closes itself after a
  pick (`window.innerWidth < 768 && (C = !0)`).
* `Escape` closes the preview, bg-removal, pricing and both drawer modals (`Ne`).
* the checkerboard is created in `onMount` (`set_store_value(colorPalette, (I = Y), I), oe(), se()`),
  so it is visible from first paint. Confirmed against the archived snapshot.

## 3. The conversion itself: evidence vs inference

### 3.1 Recovered

* Source normalised to exactly 512px wide before processing (`redimConstant`).
* Working output is 512px wide.
* `gridSize` ∈ {32, 64, 128, 256} = the pixel-grid width in pixels.
* Aspect ratio preserved (only `width` is passed to `resize`).
* `colorPalette` is omitted when "Use this palette" is unticked.
* `removeNoise` defaults to `true` and is labelled "Denoising (For 128px and lower grid size)".
* Download = the result resized to `gridSize` px wide, or the 512px result untouched.
* Palette matching is per-pixel: the result must be expressive in the chosen palette's colours.

### 3.2 Not recovered — the server

`POST /api/computeImage` and `POST /api/stripe/payment` were **never archived**. They only
ever accepted POST bodies, so no crawler captured them, and no CDX query for
`www.pixelicious.xyz/api/*` returns anything. A full-domain CDX sweep
(`recovery/cdx/domain.json`, 150 rows) contains no `api` path at all.

The published error strings are recovered and reproduced:
`"Non authorized without a login session"`, `"Non authorized without a premium account"`,
`"Total usage limit reached"`, `"Server error :/"`.

### 3.3 Reconstructed pipeline

`src/lib/pixelate.js`, in order:

1. **Box-average downsample** of the 512px RGBA buffer to `gridSize × round(h × gridSize / 512)`.
   Colour channels are averaged **premultiplied by alpha**, so a transparent region cannot
   darken its neighbours.
2. **3×3 median filter** per channel when `removeNoise` is on (the "Denoising" setting).
3. **Colour reduction**:
   * `colorPalette` supplied → every opaque pixel is snapped to its nearest palette entry
     (Euclidean distance in RGB, memoised per source colour).
   * no palette → median-cut quantisation to 16 colours (the default palette's size).
4. **Nearest-neighbour upscale** back to 512px wide, which is what produces the crisp
   uniform blocks.

This step ordering is an inference from the observed contract: the client only ever sent a
512px image plus a target grid width, a noise flag and an optional palette, and got back a
512px image. Any implementation must downsample to the grid, reduce colours and re-expand;
the specific filters chosen here are standard and deterministic, not claimed to be the
original's.

**The "no palette" branch is the weakest inference.** The original sent
`colorPalette: undefined` and let the server choose; nothing in the recovered code says how
many colours it used. Median cut to 16 was chosen because the palette the app applies by
default has 16 entries. Documented so it can be revisited.

### 3.4 Transparency — a deliberate deviation

The original destroyed alpha before sending:

```js
async function xe(Fe) {
  let We = (await Image.load(Fe)).rgba8();
  const et = We.data;
  for (let tt = 0; tt < et.length; tt += 4)
    et[tt + 3] < 255 && ((et[tt] = 127), (et[tt + 1] = 127), (et[tt + 2] = 127), (et[tt + 3] = 255));
  return We.toDataURL();
}
```

Every pixel with `alpha < 255` became opaque mid-grey `#7F7F7F`. That is presumably why the
server never had to deal with alpha.

The reconstruction **does not reproduce this**: it downsamples and quantises RGBA with
premultiplied alpha and writes a PNG with a real alpha channel. Transparency therefore
survives the whole workflow, which the brief requires ("handle transparency correctly") and
which the pixel-art/sprite use case needs. The downloaded sprite is only usable outside the
browser because of this change. The cost is that a semi-transparent pixel maps to the
palette entry nearest its *unpremultiplied* colour rather than to grey.

### 3.5 Additions with no recovered counterpart

* **Upload size limits** — the original accepted anything the browser could decode. A
  25MB / 40-megapixel ceiling (`validateFile`) exists so a pathological upload cannot hang
  the tab; it produces a readable toast, not a crash.
* **`Escape` also closes the palette drawers and the pricing modal** — the recovered `Ne`
  only closed the preview/bg-removal/pricing state; extending it to the drawers matches how
  the backdrop already behaved.

## 4. Deviations and substitutions, in one list

| # | Original | Reconstruction | Why |
| --- | --- | --- | --- |
| 1 | `POST /api/computeImage` (unrecoverable server) | Web Worker running `computePixelArt` locally | The endpoint does not exist; §3.2–3.3 |
| 2 | Alpha flattened to `#7F7F7F` client-side | Alpha preserved end to end | §3.4; required by the brief |
| 3 | `image-js` (`Image.load/resize/rgba8/toDataURL`) | Canvas 2D + hand-written resamplers | One fewer large dependency; identical nearest-neighbour semantics |
| 4 | `anime.js` for the banner letters | CSS `@keyframes banner-letter` with the recovered translate/rotate values and 200ms stagger | Visual output matched without the dependency |
| 5 | `svelte-french-toast` (`chunks/toast-e4c2af5c.js`) | ~40-line store + the recovered inline styles | Dependency removed; the four recovered message strings and their styles are unchanged |
| 6 | `svelte-awesome-color-picker` inside `ColorEditingModal` | Native `<input type="color">` + the recovered palette swatch grid | Avoids vendoring a ~30-rule third-party picker purely for its UI; the `colorPalette`/`currentColorPick` contract is unchanged |
| 7 | `splitbee.io` analytics and every `data-splitbee-event` attribute | Removed | The brief says not to carry analytics over; the visible interface is unaffected |
| 8 | Supabase client initialised with the site's public anon key; `/user/auth/*`, `/user/account`, `/subscription/*` routes | Not reconstructed; `userProfile` keeps its recovered default (`undefined`, i.e. signed out) | No reachable Supabase project, and the brief forbids fabricating a backend. The recovered pages exist only in `recovery/raw` |
| 9 | Stripe Checkout via `POST /api/stripe/payment` | `PricingModal` renders unchanged but intercepts submit and explains the endpoint is not archived | Never claim a working payment flow |
| 10 | Download button always active and falls back to downloading the bundled sample | Disabled until a result exists | Explicit requirement of the brief; visually the only difference is the cursor (`disabled:cursor-not-allowed`) |
| 11 | `handleDragEnter`/`handleDragLeave` mutate `event.target.classList` | The same two class strings applied through a `dragging` flag | Behaviourally identical, but survives re-render and does not depend on which child element received the event |
| 12 | `CommunityPalettesModal` nests a `<button>Use</button>` inside a card `<button>` | Inner element is a `<div>` with the same classes | The original's markup is invalid HTML; the rendering is unchanged |
| 13 | `tt && se()` after a background-removal conversion appends a **second** set of 36 checkerboard cells | The checkerboard is rendered once | Reproducing that would stack two grids; it is a bug, not behaviour |
| 14 | `<link rel=“canonical” …>` with curly quotes (invalid attribute) | Straight quotes | Straightforward markup fix |
| 15 | `/api/computeImage` returns HTTP 401/400 with JSON error messages | `ComputeError` with the same messages and a `status` field | Keeps the caught-message branches identical to the recovered code |

## 5. Security

* **The public Supabase anon key and URL recovered from the HTML are not used.**
  `index-20241014165640.html` embeds them in the hydration payload
  (`PUBLIC_SUPABASE_ANON_KEY` / `PUBLIC_SUPABASE_URL`, project `mjampzrvqjvgqyjloepn`) and the
  same key is hard-coded in `chunks/supabase-1dccee07.js`. They are present in the archived
  evidence under `recovery/` but **no key, URL or Supabase client exists anywhere in `src/`**
  — the reconstruction never contacts that project. Treat those credentials as burned,
  because they were publicly served for years.
* **No image ever leaves the browser.** The recovered app uploaded every image to its own
  server; this reconstruction processes everything locally in a Web Worker, so there is no
  network egress and nothing to disclose to the user.
* **No analytics.** `cdn.splitbee.io/sb.js` and all `data-splitbee-event` attributes are
  gone (§4.7).
* Recovered credentials, tokens and secrets are nowhere in `src/`, `static/` or the build
  output — only in the archived evidence, which is explicit about what it is.
* Uploads are validated by MIME type, size and pixel count, and decoding failures are caught
  and reported as toasts rather than thrown at the user.

## 6. Verification

Run from the project root.

| Check | Command | Result |
| --- | --- | --- |
| Type / template check | `npm run check` | 0 errors, 0 warnings |
| Unit tests (conversion core, palettes, constants, upload validation) | `npm test` | 25/25 pass |
| Production build | `npm run build` | static site written to `build/` |
| Real-PNG pipeline check | `node scripts/verify-pipeline.mjs` | all checks pass |
| Browser end-to-end | `node tests/browser.spec.mjs` | all checks pass |

### What `node scripts/verify-pipeline.mjs` does

It ships its own minimal PNG codec (`node:zlib` only, no extra dependency), decodes the
**original site's own sample image** `static/assets/base-f8a74a87.png` (512×512 RGB — the
exact shape the original normalised uploads to), runs the shipped `computePixelArt()`, and
re-encodes the result. For each of the four grid sizes it asserts: the output re-decodes as a
valid PNG, stays 512px wide and keeps the aspect ratio, contains **only** palette colours,
collapses the colour count dramatically (121,146 source colours → 12–16), is built from
perfectly uniform `512/gridSize` blocks, differs from the input, and that the "Reduce size"
export is exactly `gridSize` px wide. It also checks that a cleared transparent region stays
transparent. Timings: 16–59 ms per conversion for a 512×512 source; artifacts land in
`recovery/verification/`.

### What `node tests/browser.spec.mjs` does

Playwright drives the real UI in Chromium: initial render, the unsupported-file toast, upload
through the hidden `<input type="file">`, block-uniformity and colour-count of the on-screen
result (decoded in the page), the grid-size buttons, picking one of the 20 palettes from the
community modal, the real-size preview modal, both download paths (verified by parsing the
downloaded file's PNG header), a synthetic `dragenter`/`dragover`/`drop` sequence including
the drop-zone highlight class, the swatch→editor drawer, the background-removal → Scenario
modal route, `Escape`, and mobile layout with no horizontal overflow.

**Environment caveats for the browser check.** Playwright is deliberately *not* a project
dependency, and a bare container needs setup first:

```bash
npm install --no-save playwright && npx playwright install chromium
# headless Chromium needs system libraries that may not be present and cannot be
# apt-installed without root; they can be unpacked into a local prefix instead:
mkdir -p ~/chrome-libs/debs && cd ~/chrome-libs/debs
apt-get download libnspr4 libnss3 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
  libasound2t64 libatk1.0-0t64 libatk-bridge2.0-0t64 libatspi2.0-0t64 libxkbcommon0 \
  libxi6 libxrender1 fonts-dejavu-core
cd ~/chrome-libs && mkdir -p root conf && for d in debs/*.deb; do dpkg-deb -x "$d" root/; done
```

then, with a `fonts.conf` pointing at `~/chrome-libs/root/usr/share/fonts`:

```bash
export LD_LIBRARY_PATH="$HOME/chrome-libs/root/usr/lib/x86_64-linux-gnu:$HOME/chrome-libs/root/lib/x86_64-linux-gnu"
export FONTCONFIG_FILE="$HOME/chrome-libs/conf/fonts.conf"

# 1. start the app, allowing the preview hostname (never hard-coded in the repo)
PREVIEW_HOST=<host> npm run dev -- --port 3000

# 2. in another shell
BASE_URL=http://127.0.0.1:3000 node tests/browser.spec.mjs
```

**Without fontconfig, Chromium measures every glyph as zero-width** and the whole page
collapses to nothing — which looks like a layout bug in this project but is purely
environmental. `tests/browser.spec.mjs` detects that case, prints the cause and exits with
code 2 so it can never be mistaken for a product failure.

### Visual comparison

`node scripts/screenshot.mjs` captures three full-page screenshots into
`recovery/verification/`: the reconstruction before and after a conversion, and the
**live Wayback snapshot rendered in the same browser**. Side by side, layout, colours,
spacing, the sample imagery, the checkerboard and the button styling match. The archived
capture renders in a fallback serif because the Wayback replay does not serve the original
Google Fonts, so the reconstruction (which does load Calistoga/Merriweather) is the more
faithful of the two to the original design. Body text therefore wraps one word earlier in
the archived capture; that is a font-metric difference, not a layout difference.

The one substantive difference in the pair is the right-hand preview panel, which is dark
and washed out in the archived capture and shows a clean conversion here. That is the
backend being dead, not a design choice: the archived page calls `computeImage` on mount,
the request can never succeed against `web.archive.org`, and the archive's own rendering
leaves the panel sitting behind the loading veil. In other words, the archives preserve the
original only in its *loading* state — which is a further reason the conversion itself had
to be reimplemented rather than recovered.

## 7. What remains missing

* **`POST /api/computeImage`** — the pixel-art algorithm proper. No capture exists. §3.3 is
  an implementation of the observed contract, not a recovery of the original code.
* **`POST /api/stripe/payment`** — Stripe Checkout session creation, plus whatever webhook
  set `profiles.is_premium`.
* **The Supabase schema and RLS policies** — inferred only from the one query the page made:
  `from('profiles').select('username, is_premium, free_bg_removals, bg_removals, stripe_customer_id').eq('id', user.id).single()`.
* **Background removal** — the original routed it to Scenario and never implemented it in the
  web app, so nothing is missing beyond the upsell modal that is reproduced.
* **`/user/auth/login`, `/user/auth/signup`, `/user/accountRecovery`, `/user/confirmSignup`,
  `/user/resetPassword`, `/user/account`, `/subscription/success`,
  `/subscription/canceled`** — the server-rendered HTML for the first three exists in the
  archive, and the client components for all eight are under `recovery/raw/_app/immutable/components/pages/`,
  but none of them can work without Supabase. The brief says not to fabricate a user system,
  so they are left as evidence rather than rebuilt as dead screens.
* **`/api/version.json`** — SvelteKit's update poller; not archived, and the static adapter
  does not produce it.
* **Analytics baselines** — splitbee data is not recoverable, and by choice not reproduced.
