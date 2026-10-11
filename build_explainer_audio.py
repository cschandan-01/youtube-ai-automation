#!/usr/bin/env python3
"""
Synthesize documentary-style ambient synth score and mix with voiceover
for the 4-minute long-form explainer video.
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
DUR = 250.44
N = int(SR * DUR)

WORK_DIR = Path("C:/Users/MyPC/.gemini/antigravity-ide/scratch/video-agent-kit/video-agent-kit/work/longform_explainer")
WORK_DIR.mkdir(parents=True, exist_ok=True)

def generate_ambient_score():
    print("🎹 Synthesizing 4-minute documentary ambient synth score...")
    t = np.linspace(0, DUR, N, endpoint=False)
    
    # 1. Warm Analog Low Drone (48 Hz / 96 Hz subtle root)
    drone = 0.15 * np.sin(2 * np.pi * 48 * t) + 0.10 * np.sin(2 * np.pi * 96 * t)
    
    # 2. Ambient Harmonic Arpeggio / Chord swells (slow modulation)
    mod = 0.5 + 0.5 * np.sin(2 * np.pi * 0.12 * t)
    pad = 0.08 * np.sin(2 * np.pi * 192 * t) * mod + 0.06 * np.sin(2 * np.pi * 288 * t) * (1 - mod)
    
    # 3. Subtle Deep Heartbeat Kicks every 2.4 seconds
    kick_period = int(SR * 2.4)
    kick = np.zeros(N)
    decay = np.exp(-np.linspace(0, 10, int(SR * 0.35)))
    kick_pulse = 0.25 * np.sin(2 * np.pi * 55 * np.linspace(0, 0.35, len(decay))) * decay
    for start in range(0, N - len(kick_pulse), kick_period):
        kick[start:start+len(kick_pulse)] += kick_pulse

    # 4. Digital Shimmer (High subtle sparkles)
    shimmer = 0.03 * np.sin(2 * np.pi * 880 * t) * np.sin(2 * np.pi * 0.05 * t)
    
    score = drone + pad + kick + shimmer
    
    # Soft Limiter
    score = np.clip(score, -0.9, 0.9)
    
    score_wav = WORK_DIR / "score.wav"
    wavfile.write(str(score_wav), SR, (score * 32767).astype(np.int16))
    print(f"✓ Ambient score saved at: {score_wav}")
    return score_wav

def main():
    score_wav = generate_ambient_score()
    voice_mp3 = WORK_DIR / "voice.mp3"
    master_audio = WORK_DIR / "master_audio.wav"
    
    print("🎛️ Mastering documentary audio track with voiceover ducking...")
    # Voice at 1.25, Ambient Score at 0.18
    filter_complex = "[0:a]volume=0.18[m]; [1:a]volume=1.25[v]; [v][m]amix=inputs=2:duration=first:dropout_transition=2"
    
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
