"""Usage: python3 tools/jitter.py <video>  -> shake score (lower = steadier). Compare before/after stabilization."""
import sys, subprocess, re, numpy as np, tempfile, os
f = sys.argv[1]; trf = tempfile.mktemp(suffix='.trf')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f, '-vf', f'vidstabdetect=shakiness=8:result={trf}', '-f', 'null', '-'])
m = []
for line in open(trf):
    ms = re.findall(r'LM (-?\d+) (-?\d+)', line)
    if ms: a = np.array([[int(x), int(y)] for x, y in ms]); m.append(np.median(a, axis=0))
os.remove(trf); m = np.array(m)
ma = np.array([np.convolve(m[:, i], np.ones(9) / 9, 'same') for i in range(2)]).T
print(round(float(np.mean(np.abs(m - ma))), 2))
