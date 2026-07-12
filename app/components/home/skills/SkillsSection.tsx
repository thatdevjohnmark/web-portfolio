'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../Container';
import { skills } from '../../../data/skills';

gsap.registerPlugin(ScrollTrigger);

// ── data ─────────────────────────────────────────────────────────────────────
const ALL_SKILLS = skills.flatMap((g) =>
  g.items.map((item) => ({ item, tier: g.tier }))
);

// Duplicate for seamless infinite loop (both rows share the same data)
const MARQUEE_ITEMS = [...ALL_SKILLS, ...ALL_SKILLS];

// ─────────────────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const sectionRef     = useRef<HTMLElement>(null);
  const headingRef     = useRef<HTMLDivElement>(null);
  const lineRef        = useRef<HTMLDivElement>(null);
  // Row 1 — scrolls left (original)
  const marqueeRef     = useRef<HTMLDivElement>(null);
  // Row 2 — scrolls right (reverse)
  const marqueeRevRef  = useRef<HTMLDivElement>(null);
  const gridRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── marquee band entrance ──────────────────────────────────────────
      gsap.set([marqueeRef.current, marqueeRevRef.current], { opacity: 0, y: 24 });
      gsap.to(marqueeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
      gsap.to(marqueeRevRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: marqueeRevRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      // ── heading reveal ───────────────────────────────────────────────────
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── marquee row 1: left-scroll (28 s) ────────────────────────────────
      if (marqueeRef.current && !prefersReduced) {
        const track = marqueeRef.current.querySelector(
          '.marquee-track-fwd'
        ) as HTMLElement | null;
        if (track) {
          const totalWidth = track.scrollWidth / 2;

          const loopTween = gsap.to(track, {
            x: -totalWidth,
            duration: 28,
            ease: 'none',
            repeat: -1,
            onRepeat() {
              gsap.set(track, { x: 0 });
            },
          });

          // Velocity scrub: speed up while scrolling through section
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate(self) {
              const velocity = Math.abs(self.getVelocity());
              loopTween.timeScale(1 + velocity / 1500);
              gsap.to(loopTween, {
                timeScale: 1,
                duration: 0.8,
                delay: 0.1,
                overwrite: 'auto',
                ease: 'power2.out',
              });
            },
          });
        }
      }

      // ── marquee row 2: right-scroll / reverse (22 s, async feel) ─────────
      if (marqueeRevRef.current && !prefersReduced) {
        const trackRev = marqueeRevRef.current.querySelector(
          '.marquee-track-rev'
        ) as HTMLElement | null;
        if (trackRev) {
          const totalWidthRev = trackRev.scrollWidth / 2;

          // Start at -totalWidth so it scrolls FROM left end back to zero
          gsap.set(trackRev, { x: -totalWidthRev });

          const loopTweenRev = gsap.to(trackRev, {
            x: 0,
            duration: 22,
            ease: 'none',
            repeat: -1,
            onRepeat() {
              gsap.set(trackRev, { x: -totalWidthRev });
            },
          });

          // Velocity scrub for reverse row too
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate(self) {
              const velocity = Math.abs(self.getVelocity());
              loopTweenRev.timeScale(1 + velocity / 1500);
              gsap.to(loopTweenRev, {
                timeScale: 1,
                duration: 0.8,
                delay: 0.1,
                overwrite: 'auto',
                ease: 'power2.out',
              });
            },
          });
        }
      }

      // ── category cards: animate in, then ambient float ───────────────────
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];

      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 36,
          duration: 0.6,
          stagger: { each: 0.1, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          onComplete() {
            // ── badge burst stagger ────────────────────────────────────────
            if (!prefersReduced) {
              const badges = gridRef.current?.querySelectorAll('.skill-badge');
              if (badges && badges.length > 0) {
                gsap.fromTo(
                  Array.from(badges),
                  { opacity: 0, scale: 0.7, y: 6 },
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: { each: 0.035, from: 'random' },
                    ease: 'back.out(1.7)',
                  }
                );
              }
            }

            // ── ambient float: each card independently ─────────────────────
            if (!prefersReduced) {
              cards.forEach((card) => {
                gsap.to(card, {
                  y: gsap.utils.random(-8, -14),
                  duration: gsap.utils.random(4, 7),
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                  delay: gsap.utils.random(0, 2),
                });
              });
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#0A0A0A] border-b-[3px] border-[#1A1A1A] overflow-hidden"
    >
      {/* ── subtle radial gradient ambient overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 100%)',
        }}
      />

      {/* ── heading ── */}
      <Container className="relative z-10">
        <div ref={headingRef} className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-pixel text-[11px] text-[#444] tracking-widest">[02]</span>
            <h2 className="font-pixel text-[clamp(13px,2.5vw,20px)] text-[#FFFFFF] tracking-wider">
              SKILLS &amp; EXPERTISE
            </h2>
          </div>
          <div
            ref={lineRef}
            className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent"
          />
          <p className="font-terminal text-[19px] text-[#666] mt-3">
            Technologies and tools I work with
          </p>
        </div>
      </Container>

      {/* ── marquee band: two rows ── */}
      <div className="relative z-10 flex flex-col gap-0 mb-12 border-y border-[#1E1E1E]">
        {/* Row 1 — forward (left) */}
        <div
          ref={marqueeRef}
          className="
            relative w-full overflow-hidden py-3
            before:absolute before:left-0 before:top-0 before:h-full before:w-24
            before:bg-gradient-to-r before:from-[#0A0A0A] before:to-transparent before:z-10 before:pointer-events-none
            after:absolute after:right-0 after:top-0 after:h-full after:w-24
            after:bg-gradient-to-l after:from-[#0A0A0A] after:to-transparent after:z-10 after:pointer-events-none
          "
        >
          <div
            className="marquee-track-fwd flex gap-4 will-change-transform"
            style={{ whiteSpace: 'nowrap' }}
          >
            {MARQUEE_ITEMS.map((s, i) => (
              <span
                key={i}
                className="
                  inline-flex items-center gap-2 px-4 py-1.5 border border-[#2A2A2A]
                  bg-[#0D0D0D] font-pixel text-[9px] tracking-wider shrink-0
                  text-[#B0B0B0] hover:border-[#555] hover:text-white
                  transition-colors duration-200 cursor-default
                "
              >
                <span className="text-[#444] font-pixel text-[8px]">◈</span>
                {s.item}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — reverse (right), 22 s, slightly dimmer */}
        <div
          ref={marqueeRevRef}
          className="
            relative w-full overflow-hidden py-3 border-t border-[#141414]
            before:absolute before:left-0 before:top-0 before:h-full before:w-24
            before:bg-gradient-to-r before:from-[#0A0A0A] before:to-transparent before:z-10 before:pointer-events-none
            after:absolute after:right-0 after:top-0 after:h-full after:w-24
            after:bg-gradient-to-l after:from-[#0A0A0A] after:to-transparent after:z-10 after:pointer-events-none
          "
        >
          <div
            className="marquee-track-rev flex gap-4 will-change-transform"
            style={{ whiteSpace: 'nowrap' }}
          >
            {MARQUEE_ITEMS.map((s, i) => (
              <span
                key={i}
                className="
                  inline-flex items-center gap-2 px-4 py-1.5 border border-[#222]
                  bg-[#0D0D0D] font-pixel text-[9px] tracking-wider shrink-0
                  text-[#888] hover:border-[#444] hover:text-[#C0C0C0]
                  transition-colors duration-200 cursor-default
                "
              >
                <span className="text-[#333] font-pixel text-[8px]">◇</span>
                {s.item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── category grid ── */}
      <Container className="relative z-10">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((group) => (
            <div
              key={group.tier}
              className="
                group
                bg-[#0D0D0D] p-8
                transition-colors duration-300
                will-change-transform
              "
              style={{
                borderStyle: 'solid',
                borderWidth: '2px 3px 3px 3px',
                borderColor: '#1A1A1A #1E1E1E #1E1E1E #1E1E1E',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  '#333 #333 #333 #333';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  '#1A1A1A #1E1E1E #1E1E1E #1E1E1E';
              }}
            >
              {/* category label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[3px] h-5 bg-white/60 shrink-0" />
                <h3 className="font-pixel text-[13px] text-[#FFFFFF] tracking-wider">
                  {group.tier.toUpperCase()}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="
                      skill-badge inline-block px-3 py-1.5 font-pixel text-[9px]
                      tracking-wider text-[#B0B0B0] border border-[#2A2A2A] bg-[#111]
                      hover:border-[#555] hover:text-white
                      transition-colors duration-200 cursor-default
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
