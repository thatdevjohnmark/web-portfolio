'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Badge from '../components/ui/Badge';
import HeroHeader from '../components/ui/HeroHeader';
import { experience } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    label: 'TESTING & QA',
    skills: [
      { name: 'Manual Testing' },
      { name: 'Regression Testing' },
      { name: 'Functional Testing' },
      { name: 'Edge-case Analysis' },
      { name: 'Bug Reporting & Triage' },
    ],
  },
  {
    label: 'DEVELOPMENT',
    skills: [
      { name: 'Next.js / React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Supabase / PostgreSQL' },
      { name: 'Full-stack Architecture' },
    ],
  },
  {
    label: 'DESIGN & DOCS',
    skills: [
      { name: 'UI/UX Design' },
      { name: 'Technical Writing' },
      { name: 'Requirements Gathering' },
      { name: 'User Workflows' },
    ],
  },
  {
    label: 'TOOLS & PLATFORMS',
    skills: [
      { name: 'Git / GitHub' },
      { name: 'VS Code' },
      { name: 'Vercel / CI/CD' },
      { name: 'Postman / API Testing' },
    ],
  },
];

export default function ExperiencePage() {
  const pageRef      = useRef<HTMLElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);   // vertical scrub line
  const skillsRef    = useRef<HTMLDivElement>(null);
  const label01Ref   = useRef<HTMLDivElement>(null);
  const rule01Ref    = useRef<HTMLDivElement>(null);
  const label02Ref   = useRef<HTMLDivElement>(null);
  const rule02Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── section 01 label ─────────────────────────────────────────────
      gsap.from(label01Ref.current, {
        opacity: 0, y: 24, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: label01Ref.current, start: 'top 88%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(rule01Ref.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: label01Ref.current, start: 'top 88%', toggleActions: 'play none none none' } }
      );

      // ── section 02 label ─────────────────────────────────────────────
      gsap.from(label02Ref.current, {
        opacity: 0, y: 24, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: label02Ref.current, start: 'top 88%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(rule02Ref.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: label02Ref.current, start: 'top 88%', toggleActions: 'play none none none' } }
      );

      // ── vertical timeline line: scrub-driven draw ─────────────────────
      if (lineRef.current && !prefersReduced) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.8,
            },
          }
        );
      }

      // ── timeline entries: clip-path wipe from bottom, stagger ─────────
      const entries = timelineRef.current?.querySelectorAll('.timeline-entry');
      if (entries && entries.length > 0 && !prefersReduced) {
        entries.forEach((entry) => {
          gsap.fromTo(
            entry,
            { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
            {
              clipPath: 'inset(0% 0 0 0)',
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: entry,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // ── skill blocks: stagger burst ───────────────────────────────────
      const skillBlocks = skillsRef.current?.querySelectorAll('.skill-block');
      if (skillBlocks && skillBlocks.length > 0 && !prefersReduced) {
        gsap.fromTo(
          Array.from(skillBlocks),
          { opacity: 0, y: 28, clipPath: 'inset(100% 0 0 0)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
              onEnter: () => {
                // badge burst after blocks land
                const badges = skillsRef.current?.querySelectorAll('.skill-chip');
                if (!badges) return;
                gsap.fromTo(
                  Array.from(badges),
                  { opacity: 0, scale: 0.65, y: 6 },
                  {
                    opacity: 1, scale: 1, y: 0,
                    duration: 0.28,
                    delay: 0.4,
                    stagger: { each: 0.03, from: 'random' },
                    ease: 'back.out(1.7)',
                  }
                );
              },
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="CAREER_LOG // v2.0"
        title="[ EXPERIENCE ]"
        description="A chronological log of professional roles — from requirements gathering and manual testing to full-stack development and UI/UX collaboration."
      />

      {/* ════════════ TIMELINE ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>

          <div ref={label01Ref} className="mb-16">
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
                WORK HISTORY
              </h2>
            </div>
            <div ref={rule01Ref} className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          <div className="relative">
            {/* Scrub-animated vertical line */}
            <div
              ref={lineRef}
              className="absolute left-[19px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#555] to-[#1A1A1A]"
              style={{ willChange: 'transform' }}
            />

            <div ref={timelineRef} className="space-y-16">
              {experience.map((item) => (
                <TimelineEntry key={item.id} item={item} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════ SKILLS MATRIX ════════════ */}
      <section className="py-20 lg:py-28 border-t-[3px] border-[#1A1A1A] bg-[#000000]">
        <Container>

          <div ref={label02Ref} className="mb-16">
            <div className="flex items-baseline gap-5 mb-4">
              <span
                className="font-pixel text-[#1A1A1A] select-none leading-none shrink-0"
                style={{ fontSize: 'clamp(56px, 10vw, 112px)', lineHeight: 1 }}
                aria-hidden="true"
              >
                02
              </span>
              <h2
                className="font-pixel text-[#FFFFFF] tracking-wider"
                style={{ fontSize: 'clamp(14px, 2.5vw, 22px)' }}
              >
                SKILLS &amp; COMPETENCIES
              </h2>
            </div>
            <div ref={rule02Ref} className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          <div
            ref={skillsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14"
          >
            {skillCategories.map((cat) => (
              <div key={cat.label} className="skill-block" style={{ willChange: 'clip-path, opacity, transform' }}>
                <h3 className="font-pixel text-[11px] text-[#808080] tracking-[0.2em] mb-6">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="skill-chip font-pixel text-[9px] tracking-wider px-3 py-1.5 bg-[#0A0A0A] text-[#B0B0B0] border-[2px] border-[#333] hover:border-[#555] hover:text-white transition-colors duration-150"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}

// ─── timeline entry ───────────────────────────────────────────────────────────
function TimelineEntry({ item }: { item: typeof experience[number] }) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);

  // ── hover: slide card content right, glow dot ─────────────────────────
  useEffect(() => {
    const card  = cardRef.current;
    const inner = innerRef.current;
    const dot   = dotRef.current;
    if (!card || !inner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleEnter = () => {
      gsap.to(inner, { x: 6, duration: 0.35, ease: 'power2.out' });
      gsap.to(dot,   { scale: 1.4, backgroundColor: '#FFFFFF', duration: 0.25 });
    };
    const handleLeave = () => {
      gsap.to(inner, { x: 0, duration: 0.45, ease: 'power3.out' });
      gsap.to(dot,   { scale: 1,   backgroundColor: '#FFFFFF', duration: 0.35 });
    };

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="timeline-entry relative pl-14 cursor-default"
      style={{ willChange: 'clip-path, opacity' }}
    >
      {/* dot */}
      <div
        ref={dotRef}
        className="absolute left-[12px] top-[6px] h-4 w-4 bg-[#FFFFFF] border-[3px] border-[#000000] z-10"
        style={{ willChange: 'transform' }}
      />

      <div
        ref={innerRef}
        style={{ willChange: 'transform' }}
      >
        <div className="font-pixel text-[8px] tracking-wider text-[#B0B0B0] border-[2px] border-[#333] bg-[#0A0A0A] px-3 py-1 inline-block mb-4">
          {item.period}
        </div>

        <div className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#555] transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] tracking-wider leading-relaxed">
                {item.role}
              </h3>
              <p className="font-terminal text-[20px] text-[#B0B0B0] mt-1">{item.company}</p>
            </div>
          </div>

          <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mb-6">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
