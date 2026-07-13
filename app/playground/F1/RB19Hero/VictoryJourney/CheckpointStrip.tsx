'use client';

/**
 * CheckpointStrip
 * ────────────────────────────────────────────────────────────
 * A horizontal band of 21 Grand Prix checkpoint cards that
 * translates right-to-left as journeyProgress advances 0→1.
 *
 * The "passing zone" is centered horizontally (under where the
 * car sits in the Three.js canvas).  As each card enters that
 * zone it:
 *   • scales up (1 → 1.08)
 *   • brightens (opacity 0.55 → 1)
 *   • accent border pulses red
 *   • then fades behind the car (opacity → 0.25, scale → 0.95)
 *
 * Layout sits at z-index 22 (above canvas z 20) so cards
 * appear to pass beneath the car's lower section.
 * A clipping mask fades the top of each card so the 3D car
 * body reads cleanly in front.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { RACE_WINS, type RaceWin } from './data';

interface CheckpointStripProps {
  journeyProgress: React.MutableRefObject<number>; // 0→1 within the journey section
}

// ── Layout constants ─────────────────────────────────────────
const CARD_W         = 220;  // px
const CARD_GAP       = 48;   // px gap between cards
const CARD_UNIT      = CARD_W + CARD_GAP;
const VIEWPORT_CTR   = 0.5;  // fraction of viewport width where car sits
const PASS_HALF_W    = 140;  // px either side of center = "passing zone"
const STRIP_PADDING  = 300;  // px lead-in before first card

export default function CheckpointStrip({ journeyProgress }: CheckpointStripProps) {
  const stripRef  = useRef<HTMLDivElement>(null);
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const prevT     = useRef(0);

  useEffect(() => {
    if (!stripRef.current) return;

    const ticker = gsap.ticker.add(() => {
      const t   = journeyProgress.current;
      prevT.current = t;

      const vpW = window.innerWidth;
      const ctr = vpW * VIEWPORT_CTR;

      // Total strip width → how far we need to scroll
      const totalW = STRIP_PADDING + RACE_WINS.length * CARD_UNIT;

      // translateX: at t=0, first card is off the right edge
      //             at t=1, last card is slightly past center
      const tx = -(t * (totalW - vpW * 0.55));

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${tx}px)`;
      }

      // Per-card scale / opacity based on proximity to passing zone
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // Absolute X of this card's center in viewport coords
        const cardAbsX = STRIP_PADDING + i * CARD_UNIT + CARD_W / 2 + tx;
        const dist     = Math.abs(cardAbsX - ctr);

        // 0 = exactly at center, 1 = fully outside passing zone
        const proximity = Math.max(0, 1 - dist / (PASS_HALF_W * 2.5));
        const isPassing = dist < PASS_HALF_W;
        const isPast    = cardAbsX < ctr - PASS_HALF_W * 1.2;

        const scale   = isPast  ? 0.92
                      : isPassing ? 1 + proximity * 0.08
                      : 1;
        const opacity = isPast  ? 0.22
                      : isPassing ? 0.55 + proximity * 0.45
                      : 0.45 + proximity * 0.1;

        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.opacity   = opacity.toFixed(4);

        // Accent border
        const borderEl = card.querySelector<HTMLElement>('[data-accent]');
        if (borderEl) {
          borderEl.style.opacity = isPassing ? String(proximity) : '0';
        }

        // Win flash label
        const flashEl = card.querySelector<HTMLElement>('[data-flash]');
        if (flashEl) {
          flashEl.style.opacity = isPassing ? String(proximity * 0.85) : '0';
        }
      });
    });

    return () => gsap.ticker.remove(ticker);
  }, [journeyProgress]);

  return (
    /*
     * Container — absolute, spans the bottom ~52% of the viewport.
     * overflow: visible so cards outside viewport are still laid out.
     * The mask-image fades the top so the car silhouette reads clearly.
     */
    <div
      style={{
        position: 'absolute',
        bottom: '6%',
        left: 0,
        right: 0,
        height: '48%',
        zIndex: 22,
        pointerEvents: 'none',
        overflow: 'visible',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
      }}
    >
      {/* Inner strip — all cards laid out in a row */}
      <div
        ref={stripRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'flex-start',
          gap: CARD_GAP,
          paddingLeft: STRIP_PADDING,
          paddingRight: 400,
          willChange: 'transform',
          height: '100%',
        }}
      >
        {RACE_WINS.map((race, i) => (
          <CheckpointCard
            key={race.winNumber}
            race={race}
            index={i}
            ref={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Individual Card ───────────────────────────────────────────

import React from 'react';

interface CardProps {
  race: RaceWin;
  index: number;
}

const CheckpointCard = React.forwardRef<HTMLDivElement, CardProps>(
  function CheckpointCard({ race }, ref) {
    return (
      <div
        ref={ref}
        style={{
          width:          CARD_W,
          flexShrink:     0,
          opacity:        0.45,
          transformOrigin: 'bottom center',
          transition:     'none', // pure JS-driven
          willChange:     'transform, opacity',
          position:       'relative',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'flex-start',
        }}
      >
        {/* Accent pulse border — visible when passing */}
        <div
          data-accent
          style={{
            position:     'absolute',
            inset:        0,
            border:       '1px solid #E8002D',
            borderRadius: 10,
            opacity:      0,
            pointerEvents: 'none',
            boxShadow:    '0 0 20px rgba(232,0,45,0.3), inset 0 0 20px rgba(232,0,45,0.05)',
          }}
        />

        {/* Win flash */}
        <div
          data-flash
          style={{
            position:   'absolute',
            top:        -28,
            left:       0,
            right:      0,
            textAlign:  'center',
            fontFamily: 'monospace',
            fontSize:   10,
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:      '#E8002D',
            opacity:    0,
          }}
        >
          ▶ PASSING
        </div>

        {/* Card body */}
        <div
          style={{
            background:         'rgba(4,4,12,0.82)',
            backdropFilter:     'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border:             '1px solid rgba(255,255,255,0.06)',
            borderRadius:       10,
            padding:            '16px 18px 18px',
            height:             '100%',
            display:            'flex',
            flexDirection:      'column',
            gap:                10,
            overflow:           'hidden',
            position:           'relative',
          }}
        >
          {/* Win number badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily:    'monospace',
              fontSize:      8,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         '#E8002D',
            }}>
              WIN {race.winNumber < 10 ? `0${race.winNumber}` : race.winNumber} / {String(RACE_WINS.length).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 18, lineHeight: 1 }}>{race.flag}</span>
          </div>

          {/* GP Name */}
          <div style={{
            fontFamily:    'system-ui, "Arial Black", sans-serif',
            fontSize:      16,
            fontWeight:    900,
            fontStyle:     'italic',
            color:         '#ffffff',
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}>
            {race.shortName}
            <br />
            <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: 12, letterSpacing: '0.05em' }}>
              GRAND PRIX
            </span>
          </div>

          {/* Circuit */}
          <div style={{
            fontFamily:    'monospace',
            fontSize:      9,
            color:         'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
            lineHeight:    1.4,
          }}>
            {race.circuit}
            <br />
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>{race.location}</span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

          {/* Winner */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{
              fontFamily:    'monospace',
              fontSize:      7.5,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.2)',
            }}>
              Winner
            </span>
            <span style={{
              fontFamily:    'monospace',
              fontSize:      11,
              fontWeight:    700,
              color:         '#ffffff',
              letterSpacing: '0.05em',
            }}>
              {race.driver}
            </span>
          </div>

          {/* Date + Round */}
          <div style={{
            marginTop:     'auto',
            display:       'flex',
            justifyContent: 'space-between',
            alignItems:    'flex-end',
          }}>
            <span style={{
              fontFamily:    'monospace',
              fontSize:      8,
              color:         'rgba(255,255,255,0.25)',
              letterSpacing: '0.1em',
            }}>
              {race.date}
            </span>
            <span style={{
              fontFamily:    'monospace',
              fontSize:      8,
              color:         'rgba(255,255,255,0.18)',
              letterSpacing: '0.1em',
            }}>
              RND {race.round}
            </span>
          </div>

          {/* Accent color band — tinted from env */}
          <div style={{
            position:     'absolute',
            bottom:       0,
            left:         0,
            right:        0,
            height:       3,
            background:   `linear-gradient(90deg, ${race.env.accent}66, transparent)`,
            borderRadius: '0 0 10px 10px',
          }} />
        </div>
      </div>
    );
  }
);
