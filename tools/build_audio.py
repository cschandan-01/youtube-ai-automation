#!/usr/bin/env python3
"""Build music + SFX stems from the "audio" block of an edl.json.

usage: build_audio.py edl.json OUTDIR      -> OUTDIR/music.wav, OUTDIR/sfx.wav  (48 kHz stereo)

audio.sfx[]   : {"t": sec, "fx": NAME, "g": gain, ...args}
   fx names   : air(d,bright) riser(d) impact(big) thud glitch(d) heartbeat tick powerdown(d) subdrop(d)
                blip(f) keys(times[], style)  or  "ui:<pack/sound>" (CC0 uisfx pack, optional speed)
   optional   : "pan": -1..1
audio.music   : {"mood": tech|calm|upbeat|none, "bpm", "gain", "fadeOut",
                 "sections": [[from, to, type]], type = hook|pulse|lift|suspense|black|outro,
                 "dips": [[from, to, level]]  (manual volume dips, e.g. before a drop)}
"""
import sys, os, json, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from scipy.io import wavfile
import sfx_lib as L
from sfx_lib import SR, add, norm, t_, verb, IR_HALL

edl = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
DUR = float(edl['duration']); N = int(SR * DUR)
A = edl.get('audio', {})

# ------------------------------------------------ SFX
FX = {
    'air': lambda c: L.air(c.get('d', 0.5), c.get('bright', 0.8)),
    'whoosh': lambda c: L.air(c.get('d', 0.5), c.get('bright', 0.8)),
    'riser': lambda c: L.riser(c.get('d', 1.0)),
    'impact': lambda c: L.impact(c.get('big', True)),
    'thud': lambda c: L.thud(),
    'glitch': lambda c: L.glitch(c.get('d', 0.35)),
    'heartbeat': lambda c: L.heartbeat(),
    'tick': lambda c: L.tick(),
    'powerdown': lambda c: L.powerdown(c.get('d', 0.7)),
    'subdrop': lambda c: L.subdrop(c.get('d', 1.2)),
    'blip': lambda c: L.blip(c.get('f', 1200)),
    'keys': lambda c: L.keys(c.get('times', [0]), c.get('style', 'mechanical/typing')),
}
sfx = np.zeros((N + SR * 4, 2))
for c in A.get('sfx', []):
    name = c['fx']
    try:
        sig = L.load(name[3:], 1.0, c.get('speed', 1.0)) if name.startswith('ui:') else FX[name](c)
    except Exception as e:
        print('skip sfx', name, e); continue
    if sig.size == 0: print('missing sound', name); continue
    add(sfx, sig, c['t'], c.get('g', 0.3), c.get('pan', 0.0))
sfx = sfx[:N]
wavfile.write(f'{out}/sfx.wav', SR, (np.clip(norm(sfx, 0.9) if np.abs(sfx).max() > 0 else sfx, -1, 1) * 32767).astype(np.int16))

# ------------------------------------------------ music
M_ = A.get('music', {'mood': 'none'})
mood = M_.get('mood', 'tech')
M = np.zeros((N + SR * 4, 2)); pump = np.ones(N + SR * 4)
if mood != 'none':
    PROG = {  # chords (midi) + bass roots
        'tech':   ([[57, 60, 64], [53, 57, 60], [50, 53, 57], [52, 56, 59]], [33, 29, 26, 28]),   # Am F Dm E
        'calm':   ([[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]], [36, 33, 29, 31]),   # C Am F G
        'upbeat': ([[62, 66, 69], [59, 62, 66], [55, 59, 62], [57, 61, 64]], [38, 35, 31, 33]),   # D Bm G A
    }
    CH, ROOT = PROG.get(mood, PROG['tech'])
    beat = 60 / M_.get('bpm', {'tech': 100, 'calm': 80, 'upbeat': 118}.get(mood, 100))
    secs = M_.get('sections', [[0, DUR, 'pulse']])
    def sec(t):
        for a, b, s in secs:
            if a <= t < b: return s
        return 'black'
    drums_from = min([a for a, b, s in secs if s in ('pulse', 'lift')] or [DUR])
    for b in range(int(DUR / beat) + 1):
        tb = b * beat; s = sec(tb); bar = int(tb // (4 * beat)); pos = b % 4; ch = CH[bar % 4]
        if s == 'black': continue
        if pos == 0:
            add(M, L.pad([L.note(m) for m in ch], beat * 4 + 0.3), tb, 1.3 if s in ('suspense', 'outro', 'hook') else 1.0)
        if s == 'suspense' and pos in (0, 2):
            add(M, L.heartbeat(), tb, 0.35)
        if s in ('pulse', 'lift'):
            for h in range(4): add(M, L.pulse_bass(L.note(ROOT[bar % 4] + 12), beat / 4), tb + h * beat / 4, 0.9 if h == 0 else 0.6)
            if mood != 'calm':
                for h in range(2): add(M, L.arp(L.note(ch[(pos * 2 + h) % 3] + 12)), tb + h * beat / 2, 1.0, 0.4 * (-1) ** h)
            else:
                add(M, L.arp(L.note(ch[pos % 3] + 12)), tb, 0.8, 0.3 * (-1) ** pos)
            if tb >= drums_from + 0.01 or s == 'lift':
                if pos in (0, 2) or (mood == 'upbeat'):
                    add(M, L.kick(), tb, 0.9 if mood != 'calm' else 0.5); i = int(tb * SR); Lp = int(0.2 * SR)
                    if i + Lp < len(pump): pump[i:i + Lp] = np.minimum(pump[i:i + Lp], 0.5 + 0.5 * np.linspace(0, 1, Lp))
                if pos in (1, 3) and mood != 'calm': add(M, L.clap(), tb, 0.6)
            for h in range(4 if s == 'lift' else 2): add(M, L.hat(), tb + h * beat / (4 if s == 'lift' else 2), 1.0, -0.3)
        if s == 'outro' and pos == 0:
            add(M, L.arp(L.note(ch[0] + 24)), tb, 1.5)
    M = M[:N]; pump = pump[:N]
    M = verb(M, 0.25, IR_HALL)[:N] * pump[:, None]
    tt = np.arange(N) / SR; g = np.ones(N)
    for a, b, lv in M_.get('dips', []): g[(tt >= a) & (tt < b)] = lv
    M *= g[:, None]
    fo = int(M_.get('fadeOut', 1.2) * SR); M[-fo:] *= np.linspace(1, 0, fo)[:, None]
    M = norm(M, 0.85)
else:
    M = M[:N]
wavfile.write(f'{out}/music.wav', SR, (M * 32767).astype(np.int16))
print('audio stems ->', out, f'({len(A.get("sfx", []))} sfx, music={mood})')
