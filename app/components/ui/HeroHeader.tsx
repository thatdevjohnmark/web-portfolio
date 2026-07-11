'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Container from '../Container';

interface HeroHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export default function HeroHeader({ badge, title, description }: HeroHeaderProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ruleRef     = useRef<HTMLDivElement>(null);
  const cornerTLRef = useRef<HTMLDivElement>(null);
  const cornerBRRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        gsap.set(
          [badgeRef.current, titleRef.current, descRef.current, ruleRef.current],
          { opacity: 1, clearProps: 'all' }
        );
        return;
      }

      // ── initial hidden states ───────────────────────────────────────────
      gsap.set(badgeRef.current,  { opacity: 0, x: -20 });
      gsap.set(titleRef.current,  {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
      });
      gsap.set(descRef.current,   { opacity: 0, y: 16 });
      gsap.set(ruleRef.current,   { scaleX: 0, transformOrigin: 'left center' });

      // ── corner accent draws ────────────────────────────────────────────
      gsap.set([cornerTLRef.current, cornerBRRef.current], {
        opacity: 0,
        scale: 0.6,
        transformOrigin: 'top left',
      });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1 — badge slides in from left
      tl.to(badgeRef.current, { opacity: 1, x: 0, duration: 0.5 });

      // 2 — corner accents appear
      tl.to(
        [cornerTLRef.current, cornerBRRef.current],
        { opacity: 1, scale: 1, duration: 0.4, ease: 'expo.out' },
        '-=0.3'
      );

      // 3 — title clip-path wipe from bottom
      tl.to(
        titleRef.current,
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.7, ease: 'expo.out' },
        '-=0.1'
      );

      // 4 — rule expands left → right
      tl.to(ruleRef.current, { scaleX: 1, duration: 0.8, ease: 'expo.out' }, '-=0.4');

      // 5 — description fades up
      tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, [badge, title, description]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b-[3px] border-[#1A1A1A] bg-[#000000] py-20 lg:py-28"
    >
      {/* ── Pixel grid background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Corner TL accent ── */}
      <div
        ref={cornerTLRef}
        aria-hidden="true"
        className="absolute top-6 left-6 w-12 h-12 border-t-[2px] border-l-[2px] border-[#333] pointer-events-none"
      />

      {/* ── Corner BR accent ── */}
      <div
        ref={cornerBRRef}
        aria-hidden="true"
        className="absolute bottom-6 right-6 w-12 h-12 border-b-[2px] border-r-[2px] border-[#333] pointer-events-none"
      />

      <Container className="relative z-10">
        {/* Status badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-3 border-[2px] border-[#333] bg-[#0A0A0A] px-4 py-2 mb-6"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-none bg-white opacity-50" />
            <span className="relative inline-flex h-3 w-3 bg-white" />
          </span>
          <span className="font-pixel text-[9px] text-[#B0B0B0] tracking-[0.15em]">
            {badge}
          </span>
        </div>

        {/* Title — clip-path wipe reveal */}
        <h1
          ref={titleRef}
          className="font-pixel text-4xl md:text-6xl text-[#FFFFFF] tracking-wider mb-4 leading-relaxed"
          style={{ willChange: 'clip-path, opacity' }}
        >
          {title}
        </h1>

        {/* Expanding rule */}
        <div
          ref={ruleRef}
          className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent mb-5"
          style={{ willChange: 'transform' }}
        />

        {/* Description */}
        <p
          ref={descRef}
          className="font-terminal text-[20px] text-[#B0B0B0] max-w-2xl leading-relaxed"
          style={{ willChange: 'transform, opacity' }}
        >
          {description}
        </p>
      </Container>
    </section>
  );
}
