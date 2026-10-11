"""Usage: python3 tools/transcribe.py <audio_or_video> [--lang hi] [--out transcript.json]
Whisper (multilingual) via sherpa-onnx. For Hindi/Hinglish it returns BOTH:
  - meaning: English translation per chunk (reliable meaning)
  - roman:   English-script transcription per chunk (anchors / brand words)
Chunks are split at real silences so timings line up with the voice."""
import argparse, json, subprocess, os, numpy as np, sherpa_onnx
KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = os.path.join(KIT, 'models', 'sherpa-onnx-whisper-small') + '/'
ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('--lang', default='hi'); ap.add_argument('--out', default='transcript.json')
ap.add_argument('--chunk', type=float, default=5.0, help='target chunk length in seconds')
a = ap.parse_args()
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.src, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768; sr = 16000; dur = len(x) / sr
h = 160; db = np.array([20 * np.log10(np.sqrt(np.mean(x[k:k + h] ** 2)) + 1e-9) for k in range(0, len(x) - h, h)])
db = np.convolve(db, np.ones(5) / 5, 'same'); thr = np.percentile(db, 25) + 8
cuts = [0.0]; last = 0.0
for k in range(len(db) - 5):
    t = k * 0.01
    if t - last > a.chunk and db[k:k + 5].max() < thr: cuts.append(t); last = t
cuts.append(dur)
def rec(task, lang):
    return sherpa_onnx.OfflineRecognizer.from_whisper(encoder=M + 'small-encoder.int8.onnx', decoder=M + 'small-decoder.int8.onnx', tokens=M + 'small-tokens.txt', language=lang, task=task, num_threads=os.cpu_count() or 2)
R1 = rec('translate', a.lang); R2 = rec('transcribe', 'en')
segs = []
for s, e in zip(cuts[:-1], cuts[1:]):
    out = {}
    for name, R in (('meaning', R1), ('roman', R2)):
        st = R.create_stream(); st.accept_waveform(sr, x[int(s * sr):int(e * sr)]); R.decode_stream(st); out[name] = st.result.text.strip()
    segs.append({'start': round(s, 2), 'end': round(e, 2), **out}); print(f"{s:6.2f}-{e:6.2f} | {out['meaning']}")
json.dump({'duration': round(dur, 3), 'segments': segs}, open(a.out, 'w'), ensure_ascii=False, indent=1)
print('saved', a.out)
