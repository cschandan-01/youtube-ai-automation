#!/usr/bin/env python3
"""
Render 1920x1080 4-Minute Animated Explainer Video using Remotion,
Mux with mastered audio, and create complete YouTube SEO package.
"""
import os
import sys
import json
import subprocess
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

BASE_DIR = Path(__file__).parent.resolve()
REMOTION_DIR = BASE_DIR / "remotion"
WORK_DIR = BASE_DIR / "work" / "longform_explainer"
OUT_DIR = BASE_DIR / "out"

OUT_DIR.mkdir(exist_ok=True)

def render_remotion():
    print("🎬 Rendering 1920x1080 4-Minute Animated Explainer with Remotion...")
    raw_video = OUT_DIR / "psychology_of_money_raw.mp4"
    if raw_video.exists():
        raw_video.unlink()

    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    
    cmd = [
        "npx.cmd", "remotion", "render",
        "src/index.tsx", "Explainer16x9",
        str(raw_video),
        f"--browser-executable={chrome_path}",
        "--gl=angle",
        "--concurrency=4"
    ]
    subprocess.run(cmd, check=True, cwd=str(REMOTION_DIR), shell=True)
    return raw_video

def mux_final(raw_video):
    print("🎛️ Muxing High-Bitrate Video & Master Audio...")
    master_audio = WORK_DIR / "master_audio.wav"
    final_video = OUT_DIR / "psychology_of_money_explainer_master.mp4"
    
    if final_video.exists():
        final_video.unlink()

    ffmpeg_bin = r"C:\Users\MyPC\.gemini\antigravity-ide\scratch\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
    if not Path(ffmpeg_bin).exists():
        ffmpeg_bin = "ffmpeg"

    cmd = [
        ffmpeg_bin, "-y",
        "-i", str(raw_video),
        "-i", str(master_audio),
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "256k",
        str(final_video)
    ]
    subprocess.run(cmd, check=True)
    print(f"✓ Master Video created at: {final_video}")
    return final_video

def generate_youtube_seo(final_video):
    title = "Why You Can't Stop Spending Money (Even When You Want to Save) 🧠💸"
    description = """Why do we keep spending money, even when we promised ourselves that this month would be different?

In this documentary explainer, we break down the behavioral neuroscience and evolutionary psychology behind overspending, the hidden friction traps engineered by modern fintech, and the 3-step automated firewall that top 10% wealth builders use to break free on autopilot.

⏱️ CHAPTER TIMESTAMPS:
0:00 - The Chemical High of Spending (The Dopamine Loop)
0:41 - The MIT Experiment: The Death of The Pain of Paying
1:26 - Present Bias: Why You Treat Future You Like a Stranger
2:11 - Lifestyle Creep: The Silent Micro-Leak Drain
2:53 - The 3-Step Automated Financial Firewall (Friction Inversion)
3:36 - Exponential Compounding: Stop Fighting Willpower

📌 KEY TAKEAWAYS:
1. Dopamine is anticipation, not satisfaction.
2. Digital tap-to-pay suppresses your brain's insula pain center.
3. Invert friction: Make bad spending hard, make investing automated.

#PsychologyOfMoney #PersonalFinance #BehavioralEconomics #Investing #WealthBuilding #SaveMoney #MoneyMindset #Education
"""
    tags = [
        "psychology of money", "why you cant stop spending", "behavioral economics", 
        "personal finance", "how to save money", "money mindset", "dopamine and spending", 
        "lifestyle creep", "pain of paying", "automated investing", "financial freedom", 
        "investing for beginners", "wealth building"
    ]

    txt_pkg = OUT_DIR / "psychology_of_money_YOUTUBE_READY.txt"
    with open(txt_pkg, "w", encoding="utf-8") as f:
        f.write("="*75 + "\n")
        f.write("🚀 YOUTUBE LONG-FORM 16:9 PUBLISHING PACKAGE\n")
        f.write("="*75 + "\n\n")
        f.write(f"🎥 MASTER VIDEO FILE:\n{final_video.resolve()}\n\n")
        f.write(f"🏷️ VIDEO TITLE (Copy & Paste):\n{title}\n\n")
        f.write(f"📝 DESCRIPTION (With Chapters & Timestamps):\n{description}\n\n")
        f.write(f"🔑 TAGS:\n{', '.join(tags)}\n\n")
        f.write("💬 PINNED COMMENT:\nWhich of these 3 psychological traps resonated most with you? Let us know in the comments below! 👇🔥\n\n")
        f.write("="*75 + "\n")

    print(f"✓ YouTube SEO Package saved at: {txt_pkg}")
    return txt_pkg

def main():
    raw_video = render_remotion()
    final_video = mux_final(raw_video)
    txt_pkg = generate_youtube_seo(final_video)
    print("\n🎉 ALL DONE! Long-form animated explainer ready!")
    print(f"Video: {final_video}")
    print(f"Publishing Package: {txt_pkg}\n")

if __name__ == "__main__":
    main()
