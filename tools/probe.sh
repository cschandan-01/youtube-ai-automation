#!/usr/bin/env bash
# Usage: tools/probe.sh <file>   -> duration, size, fps, rotation, audio level, "black video" check
f="$1"
ffprobe -v error -show_entries format=duration:stream=codec_type,codec_name,width,height,r_frame_rate:stream_side_data=rotation -of compact "$f" | grep -v '^side_data|$'
ffmpeg -i "$f" -af volumedetect -f null - 2>&1 | grep -E 'mean_volume|max_volume'
y=$(ffmpeg -v error -i "$f" -vf "fps=1,scale=64:-1,signalstats,metadata=print:key=lavfi.signalstats.YAVG" -f null - 2>&1 | grep -o 'YAVG=[0-9.]*' | cut -d= -f2 | sort -n | tail -1)
[ -n "$y" ] && python3 -c "import sys;print('VIDEO IS BLACK (voiceover-only file)' if float('$y')<8 else 'video has picture (max brightness $y)')"
