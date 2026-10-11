#!/usr/bin/env bash
# One-time setup for the Video Agent Kit (Ubuntu 22.04+/24.04 or macOS with Homebrew)
set -e
KIT="$(cd "$(dirname "$0")" && pwd)"
echo "== 1. System packages"
if command -v apt-get >/dev/null; then
  sudo apt-get update
  sudo apt-get install -y ffmpeg python3 python3-pip curl bzip2 fonts-dejavu
  # Remotion's headless Chrome needs these libs on Linux
  sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2t64 || sudo apt-get install -y libasound2 || true
elif command -v brew >/dev/null; then
  brew install ffmpeg python node
fi
ffmpeg -hide_banner -filters | grep -q vidstabdetect && echo "ffmpeg vidstab: OK" || echo "WARNING: your ffmpeg has no vidstab (stabilization will not work). Install a full ffmpeg build."
command -v node >/dev/null || { echo "Install Node.js 20+ (https://nodejs.org) and re-run"; exit 1; }
echo "== 2. Python packages"
python3 -m pip install --upgrade numpy scipy pillow sherpa-onnx anthropic 2>/dev/null || python3 -m pip install --break-system-packages numpy scipy pillow sherpa-onnx anthropic
echo "== 3. Whisper speech-to-text model (multilingual, understands Hindi/Hinglish) ~640 MB"
if [ ! -f "$KIT/models/sherpa-onnx-whisper-small/small-encoder.int8.onnx" ]; then
  curl -L -o "$KIT/models/whisper-small.tar.bz2" https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2
  tar xjf "$KIT/models/whisper-small.tar.bz2" -C "$KIT/models" && rm "$KIT/models/whisper-small.tar.bz2"
fi
echo "== 4. Free CC0 UI sound effects pack (1,800+ sounds)"
(cd "$KIT/sfx" && [ -d node_modules/uisfx ] || (npm init -y >/dev/null && npm i uisfx))
echo "== 5. Remotion (video rendering) + fonts"
(cd "$KIT/remotion" && npm install && npx remotion browser ensure)
echo "== Done. Test with:  bash tools/doctor.sh"
