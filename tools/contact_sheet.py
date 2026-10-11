"""Usage: python3 tools/contact_sheet.py <video> <out.jpg> [--every 1.0] [--cols 10] [--width 140]
Makes a thumbnail grid with timestamps so the agent (or you) can SEE the footage."""
import argparse, subprocess, json, os, tempfile
from PIL import Image, ImageDraw
ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('out')
ap.add_argument('--every', type=float, default=1.0); ap.add_argument('--cols', type=int, default=10); ap.add_argument('--width', type=int, default=140)
ap.add_argument('--times', type=str, default='', help='comma list of exact times instead of --every')
a = ap.parse_args()
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.video], capture_output=True, text=True).stdout)
ts = [float(x) for x in a.times.split(',')] if a.times else [round(i * a.every, 2) for i in range(int(dur / a.every) + 1) if i * a.every < dur]
ims = []
with tempfile.TemporaryDirectory() as d:
    for t in ts:
        p = os.path.join(d, 'f.png')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', a.video, '-frames:v', '1', '-vf', f'scale={a.width}:-2', p])
        if not os.path.exists(p): continue
        im = Image.open(p).convert('RGB'); ImageDraw.Draw(im).rectangle([0, 0, 52, 14], fill='black'); ImageDraw.Draw(im).text((2, 1), f'{t:.1f}s', fill='yellow')
        ims.append(im.copy()); os.remove(p)
w, h = ims[0].size; rows = (len(ims) + a.cols - 1) // a.cols
sheet = Image.new('RGB', (w * min(a.cols, len(ims)), h * rows))
for i, im in enumerate(ims): sheet.paste(im, ((i % a.cols) * w, (i // a.cols) * h))
sheet.save(a.out, quality=85); print(json.dumps({'out': a.out, 'frames': len(ims), 'duration': dur}))
