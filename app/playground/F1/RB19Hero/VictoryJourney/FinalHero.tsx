'use client';

/**
 * FinalHero
 * ────────────────────────────────────────────────────────────
 * The closing scene. Fades in as journeyProgress → 0.92+.
 * Covers the checkpoint strip with a dramatic black vignette
 * and reveals staggered championship typography.
 *
 * Sits at z-index 38 (above everything except the top status bar).
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface FinalHeroProps {
  journeyProgress: React.MutableRefObject<number>;
}

const LINES = [
  { text: '21',                 size: 'clamp(90px, 14vw, 200px)', weight: 900,  italic: true,  color: '#E8002D',             spacing: '-0.05em', delay: 0.0  },
  { text: 'GRAND PRIX WINS',   size: 'clamp(12px, 1.6vw, 22px)',  weight: 700,  italic: false, color: 'rgba(255,255,255,0.7)', spacing: '0.35em',  delay: 0.15 },
  { text: '',                   size: '24px',                       weight: 400,  italic: false, color: 'transparent',         spacing: '0',       delay: 0.0  },
  { text: '860 PTS',           size: 'clamp(32px, 5vw, 72px)',    weight: 900,  italic: true,  color: '#ffffff',              spacing: '-0.03em', delay: 0.3  },
  { text: 'CONSTRUCTORS\' CHAMPIONSHIP',
                                size: 'clamp(8px, 1.1vw, 15px)',   weight: 700,  italic: false, color: 'rgba(255,255,255,0.4)', spacing: '0.3em',   delay: 0.4  },
  { text: '',                   size: '16px',                       weight: 400,  italic: false, color: 'transparent',         spacing: '0',       delay: 0.0  },
  { text: 'THE MOST DOMINANT',  size: 'clamp(10px, 1.3vw, 18px)',  weight: 700,  italic: false, color: 'rgba(255,255,255,0.25)', spacing: '0.25em', delay: 0.5  },
  { text: 'FORMULA 1 CAR',     size: 'clamp(10px, 1.3vw, 18px)',  weight: 700,  italic: false, color: 'rgba(255,255,255,0.25)', spacing: '0.25em', delay: 0.6  },
  { text: 'IN HISTORY',        size: 'clamp(10px, 1.3vw, 18px)',  weight: 700,  italic: false, color: 'rgba(255,255,255,0.25)', spacing: '0.25em', delay: 0.7  },
  { text: '',                   size: '20px',                       weight: 400,  italic: false, color: 'transparent',         spacing: '0',       delay: 0.0  },
  { text: 'RED BULL RB19',      size: 'clamp(28px, 4vw, 58px)',    weight: 900,  italic: true,  color: 'rgba(255,255,255,0.08)', spacing: '0.02em', delay: 0.9  },
  { text: '2023',               size: 'clamp(11px, 1.4vw, 20px)',  weight: 700,  italic: false, color: 'rgba(255,255,255,0.15)', spacing: '0.4em',  delay: 1.0  },
];

export default function FinalHero({ journeyProgress }: FinalHeroProps) {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const lineRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const animated     = useRef(false);
  const hidden       = useRef(true);

  useEffect(() => {
    const ticker = gsap.ticker.add(() => {
      const t = journeyProgress.current;

      // Start appearing at t = 0.90
      const vis = Math.max(0, (t - 0.90) / 0.06);

      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(Math.min(1, vis));
        overlayRef.current.style.visibility = vis > 0.01 ? 'visible' : 'hidden';
      }

      // Trigger the staggered text animation once
      if (vis > 0.3 && !animated.current) {
        animated.current = true;

        lineRefs.current.forEach((el, i) => {
          if (!el) return;
          const line = LINES[i];
          if (!line.text) return;

          gsap.fromTo(
            el,
            { opacity: 0, y: 20, filter: 'blur(8px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.1,
              delay: line.delay,
              ease: 'power3.out',
            }
          );
        });

        // Spotlight
        if (spotlightRef.current) {
          gsap.fromTo(
            spotlightRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: 'power2.inOut' }
          );
        }
      }

      // Reset if user scrolls back
      if (vis < 0.1 && animated.current) {
        animated.current = false;
        lineRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 0, y: 20, filter: 'blur(8px)' });
        });
        if (spotlightRef.current) gsap.set(spotlightRef.current, { opacity: 0 });
      }
    });

    return () => gsap.ticker.remove(ticker);
  }, [journeyProgress]);

  return (
    <div
      ref={overlayRef}
      style={{
        position:   'absolute',
        inset:      0,
        zIndex:     38,
        pointerEvents: 'none',
        opacity:    0,
        visibility: 'hidden',
        display:    'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Dark backdrop */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.88) 100%)',
      }} />

      {/* Spotlight cone — from above, illuminates where car is */}
      <div
        ref={spotlightRef}
        style={{
          position:  'absolute',
          top:       '-10%',
          left:      '50%',
          transform: 'translateX(-50%)',
          width:     '60vw',
          height:    '130%',
          opacity:   0,
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 75deg, rgba(255,255,255,0.04) 90deg, rgba(255,255,255,0.04) 90deg, transparent 105deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Red accent line */}
      <div style={{
        position: 'absolute',
        top:      '15%',
        left:     '10%',
        right:    '10%',
        height:   1,
        background: 'linear-gradient(90deg, transparent, rgba(232,0,45,0.4) 30%, rgba(232,0,45,0.4) 70%, transparent)',
      }} />
      <div style={{
        position: 'absolute',
        bottom:   '15%',
        left:     '10%',
        right:    '10%',
        height:   1,
        background: 'linear-gradient(90deg, transparent, rgba(232,0,45,0.15) 30%, rgba(232,0,45,0.15) 70%, transparent)',
      }} />

      {/* Typography block */}
      <div
        style={{
          position:      'relative',
          zIndex:        1,
          textAlign:     'center',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           4,
          padding:       '0 8%',
          maxWidth:      760,
        }}
      >
        {LINES.map((line, i) => (
          <div
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            style={{
              fontFamily:    line.italic ? 'system-ui, "Arial Black", sans-serif' : 'monospace',
              fontSize:      line.size,
              fontWeight:    line.weight,
              fontStyle:     line.italic ? 'italic' : 'normal',
              color:         line.color,
              letterSpacing: line.spacing,
              textTransform: 'uppercase',
              lineHeight:    1.0,
              opacity:       0,
              willChange:    'transform, opacity, filter',
              minHeight:     line.text ? undefined : line.size,
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
