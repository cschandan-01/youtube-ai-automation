#!/usr/bin/env python3
"""
Generate 3.5-minute master narration voiceover for:
"The 50/30/20 Rule Is Broken: The 3-Bucket Wealth Engine"
Pure Educational Value, High-Retention Audience-Grab, Zero Hard-Sell Promo.
"""
import sys
import asyncio
import edge_tts
from pathlib import Path
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

SCRIPT_TEXT = """For the past twenty years, every finance guru, bank, and blog has given you the exact same piece of advice: Just follow the 50/30/20 rule.

Fifty percent for your needs, thirty percent for your wants, and twenty percent for your savings.

It sounds simple. It sounds logical. But here is the brutal reality that nobody wants to admit: The 50/30/20 rule is completely broken for modern living.

In fact, behavioral studies show that over ninety-two percent of people who attempt percentage-based budgeting abandon it within the first ninety days. 

Why? Because percentage budgeting forces you into constant micro-tracking. It turns your daily life into an agonizing spreadsheet of guilt, where every cup of coffee feels like a failure of willpower. 

Worse, in today's economy with skyrocketing housing, student loans, and silent subscription creep, fixed expenses in major cities easily consume sixty-five to seventy percent of take-home pay. Trying to force real life into an arbitrary fifty percent box doesn't build wealth—it creates burnout.

So what do the top one percent do instead? 

They don't track every dollar. They don't use complex spreadsheets. Instead, they operate on a behavioral framework called The 3-Bucket Wealth Engine.

Here is how it actually works.

Bucket Number One is The Flow Hub.

This is your primary checking account, but with one critical rule: No savings ever live here. The Flow Hub exists purely as a transaction transit station. Your income direct-deposits here on Day One, and within twenty-four hours, automated recurring rules empty out everything except your baseline fixed bills. 

Because your checking account never holds excess cash, the psychological urge to overspend vanishes. What you don't see, you don't spend.

This brings us to Bucket Number Two: The Wealth Firewall.

This is the engine of financial freedom. Before you ever pay rent, before you buy groceries, and long before you go out for dinner, a predetermined fixed amount is automatically swept out of your Flow Hub into diversified, low-cost index funds and high-yield compound vaults. 

Notice the difference: Traditional budgeting tells you to save whatever is left over at the end of the month. But there is never anything left over. The Wealth Firewall flips the equation. You pay your future self first, automatically, on day one. Your wealth compounds silently in the background while you sleep.

Finally, Bucket Number Three: The Guilt-Free Vault.

Whatever cash remains in your designated spending account is entirely yours to spend with zero restrictions and zero shame. Want to travel? Want to dine out? Go for it. Because your wealth firewall has already been funded and your bills are already scheduled, every dollar in this bucket has zero guilt attached to it.

Notice what happened: You didn't count calories. You didn't log fifteen receipts into an app every week. You eliminated willpower and replaced it with automated financial architecture.

Stop trying to force your life into broken, outdated budgeting rules. Build a system that works with human psychology, automate your buckets, and let compound growth build your freedom."""

WORK_DIR = Path("C:/Users/MyPC/.gemini/antigravity-ide/scratch/video-agent-kit/video-agent-kit/work/bucket_wealth")
WORK_DIR.mkdir(parents=True, exist_ok=True)

async def main():
    voice = "en-US-ChristopherNeural"
    voice_mp3 = WORK_DIR / "voice.mp3"
    print(f"🎙️ Generating High-Retention Voiceover with {voice}...")
    communicate = edge_tts.Communicate(SCRIPT_TEXT, voice, rate="+2%")
    await communicate.save(str(voice_mp3))
    print(f"✓ Voiceover saved at: {voice_mp3}")

    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(voice_mp3)]
    dur = float(subprocess.check_output(cmd).decode().strip())
    print(f"⏱️ Audio Duration: {dur:.2f} seconds ({dur/60:.2f} minutes)")

if __name__ == "__main__":
    asyncio.run(main())
