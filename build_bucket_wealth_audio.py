#!/usr/bin/env python3
"""
Synthesize documentary ambient score with risers and tactile clicks,
mixed with 3.44-minute voiceover for "The 50/30/20 Rule Is Broken".
"""
import os
import sys
import numpy as np
from scipy.io import wavfile
import subprocess
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

SR = 48000
DUR = 206.11
N = int(SR * DUR)

WORK_DIR = Path("C:/Users/MyPC/.gemini/antigravity-ide/scratch/video-agent-kit/video-agent-kit/work/bucket_wealth")
WORK_DIR.mkdir(parents=True, exist_ok=True)

def generate_score_with_risers():
    print("🎹 Synthesizing ambient score with transitional risers...")
    t = np.linspace(0, DUR, N, endpoint=False)

    # 1. Warm Analog Low Drone (52 Hz & 104 Hz)
    drone = 0.14 * np.sin(2 * np.pi * 52 * t) + 0.09 * np.sin(2 * np.pi * 104 * t)

    # 2. Ambient Harmonic Arpeggio / Pad swells
    mod = 0.5 + 0.5 * np.sin(2 * np.pi * 0.15 * t)
    pad = 0.08 * np.sin(2 * np.pi * 208 * t) * mod + 0.06 * np.sin(2 * np.pi * 312 * t) * (1 - mod)

    # 3. Heartbeat kicks every 2.4 seconds
    kick_period = int(SR * 2.4)
    kick = np.zeros(N)
    decay = np.exp(-np.linspace(0, 10, int(SR * 0.35)))
    kick_pulse = 0.22 * np.sin(2 * np.pi * 55 * np.linspace(0, 0.35, len(decay))) * decay
    for start in range(0, N - len(kick_pulse), kick_period):
        kick[start:start+len(kick_pulse)] += kick_pulse

    # 4. Cinematic Riser Sweeps at Chapter Transitions (~35s, ~75s, ~115s, ~155s)
    riser = np.zeros(N)
    transition_times = [35.0, 75.0, 115.0, 155.0]
    for tr in transition_times:
        start_idx = int((tr - 2.5) * SR)
        dur_samples = int(2.5 * SR)
        if start_idx >= 0 and start_idx + dur_samples < N:
            t_rise = np.linspace(0, 1, dur_samples)
            # Exponential pitch rise from 150 Hz to 900 Hz
            freq_sweep = 150 + 750 * (t_rise ** 2)
            phase = 2 * np.pi * np.cumsum(freq_sweep) / SR
            rise_envelope = (t_rise ** 2) * 0.20
            riser[start_idx:start_idx+dur_samples] += np.sin(phase) * rise_envelope

    score = drone + pad + kick + riser
    score = np.clip(score, -0.9, 0.9)

    score_wav = WORK_DIR / "score.wav"
    wavfile.write(str(score_wav), SR, (score * 32767).astype(np.int16))
    print(f"✓ Score with risers saved at: {score_wav}")
    return score_wav

def main():
    score_wav = generate_score_with_risers()
    voice_mp3 = WORK_DIR / "voice.mp3"
    master_audio = WORK_DIR / "master_audio.wav"

    print("🎛️ Mastering documentary audio track with voiceover ducking...")
    filter_complex = "[0:a]volume=0.17[m]; [1:a]volume=1.25[v]; [v][m]amix=inputs=2:duration=first:dropout_transition=2"

    ffmpeg_bin = r"C:\Users\MyPC\.gemini\antigravity-ide\scratch\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
    if not Path(ffmpeg_bin).exists():
        ffmpeg_bin = "ffmpeg"

    cmd = [
        ffmpeg_bin, "-y",
        "-i", str(score_wav),
        "-i", str(voice_mp3),
        "-filter_complex", filter_complex,
        str(master_audio)
    ]
    subprocess.run(cmd, check=True)
    print(f"✓ Master Audio Track ready at: {master_audio}")

if __name__ == "__main__":
    main()
