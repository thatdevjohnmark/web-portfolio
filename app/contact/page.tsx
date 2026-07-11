'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import HeroHeader from '../components/ui/HeroHeader';

gsap.registerPlugin(ScrollTrigger);

// ── glitch helper ─────────────────────────────────────────────────────────
function runGlitch(target: Element) {
  gsap.timeline()
    .to(target, { x: -3, skewX:  2, duration: 0.04, ease: 'none' })
    .to(target, { x:  3, skewX: -2, duration: 0.04, ease: 'none' })
    .to(target, { x: -2, skewX:  1, duration: 0.03, ease: 'none' })
    .to(target, { x:  0, skewX:  0, duration: 0.03, ease: 'none' });
}

// ── magnetic CTA button ───────────────────────────────────────────────────
function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLAnchorElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width  / 2)) * 0.4);
      yTo((e.clientY - (rect.top  + rect.height / 2)) * 0.4);
    };
    const handleLeave = () => { xTo(0); yTo(0); };

    el.addEventListener('mousemove',  handleMove  as EventListener);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove',  handleMove  as EventListener);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const handleEnter = useCallback(() => {
    if (!shimmerRef.current) return;
    gsap.fromTo(shimmerRef.current, { x: '-110%' }, { x: '110%', duration: 0.55, ease: 'power2.inOut' });
  }, []);

  return (
    <div ref={wrapRef} className="inline-block" style={{ willChange: 'transform' }}>
      <a
        ref={btnRef}
        href={href}
        onMouseEnter={handleEnter}
        className="relative inline-flex items-center justify-center overflow-hidden
                   px-12 py-5 font-pixel text-[12px] tracking-widest
                   text-[#000000] bg-[#FFFFFF] border-[3px] border-[#FFFFFF]
                   shadow-[4px_4px_0_#808080] hover:shadow-[6px_6px_0_#808080]
                   active:shadow-[2px_2px_0_#808080] active:translate-x-[2px] active:translate-y-[2px]
                   transition-shadow duration-150"
      >
        <span
          ref={shimmerRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(0,0,0,0.1) 50%, transparent 80%)',
            transform: 'translateX(-110%)',
          }}
        />
        {children}
      </a>
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const pageRef    = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const scanRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── ambient glow pulse ────────────────────────────────────────────
      if (!prefersReduced && glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.2,
          duration: 7,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      // ── section label reveal ──────────────────────────────────────────
      gsap.from(labelRef.current, {
        opacity: 0, y: 24, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(ruleRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' } }
      );

      // ── dramatic scan-line wipe on the card ───────────────────────────
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 78%',
        once: true,
        onEnter() {
          if (prefersReduced) {
            gsap.set([channelsRef.current, ctaRef.current], { opacity: 1, clearProps: 'all' });
            return;
          }

          gsap.set([channelsRef.current, ctaRef.current], { opacity: 0 });

          const tl = gsap.timeline();

          // scan-line sweeps top → bottom
          tl.fromTo(scanRef.current,
            { scaleY: 0, transformOrigin: 'top center', opacity: 0.9 },
            { scaleY: 1, duration: 0.5, ease: 'power2.inOut' }
          ).to(scanRef.current, { opacity: 0, duration: 0.25 });

          // card content: glitch then stagger in
          tl.call(() => { if (cardRef.current) runGlitch(cardRef.current); });
          tl.to(channelsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.05');
          tl.to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.25');
        },
      });

      gsap.set([channelsRef.current, ctaRef.current], { y: 16 });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="COMM_LINK // STANDBY"
        title="[ CONTACT ]"
        description="Available for technical consultation, QA auditing, and full-stack collaboration."
      />

      {/* ════════════ CONNECTION CHANNELS ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000] relative overflow-hidden">

        {/* ambient glow */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: 500,
            height: 500,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255,255,255,0.018)',
            filter: 'blur(130px)',
            borderRadius: '50%',
            willChange: 'transform',
          }}
        />

        {/* pixel grid overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"
        />

        <Container className="relative z-10">

          <div ref={labelRef} className="mb-16">
            <div className="flex items-baseline gap-5 mb-4">
              <span
                className="font-pixel text-[#1A1A1A] select-none leading-none shrink-0"
                style={{ fontSize: 'clamp(56px, 10vw, 112px)', lineHeight: 1 }}
                aria-hidden="true"
              >
                01
              </span>
              <h2
                className="font-pixel text-[#FFFFFF] tracking-wider"
                style={{ fontSize: 'clamp(14px, 2.5vw, 22px)' }}
              >
                CONNECTION CHANNELS
              </h2>
            </div>
            <div ref={ruleRef} className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div
              ref={cardRef}
              className="relative border-[3px] border-[#333] bg-[#1A1A1A] p-8 lg:p-12 overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              {/* scan-line wipe element */}
              <div
                ref={scanRef}
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-20"
                style={{ opacity: 0 }}
              />

              {/* corner accents */}
              <div aria-hidden="true" className="absolute top-0 right-0 h-12 w-12 border-t-[3px] border-r-[3px] border-[#555] pointer-events-none" />
              <div aria-hidden="true" className="absolute bottom-0 left-0 h-12 w-12 border-b-[3px] border-l-[3px] border-[#555] pointer-events-none" />

              {/* channel rows */}
              <div
                ref={channelsRef}
                className="space-y-10 text-[#B0B0B0] relative z-10"
                style={{ willChange: 'opacity, transform' }}
              >
                <div>
                  <div className="font-pixel text-[9px] tracking-[0.2em] text-[#808080] mb-2">
                    COMM_CHANNEL // EMAIL
                  </div>
                  <a
                    className="font-terminal text-[22px] md:text-[26px] text-[#FFFFFF] hover:text-[#808080] transition-colors break-all"
                    href="mailto:johnmark.tactacan@gmail.com"
                  >
                    johnmark.tactacan@gmail.com
                  </a>
                </div>

                <div>
                  <div className="font-pixel text-[9px] tracking-[0.2em] text-[#808080] mb-2">
                    COMM_CHANNEL // VOICE
                  </div>
                  <a
                    className="font-terminal text-[22px] md:text-[26px] text-[#FFFFFF] hover:text-[#808080] transition-colors"
                    href="tel:+639762159529"
                  >
                    09762159529
                  </a>
                </div>

                <div>
                  <div className="font-pixel text-[9px] tracking-[0.2em] text-[#808080] mb-2">
                    GEO_LOC // COORDINATES
                  </div>
                  <div className="font-terminal text-[20px] text-[#FFFFFF]">
                    Carranglan, Nueva Ecija, Philippines
                  </div>
                </div>
              </div>

              {/* magnetic CTA */}
              <div
                ref={ctaRef}
                className="relative z-10 pt-8 border-t-[2px] border-[#333] mt-10"
                style={{ willChange: 'opacity, transform' }}
              >
                <MagneticCTA href="mailto:johnmark.tactacan@gmail.com">
                  [ INITIALIZE TRANSMISSION ]
                </MagneticCTA>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
