'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './Scene';
import ParallaxLayers from './ParallaxLayers';
import ContentPanels from './ContentPanels';
import SideProfileMarquee from './SideProfileMarquee';
import VictoryJourney from './VictoryJourney/VictoryJourney';

gsap.registerPlugin(ScrollTrigger);

// ── Scroll budget ─────────────────────────────────────────────
// Act 1 — aerial sweep intro  : 0.00 → 0.28 of total progress
// Act 2 — Victory Journey     : 0.28 → 1.00 of total progress
const SCROLL_HEIGHT    = 900; // vh — total sticky pin height
const JOURNEY_START_T  = 0.28; // fraction where Act 2 begins

function CanvasLoader() {
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36,
          border: '2px solid #E8002D',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'rb19spin 0.8s linear infinite',
        }} />
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#555', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          Loading RB19
        </span>
        <style>{`@keyframes rb19spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

export default function RB19Hero() {
  const wrapperRef     = useRef<HTMLDivElement>(null);
  const stickyRef      = useRef<HTMLDivElement>(null);

  // ── Shared state refs (read every rAF, never cause re-render) ─
  const globalProgress  = useRef(0);   // 0→1 across the full 900vh
  const journeyProgress = useRef(0);   // 0→1 within Act 2 only
  const floatRef        = useRef(0);
  const scrollVelocity  = useRef(0);   // instantaneous speed 0→1
  const phase           = useRef<'intro' | 'journey'>('intro');

  // Previous progress for velocity calculation
  const prevProgress    = useRef(0);
  const velEMA          = useRef(0);

  // DOM element refs
  const progressBarRef  = useRef<HTMLDivElement>(null);
  const speedLinesRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vh            = window.innerHeight;
    const totalScrollPx = (SCROLL_HEIGHT / 100) * vh;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1px)', () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start:   'top top',
            end:     `+=${totalScrollPx}`,
            pin:     stickyRef.current,
            pinSpacing: false,
            scrub:   0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const t = self.progress;
              globalProgress.current = t;

              // ── Velocity (EMA-smoothed delta per frame) ──────────
              const delta = t - prevProgress.current;
              prevProgress.current = t;
              velEMA.current = velEMA.current * 0.70 + Math.abs(delta) * 0.30 * 60;
              // Normalise velocity to 0→1 range (cap at ~0.04 delta/frame)
              scrollVelocity.current = Math.min(1, velEMA.current / 0.04);

              // ── Phase switch ─────────────────────────────────────
              phase.current = t >= JOURNEY_START_T ? 'journey' : 'intro';

              // ── Journey progress (re-mapped 0→1 within Act 2) ───
              journeyProgress.current = t < JOURNEY_START_T
                ? 0
                : Math.min(1, (t - JOURNEY_START_T) / (1 - JOURNEY_START_T));

              // ── Progress bar ─────────────────────────────────────
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${t})`;
              }

              // ── Speed lines fade ──────────────────────────────────
              // Ramp up during intro, dissolve as journey begins
              if (speedLinesRef.current) {
                const opacity = t < 0.15
                  ? t / 0.15                                    // 0→1
                  : t < JOURNEY_START_T
                    ? 1                                         // held
                    : Math.max(0, 1 - (t - JOURNEY_START_T) / 0.06); // dissolve
                speedLinesRef.current.style.opacity = String(opacity);
              }
            },
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${SCROLL_HEIGHT}vh`, position: 'relative' }}
    >
      <div
        ref={stickyRef}
        style={{
          position:  'sticky',
          top:       0,
          width:     '100%',
          height:    '100vh',
          overflow:  'hidden',
          background: '#000',
        }}
      >
        {/* ── z 1-9: CSS parallax backgrounds ───────────────── */}
        <ParallaxLayers
          containerRef={wrapperRef}
          totalScroll={typeof window !== 'undefined' ? (SCROLL_HEIGHT / 100) * window.innerHeight : 9000}
        />

        {/* ── z 10: Speed lines (intro only) ────────────────── */}
        <div
          ref={speedLinesRef}
          style={{
            position: 'absolute', inset: 0,
            zIndex: 10, pointerEvents: 'none',
            opacity: 0, overflow: 'hidden',
          }}
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} style={{
              position:  'absolute',
              top:       `${5 + i * 5.2}%`,
              left:      0, right: 0,
              height:    i % 3 === 0 ? '1px' : '0.5px',
              background: `rgba(255,255,255,${0.03 + (i % 4) * 0.015})`,
              transform: `skewY(${i % 2 === 0 ? '-0.3' : '0.3'}deg)`,
            }} />
          ))}
        </div>

        {/* ── z 15: Intro marquee (side-profile scene) ──────── */}
        <SideProfileMarquee scrollProgress={globalProgress} />

        {/* ── z 16-38: Victory Journey overlays ─────────────── */}
        <VictoryJourney
          journeyProgress={journeyProgress}
          scrollVelocity={scrollVelocity}
        />

        {/* ── z 20: Three.js Canvas ──────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
          <Canvas
            camera={{ fov: 52, near: 0.01, far: 1000 }}
            gl={{ antialias: true, alpha: true, toneMapping: 3 }}
            shadows
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <Scene
                scrollProgress={globalProgress}
                floatRef={floatRef}
                phase={phase}
                scrollVelocity={scrollVelocity}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* ── z 30: Content panels (intro only, fade naturally) ─ */}
        <ContentPanels
          containerRef={wrapperRef}
          totalScroll={typeof window !== 'undefined' ? (SCROLL_HEIGHT / 100) * window.innerHeight : 9000}
        />

        {/* ── z 40: Top status bar ───────────────────────────── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          zIndex: 40, padding: '20px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#E8002D',
              animation: 'rb19pulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E8002D' }}>
              Oracle Red Bull Racing
            </span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            RB19 · 2023
          </span>
          <style>{`@keyframes rb19pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
        </div>

        {/* ── z 40: Hero title (intro only) ─────────────────── */}
        <div
          id="rb19-hero-title"
          style={{
            position: 'absolute',
            bottom: '18%', left: '5%',
            zIndex: 40, pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily:    'system-ui, sans-serif',
            fontSize:      'clamp(36px, 6vw, 80px)',
            fontWeight:    900, fontStyle: 'italic',
            color:         '#fff', lineHeight: 1.0,
            letterSpacing: '-0.04em',
            textShadow:    '0 2px 60px rgba(0,0,0,0.9)',
          }}>
            RB19.
          </div>
          <div style={{
            fontFamily:    'monospace', fontSize: 11,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.35)', marginTop: 8,
          }}>
            Scroll to race ↓
          </div>
        </div>

        {/* ── z 40: Bottom progress bar ──────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 40, padding: '0 28px 16px', pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            {[
              { l: 'Constructor', v: 'Red Bull Racing' },
              { l: 'Season',      v: '2023' },
              { l: 'Wins',        v: '21 / 22' },
              { l: 'Driver',      v: 'Max Verstappen' },
            ].map((d) => (
              <div key={d.l} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                  {d.l}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
                  {d.v}
                </span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
            <div ref={progressBarRef} style={{
              position: 'absolute', inset: 0,
              background: '#E8002D', transformOrigin: 'left', transform: 'scaleX(0)',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
