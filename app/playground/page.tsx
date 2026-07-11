'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import HeroHeader from '../components/ui/HeroHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

type PlaygroundItem = {
  id: string;
  hobby: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

const items: PlaygroundItem[] = [
  {
    id: 'anime',
    hobby: 'HOBBY_01',
    title: 'Anime Culture',
    description:
      'Exploring compelling storytelling, high-fidelity world-building, and cinematic animation aesthetics.',
    tags: ['Studio Ghibli', 'Type-Moon', 'Fantasy'],
    href: '/playground/Anime',
  },
  {
    id: 'games',
    hobby: 'HOBBY_02',
    title: 'Gaming & Hardware',
    description:
      'Immersed in atmospheric survival horror franchises and optimization tracking for high-performance PC hardware.',
    tags: ['Resident Evil', 'PC Benchmarking', 'Survival Horror'],
    href: '/playground/Games',
  },
  {
    id: 'f1',
    hobby: 'HOBBY_03',
    title: 'Formula 1 // Telemetry',
    description:
      'Analyzing high-speed aerodynamics, race strategy logic, and the technical engineering behind the pinnacle of motorsport.',
    tags: ['Aerodynamics', 'Telemetry', 'Motorsport'],
    href: '/playground/F1',
  },
];

// ── playground card: 3D tilt + ambient float + border sweep ───────────────
function PlayCard({ item, index }: { item: PlaygroundItem; index: number }) {
  const outerRef  = useRef<HTMLDivElement>(null);   // float container
  const innerRef  = useRef<HTMLDivElement>(null);   // tilt container
  const glowRef   = useRef<HTMLDivElement>(null);   // border sweep ref (unused visually — handled by JS outline)

  // ── ambient float ──────────────────────────────────────────────────
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.to(outer, {
      y: gsap.utils.random(-10, -16),
      duration: gsap.utils.random(4, 6.5),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: index * 0.6,
    });
    return () => { tween.kill(); };
  }, [index]);

  // ── 3D tilt on mousemove ───────────────────────────────────────────
  const handleMove = useCallback((e: MouseEvent) => {
    const inner = innerRef.current;
    if (!inner || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = inner.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    gsap.to(inner, {
      rotateY:  dx * 8,
      rotateX: -dy * 8,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });

    // cursor glow follow
    const glow = glowRef.current;
    if (glow) {
      gsap.to(glow, {
        x: e.clientX - rect.left - 120,
        y: e.clientY - rect.top  - 120,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(innerRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.6, ease: 'expo.out',
    });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.addEventListener('mousemove',  handleMove  as EventListener);
    inner.addEventListener('mouseleave', handleLeave);
    return () => {
      inner.removeEventListener('mousemove',  handleMove  as EventListener);
      inner.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);

  return (
    <div
      ref={outerRef}
      className="play-card"
      style={{ willChange: 'transform' }}
    >
      <Link href={item.href}>
        <div
          ref={innerRef}
          className="relative border-[3px] border-[#333] bg-[#1A1A1A] p-6 h-full flex flex-col hover:border-[#555] transition-colors duration-200 overflow-hidden cursor-pointer"
          style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
        >
          {/* cursor glow */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="absolute w-[240px] h-[240px] rounded-full pointer-events-none opacity-0 z-0"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
              willChange: 'transform, opacity',
            }}
          />

          <div className="relative z-10 flex flex-col flex-1">
            <div className="font-pixel text-[9px] text-[#808080] tracking-wider mb-2">{item.hobby}</div>
            <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-3 tracking-wider">{item.title}</h3>
            <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mb-6 flex-1">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="font-pixel text-[9px]">
              [ VIEW DETAILS ]
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────
export default function PlaygroundPage() {
  const pageRef   = useRef<HTMLElement>(null);
  const cardsRef  = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLDivElement>(null);
  const ruleRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── label ───────────────────────────────────────────────────────
      gsap.from(labelRef.current, {
        opacity: 0, y: 24, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(ruleRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' } }
      );

      // ── clip-path stagger on cards ───────────────────────────────────
      if (!prefersReduced) {
        const cards = cardsRef.current?.querySelectorAll('.play-card');
        if (cards && cards.length) {
          gsap.fromTo(
            Array.from(cards),
            { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
            {
              clipPath: 'inset(0% 0 0 0)',
              opacity: 1,
              duration: 0.7,
              stagger: 0.14,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="DIGITAL_SANDBOX"
        title="[ PLAYGROUND ]"
        description="A digital sandbox exploring personal interests, media, and development experiments."
      />

      {/* ════════════ EXPLORE ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>

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
                EXPLORE
              </h2>
            </div>
            <div ref={ruleRef} className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: '900px' }}
          >
            {items.map((item, i) => (
              <PlayCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
