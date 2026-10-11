#!/usr/bin/env python3
"""Voice: clean (always) + optional cut.

  voice.py clean <in.wav|video> <out.wav>
      Keeps 100% of the voice (use when the creator says "voice cut mat karna").

  voice.py cut <in.wav|video> <keep.json> <out.wav>
      keep.json = [[start, end], ...] SOURCE seconds to keep, in order (choose from silences.json "speech",
      padded ~0.12 s before / ~0.22 s after, every boundary INSIDE a silence). Each piece gets 20 ms fades.
      Also writes <out>.map.json = [{src_in, src_out, out_from, out_to}] so the EDL shots can be aligned
      (for each piece add a shot with in=src_in, from=out_from, to=out_to).

Clean chain: high-pass 80 Hz, denoise, mud cut 250 Hz, presence +2.5 dB @3.5 kHz, de-ess, compressor, -15 LUFS.
"""
import sys, json, subprocess, numpy as np
from scipy.io import wavfile
SR = 48000
CHAIN = ('highpass=f=80,afftdn=nf=-25,equalizer=f=250:t=q:w=1.2:g=-2,equalizer=f=3500:t=q:w=1.5:g=2.5,'
         'deesser=i=0.25,acompressor=threshold=-22dB:ratio=3:attack=5:release=90:makeup=3,loudnorm=I=-15:TP=-1.5:LRA=7')

def read(src):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vn', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

def clean(src, out):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vn', '-ac', '1', '-ar', str(SR), '-af', CHAIN, out], check=True)

mode = sys.argv[1]
if mode == 'clean':
    clean(sys.argv[2], sys.argv[3]); print('clean voice ->', sys.argv[3])
elif mode == 'cut':
    src, keep, out = sys.argv[2], json.load(open(sys.argv[3])), sys.argv[4]
    x = read(src); fade = int(0.02 * SR); parts = []; mp = []; t = 0.0
    for a, b in keep:
        seg = x[int(a * SR):int(b * SR)].copy()
        n = min(fade, len(seg) // 2)
        seg[:n] *= np.linspace(0, 1, n); seg[-n:] *= np.linspace(1, 0, n)
        parts.append(seg); d = len(seg) / SR
        mp.append({'src_in': round(a, 3), 'src_out': round(b, 3), 'out_from': round(t, 3), 'out_to': round(t + d, 3)}); t += d
    tmp = out + '.raw.wav'
    wavfile.write(tmp, SR, (np.concatenate(parts) * 32767).astype(np.int16))
    clean(tmp, out); subprocess.run(['rm', '-f', tmp])
    json.dump(mp, open(out + '.map.json', 'w'), indent=1)
    print(f'cut voice -> {out}  ({t:.2f}s from {len(x)/SR:.2f}s)'); print(json.dumps(mp))
else:
    print(__doc__)
