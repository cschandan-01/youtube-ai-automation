// Ultra-Clean Minimalist Light-Theme 16:9 Motion Graphics Explainer
// Topic: The 50/30/20 Rule Is Broken (The 3-Bucket Wealth Engine)
// Pure High-Retention Educational Value • Pinterest SaaS UI Style • 0% Hard-Sell Promo
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
// 1. CLEAN CERAMIC WHITE LIGHT CANVAS
// -------------------------------------------------------------
const LightBackground: React.FC = () => {
  const f = useCurrentFrame();
  const orb1X = Math.sin(f / 60) * 80;
  const orb1Y = Math.cos(f / 45) * 50;
  const gridPan = (f * 1.0) % 36;

  return (
    <AbsoluteFill style={{ backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 15%, #ffffff 0%, #f1f5f9 100%)' }} />

      {/* Pastel Sky Halo */}
      <div style={{
        position: 'absolute',
        top: 200 + orb1Y,
        left: 280 + orb1X,
        width: 700,
        height: 700,
        borderRadius: 350,
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.10) 0%, rgba(2, 132, 199, 0) 70%)',
        filter: 'blur(80px)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Pastel Emerald Halo */}
      <div style={{
        position: 'absolute',
        top: 600,
        right: 200,
        width: 800,
        height: 800,
        borderRadius: 400,
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0) 70%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />

      {/* Subtle Micro-Dot Matrix */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.07) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
        backgroundPosition: `0px ${gridPan}px`,
        opacity: 0.65,
      }} />
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// 2. HUD HEADER & CHAPTER TRACKER
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
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
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
          <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: '#334155' }}>FINANCIAL PSYCHOLOGY</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'rgba(0, 0, 0, 0.05)', zIndex: 100 }}>
        <div style={{ width: `${progress * 100}%`, height: '100%', background: 'linear-gradient(90deg, #0284c7, #6366f1, #10b981)' }} />
      </div>
    </>
  );
};

// -------------------------------------------------------------
// ACT 1: THE BROKEN 50/30/20 TRAP (0s - 38s | Frames 0 to 1140)
// -------------------------------------------------------------
const Act1BrokenRule: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const failRate = Math.min(92, Math.floor(interpolate(localFrame, [20, 180], [0, 92], clamp)));

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
      {/* Left: The Broken Pie Card */}
      <div style={{
        flex: 1.1,
        padding: '46px',
        borderRadius: 36,
        background: '#ffffff',
        border: '1.5px solid rgba(226, 232, 240, 1)',
        boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.07)',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: '#ef4444', letterSpacing: 2, marginBottom: 12 }}>
          THE OUTDATED 50/30/20 BLUEPRINT
        </div>
        <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>
          Percentage-Based Budgeting
        </div>

        {/* 3 Broken Percentage Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360, margin: '0 auto 28px auto' }}>
          <div style={{ padding: '14px 20px', borderRadius: 16, background: '#f8fafc', border: '1.5px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Needs (Fixed Bills)</span>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 800, color: '#ef4444' }}>50% (BURNOUT)</span>
          </div>
          <div style={{ padding: '14px 20px', borderRadius: 16, background: '#f8fafc', border: '1.5px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Wants (Discretionary)</span>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 800, color: '#f59e0b' }}>30% (GUILT)</span>
          </div>
          <div style={{ padding: '14px 20px', borderRadius: 16, background: '#f8fafc', border: '1.5px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Savings (Leftovers)</span>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 800, color: '#64748b' }}>20% (EMPTY)</span>
          </div>
        </div>

        <div style={{ padding: '12px 24px', borderRadius: 18, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontFamily: MONO, fontSize: 16, fontWeight: 800 }}>
          ⚠️ 92% OF USERS QUIT WITHIN 90 DAYS
        </div>
      </div>

      {/* Right: Data & Failure Reason */}
      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{
          padding: '36px 42px',
          borderRadius: 32,
          background: '#ffffff',
          border: '1.5px solid rgba(226, 232, 240, 1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: MONO, fontSize: 16, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Budget Abandonment Rate</span>
            <span style={{ fontFamily: MONO, fontSize: 26, fontWeight: 800, color: '#ef4444' }}>{failRate}%</span>
          </div>

          <div style={{ width: '100%', height: 16, borderRadius: 8, background: '#f1f5f9', overflow: 'hidden' }}>
            <div style={{
              width: `${failRate}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
              borderRadius: 8,
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: MONO, fontSize: 14, color: '#94a3b8' }}>
            <span>DAY 1 (OPTIMISM)</span>
            <span>DAY 45 (FATIGUE)</span>
            <span style={{ color: '#ef4444', fontWeight: 700 }}>DAY 90 (ABANDONED)</span>
          </div>
        </div>

        <div style={{
          padding: '34px 40px',
          borderRadius: 28,
          background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
          border: '1.5px solid rgba(239, 68, 68, 0.35)',
        }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: '#dc2626', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
            💡 WHY WILLPOWER BUDGETING FAILS
          </div>
          <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 800, color: '#0f172a', lineHeight: 1.35 }}>
            "You cannot spreadsheet your way out of evolutionary human psychology."
          </div>
          <div style={{ fontFamily: SANS, fontSize: 18, color: '#475569', marginTop: 12 }}>
            Micro-tracking every dollar creates cognitive overload. The top 1% don't track—they automate architecture.
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 2: BUCKET 1 — THE FLOW HUB (38s - 80s | Frames 1140 to 2400)
// -------------------------------------------------------------
const Act2FlowHub: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const balance = Math.max(0, Math.floor(interpolate(localFrame, [30, 180], [5000, 0], clamp)));

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
      {/* Visual Flow Station */}
      <div style={{
        flex: 1.1,
        padding: '44px',
        borderRadius: 36,
        background: '#ffffff',
        border: '2px solid #0284c7',
        boxShadow: '0 25px 60px rgba(2, 132, 199, 0.12)',
        textAlign: 'center',
      }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: 'rgba(2, 132, 199, 0.1)', border: '1.5px solid #0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px auto' }}>
          ⚡
        </div>
        <div style={{ fontFamily: MONO, fontSize: 15, color: '#0284c7', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
          BUCKET 01 // TRANSIT STATION
        </div>
        <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
          The Flow Hub
        </div>
        <div style={{ fontFamily: MONO, fontSize: 44, fontWeight: 900, color: balance > 0 ? '#0284c7' : '#10b981', marginBottom: 20 }}>
          ${balance.toLocaleString()} <span style={{ fontSize: 18, color: '#64748b' }}>LEFTOVER</span>
        </div>

        <div style={{ padding: '14px 20px', borderRadius: 16, background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0369a1', fontFamily: MONO, fontSize: 15, fontWeight: 700 }}>
          RULE: CHECKING ACCOUNT NEVER HOLDS SAVINGS
        </div>
      </div>

      {/* Explanatory Cards */}
      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontFamily: MONO, fontSize: 16, color: '#0284c7', fontWeight: 800 }}>THE PSYCHOLOGICAL PRINCIPLE</div>
        <div style={{ fontFamily: SANS, fontSize: 42, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
          "What You Don't See, You Cannot Spend."
        </div>
        <div style={{ fontFamily: SANS, fontSize: 20, color: '#475569', lineHeight: 1.5 }}>
          Traditional accounts sit with thousands of dollars visible, triggering constant impulse spending. The Flow Hub operates like an airport transit hub: Money lands on Day 1, and within 24 hours, automation disperses it completely.
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 3: BUCKET 2 — THE WEALTH FIREWALL (80s - 128s | Frames 2400 to 3840)
// -------------------------------------------------------------
const Act3WealthFirewall: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});
  const cursorX = interpolate(localFrame, [0, 40, 55, 80], [600, 480, 480, 650], clamp);
  const isToggled = localFrame >= 50;

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
      {/* Left: Interactive Wealth Vault Card */}
      <div style={{
        flex: 1.1,
        padding: '44px',
        borderRadius: 36,
        background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)',
        border: '2px solid #10b981',
        boxShadow: '0 25px 60px rgba(16, 185, 129, 0.15)',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 32 }}>📈</span>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 14, color: '#059669', fontWeight: 800 }}>BUCKET 02</div>
              <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 800, color: '#0f172a' }}>The Wealth Firewall</div>
            </div>
          </div>

          {/* Interactive Toggle */}
          <div style={{
            padding: '8px 18px',
            borderRadius: 20,
            background: isToggled ? '#10b981' : '#e2e8f0',
            color: '#ffffff',
            fontFamily: MONO,
            fontSize: 14,
            fontWeight: 800,
            transition: 'all 0.2s ease',
          }}>
            {isToggled ? '✓ AUTO-INVEST ACTIVE' : 'MANUAL'}
          </div>
        </div>

        <div style={{ fontFamily: MONO, fontSize: 44, fontWeight: 900, color: '#059669', marginBottom: 12 }}>
          +$1,000.00 <span style={{ fontSize: 18, color: '#64748b' }}>/ MONTH</span>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 16, color: '#475569', lineHeight: 1.4, marginBottom: 20 }}>
          Automatically swept into Low-Cost S&P 500 Index Funds & High-Yield Vaults on Day 1 before you pay any discretionary bill.
        </div>

        <div style={{ padding: '14px 20px', borderRadius: 16, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#059669', fontFamily: MONO, fontSize: 15, fontWeight: 800, textAlign: 'center' }}>
          🔒 AUTO-LOCKED PRIOR TO LIVING EXPENSES
        </div>

        {/* Cursor */}
        <div style={{ position: 'absolute', left: cursorX, top: 40, pointerEvents: 'none' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z" fill="#0f172a" stroke="#ffffff" strokeWidth="2" /></svg>
        </div>
      </div>

      {/* Right Text */}
      <div style={{ flex: 1.2 }}>
        <div style={{ fontFamily: MONO, fontSize: 16, color: '#059669', fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>
          INVERTING THE FORMULA
        </div>
        <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20 }}>
          Traditional: Save What Is Left Over.<br />
          <span style={{ color: '#059669' }}>The 1%: Pay Future Self First.</span>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 20, color: '#475569', lineHeight: 1.5 }}>
          There is never anything left over at the end of the month. By automating the Wealth Firewall on Day One, your compound growth is guaranteed before lifestyle spending even begins.
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 4: BUCKET 3 — GUILT-FREE FREEDOM (128s - 170s | Frames 3840 to 5100)
// -------------------------------------------------------------
const Act4GuiltFreeVault: React.FC<{localFrame: number}> = ({localFrame}) => {
  const p = spring({frame: localFrame, fps: FPS, config: {damping: 14, stiffness: 180}});

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
      {/* Left Card */}
      <div style={{
        flex: 1.1,
        padding: '44px',
        borderRadius: 36,
        background: '#ffffff',
        border: '2px solid #8b5cf6',
        boxShadow: '0 25px 60px rgba(139, 92, 246, 0.12)',
        textAlign: 'center',
      }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: 'rgba(139, 92, 246, 0.1)', border: '1.5px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px auto' }}>
          ☕
        </div>
        <div style={{ fontFamily: MONO, fontSize: 15, color: '#8b5cf6', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
          BUCKET 03 // ZERO SHAME
        </div>
        <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
          The Guilt-Free Vault
        </div>
        <div style={{ fontFamily: MONO, fontSize: 44, fontWeight: 900, color: '#7c3aed', marginBottom: 20 }}>
          $1,500.00 <span style={{ fontSize: 18, color: '#64748b' }}>SPEND TO ZERO</span>
        </div>

        <div style={{ padding: '14px 20px', borderRadius: 16, background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#6d28d9', fontFamily: MONO, fontSize: 15, fontWeight: 700 }}>
          SPEND 100% OF THIS BUCKET GUILT-FREE
        </div>
      </div>

      {/* Right Content */}
      <div style={{ flex: 1.2 }}>
        <div style={{ fontFamily: MONO, fontSize: 16, color: '#8b5cf6', fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>
          ZERO GUILT PSYCHOLOGY
        </div>
        <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20 }}>
          Freedom to Spend Without A Single Ounce of Regret.
        </div>
        <div style={{ fontFamily: SANS, fontSize: 20, color: '#475569', lineHeight: 1.5 }}>
          Because your Wealth Firewall is already funded and your living bills are already scheduled, every single dollar left in this bucket can be spent down to zero without feeling guilty about coffee, dining, or travel.
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ACT 5: THE SYSTEM SUMMARY & OUTRO (170s - 206s | Frames 5100 to 6183)
// -------------------------------------------------------------
const Act5SummaryOutro: React.FC<{localFrame: number}> = ({localFrame}) => {
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
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontFamily: MONO, fontSize: 17, color: '#059669', letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
          THE 3-BUCKET BLUEPRINT
        </div>
        <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 800, color: '#0f172a' }}>
          Stop Fighting Willpower. Build The Engine.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, width: '100%', maxWidth: 1300, marginBottom: 40 }}>
        <div style={{ padding: '30px 24px', borderRadius: 28, background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 15px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>⚡</div>
          <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>1. Flow Hub</div>
          <div style={{ fontFamily: SANS, fontSize: 15, color: '#64748b', marginTop: 8 }}>Empties automatically on Day 1. No idle cash to tempt you.</div>
        </div>

        <div style={{ padding: '30px 24px', borderRadius: 28, background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)', border: '2px solid #10b981', boxShadow: '0 20px 50px rgba(16, 185, 129, 0.15)', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>📈</div>
          <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#059669' }}>2. Wealth Firewall</div>
          <div style={{ fontFamily: SANS, fontSize: 15, color: '#059669', marginTop: 8 }}>Funds index funds first. Wealth compounds on autopilot.</div>
        </div>

        <div style={{ padding: '30px 24px', borderRadius: 28, background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 15px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>☕</div>
          <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>3. Guilt-Free Vault</div>
          <div style={{ fontFamily: SANS, fontSize: 15, color: '#64748b', marginTop: 8 }}>Spend every dollar with zero shame and zero tracking.</div>
        </div>
      </div>

      <div style={{
        padding: '16px 36px',
        borderRadius: 24,
        background: '#0f172a',
        color: '#ffffff',
        fontFamily: SANS,
        fontSize: 18,
        fontWeight: 700,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.25)',
      }}>
        SUBSCRIBE FOR MORE DEEP-DIVE FINANCIAL BLUEPRINTS
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// MAIN COMPOSITION ROOT
// -------------------------------------------------------------
export const BucketWealthLight: React.FC = () => {
  const f = useCurrentFrame();
  const totalFrames = 6183; // 206.11 seconds @ 30fps
  const progress = Math.min(1, f / totalFrames);

  let chapter = 'THE 50/30/20 MYTH';
  let chapterNum = '01 // PERCENTAGE TRAP';
  let CurrentAct = <Act1BrokenRule localFrame={f} />;

  if (f >= 1140 && f < 2400) {
    chapter = 'BUCKET 01: THE FLOW HUB';
    chapterNum = '02 // TRANSIT STATION';
    CurrentAct = <Act2FlowHub localFrame={f - 1140} />;
  } else if (f >= 2400 && f < 3840) {
    chapter = 'BUCKET 02: THE WEALTH FIREWALL';
    chapterNum = '03 // PAY YOURSELF FIRST';
    CurrentAct = <Act3WealthFirewall localFrame={f - 2400} />;
  } else if (f >= 3840 && f < 5100) {
    chapter = 'BUCKET 03: THE GUILT-FREE VAULT';
    chapterNum = '04 // ZERO RESTRICTIONS';
    CurrentAct = <Act4GuiltFreeVault localFrame={f - 3840} />;
  } else if (f >= 5100) {
    chapter = 'THE 3-BUCKET SYSTEM ENGINE';
    chapterNum = '05 // AUTOMATED FREEDOM';
    CurrentAct = <Act5SummaryOutro localFrame={f - 5100} />;
  }

  return (
    <AbsoluteFill>
      <LightBackground />
      <LightHud chapter={chapter} chapterNum={chapterNum} progress={progress} />
      {CurrentAct}
    </AbsoluteFill>
  );
};
