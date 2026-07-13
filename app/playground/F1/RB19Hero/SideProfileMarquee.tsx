'use client';

/**
 * SideProfileMarquee
 * ─────────────────────────────────────────────────────────
 * Three-layer parallax kinetic typography overlay that fades
 * in as scroll progress crosses 0.55 and fully reveals by 0.7.
 *
 * Layer 1 — Large championship text   (moves at 100% scroll speed)
 * Layer 2 — Stats / secondary text    (moves at  70% scroll speed)
 * Layer 3 — Ghost "RB19" watermark    (moves at  40% scroll speed)
 *
 * All three tracks are infinitely looped via CSS animation +
 * GSAP-driven translateX offset that is updated every frame
 * from the scroll velocity, giving the "scrub" feel.
 *
 * Sits behind the Three.js canvas (z-index 15) so the car
 * always reads as the foreground.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

// ── Content ─────────────────────────────────────────────────
const TRACK_1 =
  '21 WINS  •  CONSTRUCTORS CHAMPION  •  WORLD CHAMPION  •  ' +
  'MAX VERSTAPPEN  •  RB19  •  21 WINS  •  95.5% WIN RATE  •  ' +
  'RECORD BREAKING  •  DOMINANCE  •  ';

const TRACK_2 =
  '21 PODIUMS  •  FASTEST LAP × 15  •  860 PTS  •  ' +
  'HONDA RBPTH001  •  1000 BHP  •  ';

const TRACK_3 = 'RB19  •  RB19  •  RB19  •  RB19  •  RB19  •  ';

// Duplicate each track so we can seamlessly reset without a visible pop
function repeatText(str: string, times = 3): string {
  return str.repeat(times);
}

// ── Speed constants ──────────────────────────────────────────
// Base auto-scroll speed (px / second) when no scrolling
const BASE_SPEED = 60; // px/s

// Pixels of translation added per unit of scroll progress (0→1)
// i.e. when progress goes 0.5→1.0, layer1 shifts by SCROLL_TRAVEL*0.5
const SCROLL_TRAVEL = 2400; // px — total X shift across the marquee section

interface SideProfileMarqueeProps {
  /** Raw 0-1 progress ref shared with the main scroll timeline. */
  scrollProgress: React.MutableRefObject<number>;
}

export default function SideProfileMarquee({
  scrollProgress,
}: SideProfileMarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Per-track refs — we set transform directly each frame for GPU perf
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const track3Ref = useRef<HTMLDivElement>(null);

  // Internal position state (pixels, updated by ticker)
  const pos1 = useRef(0);
  const pos2 = useRef(0);
  const pos3 = useRef(0);

  // Previous scroll progress, used to derive delta-scroll each tick
  const prevProgress = useRef(scrollProgress.current);

  // Scroll velocity smoother (exponential moving average)
  const velEMA = useRef(0);

  useEffect(() => {
    if (!wrapRef.current) return;

    // ── Fade-in the whole layer based on scroll progress ──────
    // Uses a GSAP ticker so it runs every rAF without a ScrollTrigger
    // dependency (the ST instance lives in RB19Hero)

    const ticker = gsap.ticker.add(() => {
      const t    = scrollProgress.current;
      const wrap = wrapRef.current;
      if (!wrap) return;

      // ── Visibility ──────────────────────────────────────────
      // Ramp opacity: 0 below t=0.55, fully visible by t=0.70
      const opacity = Math.min(1, Math.max(0, (t - 0.55) / 0.15));
      wrap.style.opacity = String(opacity);
      wrap.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';

      // ── Scroll-driven offset ────────────────────────────────
      const deltaProgress = t - prevProgress.current;
      prevProgress.current = t;

      // Convert scroll delta to velocity signal (px per ticker call)
      // Ticker fires ~60×/s, so multiply by frame contribution
      const rawVel = deltaProgress * SCROLL_TRAVEL;

      // EMA smoothing — prevents jitter
      velEMA.current = velEMA.current * 0.82 + rawVel * 0.18;

      // Auto-advance (constant base scroll between user interactions)
      const dt   = gsap.ticker.deltaRatio() * (1 / 60);
      const auto = BASE_SPEED * dt;

      // Parallax multipliers per layer
      pos1.current -= auto + velEMA.current * 1.0;
      pos2.current -= auto + velEMA.current * 0.7;
      pos3.current -= auto + velEMA.current * 0.4;

      // Seamless loop — when a track shifts past its natural width,
      // snap back by exactly that width.  The inner content is 3×
      // duplicated so any visible seam is off-screen.
      const snap1 = track1Ref.current?.scrollWidth
        ? track1Ref.current.scrollWidth / 3
        : 4000;
      const snap2 = track2Ref.current?.scrollWidth
        ? track2Ref.current.scrollWidth / 3
        : 3000;
      const snap3 = track3Ref.current?.scrollWidth
        ? track3Ref.current.scrollWidth / 3
        : 5000;

      if (pos1.current < -snap1) pos1.current += snap1;
      if (pos2.current < -snap2) pos2.current += snap2;
      if (pos3.current < -snap3) pos3.current += snap3;

      // Apply — GPU-composited transform, no layout thrash
      if (track1Ref.current)
        track1Ref.current.style.transform = `translateX(${pos1.current}px)`;
      if (track2Ref.current)
        track2Ref.current.style.transform = `translateX(${pos2.current}px)`;
      if (track3Ref.current)
        track3Ref.current.style.transform = `translateX(${pos3.current}px)`;
    });

    return () => {
      gsap.ticker.remove(ticker);
    };
  }, [scrollProgress]);

  // ── Shared text styles ───────────────────────────────────
  const baseTrackStyle: React.CSSProperties = {
    position:      'absolute',
    left:          0,
    whiteSpace:    'nowrap',
    willChange:    'transform',
    userSelect:    'none',
    pointerEvents: 'none',
    lineHeight:    1,
  };

  return (
    /*
     * Outer wrapper — positioned behind the Three.js canvas (z 15)
     * and only covers the bottom 65% of the viewport to let
     * the car body read cleanly against darkness at the top.
     */
    <div
      ref={wrapRef}
      style={{
        position:    'absolute',
        inset:       0,
        zIndex:      15,
        overflow:    'hidden',
        opacity:     0,
        visibility:  'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* ── Studio gradient backdrop ──────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(8,8,16,0) 30%, rgba(0,0,0,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 3 — Ghost "RB19" watermark (40% speed, moves slowest) ── */}
      {/* Sits lowest so the car and other text read over it */}
      <div
        style={{
          position: 'absolute',
          top:      '50%',
          transform: 'translateY(-50%)',
          width:    '100%',
          height:   '70%',
          display:  'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          ref={track3Ref}
          style={{
            ...baseTrackStyle,
            top:        '50%',
            transform:  'translateY(-50%)',
            fontSize:   'clamp(180px, 28vw, 360px)',
            fontWeight: 900,
            fontStyle:  'italic',
            letterSpacing: '0.05em',
            fontFamily: 'system-ui, "Arial Black", sans-serif',
            color:      'rgba(255,255,255,0.03)',
            textTransform: 'uppercase',
          }}
        >
          {repeatText(TRACK_3)}
        </div>
      </div>

      {/* ── Layer 2 — Stats text (70% speed) ──────────────── */}
      <div
        style={{
          position: 'absolute',
          top:      '72%',
          width:    '100%',
          overflow: 'hidden',
        }}
      >
        <div
          ref={track2Ref}
          style={{
            ...baseTrackStyle,
            fontSize:      'clamp(11px, 1.1vw, 18px)',
            fontWeight:    700,
            letterSpacing: '0.35em',
            fontFamily:    'monospace',
            color:         'rgba(232,0,45,0.55)',
            textTransform: 'uppercase',
          }}
        >
          {repeatText(TRACK_2)}
        </div>
      </div>

      {/* ── Layer 1 — Large championship text (100% speed, hero) ── */}
      <div
        style={{
          position: 'absolute',
          top:      '58%',
          width:    '100%',
          overflow: 'hidden',
        }}
      >
        <div
          ref={track1Ref}
          style={{
            ...baseTrackStyle,
            fontSize:      'clamp(52px, 7.5vw, 120px)',
            fontWeight:    900,
            fontStyle:     'italic',
            letterSpacing: '0.04em',
            fontFamily:    'system-ui, "Arial Black", sans-serif',
            color:         'rgba(255,255,255,0.12)',
            textTransform: 'uppercase',
          }}
        >
          {repeatText(TRACK_1)}
        </div>
      </div>

      {/* ── Bottom fade — merges into the progress bar ────────── */}
      <div
        style={{
          position: 'absolute',
          bottom:   0,
          left:     0,
          right:    0,
          height:   '20%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Top fade — merges into dark upper half ────────────── */}
      <div
        style={{
          position: 'absolute',
          top:      0,
          left:     0,
          right:    0,
          height:   '40%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
