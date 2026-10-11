#!/usr/bin/env python3
"""
1-Click YouTube Shorts Publisher & Uploader Helper
Opens YouTube Studio in your default logged-in browser, copies the video file and metadata to clipboard,
and prints the exact Title, Description, and Tags ready for instant paste.
"""

import os
import sys
import json
import webbrowser
import subprocess
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

BASE_DIR = Path(__file__).parent.resolve()
OUT_DIR = BASE_DIR / "out"

def main():
    # Find latest generated master video
    master_videos = list(OUT_DIR.glob("*_master.mp4"))
    if not master_videos:
        print("❌ No master video found in out/ directory. Run generate_reel_pipeline.py first.")
        return

    # Sort by modification time
    master_video = max(master_videos, key=os.path.getmtime)
    reel_stem = master_video.stem.replace("_master", "")
    
    # Check for metadata
    txt_meta = OUT_DIR / "psychology_of_money_YOUTUBE_READY.txt"
    if not txt_meta.exists():
        txt_meta = OUT_DIR / f"{reel_stem}_YOUTUBE_US_READY.txt"
    if not txt_meta.exists():
        txt_meta = OUT_DIR / f"{reel_stem}_YOUTUBE_UPLOAD_READY.txt"

    print("\n" + "="*70)
    print("🚀 LAUNCHING 1-CLICK YOUTUBE SHORTS PUBLISHING ASSISTANT")
    print("="*70)
    print(f"\n🎥 Target Video: {master_video}")

    if txt_meta.exists():
        print(f"📋 Metadata Package: {txt_meta}\n")
        with open(txt_meta, "r", encoding="utf-8") as f:
            print(f.read())
    else:
        print("⚠️ No metadata file found.")

    # Copy video path to clipboard using PowerShell
    try:
        abs_path = str(master_video.resolve())
        subprocess.run(["powershell", "-Command", f"Set-Clipboard -Value '{abs_path}'"], check=True)
        print(f"\n📋 [SUCCESS] Video file path has been COPIED to your clipboard!")
    except Exception as e:
        print(f"Clipboard notice: {e}")

    # Open default browser to YouTube Studio Upload page
    upload_url = "https://studio.youtube.com/channel/upload?d=pt"
    print(f"\n🌐 Opening YouTube Studio in your default browser: {upload_url}")
    webbrowser.open(upload_url)

    # Open the folder with the video highlighted
    try:
        subprocess.run(["explorer", f"/select,{master_video.resolve()}"])
    except Exception:
        pass

    print("\n✅ Browser opened! Just drag & drop the selected video, paste Title & Description, and click Publish!\n")

if __name__ == "__main__":
    main()
