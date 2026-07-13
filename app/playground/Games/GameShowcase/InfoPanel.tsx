'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GameEntry } from './GameData';

interface InfoPanelProps {
  game: GameEntry;
}

/** Renders filled + empty star characters for a 0–10 rating, displayed as /10. */
function RatingStars({ rating }: { rating: number }) {
  // Map 0–10 to 0–5 stars
  const filled = Math.round(rating / 2);
  const empty = 5 - filled;
  return (
    <span className="tracking-tight">
      {'★'.repeat(filled)}
      {'☆'.repeat(empty)}
      <span className="text-white/50 ml-1 text-xs">{rating}/10</span>
    </span>
  );
}

export default function InfoPanel({ game }: InfoPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    const lines = panelRef.current.querySelectorAll<HTMLElement>('.info-line');

    // Kill any lingering tweens on these elements before re-animating
    gsap.killTweensOf(lines);

    gsap.fromTo(
      lines,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power3.out',
      }
    );
  }, [game.id]);

  const { accentColor } = game;

  // Whether the game is fully 100%'d (all entries currently have completed=true,
  // but we treat rating===10 + completed as "100% CLEAR" to give visual variety)
  const isFullClear = game.completed && game.rating === 10;

  return (
    <div
      ref={panelRef}
      className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-3"
    >
      {/* ── Status badge ── */}
      <div className="info-line flex items-center gap-2">
        {isFullClear ? (
          <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border border-green-400/60 text-green-400 bg-green-400/10">
            100% CLEAR
          </span>
        ) : (
          <span
            className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border bg-opacity-10"
            style={{
              color: accentColor,
              borderColor: accentColor,
              backgroundColor: `${accentColor}1a`,
            }}
          >
            COMPLETED
          </span>
        )}
      </div>

      {/* 1. Game title */}
      <div className="info-line">
        <h2 className="font-bold text-2xl text-white leading-tight">{game.title}</h2>
      </div>

      {/* 2. Metadata row */}
      <div className="info-line flex flex-wrap items-center gap-2 text-xs font-mono">
        {/* Platform badge */}
        <span
          className="px-2 py-0.5 rounded border font-bold uppercase tracking-wider"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          {game.platform}
        </span>

        {/* Rating stars */}
        <span style={{ color: accentColor }}>
          <RatingStars rating={game.rating} />
        </span>

        {/* Difficulty */}
        <span
          className="px-2 py-0.5 rounded border"
          style={{ color: accentColor, borderColor: `${accentColor}80` }}
        >
          {game.difficulty}
        </span>

        {/* Release year */}
        <span className="text-white/50">{game.releaseYear}</span>
      </div>

      {/* 3. Hours played */}
      <div className="info-line flex items-center gap-2 text-sm text-white/60 font-mono">
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: accentColor }}
        >
          Hours Played
        </span>
        <span className="text-white font-bold">{game.hoursPlayed.toLocaleString()}h</span>
      </div>

      {/* 4. Description */}
      <div className="info-line">
        <p className="text-sm text-white/70 leading-relaxed">{game.description}</p>
      </div>

      {/* 5. Favorite aspect */}
      <div className="info-line flex flex-col gap-0.5">
        <span
          className="text-[10px] font-mono uppercase tracking-widest font-bold"
          style={{ color: accentColor }}
        >
          Favorite Aspect
        </span>
        <p className="text-sm text-white/80 leading-relaxed">{game.favoriteAspect}</p>
      </div>

      {/* 6. VIEW DETAILS button */}
      <div className="info-line pt-1">
        <button
          className="px-6 py-2 rounded text-xs font-mono font-bold border transition-all hover:bg-opacity-20"
          style={{
            color: accentColor,
            borderColor: accentColor,
            // Tailwind's accentColor/20 isn't possible inline, so we use CSS variable trick
            // We set a CSS custom property so the hover state can reference it
            ['--accent' as string]: accentColor,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${accentColor}33`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
}
