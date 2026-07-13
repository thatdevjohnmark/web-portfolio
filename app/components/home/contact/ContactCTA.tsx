'use client';

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../Container';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// ── glitch keyframe helper (runs as a GSAP tween chain) ──────────────────────
function runGlitch(target: Element) {
  const tl = gsap.timeline();
  tl.to(target, { x: -3, skewX:  2, duration: 0.04, ease: 'none' })
    .to(target, { x:  3, skewX: -2, duration: 0.04, ease: 'none' })
    .to(target, { x: -2, skewX:  1, duration: 0.03, ease: 'none' })
    .to(target, { x:  0, skewX:  0, duration: 0.03, ease: 'none' });
}

// ── shimmer button ────────────────────────────────────────────────────────────
function ShimmerButton({ children, href }: { children: React.ReactNode; href: string }) {
  const btnRef     = useRef<HTMLAnchorElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  const handleEnter = useCallback(() => {
    if (!shimmerRef.current) return;
    gsap.fromTo(
      shimmerRef.current,
      { x: '-110%' },
      { x: '110%', duration: 0.55, ease: 'power2.inOut' }
    );
  }, []);

  return (
    <Link
      ref={btnRef}
      href={href}
      className="relative inline-flex items-center justify-center overflow-hidden
                 px-10 py-5 font-pixel text-[12px] tracking-widest text-[#000000]
                 bg-[#FFFFFF] hover:bg-[#E8E8E8] transition-colors duration-150
                 border-[3px] border-[#FFFFFF]
                 shadow-[4px_4px_0_#808080] hover:shadow-[6px_6px_0_#808080]
                 active:shadow-[2px_2px_0_#808080] active:translate-x-[2px] active:translate-y-[2px]"
      onMouseEnter={handleEnter}
    >
      {/* shimmer sweep */}
      <span
        ref={shimmerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 20%, rgba(0,0,0,0.12) 50%, transparent 80%)',
          transform: 'translateX(-110%)',
        }}
      />
      {children}
    </Link>
  );
}

// ── section ───────────────────────────────────────────────────────────────────
export default function ContactCTA() {
  const sectionRef  = useRef<HTMLElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const scanRef     = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLDivElement>(null);
  const emailRef    = useRef<HTMLParagraphElement>(null);
  const tlCorner    = useRef<HTMLDivElement>(null);
  const trCorner    = useRef<HTMLDivElement>(null);
  const blCorner    = useRef<HTMLDivElement>(null);
  const brCorner    = useRef<HTMLDivElement>(null);

  // ── corner parallax on mouse move ──────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const corners = [
      { ref: tlCorner.current, ox: -1, oy: -1 },
      { ref: trCorner.current, ox: 1, oy: -1 },
      { ref: blCorner.current, ox: -1, oy: 1 },
      { ref: brCorner.current, ox: 1, oy: 1 },
    ].filter((c) => c.ref);

    const handleMouse = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      corners.forEach(({ ref, ox, oy }) => {
        gsap.to(ref, {
          x: (e.clientX - cx) * ox * 0.15,
          y: (e.clientY - cy) * oy * 0.15,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    section.addEventListener('mousemove', handleMouse);
    return () => section.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── ambient glow pulse (skip if reduced motion) ──────────────────────
      if (!prefersReduced && glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          duration: 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      // ── scan-line wipe: a white line sweeps top → bottom revealing content ─
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter() {
          if (prefersReduced) {
            gsap.set(
              [headingRef.current, subRef.current, btnRef.current, emailRef.current],
              { opacity: 1, clearProps: 'all' }
            );
            return;
          }

          // initial hidden state
          gsap.set(
            [headingRef.current, subRef.current, btnRef.current, emailRef.current],
            { opacity: 0 }
          );

          const tl = gsap.timeline();

          // 1. scan line sweeps down
          tl.fromTo(
            scanRef.current,
            { scaleY: 0, transformOrigin: 'top center', opacity: 1 },
            { scaleY: 1, duration: 0.5, ease: 'power2.inOut' }
          ).to(scanRef.current, { opacity: 0, duration: 0.2 });

          // 2. heading glitch entrance
          tl.to(headingRef.current, { opacity: 1, duration: 0.01 }, '-=0.1')
            .call(() => { if (headingRef.current) runGlitch(headingRef.current); });

          // 3. subtitle + button + email stagger in
          tl.to(subRef.current,  { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '+=0.05')
            .to(btnRef.current,  { opacity: 1, y: 0, duration: 0.4,  ease: 'power2.out' }, '-=0.25')
            .to(emailRef.current,{ opacity: 1, y: 0, duration: 0.4,  ease: 'power2.out' }, '-=0.2');
        },
      });

      // set initial y on staggered items
      gsap.set([subRef.current, btnRef.current, emailRef.current], { y: 16 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-36 bg-[#000000] relative overflow-hidden border-b-[3px] border-[#1A1A1A]"
    >
      {/* ── hidden SVG noise filter definition ── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0 }}
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* ── grain / noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ filter: 'url(#noise)' }}
      />

      {/* ── ambient background glow ── */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255,255,255,0.025)',
          filter: 'blur(150px)',
          borderRadius: '50%',
        }}
      />

      {/* ── pixel grid overlay ── */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)]
                   bg-[size:20px_20px] opacity-40 pointer-events-none"
      />

      {/* ── corner accents ── */}
      <div ref={tlCorner} className="absolute top-8 left-8 w-16 h-16 border-t-[2px] border-l-[2px] border-[#333] pointer-events-none" style={{ willChange: 'transform' }} />
      <div ref={trCorner} className="absolute top-8 right-8 w-16 h-16 border-t-[2px] border-r-[2px] border-[#333] pointer-events-none" style={{ willChange: 'transform' }} />
      <div ref={blCorner} className="absolute bottom-8 left-8 w-16 h-16 border-b-[2px] border-l-[2px] border-[#333] pointer-events-none" style={{ willChange: 'transform' }} />
      <div ref={brCorner} className="absolute bottom-8 right-8 w-16 h-16 border-b-[2px] border-r-[2px] border-[#333] pointer-events-none" style={{ willChange: 'transform' }} />

      {/* ── scan-line wipe element ── */}
      <div
        ref={scanRef}
        className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent
                   pointer-events-none z-10"
        style={{ opacity: 0 }}
      />

      <Container className="relative z-20 text-center">

        {/* badge */}
        <div className="inline-flex items-center gap-3 border border-[#333] bg-[#0A0A0A] px-4 py-2 mb-12">
          <span className="font-pixel text-[9px] text-[#808080] tracking-[0.2em]">
            COMM_LINK // OPEN
          </span>
        </div>

        {/* ── massive editorial headline — glitch target ── */}
        <h2
          ref={headingRef}
          className="font-pixel text-[clamp(24px,6vw,72px)] text-[#FFFFFF]
                     tracking-wider leading-none mb-4"
          style={{ opacity: 0, willChange: 'transform' }}
        >
          {/* stacked for maximum typographic impact */}
          <span className="block">LET&apos;S</span>
          <span className="block">WORK TOGETHER</span>
        </h2>

        <p
          ref={subRef}
          className="font-terminal text-[20px] text-[#808080] max-w-lg mx-auto mb-4 leading-relaxed"
          style={{ opacity: 0 }}
        >
          Have an exciting project in mind?<br />
          I&apos;d love to hear from you.
        </p>

        {/* ── horizontal rule ── */}
        <div className="w-[120px] h-px bg-[#333] mx-auto my-8" />

        {/* ── shimmer CTA ── */}
        <div ref={btnRef} style={{ opacity: 0 }}>
          <ShimmerButton href="/contact">
            [ START A PROJECT ]
          </ShimmerButton>
        </div>

        {/* email */}
        <p
          ref={emailRef}
          className="font-terminal text-[18px] text-[#555] mt-10"
          style={{ opacity: 0 }}
        >
          or{' '}
          <a
            href="mailto:johnmark.tactacan@gmail.com"
            className="text-[#B0B0B0] hover:text-[#FFFFFF] transition-colors duration-200 underline underline-offset-4"
          >
            johnmark.tactacan@gmail.com
          </a>
        </p>

      </Container>
    </section>
  );
}
