'use client';

/**
 * SeasonProgress
 * ────────────────────────────────────────────────────────────
 * A horizontal timeline bar showing all 22 rounds of the 2023
 * season.  Win rounds are marked with a red dot.  A glowing
 * cursor tracks the current race as journeyProgress advances.
 *
 * Sits at the very bottom of the journey viewport, z-index 35.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { RACE_WINS, progressToRaceIndex, TOTAL_ROUNDS } from './data';

interface SeasonProgressProps {
  journeyProgress: React.MutableRefObject<number>;
}

// Which rounds are wins?
const WIN_ROUNDS = new Set(RACE_WINS.map((r) => r.round));

export default function SeasonProgress({ journeyProgress }: SeasonProgressProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const cursorRef     = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);
  const gpNameRef     = useRef<HTMLSpanElement>(null);
  const dotRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const prevIdx       = useRef(-1);

  useEffect(() => {
    const ticker = gsap.ticker.add(() => {
      const t   = journeyProgress.current;
      const idx = progressToRaceIndex(t);

      // Move the cursor
      if (cursorRef.current) {
        // Cursor tracks % of the bar by win index / total wins
        const pct = (idx / (RACE_WINS.length - 1)) * 100;
        cursorRef.current.style.left = `${pct}%`;
      }

      // Update GP name label
      if (idx !== prevIdx.current) {
        prevIdx.current = idx;
        const race = RACE_WINS[idx];

        if (gpNameRef.current) {
          gpNameRef.current.textContent = `${race.flag}  ${race.shortName} GP`;
        }

        // Activate dot
        dotRefs.current.forEach((dot, di) => {
          if (!dot) return;
          if (di < idx) {
            dot.style.background = '#E8002D';
            dot.style.boxShadow  = 'none';
            dot.style.transform  = 'scale(1)';
          } else if (di === idx) {
            dot.style.background = '#E8002D';
            dot.style.boxShadow  = '0 0 8px rgba(232,0,45,0.8)';
            dot.style.transform  = 'scale(1.4)';
          } else {
            dot.style.background = 'rgba(255,255,255,0.15)';
            dot.style.boxShadow  = 'none';
            dot.style.transform  = 'scale(1)';
          }
        });
      }

      // Fade in
      if (containerRef.current) {
        const opacity = Math.min(1, t * 25);
        containerRef.current.style.opacity = String(opacity);
      }
    });

    return () => gsap.ticker.remove(ticker);
  }, [journeyProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        position:   'absolute',
        bottom:     '3.5%',
        left:       '5%',
        right:      '5%',
        zIndex:     35,
        opacity:    0,
        pointerEvents: 'none',
      }}
    >
      {/* Row 1: labels */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        marginBottom:   6,
        alignItems:     'center',
      }}>
        <span style={{
          fontFamily:    'monospace',
          fontSize:      8,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.22)',
        }}>
          Season Progress
        </span>
        <span
          ref={gpNameRef}
          style={{
            fontFamily:    'monospace',
            fontSize:      9,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         '#E8002D',
            fontWeight:    700,
          }}
        >
          {RACE_WINS[0].flag}  {RACE_WINS[0].shortName} GP
        </span>
        <span style={{
          fontFamily:    'monospace',
          fontSize:      8,
          letterSpacing: '0.2em',
          color:         'rgba(255,255,255,0.22)',
        }}>
          Round 1 — 22
        </span>
      </div>

      {/* Row 2: the bar + dots */}
      <div
        style={{
          position:  'relative',
          height:    8,
          display:   'flex',
          alignItems: 'center',
        }}
      >
        {/* Background track */}
        <div style={{
          position:     'absolute',
          left:         0,
          right:        0,
          top:          '50%',
          transform:    'translateY(-50%)',
          height:       1,
          background:   'rgba(255,255,255,0.08)',
        }} />

        {/* Win dots — one per win, evenly spaced along the bar */}
        {RACE_WINS.map((race, i) => {
          const pct = (i / (RACE_WINS.length - 1)) * 100;
          return (
            <div
              key={race.winNumber}
              ref={(el) => { dotRefs.current[i] = el; }}
              title={race.shortName}
              style={{
                position:     'absolute',
                left:         `${pct}%`,
                top:          '50%',
                transform:    'translate(-50%, -50%) scale(1)',
                width:        6,
                height:       6,
                borderRadius: '50%',
                background:   'rgba(255,255,255,0.15)',
                transition:   'background 0.3s, transform 0.3s, box-shadow 0.3s',
                willChange:   'transform',
              }}
            />
          );
        })}

        {/* Cursor glow */}
        <div
          ref={cursorRef}
          style={{
            position:     'absolute',
            left:         '0%',
            top:          '50%',
            transform:    'translate(-50%, -50%)',
            width:        12,
            height:       12,
            borderRadius: '50%',
            background:   '#E8002D',
            boxShadow:    '0 0 14px rgba(232,0,45,0.9)',
            willChange:   'left',
            transition:   'left 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
