'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ContentPanelsProps {
  containerRef: React.RefObject<HTMLElement | null>;
  totalScroll: number;
}

const PANELS = [
  {
    id: 'overview',
    side: 'left' as const,
    triggerAt: 0.18,   // fraction of totalScroll
    label: 'RB19 // Overview',
    title: 'The\nDominant\nMachine.',
    lines: [
      'Chassis: Carbon fibre/honeycomb composite',
      'Weight: 798 kg (incl. driver)',
      'Width: 2000 mm',
      'Power: ~1000 bhp combined',
    ],
  },
  {
    id: 'aero',
    side: 'right' as const,
    triggerAt: 0.36,
    label: 'Aerodynamics // Active',
    title: 'Downforce\nEngineered.',
    lines: [
      'Ground effect underfloor',
      'Multi-element rear wing',
      'DRS drag reduction',
      'Active front wing adjuster',
    ],
  },
  {
    id: 'power',
    side: 'left' as const,
    triggerAt: 0.54,
    label: 'Honda RBPTH001 // Power Unit',
    title: '1000 bhp\nHybrid.',
    lines: [
      '1.6L V6 turbocharged ICE',
      'MGU-H energy recovery',
      'MGU-K kinetic deployment',
      '400 bhp electric contribution',
    ],
  },
  {
    id: 'season',
    side: 'right' as const,
    triggerAt: 0.72,
    label: '2023 Season // Results',
    title: '21 Wins.\n22 Races.',
    lines: [
      'Constructors: 1st  860 pts',
      'Drivers: Max Verstappen P1',
      'Most dominant season ever',
      'Fastest lap: 15 occasions',
    ],
  },
];

export default function ContentPanels({ containerRef, totalScroll }: ContentPanelsProps) {
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      PANELS.forEach((panel) => {
        const el = panelRefs.current[panel.id];
        if (!el) return;

        const fromX = panel.side === 'left' ? -120 : 120;
        const triggerPx = totalScroll * panel.triggerAt;

        gsap.fromTo(
          el,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${triggerPx} top`,
              end: `top+=${triggerPx + totalScroll * 0.12} top`,
              scrub: 1,
            },
          }
        );

        // Fade out before next panel
        gsap.to(el, {
          opacity: 0,
          x: panel.side === 'left' ? -60 : 60,
          duration: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${triggerPx + totalScroll * 0.18} top`,
            end: `top+=${triggerPx + totalScroll * 0.26} top`,
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [containerRef, totalScroll]);

  return (
    <>
      {PANELS.map((panel) => (
        <div
          key={panel.id}
          ref={(el) => { panelRefs.current[panel.id] = el; }}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            [panel.side]: '4%',
            zIndex: 30,
            opacity: 0,
            pointerEvents: 'none',
            maxWidth: 280,
          }}
        >
          {/* Glassmorphism panel */}
          <div
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: panel.side === 'left' ? '2px solid #E8002D' : '1px solid rgba(255,255,255,0.08)',
              borderRight: panel.side === 'right' ? '2px solid #E8002D' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '20px 24px',
            }}
          >
            {/* Label */}
            <div style={{
              fontFamily: 'monospace',
              fontSize: 9,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#E8002D',
              marginBottom: 10,
            }}>
              {panel.label}
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 22,
              fontWeight: 800,
              fontStyle: 'italic',
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 14,
              whiteSpace: 'pre-line',
            }}>
              {panel.title}
            </div>

            {/* Data lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {panel.lines.map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#E8002D', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: '0.05em',
                  }}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
