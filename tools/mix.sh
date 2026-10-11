#!/usr/bin/env bash
# Usage: tools/mix.sh <voice.wav> <music.wav> <sfx.wav> <duration> <out.wav> [music_gain=0.25] [sfx_gain=0.8]
# Music is sidechain-ducked under the voice. Final loudness -14 LUFS, true peak -1 dB (Instagram/YouTube).
set -e
V="$1"; M="$2"; X="$3"; T="$4"; OUT="$5"; MG="${6:-0.25}"; SG="${7:-0.8}"
ffmpeg -v error -y -i "$V" -i "$M" -i "$X" -filter_complex \
"[0]aformat=sample_rates=48000:channel_layouts=stereo,apad=whole_dur=$T,asplit=2[v][vk];\
[1]aformat=sample_rates=48000:channel_layouts=stereo,volume=$MG[m];[m][vk]sidechaincompress=threshold=0.035:ratio=4:attack=20:release=250[md];\
[2]aformat=sample_rates=48000:channel_layouts=stereo,volume=$SG[s];\
[v][md][s]amix=inputs=3:normalize=0:duration=longest,atrim=0:$T,alimiter=limit=0.95,loudnorm=I=-14:TP=-1:LRA=10" \
-ar 48000 "$OUT"
ffmpeg -hide_banner -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|Peak:)" | tail -2
