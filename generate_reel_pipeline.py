#!/usr/bin/env python3
"""
Dynamic High-Retention Reel & YouTube Shorts Automated Generator
Optimized for HIGH CPM US AUDIENCE (United States / Tier-1 Countries).
Features:
- Authentic American English Voiceover Synthesis (edge-tts en-US Neural voices)
- Real-time Finance & Wealth SaaS Interactive Dashboards (ZenBudget / WealthMatrix)
- Studio-grade Audio Ducking (American Voice + Electronic Beat + UI SFX)
- Zero-overlap layout hierarchy
- Complete YouTube Shorts SEO package with US-targeted tags, viral titles & descriptions.
"""

import os
import sys
import json
import random
import asyncio
import subprocess
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

import edge_tts

BASE_DIR = Path(__file__).parent.resolve()
WORK_DIR = BASE_DIR / "work"
OUT_DIR = BASE_DIR / "out"
REMOTION_DIR = BASE_DIR / "remotion"
TOOLS_DIR = BASE_DIR / "tools"

WORK_DIR.mkdir(exist_ok=True)
OUT_DIR.mkdir(exist_ok=True)

# -------------------------------------------------------------
# HIGH-CPM US FINANCE & TECH PRESETS
# -------------------------------------------------------------
US_TEMPLATES = [
    {
        "id": "us_subscription_trap",
        "category": "US Personal Finance & Smart Budgeting",
        "voice": "en-US-ChristopherNeural", # Deep, authoritative, confident American finance creator
        "script_speech": "Did you know the average American loses over three hundred dollars every single month on silent subscriptions they forgot about? ZenBudget AI automatically detects hidden recurring charges and lets you cancel them in one tap. Stop bleeding cash and automate your savings today.",
        "theme": {
            "accent": "#10b981", # Emerald Green (US Dollar / Wealth aesthetic)
            "accent2": "#38bdf8", # Electric Cyan
            "bg": "#030712",
            "serifAccent": False
        },
        "hook_small": "AMERICANS ARE LOSING $340/MO",
        "hook_big": "The Silent Subscription Trap",
        "hook_accent": "Subscription Trap",
        "ui_type": "zen_budget_app",
        "toast": {
            "title": "ZenBudget AI Alert",
            "amount": "-$340/mo Cancelled",
            "sub": "2 Unused Subscriptions Terminated"
        },
        "captions": [
            {"text": "The average American wastes $300+ monthly on silent subscriptions.", "hl": "wastes $300+ monthly"},
            {"text": "ZenBudget AI automatically tracks every stealth recurring charge...", "hl": "ZenBudget AI"},
            {"text": "And cancels wasteful auto-bills in just 1 single tap!", "hl": "1 single tap!"},
            {"text": "Stop bleeding money and grow your wealth on pure autopilot.", "hl": "pure autopilot."}
        ],
        "cta_question": "Want to fix your hidden leaks?",
        "cta_keyword": "LEAKS",
        "cta_dm": "Comment LEAKS for the free app!",
        "end_title": "Take Control Of Your Wealth",
        "end_accent": "Your Wealth",
        "end_sub": "Available on iOS & Web • @ZenBudgetTracker",
        "yt_title": "How to Stop Losing $340/Month on Subscriptions in the US 💸 | Smart Money Hack #Shorts",
        "yt_tags": [
            "personal finance", "budgeting tips", "money hacks", "save money fast", 
            "zenbudget", "subscription tracker", "financial freedom", "how to save money", 
            "smart money", "finance for beginners", "wealth building", "shorts", "viral finance"
        ]
    },
    {
        "id": "us_roth_ira_blueprint",
        "category": "US Investing & Net Worth Compounding",
        "voice": "en-US-GuyNeural", # Energetic, crisp, high-engagement American voice
        "script_speech": "Here is the exact blueprint to reach one million dollars tax free in the United States. Open a Roth IRA, automate two hundred dollars a month into an S and P 500 index fund, and let compound interest do the rest. The secret isn't timing the market, it is pure automation.",
        "theme": {
            "accent": "#c084fc", # Violet Neon
            "accent2": "#34d399", # Emerald Neon
            "bg": "#060312",
            "serifAccent": True
        },
        "hook_small": "THE TAX-FREE RETIREMENT RULE",
        "hook_big": "Retire A Millionaire With $200/Mo",
        "hook_accent": "With $200/Mo",
        "ui_type": "portfolio_app",
        "toast": {
            "title": "Roth IRA Compounding",
            "amount": "+$1,240,000",
            "sub": "30-Yr Tax-Free Compound Estimate"
        },
        "captions": [
            {"text": "The fastest path to $1,000,000 tax-free in the United States...", "hl": "$1,000,000 tax-free"},
            {"text": "Is automating $200/mo into an S&P 500 index fund inside a Roth IRA.", "hl": "S&P 500 index fund"},
            {"text": "Compound interest does the heavy lifting while you sleep.", "hl": "Compound interest"},
            {"text": "The secret isn't timing the market. It's automated consistency.", "hl": "automated consistency."}
        ],
        "cta_question": "Ready to build tax-free wealth?",
        "cta_keyword": "WEALTH",
        "cta_dm": "Comment WEALTH for the full blueprint!",
        "end_title": "Automate Your Financial Future",
        "end_accent": "Financial Future",
        "end_sub": "Link in Bio • @WealthMatrixUS",
        "yt_title": "How to Retire a Millionaire with $200/Month in America 📈 #RothIRA #Investing #Shorts",
        "yt_tags": [
            "roth ira", "investing for beginners", "compound interest", "how to become a millionaire",
            "index funds", "s&p 500", "personal finance us", "retirement planning", "wealth building",
            "financial independence", "fire movement", "shorts"
        ]
    },
    {
        "id": "us_credit_score_hack",
        "category": "US Credit Card & FICO Score Optimization",
        "voice": "en-US-ChristopherNeural",
        "script_speech": "If your credit score is below 750, this simple hack can boost it in less than 30 days. Lower your credit utilization below 10 percent before your statement closing date, not your payment due date. Automate this rule and watch your score skyrocket.",
        "theme": {
            "accent": "#38bdf8", # Sky Blue
            "accent2": "#10b981", # Emerald
            "bg": "#030712",
            "serifAccent": False
        },
        "hook_small": "THE 30-DAY FICO HACK",
        "hook_big": "Boost Credit Score 50+ Points Fast",
        "hook_accent": "50+ Points Fast",
        "ui_type": "zen_budget_app",
        "toast": {
            "title": "FICO Score Update",
            "amount": "+54 Points (792)",
            "sub": "Utilization Dropped to 6%"
        },
        "captions": [
            {"text": "If your credit score is below 750, here is the 30-day secret.", "hl": "the 30-day secret."},
            {"text": "Pay your balance before the STATEMENT date, not the due date.", "hl": "STATEMENT date"},
            {"text": "This drops your credit utilization below 10% instantly.", "hl": "utilization below 10%"},
            {"text": "Automate this rule with ZenBudget and unlock tier-1 rates.", "hl": "unlock tier-1 rates."}
        ],
        "cta_question": "Want the credit boost checklist?",
        "cta_keyword": "CREDIT",
        "cta_dm": "Comment CREDIT for the free checklist!",
        "end_title": "Unlock Tier-1 Credit Power",
        "end_accent": "Tier-1 Credit",
        "end_sub": "Free Guide in Bio • @ZenBudgetTracker",
        "yt_title": "How to Boost Your Credit Score 50+ Points in 30 Days 💳 #CreditScore #Shorts",
        "yt_tags": [
            "credit score hacks", "boost credit score", "fico score", "credit card hacks", 
            "personal finance", "how to build credit", "credit utilization", "financial freedom", 
            "money tips", "shorts", "american finance"
        ]
    }
]

async def synthesize_us_voiceover(text, voice, out_file):
    """Synthesizes high-fidelity American English voiceover via Edge-TTS."""
    print(f"🎙️ Generating US Voiceover with {voice}...")
    communicate = edge_tts.Communicate(text, voice, rate="+6%") # slightly punchy pace for US Shorts retention
    await communicate.save(str(out_file))
    print(f"✓ Voiceover saved at: {out_file}")

def build_edl(preset, reel_id):
    """Creates a strictly non-overlapping EDL schedule."""
    duration = 15.0
    layers = []

    # 1. Hook Headline (0.0s - 3.2s) -> Safe Top Zone (y: 160)
    layers.append({
        "type": "big",
        "from": 0.0,
        "to": 3.2,
        "small": preset["hook_small"],
        "big": preset["hook_big"],
        "accent": preset["hook_accent"],
        "y": 160,
        "scrim": False
    })

    # 2. Main Interactive SaaS UI showcase (1.8s - 12.2s) -> Safe Center Zone (y: 400)
    layers.append({
        "type": preset["ui_type"],
        "from": 1.8,
        "to": 12.2,
        "y": 400
    })

    # 3. Toast popup (3.5s - 6.8s) -> Top Right (y: 140)
    if "toast" in preset:
        layers.append({
            "type": "saas_toast",
            "from": 3.5,
            "to": 6.8,
            "title": preset["toast"]["title"],
            "amount": preset["toast"]["amount"],
            "sub": preset["toast"]["sub"],
            "y": 140
        })

    # 4. Word-by-word Subtitles (Synchronized, Non-overlapping, Bottom Zone y: 1380)
    cap_timings = [
        (0.4, 3.4),
        (3.5, 6.6),
        (6.7, 9.6),
        (9.7, 12.2)
    ]
    for i, cap in enumerate(preset["captions"]):
        start, end = cap_timings[i]
        layers.append({
            "type": "sub",
            "from": start,
            "to": end,
            "text": cap["text"],
            "hl": cap["hl"],
            "y": 1380
        })

    # 5. Call To Action (12.2s - 14.2s) -> Center Action Zone
    layers.append({
        "type": "cta",
        "from": 12.2,
        "to": 14.2,
        "question": preset["cta_question"],
        "keyword": preset["cta_keyword"],
        "typeAt": 0.3,
        "dm": preset["cta_dm"]
    })

    # 6. End Screen Branding (14.2s - 15.0s)
    layers.append({
        "type": "end",
        "from": 14.2,
        "to": 15.0,
        "title": preset["end_title"],
        "accent": preset["end_accent"],
        "sub": preset["end_sub"]
    })

    edl_data = {
        "duration": duration,
        "theme": preset["theme"],
        "layers": layers
    }

    edl_path = WORK_DIR / reel_id / "edl.json"
    edl_path.parent.mkdir(parents=True, exist_ok=True)
    with open(edl_path, "w", encoding="utf-8") as f:
        json.dump(edl_data, f, indent=2)

    return edl_path

def build_audio(reel_id, edl_path):
    """Generates synthetic high-energy music & SFX stems."""
    print(f"🎵 Synthesizing Background Music & SFX Stems for {reel_id}...")
    audio_tool = TOOLS_DIR / "build_audio.py"
    out_dir = WORK_DIR / reel_id
    cmd = [sys.executable, str(audio_tool), str(edl_path), str(out_dir)]
    subprocess.run(cmd, check=True, cwd=str(BASE_DIR))

def render_remotion_video(reel_id, edl_path):
    """Renders Remotion composition to video using local Chrome."""
    print(f"🎬 Rendering Ultra-HD Remotion Composition for {reel_id}...")
    raw_video = OUT_DIR / f"{reel_id}_raw.mp4"
    if raw_video.exists():
        raw_video.unlink()

    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    
    cmd = [
        "npx.cmd", "remotion", "render",
        "src/index.tsx", "Reel",
        str(raw_video),
        f"--props={edl_path}",
        f"--browser-executable={chrome_path}",
        "--gl=angle",
        "--concurrency=4"
    ]
    subprocess.run(cmd, check=True, cwd=str(REMOTION_DIR), shell=True)
    return raw_video

def mux_final_master_with_voice(reel_id, raw_video, voice_mp3):
    """Muxes raw video with US Voiceover, Synth Music and SFX stems using studio-level ducking."""
    print(f"🎛️ Mastering Studio Audio Mix (Voice + Beat + SFX) for {reel_id}...")
    music_file = WORK_DIR / reel_id / "music.wav"
    sfx_file = WORK_DIR / reel_id / "sfx.wav"
    master_video = OUT_DIR / f"{reel_id}_master.mp4"

    if master_video.exists():
        master_video.unlink()

    ffmpeg_bin = r"C:\Users\MyPC\.gemini\antigravity-ide\scratch\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
    if not Path(ffmpeg_bin).exists():
        ffmpeg_bin = "ffmpeg"

    # Perfect sound balance: Voice at 1.25 (punchy & clear), Music ducked at 0.16, SFX crisp at 0.35
    filter_complex = "[1:a]volume=0.16[m]; [2:a]volume=0.35[s]; [3:a]volume=1.25[v]; [v][m][s]amix=inputs=3:duration=first:dropout_transition=2"

    cmd = [
        ffmpeg_bin, "-y",
        "-i", str(raw_video),
        "-i", str(music_file),
        "-i", str(sfx_file),
        "-i", str(voice_mp3),
        "-filter_complex", filter_complex,
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        str(master_video)
    ]
    subprocess.run(cmd, check=True)
    return master_video

def generate_us_youtube_publishing_package(reel_id, preset, master_video_path):
    """Generates complete YouTube Shorts SEO and upload metadata package for US audience."""
    tags_str = ", ".join(preset["yt_tags"])
    hashtags_str = " ".join([f"#{t.replace(' ', '')}" for t in preset["yt_tags"][:7]])

    description = f"""{preset["yt_title"]}

🔥 In this video:
- {preset["captions"][0]["text"]}
- {preset["captions"][1]["text"]}
- {preset["captions"][2]["text"]}

👇 ACCESS THE SMART TOOL / APP:
Check the pinned comment below or visit the bio link!

========================================
💰 TARGET AUDIENCE: United States Personal Finance & Wealth Building
📌 TAGS & KEYWORDS:
{hashtags_str}

#Shorts #PersonalFinance #MoneyHacks #ZenBudget #Investing #RothIRA #SaveMoney #USAFinance
"""

    metadata = {
        "title": preset["yt_title"],
        "description": description.strip(),
        "tags": preset["yt_tags"],
        "category_id": "27", # Education / Personal Finance
        "target_region": "US",
        "monetization_tier": "High CPM ($25-$45+)",
        "privacy": "public",
        "video_file": str(master_video_path.resolve())
    }

    meta_json_path = OUT_DIR / f"{reel_id}_youtube_metadata.json"
    with open(meta_json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    txt_path = OUT_DIR / f"{reel_id}_YOUTUBE_US_READY.txt"
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write("="*75 + "\n")
        f.write(f"🇺🇸 HIGH-CPM US YOUTUBE SHORTS PUBLISHING PACKAGE: {reel_id}\n")
        f.write("="*75 + "\n\n")
        f.write(f"🎥 FINAL MASTER VIDEO FILE:\n{master_video_path.resolve()}\n\n")
        f.write(f"🏷️ VIRAL TITLE (Copy & Paste as YouTube Shorts Title):\n{preset['yt_title']}\n\n")
        f.write(f"📝 DESCRIPTION (Copy & Paste):\n{description}\n\n")
        f.write(f"🔑 TAGS (Paste in YouTube Studio Tags):\n{tags_str}\n\n")
        f.write(f"💬 PINNED COMMENT (Pin this immediately after uploading):\nComment '{preset['cta_keyword']}' below and I'll send you the direct access link! 👇🔥\n\n")
        f.write("💡 MONETIZATION TIP:\nTargeting US audience with these finance keywords yields 5x-10x higher RPM ($15-$40 per 1k views) compared to general entertainment.\n")
        f.write("="*75 + "\n")

    print(f"📋 US YouTube Publishing Package generated at: {txt_path}")
    return txt_path

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Generate High-CPM US Audience YouTube Shorts")
    parser.add_argument("--preset", choices=["us_subscription", "us_roth_ira", "us_credit_score", "random"], default="us_subscription", help="Choose US Finance template")
    parser.add_argument("--reel_id", default=None, help="Custom reel ID")
    args = parser.parse_args()

    if args.preset == "us_subscription":
        chosen_preset = US_TEMPLATES[0]
    elif args.preset == "us_roth_ira":
        chosen_preset = US_TEMPLATES[1]
    elif args.preset == "us_credit_score":
        chosen_preset = US_TEMPLATES[2]
    else:
        chosen_preset = random.choice(US_TEMPLATES)

    reel_id = args.reel_id or f"reel_{chosen_preset['id']}"
    print(f"\n=================================================================")
    print(f"🇺🇸 GENERATING US AUDIENCE REEL: {reel_id}")
    print(f"📈 Niche: {chosen_preset['category']}")
    print(f"🎙️ American Voice: {chosen_preset['voice']}")
    print(f"=================================================================\n")

    # 1. Synthesize American English Voiceover
    voice_mp3 = WORK_DIR / reel_id / "voice.mp3"
    voice_mp3.parent.mkdir(parents=True, exist_ok=True)
    asyncio.run(synthesize_us_voiceover(chosen_preset["script_speech"], chosen_preset["voice"], voice_mp3))

    # 2. Build EDL
    edl_path = build_edl(chosen_preset, reel_id)

    # 3. Build Audio Music & SFX Stems
    build_audio(reel_id, edl_path)

    # 4. Render Remotion Video
    raw_video = render_remotion_video(reel_id, edl_path)

    # 5. Mux Audio & Video with US Voiceover Ducking
    master_video = mux_final_master_with_voice(reel_id, raw_video, voice_mp3)

    # 6. Generate US YouTube Publishing Package
    txt_pkg = generate_us_youtube_publishing_package(reel_id, chosen_preset, master_video)

    print(f"\n✨ SUCCESS! US Master Video: {master_video}")
    print(f"✨ US YouTube Package Ready: {txt_pkg}\n")

if __name__ == "__main__":
    main()
