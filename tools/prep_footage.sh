#!/usr/bin/env bash
# Usage: tools/prep_footage.sh <input> <output.mp4> [start] [duration]
# Converts any clip (phone .mov, rotated, horizontal, VFR) to 1080x1920, 30 fps CFR, H.264, + extracts voice.wav next to it.
# ffmpeg auto-applies rotation metadata. Horizontal clips are scaled to cover & center-cropped.
set -e
IN="$1"; OUT="$2"; SS="${3:-0}"; T="${4:-}"
[ -z "$OUT" ] && { echo "usage: prep_footage.sh in out.mp4 [start] [dur]"; exit 1; }
TT=(); [ -n "$T" ] && TT=(-t "$T")
ffmpeg -v error -y -ss "$SS" "${TT[@]}" -i "$IN" \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,fps=30,format=yuv420p" \
  -c:v libx264 -preset medium -crf 17 -g 30 -an "$OUT"
ffmpeg -v error -y -ss "$SS" "${TT[@]}" -i "$IN" -vn -ac 1 -ar 48000 "${OUT%.*}_voice.wav" 2>/dev/null || echo "(no audio track)"
ffprobe -v error -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of compact "$OUT"
