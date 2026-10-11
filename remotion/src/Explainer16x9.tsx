// Ultra-High-Definition 16:9 Animated Long-Form Explainer Engine
// Topic: The Psychology of Money & Why People Keep Spending Even When They Know They Should Save
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame} from 'remotion';

const FPS = 30;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const SANS = 'Poppins, sans-serif';
const MONO = '"JetBrains Mono", monospace';

// Background Ambient Cinematic Studio Canvas
const CinematicBackground: React.FC = () => {
  const f = useCurrentFrame();
  const orb1X = Math.sin(f / 60) * 120;
  const orb1Y = Math.cos(f / 45) * 80;
  const orb2X = Math.cos(f / 50) * 140;
  const orb2Y = Math.sin(f / 40) * 90;
  const gridPan = (f * 1.2) % 60;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050811', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 20%, #0d172a 0%, #050811 80%)' }} />
      {/* Cyan Ambient Orb */}
      <div style={{
        position: 'absolute',
        top: 250 + orb1Y,
        left: 300 + orb1X,
        width: 800,
        height: 800,
        borderRadius: 400,
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, rgba(6, 182, 212, 0) 70%)',
        filter: 'blur(110px)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      {/* Violet Ambient Orb */}
      <div style={{
        position: 'absolute',
        top: 600 + orb2Y,
        right: 250 + orb2X,
        width: 900,
        height: 900,
        borderRadius: 450,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)',
        filter: 'blur(120px)',
        pointerEvents: 'none',
      }} />
      {/* Floor Micro-Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '40px 40px',
        backgroundPosition: `0px ${gridPan}px`,
        opacity: 0.65,
      }} />
      {/* Top Subtle Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3, 6, 14, 0.8) 100%)', pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};

// Global HUD Header (Chapter Pill & Progress Bar)
const HudHeader: React.FC<{chapter: string; chapterNum: string; progress: number}> = ({chapter, chapterNum, progress}) => {
  return (
    <>
      <div style={{
        position: 'absolute',
        top: 40,
        left: 60,
        right: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '12px 24px',
          borderRadius: 30,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        }}>
          <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 800, color: '#38bdf8' }}>{chapterNum}</span>
          <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontFamily: SANS, fontSize: 17, fontWeight: 700, color: '#f8fafc', letterSpacing: 0.5 }}>{chapter}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 20px',
          borderRadius: 20,
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
          <span style={{ fontFamily: MONO, fontSize: 14, color: '#94a3b8' }}>PSYCHOLOGY OF WEALTH</span>
        </div>
      </div>

      {/* Progress Bar along bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: 'rgba(255, 255, 255, 0.08)', zIndex: 100 }}>
        <div style={{ width: `${progress * 100}%`, height: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8, #34d399)' }} />
      </div>
    </>
  );
};

// -------------------------------------------------------------
// ACT 1: THE DOPAMINE TRAP (0s - 41s | Frames 0 to 1250)
// -------------------------------------------------------------
const Act1Dopamine: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const pulse = Math.sin(localFrame / 8) * 0.15 + 1;
  const dopamineLevel = interpolate(localFrame, [30, 200, 300, 700, 1000], [25, 92, 88, 96, 40], clamp);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 80px',
      gap: 80,
      opacity: p,
      transform: `scale(${interpolate(p, [0, 1], [0.94, 1])})`,
    }}>
      {/* Left: Animated Brain Synapse Core */}
      <div style={{
        flex: 1.1,
        height: 600,
        borderRadius: 36,
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(8, 14, 28, 0.95) 100%)',
        border: '1.5px solid rgba(56, 189, 248, 0.35)',
        boxShadow: '0 30px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 30, left: 36, fontFamily: MONO, fontSize: 16, color: '#38bdf8', letterSpacing: 2 }}>
          BRAIN IMAGING: VENTRAL STRIATUM
        </div>

        {/* Brain Graphic with Synaptic Nodes */}
        <div style={{ position: 'relative', width: 340, height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer Pulsing Wave */}
          <div style={{
            position: 'absolute',
            width: 320 * pulse,
            height: 320 * pulse,
            borderRadius: 160,
            border: '2px dashed rgba(6, 182, 212, 0.4)',
            opacity: 0.7,
          }} />
          <div style={{
            position: 'absolute',
            width: 250,
            height: 250,
            borderRadius: 125,
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(139, 92, 246, 0.1) 70%)',
            filter: 'blur(30px)',
          }} />

          {/* Core Brain Icon Vector */}
          <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 25px rgba(56, 189, 248, 0.8))' }}>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 3.85 2.18 7.2 5.4 8.87.5.26 1.1.2 1.54-.16l.06-.05c.44-.36.63-.95.48-1.5-.18-.68-.28-1.4-.28-2.16 0-3.86 3.14-7 7-7s7 3.14 7 7c0 .76-.1 1.48-.28 2.16-.15.55.04 1.14.48 1.5l.06.05c.44.36 1.04.42 1.54.16C19.82 19.2 22 15.85 22 12c0-5.52-4.48-10-10-10z" />
            <path d="M9 10a3 3 0 1 0 6 0" />
            <path d="M12 4v4" />
          </svg>

          {/* Firing Chemical Dots */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const dist = 110 + Math.sin((localFrame + i * 20) / 10) * 20;
            return (
              <div key={i} style={{
                position: 'absolute',
                left: 170 + Math.cos(rad) * dist - 7,
                top: 170 + Math.sin(rad) * dist - 7,
                width: 14,
                height: 14,
                borderRadius: 7,
                background: '#38bdf8',
                boxShadow: '0 0 16px #38bdf8',
              }} />
            );
          })}
        </div>

        <div style={{
          marginTop: 10,
          padding: '12px 28px',
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontFamily: MONO,
          fontSize: 18,
          color: '#ffffff',
          fontWeight: 700,
        }}>
          ANTIDOTE TO DISCIPLINE: <span style={{ color: '#38bdf8' }}>NEURAL HIJACKING</span>
        </div>
      </div>

      {/* Right: The Chemical Surge Dashboard */}
      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{
          padding: '36px 42px',
          borderRadius: 32,
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1.5px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.6)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, color: '#94a3b8', textTransform: 'uppercase' }}>Dopamine Surge Level</span>
            <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 800, color: '#38bdf8' }}>+{Math.round(dopamineLevel)}%</span>
          </div>

          {/* Level Bar */}
          <div style={{ width: '100%', height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{
              width: `${dopamineLevel}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #06b6d4, #38bdf8, #818cf8)',
              borderRadius: 8,
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.8)',
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: MONO, fontSize: 14, color: '#64748b' }}>
            <span>BASE STATE</span>
            <span>SHOPPING BROWSE</span>
            <span style={{ color: '#38bdf8' }}>CHECKOUT CLIMAX</span>
          </div>
        </div>

        {/* Fact Card: The Truth about Dopamine */}
        <div style={{
          padding: '32px 38px',
          borderRadius: 28,
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1.5px solid rgba(139, 92, 246, 0.4)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontFamily: MONO, fontSize: 16, color: '#c084fc', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
            ⚡ NEUROLOGICAL TRUTH
          </div>
          <div style={{ fontFamily: SANS, fontSize: 28, fontWeight: 700, color: '#ffffff', lineHeight: 1.35 }}>
            "Dopamine is not the chemical of pleasure. It is the chemical of <span style={{ color: '#38bdf8' }}>anticipation</span>."
          </div>
          <div style={{ fontFamily: SANS, fontSize: 18, color: '#cbd5e1', marginTop: 12 }}>
            The spike happens during the hunt, not after you own it. That is why buyers regret sets in 5 minutes after checkout.
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 2: PAIN OF PAYING PARADOX (41s - 86s | Frames 1250 to 2600)
// -------------------------------------------------------------
const Act2PainOfPaying: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const cashPain = 88;
  const cardPain = interpolate(localFrame, [0, 80], [40, 4], clamp);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '100px 80px',
      opacity: p,
      transform: `scale(${interpolate(p, [0, 1], [0.94, 1])})`,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontFamily: MONO, fontSize: 18, color: '#34d399', letterSpacing: 2, marginBottom: 8 }}>
          THE 2001 MIT EXPERIMENT
        </div>
        <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 800, color: '#ffffff' }}>
          Physical Cash vs. Frictionless Digital Payments
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, width: '100%', maxWidth: 1400 }}>
        {/* Left: Physical Paper Cash */}
        <div style={{
          padding: '40px 46px',
          borderRadius: 32,
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1.5px solid rgba(239, 68, 68, 0.4)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(239, 68, 68, 0.15)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 38 }}>💵</span>
            <span style={{ padding: '6px 16px', borderRadius: 14, background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', fontFamily: MONO, fontSize: 15, fontWeight: 800 }}>
              HIGH FRICTION
            </span>
          </div>
          <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
            Physical Cash ($100 Bill)
          </div>
          <div style={{ fontFamily: SANS, fontSize: 18, color: '#94a3b8', lineHeight: 1.4, marginBottom: 24 }}>
            Hands physically release paper bills. Functional MRI reveals the brain's <strong>insula</strong> activates—the exact same area that processes physical pain.
          </div>

          <div style={{ padding: '20px', borderRadius: 20, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 16, color: '#fca5a5', marginBottom: 8 }}>
              <span>NEURAL PAIN INDEX</span>
              <span style={{ fontWeight: 800 }}>{cashPain}% (MAXIMUM)</span>
            </div>
            <div style={{ width: '100%', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.1)' }}>
              <div style={{ width: `${cashPain}%`, height: '100%', background: '#ef4444', borderRadius: 5, boxShadow: '0 0 15px #ef4444' }} />
            </div>
          </div>
        </div>

        {/* Right: Apple Pay & Credit Card Tap */}
        <div style={{
          padding: '40px 46px',
          borderRadius: 32,
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1.5px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(56, 189, 248, 0.15)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 38 }}>💳</span>
            <span style={{ padding: '6px 16px', borderRadius: 14, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', fontFamily: MONO, fontSize: 15, fontWeight: 800 }}>
              ZERO FRICTION
            </span>
          </div>
          <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
            Contactless Tap & Apple Pay
          </div>
          <div style={{ fontFamily: SANS, fontSize: 18, color: '#94a3b8', lineHeight: 1.4, marginBottom: 24 }}>
            Zero physical loss feeling. The brain experiences no pain warning signal. Studies prove buyers bid <strong>83% higher prices</strong> on cards.
          </div>

          <div style={{ padding: '20px', borderRadius: 20, background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 16, color: '#7dd3fc', marginBottom: 8 }}>
              <span>NEURAL PAIN INDEX</span>
              <span style={{ fontWeight: 800 }}>{Math.round(cardPain)}% (SUPPRESSED)</span>
            </div>
            <div style={{ width: '100%', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.1)' }}>
              <div style={{ width: `${cardPain}%`, height: '100%', background: '#38bdf8', borderRadius: 5, boxShadow: '0 0 15px #38bdf8' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 3: PRESENT BIAS & STRANGER EFFECT (86s - 131s | Frames 2600 to 3950)
// -------------------------------------------------------------
const Act3PresentBias: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const timelineProgress = interpolate(localFrame, [30, 200], [0, 100], clamp);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 80px',
      gap: 70,
      opacity: p,
    }}>
      {/* Left: The Timeline Disconnect */}
      <div style={{ flex: 1.2 }}>
        <div style={{ fontFamily: MONO, fontSize: 18, color: '#c084fc', letterSpacing: 2, marginBottom: 8 }}>
          EVOLUTIONARY MISALIGNMENT
        </div>
        <div style={{ fontFamily: SANS, fontSize: 46, fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: 24 }}>
          Why You Treat "Future You" Like a Total Stranger
        </div>
        <div style={{ fontFamily: SANS, fontSize: 20, color: '#94a3b8', lineHeight: 1.5, marginBottom: 36 }}>
          Ancestral humans survived day-to-day. Saving for 30 years made zero biological sense. When brain scans observe people thinking about themselves in retirement, the exact same neural circuits light up as when thinking about a stranger on the street.
        </div>

        {/* Visual Timeline Slider */}
        <div style={{
          padding: '28px 36px',
          borderRadius: 24,
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1.5px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 16, marginBottom: 14 }}>
            <span style={{ color: '#34d399', fontWeight: 800 }}>⚡ TODAY (YOU - 100% RELEVANCE)</span>
            <span style={{ color: '#c084fc', fontWeight: 800 }}>AGE 65 (STRANGER IN BRAIN)</span>
          </div>
          <div style={{ width: '100%', height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
            <div style={{ width: `${timelineProgress}%`, height: '100%', background: 'linear-gradient(90deg, #34d399, #38bdf8, #c084fc)', borderRadius: 6 }} />
            <div style={{
              position: 'absolute',
              left: `calc(${timelineProgress}% - 14px)`,
              top: -8,
              width: 28,
              height: 28,
              borderRadius: 14,
              background: '#ffffff',
              boxShadow: '0 0 20px #38bdf8',
            }} />
          </div>
        </div>
      </div>

      {/* Right: Brain fMRI Scanner Card */}
      <div style={{
        flex: 1,
        padding: '40px',
        borderRadius: 36,
        background: 'linear-gradient(145deg, rgba(20, 16, 40, 0.9) 0%, rgba(10, 8, 24, 0.95) 100%)',
        border: '1.5px solid rgba(168, 85, 247, 0.4)',
        boxShadow: '0 30px 90px rgba(0,0,0,0.8), 0 0 50px rgba(168, 85, 247, 0.2)',
        textAlign: 'center',
      }}>
        <div style={{ width: 100, height: 100, borderRadius: 50, background: 'rgba(168, 85, 247, 0.2)', border: '1.5px solid #a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, margin: '0 auto 24px auto', boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}>
          👤
        </div>
        <div style={{ fontFamily: MONO, fontSize: 16, color: '#e9d5ff', textTransform: 'uppercase', marginBottom: 8 }}>
          NEURO-EXPERIMENT RESULT
        </div>
        <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, color: '#ffffff', marginBottom: 16 }}>
          Medial Prefrontal Cortex
        </div>
        <div style={{ fontFamily: SANS, fontSize: 18, color: '#cbd5e1', lineHeight: 1.45 }}>
          "To your subconscious mind, saving money doesn't feel like rewarding yourself. It feels like giving away your cash to someone else."
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 4: LIFESTYLE CREEP & MICRO-LEAKS (131s - 173s | Frames 3950 to 5200)
// -------------------------------------------------------------
const Act4LifestyleCreep: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const leaks = [
    { name: 'Artisan Coffee & Dinings', amt: '-$150/mo', icon: '☕' },
    { name: 'Food Delivery Surcharges', amt: '-$340/mo', icon: '🍔' },
    { name: 'Silent Cloud & Subscriptions', amt: '-$95/mo', icon: '📱' },
    { name: 'Impulse Amazon One-Clicks', amt: '-$220/mo', icon: '📦' },
  ];

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '100px 80px',
      opacity: p,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ fontFamily: MONO, fontSize: 18, color: '#f87171', letterSpacing: 2, marginBottom: 8 }}>
          THE EXPENSE EXPANSION LAW
        </div>
        <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 800, color: '#ffffff' }}>
          Lifestyle Creep & The Micro-Leak Drain
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, width: '100%', maxWidth: 1400 }}>
        {leaks.map((leak, idx) => {
          const cardP = spring({frame: localFrame - idx * 10, fps: FPS, config: {damping: 14, stiffness: 180}});
          return (
            <div key={idx} style={{
              padding: '36px 30px',
              borderRadius: 28,
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1.5px solid rgba(248, 113, 113, 0.35)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.7)',
              transform: `scale(${cardP})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 44, marginBottom: 16 }}>{leak.icon}</div>
              <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>{leak.name}</div>
              <div style={{ fontFamily: MONO, fontSize: 28, fontWeight: 800, color: '#f87171' }}>{leak.amt}</div>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#94a3b8', marginTop: 8 }}>Silent Monthly Siphon</div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 40,
        padding: '16px 36px',
        borderRadius: 24,
        background: 'rgba(239, 68, 68, 0.15)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        fontFamily: MONO,
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 700,
      }}>
        TOTAL SILENT WEALTH DRAIN: <span style={{ color: '#f87171' }}>-$805.00 / MONTH</span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 5: THE 3-STEP AUTOMATED FIREWALL (173s - 216s | Frames 5200 to 6500)
// -------------------------------------------------------------
const Act5AutomatedFirewall: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const pulse = Math.sin(localFrame / 8) * 0.1 + 1;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '100px 80px',
      opacity: p,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontFamily: MONO, fontSize: 18, color: '#34d399', letterSpacing: 2, marginBottom: 8 }}>
          THE BEHAVIORAL SOLUTION
        </div>
        <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 800, color: '#ffffff' }}>
          The Automated Financial Architecture (Friction Inversion)
        </div>
      </div>

      {/* 3-Way Flowchart */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 30, width: '100%', maxWidth: 1400 }}>
        {/* Income Origin Hub */}
        <div style={{
          flex: 1,
          padding: '36px 30px',
          borderRadius: 32,
          background: 'linear-gradient(145deg, #0284c7 0%, #0369a1 100%)',
          border: '2px solid #38bdf8',
          boxShadow: '0 25px 70px rgba(2, 132, 199, 0.4)',
          textAlign: 'center',
          transform: `scale(${pulse})`,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
          <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 800, color: '#ffffff' }}>Income Hits</div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: '#e0f2fe', marginTop: 6 }}>Direct Deposit ($5,000)</div>
          <div style={{ padding: '4px 12px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', color: '#38bdf8', fontFamily: MONO, fontSize: 13, marginTop: 12, fontWeight: 700 }}>
            DAY 1 AUTOMATION
          </div>
        </div>

        <div style={{ fontSize: 36, color: '#38bdf8' }}>➔</div>

        {/* 3 Destination Vaults */}
        <div style={{ flex: 2.2, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {/* Vault 1: 50% Essentials */}
          <div style={{ padding: '30px 24px', borderRadius: 28, background: 'rgba(15, 23, 42, 0.95)', border: '1.5px solid rgba(56, 189, 248, 0.35)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🏡</div>
            <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#ffffff' }}>50% Essentials</div>
            <div style={{ fontFamily: MONO, fontSize: 18, color: '#38bdf8', marginTop: 6 }}>$2,500 Fixed</div>
            <div style={{ fontFamily: SANS, fontSize: 13, color: '#94a3b8', marginTop: 8 }}>Rent, Groceries, Utilities</div>
          </div>

          {/* Vault 2: 20% Wealth */}
          <div style={{ padding: '30px 24px', borderRadius: 28, background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #34d399', boxShadow: '0 0 35px rgba(52, 211, 153, 0.25)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>📈</div>
            <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#34d399' }}>20% Automated Wealth</div>
            <div style={{ fontFamily: MONO, fontSize: 18, color: '#ffffff', marginTop: 6 }}>$1,000 Invested</div>
            <div style={{ fontFamily: SANS, fontSize: 13, color: '#a7f3d0', marginTop: 8 }}>Index Funds & High-Yield</div>
            <div style={{ padding: '3px 8px', borderRadius: 8, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontFamily: MONO, fontSize: 12, marginTop: 10, fontWeight: 800 }}>
              🔒 AUTO-LOCKED
            </div>
          </div>

          {/* Vault 3: 30% Freedom */}
          <div style={{ padding: '30px 24px', borderRadius: 28, background: 'rgba(15, 23, 42, 0.95)', border: '1.5px solid rgba(168, 85, 247, 0.35)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>☕</div>
            <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#ffffff' }}>30% Guilt-Free</div>
            <div style={{ fontFamily: MONO, fontSize: 18, color: '#c084fc', marginTop: 6 }}>$1,500 Freedom</div>
            <div style={{ fontFamily: SANS, fontSize: 13, color: '#94a3b8', marginTop: 8 }}>Dining, Fun, Life</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 6: COMPOUND INTEREST CURVE & OUTRO (216s - 250s | Frames 6500 to 7513)
// -------------------------------------------------------------
const Act6Compounding: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const netWorth = Math.floor(interpolate(localFrame, [0, 400], [45000, 1420000], clamp));

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 80px',
      gap: 70,
      opacity: p,
    }}>
      <div style={{ flex: 1.2 }}>
        <div style={{ fontFamily: MONO, fontSize: 18, color: '#34d399', letterSpacing: 2, marginBottom: 8 }}>
          THE 30-YEAR EXPONENTIAL CURVE
        </div>
        <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: 20 }}>
          Stop Fighting Willpower. Let The Machine Compound.
        </div>
        <div style={{ fontFamily: SANS, fontSize: 20, color: '#94a3b8', lineHeight: 1.5, marginBottom: 32 }}>
          When you automate your savings upfront, human psychology is bypassed. What felt like an impossible battle of discipline becomes an effortless financial freedom flywheel.
        </div>

        {/* 3 Golden Rules Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['1. Remove human willpower from your savings.', '2. Invert spending friction (unlink saved cards).', '3. Automate before your eyes ever see the cash.'].map((rule, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ color: '#34d399', fontWeight: 800 }}>✓</span>
              <span style={{ fontFamily: SANS, fontSize: 18, color: '#f8fafc', fontWeight: 600 }}>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Compound Net Worth Projection Graph */}
      <div style={{
        flex: 1,
        padding: '40px',
        borderRadius: 36,
        background: 'linear-gradient(145deg, rgba(16, 24, 40, 0.95) 0%, rgba(6, 12, 22, 0.98) 100%)',
        border: '2px solid rgba(52, 211, 153, 0.4)',
        boxShadow: '0 30px 90px rgba(0,0,0,0.8), 0 0 50px rgba(52, 211, 153, 0.2)',
      }}>
        <div style={{ fontFamily: MONO, fontSize: 16, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
          30-Year Wealth Projection
        </div>
        <div style={{ fontFamily: SANS, fontSize: 52, fontWeight: 900, color: '#ffffff', letterSpacing: -1, marginBottom: 20 }}>
          ${netWorth.toLocaleString()} <span style={{ fontSize: 24, color: '#34d399' }}>NET WORTH</span>
        </div>

        {/* Exponential Curve SVG */}
        <div style={{ height: 160, position: 'relative' }}>
          <svg width="100%" height="100%" viewBox="0 0 500 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,140 C150,135 280,120 380,60 C440,25 480,10 500,5 L500,160 L0,160 Z" fill="url(#compGrad)" />
            <path d="M0,140 C150,135 280,120 380,60 C440,25 480,10 500,5" fill="none" stroke="#34d399" strokeWidth="5" />
          </svg>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontFamily: MONO, fontSize: 14, color: '#64748b' }}>
          <span>AGE 25 ($0)</span>
          <span>AGE 35 ($120K)</span>
          <span>AGE 45 ($480K)</span>
          <span style={{ color: '#34d399', fontWeight: 800 }}>AGE 55 ($1.4M+)</span>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// MAIN ROOT COMPOSITION
// -------------------------------------------------------------
export const Explainer16x9: React.FC = () => {
  const f = useCurrentFrame();
  const totalFrames = 7513; // 250.44 seconds @ 30fps
  const progress = Math.min(1, f / totalFrames);

  let chapter = 'THE CHEMICAL HIGH OF SPENDING';
  let chapterNum = '01 // DOPAMINE LOOP';
  let CurrentAct = <Act1Dopamine localFrame={f} />;

  if (f >= 1250 && f < 2600) {
    chapter = 'THE MIT EXPERIMENT: PAIN OF PAYING';
    chapterNum = '02 // FRICTIONLESS CASH';
    CurrentAct = <Act2PainOfPaying localFrame={f - 1250} />;
  } else if (f >= 2600 && f < 3950) {
    chapter = 'PRESENT BIAS & THE STRANGER EFFECT';
    chapterNum = '03 // EVOLUTIONARY TRAP';
    CurrentAct = <Act3PresentBias localFrame={f - 2600} />;
  } else if (f >= 3950 && f < 5200) {
    chapter = 'LIFESTYLE CREEP & THE MICRO-LEAK DRAIN';
    chapterNum = '04 // EXPENSE INFLATION';
    CurrentAct = <Act4LifestyleCreep localFrame={f - 3950} />;
  } else if (f >= 5200 && f < 6500) {
    chapter = 'THE AUTOMATED 3-WAY ARCHITECTURE';
    chapterNum = '05 // FRICTION INVERSION';
    CurrentAct = <Act5AutomatedFirewall localFrame={f - 5200} />;
  } else if (f >= 6500) {
    chapter = 'THE EXPONENTIAL WEALTH FLYWHEEL';
    chapterNum = '06 // COMPOUND MASTERY';
    CurrentAct = <Act6Compounding localFrame={f - 6500} />;
  }

  return (
    <AbsoluteFill>
      <CinematicBackground />
      <HudHeader chapter={chapter} chapterNum={chapterNum} progress={progress} />
      {CurrentAct}
    </AbsoluteFill>
  );
};
