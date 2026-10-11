#!/usr/bin/env bash
# Usage: tools/stabilize.sh <in.mp4> <out.mp4> [tripod|smooth] [smoothing=30]
#  tripod : static-intended shot (face, desk, screen) -> frame locked
#  smooth : shot with an intentional camera move (pan / push) -> keeps the move, removes jitter
# Prints jitter before/after; if stabilization made it worse, the original is copied instead.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
IN="$1"; OUT="$2"; MODE="${3:-tripod}"; SM="${4:-30}"
TRF="$(mktemp --suffix=.trf 2>/dev/null || mktemp).trf"
if [ "$MODE" = "tripod" ]; then
  ffmpeg -v error -y -i "$IN" -vf "vidstabdetect=shakiness=10:accuracy=15:tripod=1:result=$TRF" -f null -
  TF="vidstabtransform=input=$TRF:tripod=1:optzoom=1:interpol=bicubic"
else
  ffmpeg -v error -y -i "$IN" -vf "vidstabdetect=shakiness=10:accuracy=15:result=$TRF" -f null -
  TF="vidstabtransform=input=$TRF:smoothing=$SM:optzoom=1:interpol=bicubic"
fi
ffmpeg -v error -y -i "$IN" -vf "$TF,unsharp=5:5:0.4,format=yuv420p" -c:v libx264 -preset medium -crf 17 -an "$OUT"
rm -f "$TRF"
B=$(python3 "$DIR/jitter.py" "$IN"); A=$(python3 "$DIR/jitter.py" "$OUT")
echo "jitter before=$B after=$A ($MODE)"
python3 -c "import sys; sys.exit(0 if float('$A') <= float('$B') else 1)" || { echo "worse -> keeping original (try the other mode)"; cp "$IN" "$OUT"; }
