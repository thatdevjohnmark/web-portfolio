'use client';

/**
 * GPTypographyWall
 * ─────────────────────────────────────────────────────────────
 * Monumental background typography that fills the entire
 * viewport with the current Grand Prix name. Sits behind the
 * Three.js canvas (z-index 17) so the RB19 always reads in
 * front of the letters.
 *
 * Architecture
 * ─────────────
 * Three independent text layers, each containing TWO panels
 * (current + next) that swap via a sliding cross-dissolve:
 *
 *   Layer 1  — largest  (clamp 200px→380px)  opacity 0.07   parallax 30%
 *   Layer 2  — medium   (clamp 140px→260px)  opacity 0.05   parallax 20%
 *   Layer 3  — smallest (clamp 100px→180px)  opacity 0.035  parallax 10%
 *
 * Each layer has 4–5 rows staggered vertically to cover the
 * full viewport height and extend well beyond the edges
 * horizontally so letters always fill the frame.
 *
 * Row positions are offset (alternating left/right alignments
 * + slight vertical nudge) so the pattern is never perfectly
 * symmetric — it reads as an organic environmental element.
 *
 * Transition
 * ─────────────
 * When journeyProgress crosses a new race boundary:
 *   1. The incoming name slides in from the right (same
 *      direction the car "moves").
 *   2. The outgoing name slides to the left and fades.
 *   3. Duration: 1.4 s  ease: power2.inOut
 *   4. All three layers transition simultaneously but at
 *      their own independent speed multipliers.
 *
 * Parallax scroll offset
 * ─────────────────────
 * While the race is static (mid-race) each layer drifts
 * leftward at a different rate driven by journeyProgress.
 * This creates the illusion that the RB19 is moving
 * through the text environment.
 */

import { useRef, useEffect, CSSProperties } from 'react';
import gsap from 'gsap';
import { RACE_WINS, progressToRaceIndex } from './data';

interface GPTypographyWallProps {
  journeyProgress: React.MutableRefObject<number>;
}

// ── Layer configuration ────────────────────────────────────────
interface LayerCfg {
  id: string;
  fontSize: string;
  baseOpacity: number;
  parallaxRate: number;   // px of X-drift per unit of journeyProgress (0→1)
  rows: RowCfg[];
}

interface RowCfg {
  top: string;            // CSS top value for this row
  leftOffset: number;     // px offset from left edge (creates stagger feel)
  extraOpacity: number;   // multiplier on base opacity (distant rows = lower)
  blur: number;           // px blur (distant rows = slightly blurred)
  italic: boolean;
}

const LAYERS: LayerCfg[] = [
  {
    id: 'l1',
    fontSize: 'clamp(160px, 22vw, 340px)',
    baseOpacity: 1.0,
    parallaxRate: 380,     // largest layer drifts most
    rows: [
      { top: '12%',  leftOffset: -80,  extraOpacity: 1.0, blur: 0, italic: true  },
      { top: '38%',  leftOffset:  60,  extraOpacity: 0.85, blur: 0, italic: false },
      { top: '64%',  leftOffset: -40,  extraOpacity: 0.75, blur: 0, italic: true  },
    ],
  },
  {
    id: 'l2',
    fontSize: 'clamp(110px, 15vw, 230px)',
    baseOpacity: 0.14,
    parallaxRate: 240,
    rows: [
      { top: '5%',   leftOffset:  120, extraOpacity: 0.7, blur: 0, italic: false },
      { top: '28%',  leftOffset: -100, extraOpacity: 1.0, blur: 0, italic: true  },
      { top: '52%',  leftOffset:   40, extraOpacity: 0.85,blur: 0, italic: false },
      { top: '76%',  leftOffset:  -60, extraOpacity: 0.65,blur: 1, italic: true  },
    ],
  },
  {
    id: 'l3',
    fontSize: 'clamp(80px, 10vw, 160px)',
    baseOpacity: 0.09,
    parallaxRate: 130,
    rows: [
      { top: '2%',   leftOffset: -140, extraOpacity: 0.5, blur: 1, italic: true  },
      { top: '20%',  leftOffset:  200, extraOpacity: 0.7, blur: 0, italic: false },
      { top: '44%',  leftOffset: -80,  extraOpacity: 0.85,blur: 0, italic: true  },
      { top: '66%',  leftOffset:  80,  extraOpacity: 0.65,blur: 1, italic: false },
      { top: '86%',  leftOffset: -160, extraOpacity: 0.45,blur: 1, italic: true  },
    ],
  },
];

// How many times to repeat the name per row so it always fills the viewport
const REPEAT = 4;

function buildRowText(name: string): string {
  // Wide letter spacing means long names need fewer repeats
  return Array(REPEAT).fill(`${name}  `).join('  ');
}

// ── Per-row panel component ref bundle ────────────────────────
interface RowRefs {
  current: HTMLDivElement | null;   // the visible panel
  next:    HTMLDivElement | null;   // the incoming panel (initially off-screen)
}

export default function GPTypographyWall({ journeyProgress }: GPTypographyWallProps) {
  // Flat array: LAYERS × ROWS → panel pair refs
  // index = layerIdx * maxRows + rowIdx
  const panelRefs = useRef<RowRefs[]>([]);

  // Track current race to know when to transition
  const prevIdx      = useRef(-1);
  // Smoothed parallax drift per layer (lerped every frame)
  const driftX       = useRef<number[]>(LAYERS.map(() => 0));
  const driftTarget  = useRef<number[]>(LAYERS.map(() => 0));
  // Is a transition currently in flight?
  const transitioning = useRef(false);

  // Build a flat index helper
  function refIdx(li: number, ri: number): number {
    const maxRows = Math.max(...LAYERS.map((l) => l.rows.length));
    return li * maxRows + ri;
  }

  // Initialize panelRefs array size
  const maxRows = Math.max(...LAYERS.map((l) => l.rows.length));
  const totalRefs = LAYERS.length * maxRows;
  if (panelRefs.current.length !== totalRefs) {
    panelRefs.current = Array.from({ length: totalRefs }, () => ({
      current: null,
      next:    null,
    }));
  }

  useEffect(() => {
    // ── Seed first race into every "current" panel ──────────────
    const firstName = RACE_WINS[0].shortName;
    panelRefs.current.forEach((pair, flatIdx) => {
      // Recover li/ri from flat index to get row leftOffset
      const maxR = Math.max(...LAYERS.map((l) => l.rows.length));
      const li   = Math.floor(flatIdx / maxR);
      const ri   = flatIdx % maxR;
      const row  = LAYERS[li]?.rows[ri];
      const initLeft = row ? row.leftOffset : 0;

      if (pair.current) {
        pair.current.textContent  = buildRowText(firstName);
        pair.current.style.left   = `${initLeft}px`;
        pair.current.style.opacity = '1';
        gsap.set(pair.current, { x: 0 });
      }
      if (pair.next) {
        pair.next.textContent  = buildRowText(firstName);
        pair.next.style.left   = `${initLeft}px`;
        pair.next.style.opacity = '0';
        gsap.set(pair.next, { x: '105vw' });
      }
    });

    const ticker = gsap.ticker.add(() => {
      const t   = journeyProgress.current;
      const idx = progressToRaceIndex(t);

      // ── Transition to new race ─────────────────────────────────
      if (idx !== prevIdx.current && !transitioning.current) {
        const incoming  = RACE_WINS[idx];
        const outgoing  = prevIdx.current >= 0 ? RACE_WINS[prevIdx.current] : null;
        const goingFwd  = outgoing == null || idx > prevIdx.current;
        const enterFrom = goingFwd  ? '105vw' : '-105vw';
        const exitTo    = goingFwd  ? '-25vw' :  '25vw';

        // Snap duration to scroll speed: fast scroll = brief crossfade
        const dur = 0.55;

        prevIdx.current   = idx;
        transitioning.current = true;

        LAYERS.forEach((layer, li) => {
          layer.rows.forEach((_, ri) => {
            const pair = panelRefs.current[refIdx(li, ri)];
            if (!pair.current || !pair.next) return;

            pair.next.textContent   = buildRowText(incoming.shortName);
            pair.next.style.opacity = '1';
            gsap.set(pair.next, { x: enterFrom });

            gsap.to(pair.next, {
              x: 0,
              duration: dur,
              ease: 'power3.out',
            });
            gsap.to(pair.current, {
              x: exitTo,
              opacity: 0,
              duration: dur,
              ease: 'power3.out',
              onComplete: () => {
                const tmp    = pair.current;
                pair.current = pair.next;
                pair.next    = tmp;
                if (pair.next) {
                  pair.next.style.opacity = '0';
                  gsap.set(pair.next, { x: 0 });
                }
                // Only clear transitioning flag on last layer's last row
                if (li === LAYERS.length - 1 && ri === layer.rows.length - 1) {
                  transitioning.current = false;
                }
              },
            });
          });
        });
      }

      // ── Continuous parallax drift (lerped for smoothness) ─────
      LAYERS.forEach((layer, li) => {
        driftTarget.current[li] = -(layer.parallaxRate * t);
        // Lerp toward target — tighter = more responsive, looser = floatier
        driftX.current[li] += (driftTarget.current[li] - driftX.current[li]) * 0.08;
      });

      // Apply drift to all current panels
      LAYERS.forEach((layer, li) => {
        layer.rows.forEach((row, ri) => {
          const pair = panelRefs.current[refIdx(li, ri)];
          if (!pair.current) return;
          // Combine row's leftOffset with the layer drift
          const tx = row.leftOffset + driftX.current[li];
          pair.current.style.left = `${tx}px`;
          if (pair.next) {
            pair.next.style.left = `${tx}px`;
          }
        });
      });
    });

    return () => gsap.ticker.remove(ticker);
  }, [journeyProgress]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        position:      'absolute',
        inset:         0,
        zIndex:        17,
        pointerEvents: 'none',
        overflow:      'hidden',
        userSelect:    'none',
      }}
    >
      {LAYERS.map((layer, li) =>
        layer.rows.map((row, ri) => {
          const pairIdx = refIdx(li, ri);
          const opacity = layer.baseOpacity * row.extraOpacity;
          const sharedStyle: CSSProperties = {
            position:      'absolute',
            top:           row.top,
            left:          row.leftOffset,
            whiteSpace:    'nowrap',
            fontFamily:    'system-ui, "Arial Black", "Helvetica Neue", sans-serif',
            fontSize:      layer.fontSize,
            fontWeight:    900,
            fontStyle:     row.italic ? 'italic' : 'normal',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight:    1,
            color:         `rgba(255,255,255,${opacity})`,
            willChange:    'transform',
            // Distant rows get a subtle blur for depth
            filter:        row.blur > 0 ? `blur(${row.blur}px)` : 'none',
          };

          return (
            <div
              key={`${layer.id}-row${ri}`}
              style={{
                position: 'absolute',
                top:      row.top,
                left:     0,
                right:    0,
                overflow: 'hidden',
                // Apply the parallax drift as an inline CSS variable
                // (we update it via the driftX ref in the ticker above,
                //  but since this is JSX we can't update it that way —
                //  so we render a wrapper that the ticker can reach via ref)
              }}
            >
              {/* "Current" panel — visible, at translateX(0) initially */}
              <div
                ref={(el) => {
                  if (panelRefs.current[pairIdx]) {
                    panelRefs.current[pairIdx].current = el;
                  }
                }}
                style={{ ...sharedStyle, position: 'relative', left: row.leftOffset }}
              />
              {/* "Next" panel — offscreen initially */}
              <div
                ref={(el) => {
                  if (panelRefs.current[pairIdx]) {
                    panelRefs.current[pairIdx].next = el;
                  }
                }}
                style={{ ...sharedStyle, position: 'absolute', top: 0, left: row.leftOffset, opacity: 0 }}
              />
            </div>
          );
        })
      )}

      {/* Soft radial vignette so edges fade naturally */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'radial-gradient(ellipse 90% 75% at 50% 50%, transparent 35%, rgba(0,0,0,0.35) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top edge fade */}
      <div style={{
        position:   'absolute',
        top: 0, left: 0, right: 0, height: '18%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom edge fade */}
      <div style={{
        position:   'absolute',
        bottom: 0, left: 0, right: 0, height: '22%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
