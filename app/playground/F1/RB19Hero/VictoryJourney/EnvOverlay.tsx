'use client';

/**
 * EnvOverlay
 * ────────────────────────────────────────────────────────────
 * A full-viewport background layer that transitions between
 * per-race atmospheric color presets as journeyProgress moves.
 *
 * Sits at z-index 16 (above parallax z1-9, below canvas z20)
 * so it colours the sky/background without covering the car.
 *
 * Each race has { sky, horizon, ground, accent, mood } colors.
 * We cross-fade between adjacent races' gradients smoothly.
 *
 * Also renders a "mood label" that briefly appears and fades.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { RACE_WINS, progressToRaceIndex, progressWithinRace } from './data';

interface EnvOverlayProps {
  journeyProgress: React.MutableRefObject<number>;
}

// Pre-build gradient strings for each race
function makeGradient(env: typeof RACE_WINS[0]['env']): string {
  return `linear-gradient(180deg, ${env.sky} 0%, ${env.horizon} 45%, ${env.ground} 100%)`;
}

export default function EnvOverlay({ journeyProgress }: EnvOverlayProps) {
  const bgARef     = useRef<HTMLDivElement>(null);
  const bgBRef     = useRef<HTMLDivElement>(null);
  const moodRef    = useRef<HTMLDivElement>(null);
  const accentRef  = useRef<HTMLDivElement>(null);

  // Track which gradient pair is "front" (A) vs "back" (B)
  const frontIsA   = useRef(true);
  const prevIdx    = useRef(-1);

  useEffect(() => {
    // Seed first race gradient
    if (bgARef.current) {
      bgARef.current.style.background = makeGradient(RACE_WINS[0].env);
      bgARef.current.style.opacity    = '1';
    }
    if (bgBRef.current) {
      bgBRef.current.style.opacity = '0';
    }

    const ticker = gsap.ticker.add(() => {
      const t   = journeyProgress.current;
      const idx = progressToRaceIndex(t);
      const frac = progressWithinRace(t);

      // Fade in the whole overlay when journey begins
      const wrapOpacity = Math.min(1, t * 30);
      if (bgARef.current) bgARef.current.parentElement!.style.opacity = String(wrapOpacity);

      if (idx !== prevIdx.current) {
        prevIdx.current = idx;
        const race = RACE_WINS[idx];

        // Cross-fade to the new race's gradient
        const front = frontIsA.current ? bgARef.current : bgBRef.current;
        const back  = frontIsA.current ? bgBRef.current : bgARef.current;

        if (back && front) {
          back.style.background = makeGradient(race.env);
          gsap.fromTo(back,  { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'power1.inOut' });
          gsap.to(front, { opacity: 0, duration: 1.8, ease: 'power1.inOut' });
          frontIsA.current = !frontIsA.current;
        }

        // Mood label flash
        if (moodRef.current) {
          moodRef.current.textContent = race.env.mood;
          gsap.fromTo(
            moodRef.current,
            { opacity: 0, y: 8 },
            { opacity: 0.45, y: 0, duration: 0.5, ease: 'power2.out',
              onComplete: () => {
                gsap.to(moodRef.current!, { opacity: 0, delay: 1.2, duration: 0.8 });
              }
            }
          );
        }

        // Accent glow
        if (accentRef.current) {
          accentRef.current.style.background =
            `radial-gradient(ellipse 60% 30% at 50% 85%, ${race.env.accent}22 0%, transparent 70%)`;
        }
      }
    });

    return () => gsap.ticker.remove(ticker);
  }, [journeyProgress]);

  return (
    <div
      style={{
        position:   'absolute',
        inset:      0,
        zIndex:     16,
        pointerEvents: 'none',
        opacity:    0,
      }}
    >
      {/* Layer A */}
      <div
        ref={bgARef}
        style={{
          position: 'absolute',
          inset:    0,
          transition: 'none',
        }}
      />

      {/* Layer B */}
      <div
        ref={bgBRef}
        style={{
          position: 'absolute',
          inset:    0,
          opacity:  0,
          transition: 'none',
        }}
      />

      {/* Accent floor glow */}
      <div
        ref={accentRef}
        style={{
          position: 'absolute',
          inset:    0,
          transition: 'background 1.5s ease',
        }}
      />

      {/* Vignette — always present */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* Mood label — top center, briefly appears */}
      <div
        ref={moodRef}
        style={{
          position:      'absolute',
          top:           '10%',
          left:          '50%',
          transform:     'translateX(-50%)',
          fontFamily:    'monospace',
          fontSize:      9,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.9)',
          opacity:       0,
          whiteSpace:    'nowrap',
          textShadow:    '0 0 20px rgba(255,255,255,0.3)',
        }}
      >
        {RACE_WINS[0].env.mood}
      </div>
    </div>
  );
}
