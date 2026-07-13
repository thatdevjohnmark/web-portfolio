'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GAMES, GameEntry } from './GameData';
import GameCard from './GameCard';
import BackgroundLayer from './BackgroundLayer';
import { animateCardsIn } from './animations/cardReveal';
import { useResponsive } from './hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

const ACTIVE_PCT = 52;   // % of row the active card claims
const GAP_PX = 12;       // gap between cards in px (gap-3)
const CARD_COUNT = GAMES.length;

/**
 * Distribute widths so they always sum to exactly 100%.
 *
 * Strategy:
 *   1. Give the active card ACTIVE_PCT%.
 *   2. Split the remaining (100 - ACTIVE_PCT)% among inactive cards weighted
 *      by inverse distance — adjacent cards get more, far cards get less.
 *   3. If no card is active every card gets an equal share.
 */
function computeWidths(activeIndex: number | null): number[] {
  if (activeIndex === null) {
    const equal = 100 / CARD_COUNT;
    return GAMES.map(() => equal);
  }

  const remaining = 100 - ACTIVE_PCT;
  // Weight: 1 / (distance + 1)  — adjacent = 0.5, dist-2 = 0.33, etc.
  const weights = GAMES.map((_, i) => {
    if (i === activeIndex) return 0;
    const d = Math.abs(i - activeIndex);
    return 1 / (d + 1);
  });
  const totalWeight = weights.reduce((s, w) => s + w, 0);

  return GAMES.map((_, i) => {
    if (i === activeIndex) return ACTIVE_PCT;
    return (weights[i] / totalWeight) * remaining;
  });
}

export default function GameShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isMobile } = useResponsive();

  // ── Width distribution animator ──────────────────────────────────────────
  const animateWidths = useCallback((activeIndex: number | null) => {
    if (!rowRef.current) return;

    const rowWidth = rowRef.current.offsetWidth;
    const totalGap = GAP_PX * (CARD_COUNT - 1);
    const availableWidth = rowWidth - totalGap;

    const pcts = computeWidths(activeIndex);
    const targetHeights = pcts.map((_, i) =>
      i === activeIndex ? 520 : 320
    );

    pcts.forEach((pct, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const targetPx = (pct / 100) * availableWidth;
      gsap.to(el, {
        width: targetPx,
        height: targetHeights[i],
        duration: 0.45,
        ease: 'power4.out',
        overwrite: 'auto',
      });
    });
  }, []);

  // Re-run whenever active card changes
  useEffect(() => {
    const activeIndex = activeId
      ? GAMES.findIndex((g) => g.id === activeId)
      : null;
    animateWidths(activeIndex === -1 ? null : activeIndex);
  }, [activeId, animateWidths]);

  // Set initial pixel widths on mount and on resize
  useEffect(() => {
    const setInitialWidths = () => animateWidths(null);
    setInitialWidths();
    window.addEventListener('resize', setInitialWidths);
    return () => window.removeEventListener('resize', setInitialWidths);
  }, [animateWidths]);

  // Scroll reveal
  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      containerRef.current
        .querySelectorAll<HTMLElement>('.game-card')
        .forEach((c) => {
          c.style.opacity = '1';
          c.style.transform = 'none';
        });
      return;
    }
    animateCardsIn(containerRef.current);
  }, []);

  const getNeighborDistance = (index: number): number => {
    if (activeId === null) return 99;
    const ai = GAMES.findIndex((g) => g.id === activeId);
    if (ai === -1) return 99;
    return Math.abs(index - ai);
  };

  return (
    <section className="relative min-h-screen">
      <BackgroundLayer games={GAMES} activeId={activeId} />

      <div
        ref={containerRef}
        role="region"
        aria-label="Game Library"
        className="relative z-10 flex min-h-screen flex-col justify-center py-16"
      >
        <h2 className="mb-10 px-4 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
          Game Library
        </h2>

        {isMobile ? (
          // ── Mobile: snap carousel ────────────────────────────────────────
          <div
            className="flex overflow-x-auto px-4"
            style={{
              gap: `${GAP_PX}px`,
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
            }}
          >
            {GAMES.map((game: GameEntry, i: number) => (
              <div key={game.id} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: '85vw' }}>
                <GameCard
                  game={game}
                  isActive={activeId === game.id}
                  neighborDistance={getNeighborDistance(i)}
                  onHover={setActiveId}
                  onLeave={() => setActiveId(null)}
                  isMobile={isMobile}
                  cardRef={null}
                />
              </div>
            ))}
          </div>
        ) : (
          // ── Desktop: controlled flex row ─────────────────────────────────
          <div
            ref={rowRef}
            className="flex items-stretch overflow-hidden px-4"
            style={{ gap: `${GAP_PX}px` }}
          >
            {GAMES.map((game: GameEntry, i: number) => (
              <GameCard
                key={game.id}
                game={game}
                isActive={activeId === game.id}
                neighborDistance={getNeighborDistance(i)}
                onHover={setActiveId}
                onLeave={() => setActiveId(null)}
                isMobile={isMobile}
                cardRef={(el) => { cardRefs.current[i] = el; }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
