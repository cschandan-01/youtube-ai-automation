"""Sound library: synthesized SFX + CC0 UI pack loader + music engine. Used by build_audio.py."""
import os, numpy as np, subprocess
from scipy.signal import butter, sosfilt, fftconvolve
SR = 48000
rng = np.random.default_rng(21)
KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UIS = os.environ.get('UISFX_DIR', os.path.join(KIT, 'sfx', 'node_modules', 'uisfx', 'sounds')) + '/'
def t_(d): return np.arange(int(SR * d)) / SR
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x, axis=0)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x, axis=0)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, min(hi, SR / 2 - 100)], 'band', fs=SR, output='sos'), x, axis=0)
def norm(x, p=0.9): return x / (np.max(np.abs(x)) + 1e-9) * p
def st(x, pan=0.0):
    if x.ndim == 2: return x
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return np.stack([x * l * 1.414, x * r * 1.414], 1)
def add(buf, sig, at, g=1.0, pan=0.0):
    sig = st(sig, pan); i = int(at * SR)
    if i < 0: sig = sig[-i:]; i = 0
    j = min(len(buf), i + len(sig))
    if j > i: buf[i:j] += sig[: j - i] * g
def env(n, a, d):
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    e[na:] = np.exp(-np.arange(n - na) / (d * SR)); return e
def mk_ir(dur, decay, lpf=5000):
    t = t_(dur); e = np.exp(-t / decay)
    l = lp(rng.standard_normal(len(t)) * e, lpf); r = lp(rng.standard_normal(len(t)) * e, lpf)
    return np.stack([l, r], 1) / np.sqrt(np.sum(l ** 2))
IR_ROOM = mk_ir(1.0, 0.25); IR_HALL = mk_ir(2.6, 0.8, 4500)
def verb(x, wet=0.25, ir=None):
    ir = IR_ROOM if ir is None else ir
    x = st(x)
    y = np.stack([fftconvolve(x[:, 0], ir[:, 0]), fftconvolve(x[:, 1], ir[:, 1])], 1)
    out = np.zeros_like(y); out[: len(x)] += x * (1 - wet); out += y * wet
    return out
def load(name, gain=1.0, speed=1.0):
    af = [] if speed == 1.0 else ['-af', f'asetrate={int(SR*speed)},aresample={SR}']
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', UIS + name + '.mp3', '-ac', '2', '-ar', str(SR)] + af + ['-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(float).reshape(-1, 2) / 32768 * gain

# ---------- designed sounds
def impact(big=True):
    d = 2.0 if big else 0.8; t = t_(d); f = (95 if big else 140) * np.exp(-t * 7) + 34
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * (1.7 if big else 5))
    body = lp(rng.standard_normal(len(t)), 900) * np.exp(-t * 10) * 0.7
    click = hp(rng.standard_normal(len(t)), 2000) * np.exp(-t * 80) * 0.6
    return verb(norm(np.tanh((sub * 1.2 + body + click) * 1.6), 0.95), 0.35 if big else 0.18, IR_HALL)
def glitch(d=0.35):
    t = t_(d); s = np.zeros(len(t))
    for _ in range(12):
        a = int(rng.uniform(0, d - 0.03) * SR); L = int(rng.uniform(0.01, 0.05) * SR); tt = np.arange(L) / SR
        L = min(L, len(s) - a); tt = tt[:L]; s[a:a + L] += np.sign(np.sin(2 * np.pi * rng.uniform(150, 3500) * tt)) * rng.uniform(0.3, 0.9)
    s += hp(rng.standard_normal(len(t)), 5000) * 0.2 * (rng.random(len(t)) > 0.6)
    return norm(lp(s, 9000), 0.7)
def thud():
    t = t_(0.25); f = 160 * np.exp(-t * 30) + 60
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 18) + hp(rng.standard_normal(len(t)), 3000) * np.exp(-t * 120) * 0.3, 0.8)
def air(d=0.5, bright=0.8):
    n = int(SR * d); no = rng.standard_normal(n); out = np.zeros(n); ch = 24
    for k in range(ch):
        a, b = k * n // ch, (k + 1) * n // ch; p = k / ch
        fc = 300 + 3200 * bright * np.sin(p * np.pi)
        out[a:b] = bp(no, fc * 0.6, fc * 1.5)[a:b]
    m = norm(out * np.sin(np.linspace(0, np.pi, n)) ** 2, 0.7)
    pan = np.linspace(-0.7, 0.7, n)
    return verb(np.stack([m * np.cos((pan + 1) * np.pi / 4) * 1.414, m * np.sin((pan + 1) * np.pi / 4) * 1.414], 1), 0.3)
def riser(d=1.0):
    t = t_(d); no = rng.standard_normal(len(t)); out = np.zeros(len(t)); ch = 32
    for k in range(ch):
        a, b = k * len(t) // ch, (k + 1) * len(t) // ch
        fc = 400 + 6000 * (k / ch) ** 2
        out[a:b] = bp(no, fc * 0.7, fc * 1.3)[a:b]
    f = 180 + 900 * (t / d) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.3
    s = (out + tone) * (t / d) ** 2.2
    s[-int(0.02 * SR):] *= np.linspace(1, 0, int(0.02 * SR))
    return verb(norm(s, 0.7), 0.3, IR_HALL)
def heartbeat():
    out = np.zeros((int(SR * 0.6), 2))
    for k, g in [(0, 1.0), (0.18, 0.7)]:
        t = t_(0.3); f = 60 * np.exp(-t * 10) + 40
        add(out, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14), k, g)
    return norm(out, 0.9)
def tick():
    t = t_(0.04); return hp(rng.standard_normal(len(t)), 3000) * np.exp(-t * 140) * 0.5 + np.sin(2 * np.pi * 2600 * t) * np.exp(-t * 110) * 0.3
def powerdown(d=0.7):
    t = t_(d); f = 900 * np.exp(-t * 6) + 30
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 - t / d) + lp(rng.standard_normal(len(t)), 2000) * np.exp(-t * 12) * 0.4
    return norm(s, 0.7)
def subdrop(d=1.2):
    t = t_(d); f = 70 * np.exp(-t * 2.5) + 28
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.4), 0.9)
def blip(f0):
    t = t_(0.08); return norm(np.sin(2 * np.pi * f0 * t) * env(len(t), 0.002, 0.02), 0.5)
def keys(times, style='mechanical/typing'):
    k = load(style)
    out = np.zeros((int(SR * (max(times) + 0.4)), 2))
    for tt in times: add(out, k * rng.uniform(0.6, 1.0), tt, 1.0, rng.uniform(-0.3, 0.3))
    return out


# ---------- music primitives
def note(m): return 440 * 2 ** ((m - 69) / 12)
CH = [[57, 60, 64], [53, 57, 60], [50, 53, 57], [52, 56, 59]]; ROOT = [33, 29, 26, 28]
def pulse_bass(f, d):
    t = t_(d); s = 2 * ((f * t) % 1) - 1
    return lp(s, 700) * env(len(t), 0.003, d * 0.5) * 0.35
def kick():
    t = t_(0.4); f = 120 * np.exp(-t * 30) + 45
    return np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8) * 1.8) * 0.8
def hat():
    t = t_(0.04); return hp(rng.standard_normal(len(t)), 8000) * np.exp(-t * 100) * 0.25
def clap():
    t = t_(0.25); return verb(bp(rng.standard_normal(len(t)), 1200, 7000) * np.exp(-t * 22) * 0.5, 0.3)
def pad(fs, d):
    t = t_(d); s = sum(np.sin(2 * np.pi * f * 2 ** (dt / 12) * t + rng.uniform(0, 6)) for f in fs for dt in (-0.08, 0.08))
    return lp(s, 1100) * np.minimum(1, t / 0.5) * np.minimum(1, (d - t) / 0.4) * 0.05
def arp(f):
    t = t_(0.18); s = sum(((-1) ** k) * np.sin(2 * np.pi * f * k * t) / k for k in range(1, 7))
    return lp(s, 3000) * env(len(t), 0.002, 0.05) * 0.14

