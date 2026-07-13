'use client';
import { useCallback } from 'react';
import { gsap } from 'gsap';

export function useParallax() {
  const onMouseMove = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      containerRef: React.RefObject<HTMLElement | null>,
      targets: { selector: string; strength: number }[]
    ) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      targets.forEach(({ selector, strength }) => {
        const el = container.querySelector(selector);
        if (!el) return;
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    },
    []
  );

  const onMouseLeave = useCallback(
    (
      containerRef: React.RefObject<HTMLElement | null>,
      selectors: string[]
    ) => {
      const container = containerRef.current;
      if (!container) return;
      selectors.forEach((selector) => {
        const el = container.querySelector(selector);
        if (!el) return;
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      });
    },
    []
  );

  return { onMouseMove, onMouseLeave };
}
