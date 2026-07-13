'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ParallaxLayersProps {
  containerRef: React.RefObject<HTMLElement | null>;
  totalScroll: number; // px, matches ScrollTrigger end
}

// Each layer: { id, speed multiplier (0=static, 1=with scroll), content }
const LAYERS = [
  // Layer 6 — Sky gradient (barely moves)
  {
    id: 'sky',
    speed: 0.05,
    zIndex: 1,
    style: {
      position: 'absolute' as const,
      inset: 0,
      background: 'linear-gradient(180deg, #000005 0%, #05050f 40%, #0a0510 100%)',
    },
  },
  // Layer 5 — Grandstands / distant buildings (slow)
  {
    id: 'grandstands',
    speed: 0.15,
    zIndex: 2,
    style: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: '45%',
      background:
        'repeating-linear-gradient(90deg, transparent 0px, transparent 38px, rgba(255,255,255,0.015) 38px, rgba(255,255,255,0.015) 40px)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    },
  },
  // Layer 5b — pit building silhouette
  {
    id: 'pitbuilding',
    speed: 0.22,
    zIndex: 3,
    style: {
      position: 'absolute' as const,
      bottom: '28%',
      left: '5%',
      right: '5%',
      height: '120px',
      background:
        'linear-gradient(180deg, rgba(20,20,30,0) 0%, rgba(15,15,22,0.9) 50%, rgba(10,10,18,1) 100%)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    },
  },
];

// Vertical stripe markers (safety barriers / tyre stacks)
const MARKERS = Array.from({ length: 8 }, (_, i) => ({
  id: `marker-${i}`,
  speed: 0.6 + i * 0.05,
  x: `${8 + i * 12}%`,
  height: `${30 + Math.sin(i * 1.3) * 12}px`,
  color: i % 2 === 0 ? 'rgba(232,0,45,0.6)' : 'rgba(255,255,255,0.25)',
}));

export default function ParallaxLayers({ containerRef, totalScroll }: ParallaxLayersProps) {
  const layerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const markerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background layers — driven by scroll of the parent container
      LAYERS.forEach((layer) => {
        const el = layerRefs.current[layer.id];
        if (!el) return;
        gsap.to(el, {
          y: totalScroll * layer.speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            scrub: true,
          },
        });
      });

      // Barrier markers — each moves at its own speed
      MARKERS.forEach((m) => {
        const el = markerRefs.current[m.id];
        if (!el) return;
        gsap.to(el, {
          y: totalScroll * m.speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [containerRef, totalScroll]);

  return (
    <>
      {/* Static background layers */}
      {LAYERS.map((layer) => (
        <div
          key={layer.id}
          ref={(el) => { layerRefs.current[layer.id] = el; }}
          style={{ ...layer.style, zIndex: layer.zIndex, pointerEvents: 'none' }}
        />
      ))}

      {/* Red/white barrier markers — trackside depth cues */}
      {MARKERS.map((m) => (
        <div
          key={m.id}
          ref={(el) => { markerRefs.current[m.id] = el; }}
          style={{
            position: 'absolute',
            bottom: '22%',
            left: m.x,
            width: '3px',
            height: m.height,
            background: m.color,
            zIndex: 4,
            pointerEvents: 'none',
            borderRadius: '1px',
          }}
        />
      ))}

      {/* Vignette — always on top of parallax but under canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 8,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 60%, transparent 35%, rgba(0,0,0,0.82) 100%)',
        }}
      />

      {/* Bottom ground fog */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '22%',
          zIndex: 9,
          pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)',
        }}
      />
    </>
  );
}
