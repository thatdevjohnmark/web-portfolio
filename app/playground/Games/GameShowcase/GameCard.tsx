'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { GameEntry } from './GameData';
import InfoPanel from './InfoPanel';
import { useParallax } from './hooks/useParallax';

interface GameCardProps {
  game: GameEntry;
  isActive: boolean;
  neighborDistance: number;
  onHover: (id: string) => void;
  onLeave: () => void;
  isMobile: boolean;
  /** Ref callback — GameShowcase owns the DOM ref for width control */
  cardRef: ((el: HTMLDivElement | null) => void) | null;
}

export default function GameCard({
  game,
  isActive,
  neighborDistance,
  onHover,
  onLeave,
  isMobile,
  cardRef,
}: GameCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const kenBurnsRef = useRef<gsap.core.Timeline | null>(null);

  const { onMouseMove, onMouseLeave: resetParallax } = useParallax();

  // Ken Burns on artwork
  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return;

    if (isActive) {
      kenBurnsRef.current?.kill();
      kenBurnsRef.current = gsap.timeline().fromTo(
        artwork,
        { scale: 1 },
        { scale: 1.08, duration: 8, ease: 'none' }
      );
    } else {
      kenBurnsRef.current?.kill();
      kenBurnsRef.current = null;
      gsap.to(artwork, { scale: 1, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    }

    return () => {
      kenBurnsRef.current?.kill();
      kenBurnsRef.current = null;
    };
  }, [isActive]);

  const parallaxTargets = [
    { selector: '[data-parallax="artwork"]', strength: 20 },
    { selector: '[data-parallax="title"]',   strength: 10 },
    { selector: '[data-parallax="meta"]',    strength: 5  },
  ];

  const handleMouseLeave = () => {
    onLeave();
    resetParallax(innerRef as React.RefObject<HTMLElement | null>, parallaxTargets.map((t) => t.selector));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    onMouseMove(e, innerRef as React.RefObject<HTMLElement | null>, parallaxTargets);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onHover(game.id);
    }
  };

  // Combine the external ref callback with our inner ref
  const setRef = (el: HTMLDivElement | null) => {
    (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    cardRef?.(el);
  };

  return (
    <div
      ref={setRef}
      className="game-card relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0"
      style={{
        // Height is also controlled by GameShowcase via GSAP, but we seed it
        height: isActive ? 520 : 320,
        display: 'flex',
        flexDirection: 'column',
        // Prevent flex from overriding the GSAP-set pixel width
        flexGrow: 0,
        minWidth: 0,
      }}
      onMouseEnter={() => onHover(game.id)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      tabIndex={0}
      aria-label={game.title}
      onKeyDown={handleKeyDown}
    >
      {/* Artwork */}
      <div
        ref={artworkRef}
        data-parallax="artwork"
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className={[
            'object-cover transition-all duration-700',
            !isActive ? 'grayscale' : '',
          ].filter(Boolean).join(' ')}
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority={neighborDistance <= 1}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Accent glow */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-700"
        style={{
          boxShadow: `inset 0 0 60px 20px ${game.accentColor}55`,
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {isActive ? (
          <div data-parallax="meta" className="absolute bottom-0 left-0 right-0 p-4">
            <InfoPanel game={game} />
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 p-2 flex items-end justify-center">
            <span
              data-parallax="title"
              className="text-[10px] font-mono text-white/70 truncate select-none"
              style={
                neighborDistance > 1
                  ? { writingMode: 'vertical-rl', textOrientation: 'mixed', maxHeight: '80%' }
                  : { maxWidth: '100%' }
              }
            >
              {game.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
