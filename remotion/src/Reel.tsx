// Ultra-Realistic Interactive SaaS Product Simulator & Motion Graphics Engine
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/playfair-display/700-italic.css';
import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame} from 'remotion';

const FPS = 30;
const S = (x: number) => Math.round(x * FPS);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const ease2 = Easing.bezier(0.65, 0, 0.35, 1);
const SANS = 'Poppins, sans-serif';
const MONO = '"JetBrains Mono", monospace';
const SERIF = '"Playfair Display", serif';

export type Layer =
  | {type: 'sub'; from: number; to: number; text: string; hl?: string; y?: number}
  | {type: 'big'; from: number; to: number; big: string; small?: string; accent?: string; y?: number; scrim?: boolean}
  | {type: 'chips'; from: number; to: number; items: {text: string; x: number; y: number}[]}
  | {type: 'cta'; from: number; to: number; question?: string; keyword: string; typeAt?: number; dm?: string}
  | {type: 'end'; from: number; to: number; title: string; accent?: string; sub?: string}
  | {type: 'black'; from: number; to: number}
  | {type: 'real_saas_app'; from: number; to: number; y?: number}
  | {type: 'zen_budget_app'; from: number; to: number; title?: string; goal?: string; saved?: string; y?: number}
  | {type: 'portfolio_app'; from: number; to: number; netWorth?: string; growth?: string; y?: number}
  | {type: 'saas_toast'; from: number; to: number; title: string; amount: string; sub?: string; y?: number};

export type EDL = {
  duration: number;
  theme?: {accent?: string; accent2?: string; bg?: string; serifAccent?: boolean};
  whips?: [number, number][];
  punches?: number[];
  vignette?: number;
  fadeOutAt?: number;
  layers: Layer[];
};

type Th = {A: string; A2: string; BG: string; serif: boolean};
const ThemeCtx = React.createContext<Th>({A: '#00f0ff', A2: '#8b5cf6', BG: '#030712', serif: false});
const useTh = () => React.useContext(ThemeCtx);
const outFade = (f: number, dur: number, n = 5) => interpolate(f, [dur - n, dur], [1, 0], clamp);

// ---------------------------------------------------------------- CINEMATIC AMBIENT STUDIO BACKGROUND
const SaaSBackground: React.FC = () => {
  const f = useCurrentFrame();
  const th = useTh();
  const x1 = Math.sin(f / 45) * 80;
  const y1 = Math.cos(f / 35) * 60;
  const x2 = Math.cos(f / 40) * 100;
  const y2 = Math.sin(f / 30) * 70;
  const gridShift = (f * 1.8) % 60;

  return (
    <AbsoluteFill style={{ backgroundColor: th.BG || '#030712', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 15%, #0d172a 0%, ${th.BG || '#030712'} 75%)` }} />
      <div style={{
        position: 'absolute',
        top: 180 + y1,
        left: 140 + x1,
        width: 700,
        height: 700,
        borderRadius: 350,
        background: `radial-gradient(circle, ${th.A}33 0%, ${th.A}00 70%)`,
        filter: 'blur(95px)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 850 + y2,
        right: -60 + x2,
        width: 750,
        height: 750,
        borderRadius: 375,
        background: `radial-gradient(circle, ${th.A2}38 0%, ${th.A2}00 70%)`,
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.10) 1.5px, transparent 1.5px)`,
        backgroundSize: '40px 40px',
        backgroundPosition: `0px ${gridShift}px`,
        opacity: 0.6,
      }} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- TYPOGRAPHY
const Scrim: React.FC<{o: number}> = ({o}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 420, opacity: o, background: 'linear-gradient(180deg, rgba(3,7,18,.9), rgba(3,7,18,.5) 55%, transparent)'}} />
);

const Hl: React.FC<{text: string; hl?: string; color: string; serif?: boolean}> = ({text, hl, color, serif}) => {
  if (!hl || !text.includes(hl)) return <>{text}</>;
  const [a, ...b] = text.split(hl);
  return (
    <>
      {a}
      <span style={{
        color: '#ffffff',
        background: `linear-gradient(135deg, ${color}, #c084fc)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: serif ? SERIF : undefined,
        fontStyle: serif ? 'italic' : undefined,
        filter: `drop-shadow(0 0 25px ${color}99)`,
      }}>
        {hl}
      </span>
      {b.join(hl)}
    </>
  );
};

const Sub: React.FC<{l: Extract<Layer, {type: 'sub'}>; dur: number}> = ({l, dur}) => {
  const f = useCurrentFrame(); const th = useTh();
  const a = interpolate(f, [0, 5], [0, 1], {...clamp, easing: ease});

  return (
    <div style={{
      position: 'absolute',
      left: 40,
      right: 40,
      top: l.y ?? 1360, // Safe bottom zone without overlapping the UI
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: Math.min(a, outFade(f, dur, 4)),
      zIndex: 50,
      pointerEvents: 'none',
    }}>
      <div style={{
        maxWidth: 960,
        textAlign: 'center',
        padding: '18px 36px',
        borderRadius: 24,
        background: 'rgba(10, 16, 30, 0.94)',
        backdropFilter: 'blur(25px)',
        border: '1.5px solid rgba(255, 255, 255, 0.18)',
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: 42,
        lineHeight: 1.35,
        color: 'white',
        transform: `translateY(${(1 - a) * 14}px)`,
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.15)',
      }}>
        <Hl text={l.text} hl={l.hl} color={th.A} />
      </div>
    </div>
  );
};

const Big: React.FC<{l: Extract<Layer, {type: 'big'}>; dur: number}> = ({l, dur}) => {
  const f = useCurrentFrame(); const th = useTh();
  const a = interpolate(f, [0, 10], [0, 1], {...clamp, easing: ease});
  const b = interpolate(f, [3, 14], [0, 1], {...clamp, easing: ease});

  return (
    <AbsoluteFill style={{opacity: outFade(f, dur, 6), zIndex: 40}}>
      {l.scrim !== false && <Scrim o={a} />}
      <div style={{position: 'absolute', top: l.y ?? 200, left: 40, right: 40, textAlign: 'center'}}>
        {l.small && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 26px',
            borderRadius: 30,
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(139, 92, 246, 0.15))',
            border: '1.5px solid rgba(0, 240, 255, 0.35)',
            backdropFilter: 'blur(16px)',
            fontFamily: MONO,
            fontWeight: 800,
            fontSize: 26,
            color: '#38bdf8',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 16,
            opacity: a,
            transform: `translateY(${(1 - a) * 16}px)`,
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }} />
            {l.small}
          </div>
        )}
        <div style={{overflow: 'hidden', paddingBottom: 8}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, lineHeight: 1.08, letterSpacing: -2, color: 'white', transform: `translateY(${(1 - b) * 105}%)`, textShadow: '0 10px 50px rgba(0,0,0,.9)'}}>
            <Hl text={l.big} hl={l.accent} color={th.A} serif={th.serif} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- REAL PRODUCTION SAAS APP INTERFACE WITH LIVE MOUSE CURSOR
const RealSaasApp: React.FC<{l: Extract<Layer, {type: 'real_saas_app'}>; dur: number}> = ({l, dur}) => {
  const f = useCurrentFrame(); const th = useTh();
  const p = spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 180}});
  const liveMrr = 10480 + Math.floor((f / dur) * 1920);

  // Animated Mouse Cursor Path (Moves to button, clicks it at f=45)
  const cursorX = interpolate(f, [0, 35, 45, 75, 120], [680, 520, 520, 820, 750], clamp);
  const cursorY = interpolate(f, [0, 35, 45, 75, 120], [920, 470, 470, 680, 780], clamp);
  const isClicking = f >= 43 && f <= 50;
  const isDeployed = f >= 46;
  const clickRipple = isClicking ? interpolate(f, [43, 50], [0, 1]) : 0;

  // Bar heights animation
  const bars = [65, 82, 45, 94, 78, 100, 88];

  return (
    <div style={{
      perspective: '1200px',
      position: 'absolute',
      left: 40,
      right: 40,
      top: l.y ?? 370,
      opacity: outFade(f, dur, 6),
      zIndex: 30,
    }}>
      <div style={{
        borderRadius: 32,
        background: 'linear-gradient(175deg, rgba(15, 23, 42, 0.97) 0%, rgba(8, 14, 26, 0.98) 100%)',
        backdropFilter: 'blur(40px)',
        border: `1.5px solid rgba(0, 240, 255, 0.45)`,
        boxShadow: '0 40px 140px -10px rgba(0, 0, 0, 0.95), 0 0 60px rgba(0, 240, 255, 0.2)',
        overflow: 'hidden',
        transform: `scale(${p}) translateY(${(1 - p) * 30}px)`,
        position: 'relative',
      }}>
        {/* 1. App Top Navigation Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ff5f56' }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ffbd2e' }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#27c93f' }} />
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)', margin: '0 6px' }} />
            <div style={{ fontFamily: SANS, fontSize: 18, fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#00f0ff' }}>✦</span> ZenAgent Pro
            </div>
          </div>

          {/* Deploy Button that gets clicked by cursor */}
          <div style={{
            position: 'relative',
            padding: '8px 20px',
            borderRadius: 20,
            background: isDeployed
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            color: '#ffffff',
            fontFamily: MONO,
            fontSize: 16,
            fontWeight: 800,
            boxShadow: isDeployed ? '0 0 25px rgba(16, 185, 129, 0.6)' : '0 0 25px rgba(0, 240, 255, 0.5)',
            transform: isClicking ? 'scale(0.92)' : 'scale(1)',
            transition: 'all 0.1s ease',
          }}>
            {isDeployed ? '🚀 PIPELINE ACTIVE' : '⚡ DEPLOY AGENTS'}
            {clickRipple > 0 && (
              <div style={{
                position: 'absolute',
                inset: -10,
                borderRadius: 30,
                border: '2px solid #00f0ff',
                opacity: 1 - clickRipple,
                transform: `scale(${1 + clickRipple * 0.5})`,
              }} />
            )}
          </div>
        </div>

        {/* 2. Main Dashboard Content Grid */}
        <div style={{ padding: '24px 28px' }}>
          {/* Top Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16, marginBottom: 20 }}>
            {/* Metric 1: MRR */}
            <div style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 15, color: '#94a3b8', textTransform: 'uppercase' }}>Monthly Revenue</span>
                <span style={{ padding: '3px 10px', borderRadius: 12, background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', fontFamily: MONO, fontSize: 13, fontWeight: 800 }}>+62.4% ↑</span>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
                ${liveMrr.toLocaleString()} <span style={{ fontSize: 20, color: '#00f0ff', fontWeight: 700 }}>MRR</span>
              </div>
            </div>

            {/* Metric 2: Active AI Workers */}
            <div style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 15, color: '#94a3b8', textTransform: 'uppercase' }}>AI Workers</span>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
              </div>
              <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
                4 <span style={{ fontSize: 20, color: '#a855f7', fontWeight: 700 }}>CLUSTERS</span>
              </div>
            </div>
          </div>

          {/* Middle: Interactive Revenue Bar Chart */}
          <div style={{
            padding: '20px 24px',
            borderRadius: 22,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 16, color: '#f8fafc', fontWeight: 700 }}>Weekly Growth Velocity</span>
              <span style={{ fontFamily: MONO, fontSize: 14, color: '#38bdf8' }}>Auto-Optimized by Claude 3.5</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 90, gap: 12 }}>
              {bars.map((h, i) => {
                const barSpring = spring({ frame: f - i * 4, fps: FPS, config: { damping: 12, stiffness: 180 } });
                const currentH = Math.max(10, h * barSpring);
                const isMax = i === 5;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: '100%',
                      height: `${currentH}%`,
                      borderRadius: 8,
                      background: isMax
                        ? 'linear-gradient(180deg, #00f0ff 0%, #3b82f6 100%)'
                        : 'rgba(255, 255, 255, 0.12)',
                      boxShadow: isMax ? '0 0 20px rgba(0, 240, 255, 0.5)' : 'none',
                    }} />
                    <span style={{ fontFamily: MONO, fontSize: 12, color: '#64748b' }}>D{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom: Live Customer Stream */}
          <div style={{
            padding: '16px 20px',
            borderRadius: 20,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }}>
                💳
              </div>
              <div>
                <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 700, color: '#ffffff' }}>New Enterprise Subscription</div>
                <div style={{ fontFamily: MONO, fontSize: 13, color: '#94a3b8' }}>Acquired automatically by Agent #2</div>
              </div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 22, fontWeight: 800, color: '#34d399' }}>
              +$499.00
            </div>
          </div>
        </div>

        {/* 3. Live Animated Mouse Pointer */}
        <div style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          pointerEvents: 'none',
          zIndex: 100,
          transform: isClicking ? 'scale(0.85)' : 'scale(1)',
          filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.8))',
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z" fill="#ffffff" stroke="#030712" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- STRIPE TOAST
const SaasToast: React.FC<{l: Extract<Layer, {type: 'saas_toast'}>; dur: number}> = ({l, dur}) => {
  const f = useCurrentFrame(); const th = useTh();
  const p = spring({frame: f, fps: FPS, config: {damping: 12, stiffness: 220}});

  return (
    <div style={{
      position: 'absolute',
      right: 40,
      top: l.y ?? 100,
      borderRadius: 24,
      background: 'rgba(15, 23, 42, 0.94)',
      backdropFilter: 'blur(30px)',
      border: '1.5px solid rgba(56, 189, 248, 0.5)',
      boxShadow: '0 30px 70px rgba(0,0,0,0.8), 0 0 35px rgba(56, 189, 248, 0.35)',
      padding: '18px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      transform: `scale(${p}) translateY(${(1 - p) * -30}px)`,
      opacity: outFade(f, dur, 4),
      zIndex: 60,
    }}>
      <div style={{
        width: 54,
        height: 54,
        borderRadius: 27,
        background: 'linear-gradient(135deg, #10b981, #059669)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        boxShadow: '0 0 25px rgba(16, 185, 129, 0.7)',
      }}>
        💳
      </div>
      <div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: '#ffffff' }}>
          {l.title} <span style={{ color: '#34d399', textShadow: '0 0 15px rgba(52, 211, 153, 0.8)' }}>{l.amount}</span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 16, color: '#94a3b8' }}>
          {l.sub ?? 'Stripe Customer • Just now'}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- CHIPS
const Chips: React.FC<{l: Extract<Layer, {type: 'chips'}>; dur: number}> = ({l, dur}) => {
  const f = useCurrentFrame(); const th = useTh();
  return (
    <AbsoluteFill style={{opacity: outFade(f, dur, 6), zIndex: 40}}>
      {l.items.map((it, i) => {
        const p = spring({frame: f - 4 - i * 10, fps: FPS, config: {damping: 14, stiffness: 220}});
        const done = f > 4 + i * 10 + 14;
        return (
          <div key={i} style={{position: 'absolute', left: it.x, top: it.y, display: 'flex', alignItems: 'center', gap: 14, padding: '16px 30px', borderRadius: 36,
            background: 'rgba(15, 23, 42, 0.94)', border: `1.5px solid ${done ? th.A2 : 'rgba(0, 240, 255, 0.6)'}`, transform: `scale(${p})`, opacity: p, boxShadow: '0 25px 60px rgba(0,0,0,0.7)'}}>
            <span style={{width: 16, height: 16, borderRadius: 8, background: done ? th.A2 : th.A, boxShadow: `0 0 16px ${done ? th.A2 : th.A}`}} />
            <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 34, color: 'white'}}>{it.text}</span>
            <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 34, color: th.A2, opacity: done ? 1 : 0}}>✓</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- CTA & END
const Cta: React.FC<{l: Extract<Layer, {type: 'cta'}>; dur: number}> = ({l, dur}) => {
  const f = useCurrentFrame(); const th = useTh();
  const t = f / FPS;
  const typeAt = l.typeAt ?? 0.8;
  const a = spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 180}});
  const n = Math.floor(interpolate(t, [typeAt, typeAt + 0.12 * l.keyword.length + 0.1], [0, l.keyword.length], clamp));
  const posted = t > typeAt + 0.12 * l.keyword.length + 0.35;
  const dm = spring({frame: f - S(typeAt + 0.12 * l.keyword.length + 0.9), fps: FPS, config: {damping: 13, stiffness: 200}});

  return (
    <AbsoluteFill style={{opacity: outFade(f, dur), zIndex: 60}}>
      {l.question && <Scrim o={a} />}
      {l.question && <div style={{position: 'absolute', top: 230, left: 50, right: 50, textAlign: 'center', opacity: a, transform: `translateY(${(1 - a) * 30}px)`,
        fontFamily: SANS, fontWeight: 800, fontSize: 56, color: 'rgba(255,255,255,.98)', textShadow: '0 6px 30px rgba(0,0,0,.9)'}}>{l.question}</div>}
      <div style={{position: 'absolute', left: 70, right: 70, top: 1020, display: 'flex', alignItems: 'center', gap: 18, padding: '28px 40px', borderRadius: 46, background: 'white',
        transform: `scale(${spring({frame: f - S(Math.max(0, typeAt - 0.6)), fps: FPS, config: {damping: 13}})})`, boxShadow: '0 35px 90px rgba(0,0,0,.8)'}}>
        <svg width="50" height="50" viewBox="0 0 24 24"><path d="M4 4h16v12H8l-4 4z" fill="none" stroke="#111" strokeWidth="2.6" strokeLinejoin="round" /></svg>
        <span style={{flex: 1, fontFamily: SANS, fontWeight: 800, fontSize: 52, color: n ? '#111' : '#9ca3af', letterSpacing: n ? 2 : 0}}>{n ? l.keyword.slice(0, n) : 'Add a comment…'}</span>
        <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 42, color: n >= l.keyword.length ? '#0095f6' : '#bfdbfe'}}>{posted ? '✓' : 'Post'}</span>
      </div>
      {l.dm !== '' && <div style={{position: 'absolute', left: 0, right: 0, top: 1210, display: 'flex', justifyContent: 'center', opacity: dm, transform: `translateY(${(1 - dm) * 20}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '20px 40px', borderRadius: 36, background: 'rgba(15, 23, 42, 0.96)', border: `2px solid ${th.A}`, boxShadow: '0 20px 50px rgba(0,240,255,0.35)'}}>
          <svg width="38" height="38" viewBox="0 0 24 24"><path d="M3 20 21 12 3 4v6l12 2-12 2z" fill={th.A} /></svg>
          <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: 'white'}}>{l.dm ?? 'Link DM mein milega'}</span>
        </div>
      </div>}
    </AbsoluteFill>
  );
};

const End: React.FC<{l: Extract<Layer, {type: 'end'}>}> = ({l}) => {
  const f = useCurrentFrame(); const th = useTh();
  const a = interpolate(f, [0, 8], [0, 1], clamp);
  const b = interpolate(f, [4, 20], [0, 1], {...clamp, easing: ease});

  return (
    <AbsoluteFill style={{background: 'rgba(2,4,10,0.98)', opacity: a, justifyContent: 'center', alignItems: 'center', zIndex: 70}}>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 100, color: 'white', letterSpacing: -2, opacity: b, transform: `translateY(${(1 - b) * 20}px)`, textAlign: 'center', padding: '0 50px'}}>
        <Hl text={l.title} hl={l.accent} color={th.A} serif={th.serif} />
      </div>
      {l.sub && <div style={{marginTop: 24, fontFamily: MONO, fontWeight: 600, fontSize: 44, color: 'rgba(255,255,255,.8)', opacity: b}}>{l.sub}</div>}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- ZENBUDGET FINANCE & EXPENSE TRACKER UI
const ZenBudgetApp: React.FC<{l: Extract<Layer, {type: 'zen_budget_app'}>; dur: number}> = ({l, dur}) => {
  const f = useCurrentFrame(); const th = useTh();
  const p = spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 180}});
  const savedAmount = 3850 + Math.floor((f / dur) * 650);

  // Animated Mouse Cursor Path (Moves to button, clicks it at f=45)
  const cursorX = interpolate(f, [0, 35, 45, 75, 120], [700, 520, 520, 800, 720], clamp);
  const cursorY = interpolate(f, [0, 35, 45, 75, 120], [880, 480, 480, 650, 750], clamp);
  const isClicking = f >= 43 && f <= 50;
  const isOptimized = f >= 46;
  const clickRipple = isClicking ? interpolate(f, [43, 50], [0, 1]) : 0;

  const categories = [
    { name: '🏡 Rent & Living', amt: '$1,200', pct: 40, col: '#38bdf8' },
    { name: '📈 High-Yield & Stocks', amt: '$1,500', pct: 50, col: '#34d399' },
    { name: '🥗 Food & Groceries', amt: '$380', pct: 15, col: '#fbbf24' },
    { name: '☕ Subscriptions', amt: '$95', pct: 5, col: '#f87171' },
  ];

  return (
    <div style={{
      perspective: '1200px',
      position: 'absolute',
      left: 40,
      right: 40,
      top: l.y ?? 380,
      opacity: outFade(f, dur, 6),
      zIndex: 30,
    }}>
      <div style={{
        borderRadius: 32,
        background: 'linear-gradient(175deg, rgba(13, 23, 38, 0.98) 0%, rgba(6, 12, 22, 0.99) 100%)',
        backdropFilter: 'blur(40px)',
        border: `1.5px solid rgba(52, 211, 153, 0.45)`,
        boxShadow: '0 40px 140px -10px rgba(0, 0, 0, 0.95), 0 0 60px rgba(52, 211, 153, 0.2)',
        overflow: 'hidden',
        transform: `scale(${p}) translateY(${(1 - p) * 30}px)`,
        position: 'relative',
      }}>
        {/* App Top Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ff5f56' }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ffbd2e' }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#27c93f' }} />
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)', margin: '0 6px' }} />
            <div style={{ fontFamily: SANS, fontSize: 18, fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#34d399' }}>💸</span> ZenBudget AI • Smart Vault
            </div>
          </div>

          <div style={{
            position: 'relative',
            padding: '8px 20px',
            borderRadius: 20,
            background: isOptimized
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            color: '#ffffff',
            fontFamily: MONO,
            fontSize: 16,
            fontWeight: 800,
            boxShadow: isOptimized ? '0 0 25px rgba(16, 185, 129, 0.7)' : '0 0 25px rgba(5, 150, 105, 0.5)',
            transform: isClicking ? 'scale(0.92)' : 'scale(1)',
            transition: 'all 0.1s ease',
          }}>
            {isOptimized ? '✓ $340 SAVED / MO' : '⚡ AUTO-OPTIMIZE'}
            {clickRipple > 0 && (
              <div style={{
                position: 'absolute',
                inset: -10,
                borderRadius: 30,
                border: '2px solid #34d399',
                opacity: 1 - clickRipple,
                transform: `scale(${1 + clickRipple * 0.5})`,
              }} />
            )}
          </div>
        </div>

        {/* Main Dashboard */}
        <div style={{ padding: '24px 28px' }}>
          {/* Top Row: Monthly Budget & AI Savings */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16, marginBottom: 20 }}>
            <div style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 15, color: '#94a3b8', textTransform: 'uppercase' }}>Monthly Savings</span>
                <span style={{ padding: '3px 10px', borderRadius: 12, background: 'rgba(52, 211, 153, 0.2)', color: '#4ade80', fontFamily: MONO, fontSize: 13, fontWeight: 800 }}>88% of Goal</span>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
                ${savedAmount.toLocaleString()} <span style={{ fontSize: 20, color: '#34d399', fontWeight: 700 }}>/ $5,000</span>
              </div>
              {/* Progress bar */}
              <div style={{ width: '100%', height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)', marginTop: 12, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, (savedAmount / 5000) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: 4, boxShadow: '0 0 15px #34d399' }} />
              </div>
            </div>

            <div style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 15, color: '#94a3b8', textTransform: 'uppercase' }}>AI Leak Flag</span>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: '#f87171', boxShadow: '0 0 8px #f87171' }} />
              </div>
              <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 900, color: '#f87171', letterSpacing: -1 }}>
                -$340 <span style={{ fontSize: 18, color: '#94a3b8', fontWeight: 700 }}>/mo</span>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#38bdf8', marginTop: 6 }}>Unused Subscriptions</div>
            </div>
          </div>

          {/* Category Pills */}
          <div style={{
            padding: '18px 20px',
            borderRadius: 22,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: MONO, fontSize: 15, color: '#f8fafc', fontWeight: 700 }}>Automated Category Distribution</span>
              <span style={{ fontFamily: MONO, fontSize: 13, color: '#34d399' }}>Zero Manual Entry</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {categories.map((c, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: SANS, fontSize: 15, color: '#e2e8f0', fontWeight: 600 }}>{c.name}</span>
                  <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: c.col }}>{c.amt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Live Transaction item */}
          <div style={{
            padding: '16px 20px',
            borderRadius: 20,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: 'linear-gradient(135deg, #38bdf8, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)' }}>
                ⚡
              </div>
              <div>
                <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 700, color: '#ffffff' }}>Salary Auto-Splitted to High Yield</div>
                <div style={{ fontFamily: MONO, fontSize: 13, color: '#94a3b8' }}>50% Expenses • 30% Wealth • 20% Freedom</div>
              </div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 22, fontWeight: 800, color: '#34d399' }}>
              +$2,400.00
            </div>
          </div>
        </div>

        {/* Animated Mouse Pointer */}
        <div style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          pointerEvents: 'none',
          zIndex: 100,
          transform: isClicking ? 'scale(0.85)' : 'scale(1)',
          filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.8))',
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z" fill="#ffffff" stroke="#030712" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- PORTFOLIO WEALTH NET WORTH APP
const PortfolioApp: React.FC<{l: Extract<Layer, {type: 'portfolio_app'}>; dur: number}> = ({l, dur}) => {
  const f = useCurrentFrame(); const th = useTh();
  const p = spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 180}});
  const netWorth = 84290 + Math.floor((f / dur) * 8500);

  const cursorX = interpolate(f, [0, 35, 45, 75, 120], [690, 530, 530, 780, 710], clamp);
  const cursorY = interpolate(f, [0, 35, 45, 75, 120], [860, 480, 480, 640, 740], clamp);
  const isClicking = f >= 43 && f <= 50;
  const isRebalanced = f >= 46;

  return (
    <div style={{
      perspective: '1200px',
      position: 'absolute',
      left: 40,
      right: 40,
      top: l.y ?? 380,
      opacity: outFade(f, dur, 6),
      zIndex: 30,
    }}>
      <div style={{
        borderRadius: 32,
        background: 'linear-gradient(175deg, rgba(20, 16, 38, 0.98) 0%, rgba(10, 8, 22, 0.99) 100%)',
        backdropFilter: 'blur(40px)',
        border: `1.5px solid rgba(168, 85, 247, 0.45)`,
        boxShadow: '0 40px 140px -10px rgba(0, 0, 0, 0.95), 0 0 60px rgba(168, 85, 247, 0.25)',
        overflow: 'hidden',
        transform: `scale(${p}) translateY(${(1 - p) * 30}px)`,
        position: 'relative',
      }}>
        {/* App Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ff5f56' }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ffbd2e' }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: '#27c93f' }} />
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)', margin: '0 6px' }} />
            <div style={{ fontFamily: SANS, fontSize: 18, fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#c084fc' }}>📈</span> WealthMatrix Pro
            </div>
          </div>

          <div style={{
            position: 'relative',
            padding: '8px 20px',
            borderRadius: 20,
            background: isRebalanced
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            color: '#ffffff',
            fontFamily: MONO,
            fontSize: 16,
            fontWeight: 800,
            boxShadow: isRebalanced ? '0 0 25px rgba(16, 185, 129, 0.7)' : '0 0 25px rgba(139, 92, 246, 0.5)',
            transform: isClicking ? 'scale(0.92)' : 'scale(1)',
          }}>
            {isRebalanced ? '✓ PORTFOLIO OPTIMIZED' : '🔥 AUTO-REBALANCE'}
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 15, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6 }}>Total Net Worth</div>
              <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
                ${netWorth.toLocaleString()} <span style={{ fontSize: 22, color: '#34d399', fontWeight: 800 }}>+38.4% YTD</span>
              </div>
            </div>
            <div style={{ padding: '8px 16px', borderRadius: 16, background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', color: '#e9d5ff', fontFamily: MONO, fontSize: 14, fontWeight: 700 }}>
              Compound Tier 1
            </div>
          </div>

          {/* Growth Wave SVG */}
          <div style={{ height: 120, position: 'relative', marginBottom: 20 }}>
            <svg width="100%" height="100%" viewBox="0 0 500 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wealthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,100 C100,80 180,95 260,50 C340,15 420,30 500,5 L500,120 L0,120 Z" fill="url(#wealthGrad)" />
              <path d="M0,100 C100,80 180,95 260,50 C340,15 420,30 500,5" fill="none" stroke="#c084fc" strokeWidth="4" />
            </svg>
          </div>

          {/* Asset Allocation Badges */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, padding: '12px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#94a3b8' }}>EQUITIES (55%)</div>
              <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 800, color: '#ffffff', marginTop: 4 }}>+$46,350</div>
            </div>
            <div style={{ flex: 1, padding: '12px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#94a3b8' }}>CRYPTO (25%)</div>
              <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 800, color: '#38bdf8', marginTop: 4 }}>+$21,070</div>
            </div>
            <div style={{ flex: 1, padding: '12px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#94a3b8' }}>CASH (20%)</div>
              <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 800, color: '#34d399', marginTop: 4 }}>+$16,870</div>
            </div>
          </div>
        </div>

        {/* Pointer */}
        <div style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          pointerEvents: 'none',
          zIndex: 100,
          transform: isClicking ? 'scale(0.85)' : 'scale(1)',
          filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.8))',
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z" fill="#ffffff" stroke="#030712" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const renderLayer = (l: Layer, dur: number) => {
  switch (l.type) {
    case 'sub': return <Sub l={l} dur={dur} />;
    case 'big': return <Big l={l} dur={dur} />;
    case 'chips': return <Chips l={l} dur={dur} />;
    case 'cta': return <Cta l={l} dur={dur} />;
    case 'end': return <End l={l} />;
    case 'real_saas_app': return <RealSaasApp l={l} dur={dur} />;
    case 'zen_budget_app': return <ZenBudgetApp l={l} dur={dur} />;
    case 'portfolio_app': return <PortfolioApp l={l} dur={dur} />;
    case 'saas_toast': return <SaasToast l={l} dur={dur} />;
    case 'black': return <AbsoluteFill style={{background: '#000'}} />;
    default: return null;
  }
};

// ---------------------------------------------------------------- ROOT
export const Reel: React.FC<EDL> = (edl) => {
  const f = useCurrentFrame();
  const th: Th = {A: edl.theme?.accent ?? '#00f0ff', A2: edl.theme?.accent2 ?? '#8b5cf6', BG: edl.theme?.bg ?? '#030712', serif: !!edl.theme?.serifAccent};
  const fade = edl.fadeOutAt ? interpolate(f / FPS, [edl.fadeOutAt - 0.25, edl.fadeOutAt], [1, 0], clamp) : 1;
  const order = (l: Layer) => (['end', 'black'].includes(l.type) ? 3 : l.type === 'saas_toast' ? 2 : l.type === 'sub' ? 1 : 0);
  const layers = [...edl.layers].map((l, i) => ({l, i})).sort((a, b) => order(a.l) - order(b.l));

  return (
    <ThemeCtx.Provider value={th}>
      <AbsoluteFill style={{background: '#02040a'}}>
        <SaaSBackground />
        <AbsoluteFill style={{opacity: fade}}>
          <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,${edl.vignette ?? 0.5}) 100%)`}} />
        </AbsoluteFill>
        {layers.map(({l, i}) => {
          const d = Math.max(1, S(l.to) - S(l.from));
          return <Sequence key={`l${i}`} from={S(l.from)} durationInFrames={d}>{renderLayer(l, d)}</Sequence>;
        })}
      </AbsoluteFill>
    </ThemeCtx.Provider>
  );
};
