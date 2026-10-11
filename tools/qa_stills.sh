#!/usr/bin/env bash
# Usage: tools/qa_stills.sh <edl.json> <out.jpg> t1 t2 t3 ...
# Renders single frames straight from the composition (fast, no full render) and tiles them into one sheet.
# Use BEFORE the full render: check overlaps, safe zones, zoom targets, text timing.
set -e
KIT="$(cd "$(dirname "$0")/.." && pwd)"
EDL="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"; OUT="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"; shift 2
TMP="$KIT/out/_qa"; rm -rf "$TMP"; mkdir -p "$TMP"
BROWSER=(); [ -n "$REMOTION_CHROME" ] && BROWSER=(--browser-executable="$REMOTION_CHROME")
cd "$KIT/remotion"
npx remotion bundle src/index.tsx --out-dir="$TMP/bundle" --log=error >/dev/null
i=0
for t in "$@"; do
  F=$(python3 -c "print(round($t*30))")
  npx remotion still "$TMP/bundle" Reel "$TMP/$(printf %03d $i)_$t.png" --frame=$F --props="$EDL" --scale=0.33 "${BROWSER[@]}" --log=error
  i=$((i+1))
done
python3 - "$TMP" "$OUT" <<'PY'
import sys, glob, os
from PIL import Image, ImageDraw
fs = sorted(glob.glob(sys.argv[1] + '/*.png')); ims = [Image.open(f) for f in fs]
w, h = ims[0].size; cols = min(6, len(ims)); rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * (h + 28)), 'white'); d = ImageDraw.Draw(sheet)
for k, (f, im) in enumerate(zip(fs, ims)):
    x, y = (k % cols) * w, (k // cols) * (h + 28); sheet.paste(im, (x, y + 28))
    d.text((x + 6, y + 6), os.path.basename(f).split('_', 1)[1][:-4] + 's', fill='black')
sheet.save(sys.argv[2], quality=88); print('qa sheet ->', sys.argv[2])
PY
rm -rf "$TMP"
