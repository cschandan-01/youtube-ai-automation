#!/usr/bin/env bash
# Checks that every part of the kit is ready
KIT="$(cd "$(dirname "$0")/.." && pwd)"; ok=1
chk(){ if eval "$2" >/dev/null 2>&1; then echo "OK   $1"; else echo "FAIL $1"; ok=0; fi; }
chk "ffmpeg" "ffmpeg -version"
chk "ffmpeg vidstab (stabilization)" "ffmpeg -hide_banner -filters | grep vidstabdetect"
chk "python numpy/scipy/pillow" "python3 -c 'import numpy,scipy,PIL'"
chk "sherpa-onnx (speech-to-text)" "python3 -c 'import sherpa_onnx'"
chk "Whisper model" "test -f $KIT/models/sherpa-onnx-whisper-small/small-encoder.int8.onnx"
chk "SFX pack" "test -d $KIT/sfx/node_modules/uisfx/sounds"
chk "Node.js" "node -v"
chk "Remotion" "test -d $KIT/remotion/node_modules/remotion"
[ $ok = 1 ] && echo "All good." || echo "Run setup.sh again / fix the FAIL lines."
