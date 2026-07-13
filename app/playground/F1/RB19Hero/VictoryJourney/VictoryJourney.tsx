'use client';

/**
 * VictoryJourney
 * ────────────────────────────────────────────────────────────
 * Orchestrator for the "Race Through Every Win" experience.
 *
 * Layer stack (low → high z-index):
 *   z 16  EnvOverlay        — atmospheric gradient per race
 *   z 17  GPTypographyWall  — monumental billboard typography
 *   z 18  Racing line       — inline CSS stripe
 *   z 20  Three.js canvas   — the RB19 (owned by parent)
 *   z 35  SeasonProgress    — round 1–22 dot timeline
 *   z 38  FinalHero         — closing trophy typography
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import EnvOverlay        from './EnvOverlay';
import GPTypographyWall  from './GPTypographyWall';
import SeasonProgress    from './SeasonProgress';
import FinalHero         from './FinalHero';

interface VictoryJourneyProps {
  /** 0→1, driven by the parent RB19Hero ScrollTrigger. */
  journeyProgress: React.MutableRefObject<number>;
  /** Instantaneous scroll speed 0→1 — passed down for velocity-reactive elements. */
  scrollVelocity:  React.MutableRefObject<number>;
}

export default function VictoryJourney({
  journeyProgress,
  scrollVelocity,
}: VictoryJourneyProps) {
  const wrapRef       = useRef<HTMLDivElement>(null);
  const racingLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = gsap.ticker.add(() => {
      const t = journeyProgress.current;

      // Whole section fades in from t=0 → 0.04
      if (wrapRef.current) {
        wrapRef.current.style.opacity = String(Math.min(1, t * 30));
      }

      // Racing line brightness reacts to scroll velocity
      if (racingLineRef.current) {
        const vel       = scrollVelocity.current;
        const intensity = Math.min(1, 0.3 + vel * 0.7);
        racingLineRef.current.style.opacity = String(intensity);
      }
    });

    return () => gsap.ticker.remove(ticker);
  }, [journeyProgress, scrollVelocity]);

  return (
    <div
      ref={wrapRef}
      style={{
        position:      'absolute',
        inset:         0,
        opacity:       0,
        pointerEvents: 'none',
      }}
    >
      {/* ── z 16: Per-race atmospheric gradient ────────────── */}
      <EnvOverlay journeyProgress={journeyProgress} />

      {/* ── z 17: Monumental GP name typography wall ────────
           Sits behind the Three.js canvas (z 20) so the RB19
           always reads cleanly in front of the letters.        */}
      <GPTypographyWall journeyProgress={journeyProgress} />

      {/* ── z 18: Racing line + kerb stripes ────────────────── */}
      <div
        ref={racingLineRef}
        style={{
          position:      'absolute',
          top:           '58%',
          left:          0,
          right:         0,
          zIndex:        18,
          pointerEvents: 'none',
          opacity:       0.3,
        }}
      >
        <div style={{
          height:     1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 15%, rgba(255,255,255,0.35) 85%, transparent 100%)',
        }} />
        <div style={{
          height:     20,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 100%)',
        }} />
        {/* Left kerb */}
        <div style={{
          position:   'absolute',
          left:       0,
          top:        -3,
          width:      '8%',
          height:     6,
          background: 'repeating-linear-gradient(90deg, #E8002D 0px, #E8002D 20px, #fff 20px, #fff 40px)',
          opacity:    0.5,
        }} />
        {/* Right kerb */}
        <div style={{
          position:   'absolute',
          right:      0,
          top:        -3,
          width:      '8%',
          height:     6,
          background: 'repeating-linear-gradient(90deg, #E8002D 0px, #E8002D 20px, #fff 20px, #fff 40px)',
          opacity:    0.5,
        }} />
      </div>

      {/* ── z 35: Season progress bottom bar ───────────────── */}
      <SeasonProgress journeyProgress={journeyProgress} />

      {/* ── z 38: Final trophy hero ─────────────────────────── */}
      <FinalHero journeyProgress={journeyProgress} />
    </div>
  );
}
