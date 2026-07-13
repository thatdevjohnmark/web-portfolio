'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const bootLines = [
  { text: 'QA BOOT LOADER v2.0.1', type: 'header' },
  { text: '', type: 'spacer' },
  { text: '> Initializing CPU... [OK]', type: 'ok' },
  { text: '> Checking memory pages... 4,096M total', type: 'info' },
  { text: '> Loading QA integrity kernel...', type: 'info' },
  { text: '[ OK ] Manual exploratory flows verified.', type: 'ok' },
  { text: '[ OK ] Cross-viewport responsive alignment stable.', type: 'ok' },
  { text: '[ OK ] Error boundary handlers active.', type: 'ok' },
  { text: '[ OK ] State persistence verified.', type: 'ok' },
  { text: '> Calibrating test harness...', type: 'info' },
  { text: '[ OK ] All systems nominal.', type: 'ok' },
  { text: '', type: 'spacer' },
  { text: 'SYSTEM READY.', type: 'ready' },
  { text: '', type: 'spacer' },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const lines = linesRef.current;
    if (!lines) return;

    const children = Array.from(lines.children) as HTMLElement[];
    const tl = gsap.timeline({
      onComplete: () => {
        // flash white then fade overlay
        gsap.to(flashRef.current, { opacity: 1, duration: 0.15, ease: 'none' });
        gsap.to(flashRef.current, {
          opacity: 0,
          duration: 0.4,
          delay: 0.2,
          ease: 'none',
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.set(overlayRef.current, { display: 'flex' });

    children.forEach((child) => {
      tl.to(child, { opacity: 1, duration: 0.01, ease: 'none' });
      // ponytail: fixed 80ms per line, no type-based variance
      tl.to({}, { duration: 0.08, ease: 'none' });
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] bg-[#000000] flex items-center justify-center"
      style={{ display: 'none' }}
    >
      {/* white flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div
        ref={linesRef}
        className="font-terminal text-[20px] md:text-[26px] leading-relaxed text-left max-w-2xl px-6"
      >
        {bootLines.map((line, i) => {
          let color = 'text-[#B0B0B0]';
          if (line.type === 'ok') color = 'text-[#FFFFFF]';
          else if (line.type === 'header') color = 'text-[#808080] tracking-wider';
          else if (line.type === 'ready') color = 'text-[#FFFFFF] text-[28px] md:text-[36px]';
          else if (line.type === 'spacer') color = 'text-transparent';

          return (
            <div
              key={i}
              className={color}
              style={{ opacity: 0 }}
            >
              {line.type === 'ready' ? (
                <span>
                  {line.text}
                  <span className="inline-block ml-1 animate-pulse">_</span>
                </span>
              ) : (
                line.text || ' '
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
