#!/usr/bin/env bash
# Usage: tools/render.sh <edl.json> <mix.wav> <out.mp4> [max_mb=20]
# Renders the EDL with Remotion (muted), muxes the audio mix, compresses to fit max_mb, +faststart.
set -e
KIT="$(cd "$(dirname "$0")/.." && pwd)"
EDL="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"; MIX="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
OUT="$3"; MAX="${4:-20}"
OUTA="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
DUR=$(python3 -c "import json;print(json.load(open('$EDL'))['duration'])")
CORES=$(nproc 2>/dev/null || sysctl -n hw.ncpu); CONC=$(( CORES > 1 ? CORES / 2 : 1 ))
BROWSER=(); [ -n "$REMOTION_CHROME" ] && BROWSER=(--browser-executable="$REMOTION_CHROME")
cd "$KIT/remotion"
npx remotion render src/index.tsx Reel "$KIT/out/_silent.mp4" --props="$EDL" --concurrency=$CONC --crf=17 --muted "${BROWSER[@]}" --log=error
# bitrate so that the file fits MAX MB (audio 160k)
VB=$(python3 -c "print(max(2500, min(9000, int(($MAX*8*1024*0.94)/$DUR - 160))))")
ffmpeg -v error -y -i "$KIT/out/_silent.mp4" -i "$MIX" -map 0:v -map 1:a -c:v libx264 -preset slow -b:v ${VB}k -maxrate $((VB*3/2))k -bufsize $((VB*2))k \
  -pix_fmt yuv420p -c:a aac -b:a 160k -ar 48000 -shortest -movflags +faststart "$OUTA"
rm -f "$KIT/out/_silent.mp4"
ls -la "$OUTA" | awk '{printf "rendered %s  %.1f MB\n", $9, $5/1048576}'
ffmpeg -hide_banner -i "$OUTA" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+I:" | tail -1
