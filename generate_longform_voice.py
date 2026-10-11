#!/usr/bin/env python3
"""
Generate complete 3.5-minute (210 seconds) documentary narration audio
for the YouTube Animated Explainer video.
"""
import asyncio
import edge_tts
from pathlib import Path
import subprocess

EXPANDED_SCRIPT = """Have you ever wondered why we keep spending money, even when we promised ourselves that this month would be different? 

You set a budget, you promise to save, and yet, by the third week, your bank balance quietly drains away. The most common belief is that overspending is simply a lack of willpower or financial discipline. 

But behavioral scientists have discovered something far more shocking: Your brain is actively wired against saving money. And modern technology has exploited every single psychological vulnerability in your evolutionary biology.

Welcome to the neurochemistry of spending.

Every time you scroll past an item online, add something to your cart, or see a promotional discount, your brain's ventral striatum triggers an immediate surge of dopamine. 

Most people assume dopamine is the chemical of pleasure—the feeling you get after you buy something. But neuroscientists know that dopamine is actually the chemical of anticipation. It spikes during the hunt, not the feast. The moment your credit card clears, that chemical high evaporates, leaving you craving the next transaction.

This leads directly into the second psychological trap: The Death of the Pain of Paying.

In 2001, researchers at MIT conducted a famous experiment. They asked participants to bid on sold-out basketball tickets using either physical cash or a credit card. The results were startling: People bidding with credit cards offered almost twice as much money as those paying with physical paper cash.

Why? Because when you physically hand over five crisp twenty-dollar bills, functional MRI scans reveal that a region of your brain called the insula activates. The insula is the exact same neurological center responsible for processing physical pain, like touching a hot stove. Physical cash creates emotional friction. 

But modern digital payments, contactless card taps, Apple Pay, and one-click checkouts have systematically engineered that pain down to zero. You no longer feel the pain of paying. The friction is gone, and so is your cash.

And then comes the third and most dangerous trap: Present Bias.

For hundreds of thousands of years, our ancestors survived in unpredictable environments where storing resources for thirty years made no biological sense. Your brain evolved to prioritize immediate survival today over hypothetical safety tomorrow. 

In fact, brain imaging studies show that when you think about your future self in retirement, your medial prefrontal cortex lights up in the exact same pattern as when you think about a total stranger. To your subconscious mind, saving money isn't rewarding your future self—it feels like giving your hard-earned cash away to a stranger.

Combine this with Lifestyle Inflation, and the trap is complete. As your salary increases, your subconscious expenses quietly expand to match it. A fifteen-dollar artisan coffee, food delivery surcharges, and silent recurring subscriptions silently drain your surplus wealth before you can ever invest it.

So how do the top ten percent break free from this evolutionary trap? 

They don't rely on willpower. Willpower is a depleting biological resource. Instead, they use behavioral automation.

The secret is what economists call Friction Inversion: Make good habits completely frictionless, and make bad spending habits painfully difficult.

The moment your income hits your bank account, an automated three-way split triggers immediately. Fifty percent covers your fixed living essentials. Twenty percent is automatically diverted into low-cost index funds and high-yield savings accounts before your eyes can ever see it. And the remaining thirty percent is yours to spend completely guilt-free.

When you automate your wealth building, compound interest takes over. What felt like an impossible battle of willpower becomes an effortless machine that scales your net worth exponentially over time.

Stop fighting your human psychology. Outsmart the system, automate your money, and let time build your financial freedom."""

OUT_DIR = Path("C:/Users/MyPC/.gemini/antigravity-ide/scratch/video-agent-kit/video-agent-kit/work/longform_explainer")
OUT_DIR.mkdir(parents=True, exist_ok=True)

async def main():
    voice = "en-US-ChristopherNeural"
    voice_mp3 = OUT_DIR / "voice.mp3"
    print(f"Generating full 3.5-minute master narration with {voice}...")
    communicate = edge_tts.Communicate(EXPANDED_SCRIPT, voice, rate="+2%")
    await communicate.save(str(voice_mp3))
    print(f"Master voiceover saved at: {voice_mp3}")

    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(voice_mp3)]
    dur = float(subprocess.check_output(cmd).decode().strip())
    print(f"🎯 Exact Audio Duration: {dur:.2f} seconds ({dur/60:.2f} minutes)")

if __name__ == "__main__":
    asyncio.run(main())
