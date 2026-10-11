"""Usage: python3 tools/silences.py <audio_or_video> [--min 0.25] [--out silences.json]
Finds silences (safe cut points) and speech islands. Cut ONLY inside silences."""
import argparse, json, subprocess, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('--min', type=float, default=0.25); ap.add_argument('--out', default='silences.json')
ap.add_argument('--offset_db', type=float, default=10.0)
a = ap.parse_args()
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.src, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, np.int16).astype(float) / 32768; dur = len(x) / 16000
h = 160; db = np.array([20 * np.log10(np.sqrt(np.mean(x[k:k + h] ** 2)) + 1e-9) for k in range(0, len(x) - h, h)])
db = np.convolve(db, np.ones(5) / 5, 'same'); thr = np.percentile(db, 25) + a.offset_db
sil = db < thr; runs = []; i = 0
while i < len(sil):
    if sil[i]:
        j = i
        while j < len(sil) and sil[j]: j += 1
        if (j - i) * 0.01 >= a.min: runs.append([round(i * 0.01, 2), round(j * 0.01, 2)])
        i = j
    else: i += 1
speech = []; t = 0.0
for s, e in runs:
    if s - t > 0.05: speech.append([round(t, 2), s])
    t = e
if dur - t > 0.05: speech.append([round(t, 2), round(dur, 2)])
json.dump({'duration': round(dur, 3), 'threshold_db': round(float(thr), 1), 'silences': runs, 'speech': speech}, open(a.out, 'w'), indent=1)
print('silences:', runs); print('speech:', speech)
