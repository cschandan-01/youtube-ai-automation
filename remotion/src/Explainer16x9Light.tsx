// Ultra-Clean Minimalist Light-Theme 16:9 Motion Graphics & Explainer Engine
// Inspired by Apple, Stripe, Notion & Vox Clean White Paper Aesthetics
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';

const FPS = 30;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const SANS = 'Poppins, sans-serif';
const MONO = '"JetBrains Mono", monospace';

// -------------------------------------------------------------
// 1. MINIMALIST CLEAN WHITE / CERAMIC LIGHT CANVAS
// -------------------------------------------------------------
const LightBackground: React.FC = () => {
  const f = useCurrentFrame();
  const orb1X = Math.sin(f / 60) * 100;
  const orb1Y = Math.cos(f / 45) * 60;
  const gridPan = (f * 1.0) % 40;

  return (
    <AbsoluteFill style={{ backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      {/* Soft Ceramic Radial Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 15%, #ffffff 0%, #f1f5f9 100%)' }} />

      {/* Pastel Sky Halo */}
      <div style={{
        position: 'absolute',
        top: 200 + orb1Y,
        left: 250 + orb1X,
        width: 700,
        height: 700,
        borderRadius: 350,
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(56, 189, 248, 0) 70%)',
        filter: 'blur(90px)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Pastel Emerald Halo */}
      <div style={{
        position: 'absolute',
        top: 650,
        right: 250,
        width: 800,
        height: 800,
        borderRadius: 400,
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.10) 0%, rgba(16, 185, 129, 0) 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />

      {/* Elegant Architectural Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
        backgroundPosition: `0px ${gridPan}px`,
        opacity: 0.6,
      }} />
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// 2. LIGHT HUD HEADER & PROGRESS TRACKER
// -------------------------------------------------------------
const LightHud: React.FC<{chapter: string; chapterNum: string; progress: number}> = ({chapter, chapterNum, progress}) => {
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
          padding: '12px 26px',
          borderRadius: 30,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
        }}>
          <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 800, color: '#0284c7' }}>{chapterNum}</span>
          <span style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)' }} />
          <span style={{ fontFamily: SANS, fontSize: 17, fontWeight: 700, color: '#0f172a', letterSpacing: 0.2 }}>{chapter}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 22px',
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{ width: 9, height: 9, borderRadius: 5, background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
          <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: '#334155' }}>BEHAVIORAL ECONOMICS</span>
        </div>
      </div>

      {/* Progress Bar along bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'rgba(0, 0, 0, 0.05)', zIndex: 100 }}>
        <div style={{ width: `${progress * 100}%`, height: '100%', background: 'linear-gradient(90deg, #0284c7, #6366f1, #10b981)' }} />
      </div>
    </>
  );
};

// -------------------------------------------------------------
// 3. LIGHT THEME ACT 1: NEURAL DOPAMINE SURGE
// -------------------------------------------------------------
const LightAct1: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const pulse = Math.sin(localFrame / 8) * 0.12 + 1;
  const dopamineLevel = interpolate(localFrame, [30, 200, 300, 700, 1000], [25, 92, 88, 96, 40], clamp);

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
      transform: `scale(${interpolate(p, [0, 1], [0.94, 1])})`,
    }}>
      {/* Left: Clean White Architectural Brain Scan Box */}
      <div style={{
        flex: 1.1,
        height: 600,
        borderRadius: 36,
        background: '#ffffff',
        border: '1.5px solid rgba(226, 232, 240, 1)',
        boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.08), 0 6px 16px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 32, left: 36, fontFamily: MONO, fontSize: 15, fontWeight: 700, color: '#0284c7', letterSpacing: 2 }}>
          BRAIN SCAN: VENTRAL STRIATUM
        </div>

        <div style={{ position: 'relative', width: 340, height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            width: 310 * pulse,
            height: 310 * pulse,
            borderRadius: 155,
            border: '2px dashed rgba(2, 132, 199, 0.3)',
          }} />
          <div style={{
            position: 'absolute',
            width: 240,
            height: 240,
            borderRadius: 120,
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, rgba(99, 102, 241, 0.04) 70%)',
          }} />

          {/* Brain Icon */}
          <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 4px 15px rgba(2, 132, 199, 0.3))' }}>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 3.85 2.18 7.2 5.4 8.87.5.26 1.1.2 1.54-.16l.06-.05c.44-.36.63-.95.48-1.5-.18-.68-.28-1.4-.28-2.16 0-3.86 3.14-7 7-7s7 3.14 7 7c0 .76-.1 1.48-.28 2.16-.15.55.04 1.14.48 1.5l.06.05c.44.36 1.04.42 1.54.16C19.82 19.2 22 15.85 22 12c0-5.52-4.48-10-10-10z" />
            <path d="M9 10a3 3 0 1 0 6 0" />
            <path d="M12 4v4" />
          </svg>
        </div>

        <div style={{
          marginTop: 10,
          padding: '12px 28px',
          borderRadius: 20,
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          fontFamily: MONO,
          fontSize: 17,
          color: '#0f172a',
          fontWeight: 700,
        }}>
          ANTIDOTE TO WILLPOWER: <span style={{ color: '#0284c7' }}>NEURAL HIJACKING</span>
        </div>
      </div>

      {/* Right: Metrics & Fact Card */}
      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{
          padding: '36px 42px',
          borderRadius: 32,
          background: '#ffffff',
          border: '1.5px solid rgba(226, 232, 240, 1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 17, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Dopamine Surge Level</span>
            <span style={{ fontFamily: MONO, fontSize: 24, fontWeight: 800, color: '#0284c7' }}>+{Math.round(dopamineLevel)}%</span>
          </div>

          <div style={{ width: '100%', height: 16, borderRadius: 8, background: '#f1f5f9', overflow: 'hidden' }}>
            <div style={{
              width: `${dopamineLevel}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #0284c7, #38bdf8, #6366f1)',
              borderRadius: 8,
              boxShadow: '0 0 15px rgba(2, 132, 199, 0.4)',
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: MONO, fontSize: 14, color: '#94a3b8' }}>
            <span>BASE LINE</span>
            <span>SHOPPING BROWSE</span>
            <span style={{ color: '#0284c7', fontWeight: 700 }}>CHECKOUT CLIMAX</span>
          </div>
        </div>

        {/* Fact Card */}
        <div style={{
          padding: '34px 40px',
          borderRadius: 28,
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
          border: '1.5px solid rgba(16, 185, 129, 0.35)',
          boxShadow: '0 20px 50px rgba(16, 185, 129, 0.08)',
        }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: '#059669', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
            ⚡ BEHAVIORAL DISCOVERY
          </div>
          <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 800, color: '#0f172a', lineHeight: 1.35 }}>
            "Dopamine is not the chemical of satisfaction. It is the chemical of <span style={{ color: '#0284c7' }}>anticipation</span>."
          </div>
          <div style={{ fontFamily: SANS, fontSize: 18, color: '#475569', marginTop: 12, lineHeight: 1.45 }}>
            The dopamine rush crashes 5 minutes after purchase. You are addicted to the hunt, not the item.
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. LIGHT THEME ACT 5: THE 3-STEP AUTOMATED FIREWALL
// -------------------------------------------------------------
const LightAct5: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});

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
      <div style={{ textAlign: 'center', marginBottom: 38 }}>
        <div style={{ fontFamily: MONO, fontSize: 17, color: '#059669', letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
          THE ARCHITECTURE OF FREEDOM
        </div>
        <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 800, color: '#0f172a' }}>
          The Automated Financial Firewall (Friction Inversion)
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 30, width: '100%', maxWidth: 1400 }}>
        {/* Origin */}
        <div style={{
          flex: 1,
          padding: '36px 30px',
          borderRadius: 32,
          background: 'linear-gradient(145deg, #0284c7 0%, #0369a1 100%)',
          color: '#ffffff',
          boxShadow: '0 20px 50px rgba(2, 132, 199, 0.35)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⚡</div>
          <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 800 }}>Income Direct Deposit</div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: '#e0f2fe', marginTop: 6 }}>$5,000.00 / Mo</div>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.2)', fontSize: 13, fontFamily: MONO, marginTop: 12 }}>
            DAY 1 SPLIT TRIGGER
          </div>
        </div>

        <div style={{ fontSize: 36, color: '#0284c7', fontWeight: 800 }}>➔</div>

        {/* 3 Clean Vaults */}
        <div style={{ flex: 2.2, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <div style={{ padding: '30px 24px', borderRadius: 28, background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 15px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🏡</div>
            <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>50% Essentials</div>
            <div style={{ fontFamily: MONO, fontSize: 18, color: '#0284c7', marginTop: 6, fontWeight: 700 }}>$2,500 Fixed</div>
            <div style={{ fontFamily: SANS, fontSize: 14, color: '#64748b', marginTop: 8 }}>Rent, Groceries, Bills</div>
          </div>

          <div style={{ padding: '30px 24px', borderRadius: 28, background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)', border: '2px solid #10b981', boxShadow: '0 20px 50px rgba(16, 185, 129, 0.15)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>📈</div>
            <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#059669' }}>20% Automated Wealth</div>
            <div style={{ fontFamily: MONO, fontSize: 18, color: '#0f172a', marginTop: 6, fontWeight: 800 }}>$1,000 Invested</div>
            <div style={{ fontFamily: SANS, fontSize: 14, color: '#059669', marginTop: 8 }}>Index Funds & HYSA</div>
            <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 8, background: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontFamily: MONO, fontSize: 12, marginTop: 10, fontWeight: 800 }}>
              🔒 AUTO-LOCKED
            </div>
          </div>

          <div style={{ padding: '30px 24px', borderRadius: 28, background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 15px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>☕</div>
            <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>30% Guilt-Free</div>
            <div style={{ fontFamily: MONO, fontSize: 18, color: '#7c3aed', marginTop: 6, fontWeight: 700 }}>$1,500 Fun</div>
            <div style={{ fontFamily: SANS, fontSize: 14, color: '#64748b', marginTop: 8 }}>Dining, Fun, Freedom</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// MAIN ROOT COMPOSITION (LIGHT THEME)
// -------------------------------------------------------------
export const Explainer16x9Light: React.FC = () => {
  const f = useCurrentFrame();
  const totalFrames = 7513;
  const progress = Math.min(1, f / totalFrames);

  let chapter = 'THE CHEMICAL HIGH OF SPENDING';
  let chapterNum = '01 // DOPAMINE LOOP';
  let CurrentAct = <LightAct1 localFrame={f} />;

  if (f >= 5200 && f < 6500) {
    chapter = 'THE AUTOMATED 3-WAY ARCHITECTURE';
    chapterNum = '05 // FRICTION INVERSION';
    CurrentAct = <LightAct5 localFrame={f - 5200} />;
  }

  return (
    <AbsoluteFill>
      <LightBackground />
      <LightHud chapter={chapter} chapterNum={chapterNum} progress={progress} />
      {CurrentAct}
    </AbsoluteFill>
  );
};
