'use client';

import { useState, useRef, useEffect } from 'react';
import { GAMES, GameEntry } from './GameData';
import GameCard from './GameCard';
import BackgroundLayer from './BackgroundLayer';
import { animateCardsIn } from './animations/cardReveal';
import { useResponsive } from './hooks/useResponsive';

const GAP_PX = 12;

// ponytail: hardcoded grid spans for 11 items, 4-col grid
function gridSpan(i: number): string {
  const spans: Record<number, string> = {
    0: 'col-span-2 row-span-2',  // hero
    1: 'col-span-2 row-span-1',
    2: 'col-span-1 row-span-2',
    3: 'col-span-1 row-span-1',
    4: 'col-span-1 row-span-1',
    5: 'col-span-2 row-span-1',
    6: 'col-span-1 row-span-1',
    7: 'col-span-1 row-span-1',
    8: 'col-span-2 row-span-2',  // hero B
    9: 'col-span-1 row-span-1',
    10: 'col-span-1 row-span-1',
  };
  return spans[i] ?? 'col-span-1 row-span-1';
}

export default function GameShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      containerRef.current
        .querySelectorAll<HTMLElement>('.game-card')
        .forEach((c) => { c.style.opacity = '1'; c.style.transform = 'none'; });
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
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-4 auto-rows-[180px] gap-3 px-4"
          >
            {GAMES.map((game: GameEntry, i: number) => (
              <div key={game.id} className={gridSpan(i)}>
                <GameCard
                  game={game}
                  isActive={activeId === game.id}
                  neighborDistance={getNeighborDistance(i)}
                  onHover={setActiveId}
                  onLeave={() => setActiveId(null)}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
