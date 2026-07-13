'use client';

/**
 * LiveStats
 * ─────────────────────────────────────────────────────────
 * Four animated counters that update as each race passes:
 *   • Wins          (count up to 21)
 *   • Points        (count up to 860)
 *   • Consecutive   (longest win streak)
 *   • Podiums       (show cumulativeWins since all are wins)
 *
 * Each counter "ticks" on the frame a new race is entered,
 * with a brief highlight flash.
 *
 * Sits at z-index 35 (above canvas + cards).
 * Lives in the top-right corner of the journey viewport.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { RACE_WINS, progressToRaceIndex } from './data';

interface LiveStatsProps {
  journeyProgress: React.MutableRefObject<number>;
}

interface StatDisplay {
  label: string;
  key: 'cumulativeWins' | 'pts' | 'consecutiveWins';
  suffix?: string;
  color: string;
}

const STATS: StatDisplay[] = [
  { label: 'Wins',        key: 'cumulativeWins',  color: '#E8002D' },
  { label: 'Pts',         key: 'pts',             color: '#ffffff', suffix: '' },
  { label: 'Consec.',     key: 'consecutiveWins', color: '#4499ff' },
];

export default function LiveStats({ journeyProgress }: LiveStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const flashRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndex    = useRef(-1);

  useEffect(() => {
    const ticker = gsap.ticker.add(() => {
      const t   = journeyProgress.current;
      const idx = progressToRaceIndex(t);

      if (idx !== prevIndex.current) {
        prevIndex.current = idx;
        const race = RACE_WINS[idx];

        STATS.forEach((stat, si) => {
          const el    = valueRefs.current[si];
          const flash = flashRefs.current[si];
          if (!el) return;

          el.textContent = String(race[stat.key]);

          // Flash animation
          if (flash) {
            gsap.fromTo(
              flash,
              { opacity: 0.7, scaleY: 1.2 },
              { opacity: 0, scaleY: 1, duration: 0.6, ease: 'power2.out' }
            );
          }

          // Number pop
          gsap.fromTo(
            el,
            { scale: 1.18, color: stat.color },
            { scale: 1, color: '#fff', duration: 0.5, ease: 'power3.out' }
          );
        });
      }

      // Fade in when journey starts, fully visible after t=0.04
      if (containerRef.current) {
        const opacity = Math.min(1, t * 25);
        containerRef.current.style.opacity = String(opacity);
      }
    });

    return () => gsap.ticker.remove(ticker);
  }, [journeyProgress]);

  // Seed initial values
  const initial = RACE_WINS[0];

  return (
    <div
      ref={containerRef}
      style={{
        position:   'absolute',
        top:        '14%',
        right:      '3%',
        zIndex:     35,
        opacity:    0,
        pointerEvents: 'none',
        display:    'flex',
        flexDirection: 'column',
        gap:        14,
        alignItems: 'flex-end',
      }}
    >
      {STATS.map((stat, si) => (
        <div
          key={stat.key}
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'flex-end',
            position:       'relative',
            overflow:       'hidden',
          }}
        >
          {/* Flash sweep */}
          <div
            ref={(el) => { flashRefs.current[si] = el; }}
            style={{
              position:   'absolute',
              inset:      0,
              background: `${stat.color}22`,
              opacity:    0,
              borderRadius: 4,
              transformOrigin: 'top',
            }}
          />

          {/* Label */}
          <span style={{
            fontFamily:    'monospace',
            fontSize:      8,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.3)',
            marginBottom:  2,
          }}>
            {stat.label}
          </span>

          {/* Value */}
          <span
            ref={(el) => { valueRefs.current[si] = el; }}
            style={{
              fontFamily:    'system-ui, "Arial Black", sans-serif',
              fontSize:      'clamp(26px, 3.5vw, 46px)',
              fontWeight:    900,
              fontStyle:     'italic',
              color:         '#ffffff',
              lineHeight:    1,
              letterSpacing: '-0.04em',
              willChange:    'transform, color',
            }}
          >
            {stat.key === 'cumulativeWins' ? initial.cumulativeWins
             : stat.key === 'pts' ? initial.pts
             : initial.consecutiveWins}
          </span>
        </div>
      ))}

      {/* Driver label */}
      <div style={{
        fontFamily:    'monospace',
        fontSize:      8,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color:         'rgba(255,255,255,0.15)',
        marginTop:     6,
        textAlign:     'right',
      }}>
        Max Verstappen
        <br />
        <span style={{ color: '#E8002D' }}>Oracle Red Bull Racing</span>
      </div>
    </div>
  );
}
