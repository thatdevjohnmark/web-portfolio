'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../Container';
import { skills } from '../../../data/skills';
import LogoLoop from './LogoLoop';
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiGit, SiVscodium, SiFigma, SiAmazonwebservices,
} from 'react-icons/si';
import { TbTestPipe, TbBug, TbReportAnalytics, TbFileDescription, TbUsers, TbBrain } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

// ── LogoLoop data ─────────────────────────────────────────────────────────────
// Row 1 — tech stack icons
const TECH_LOGOS = [
  { node: <SiJavascript />,     title: 'JavaScript',  href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiTypescript />,     title: 'TypeScript',  href: 'https://www.typescriptlang.org' },
  { node: <SiReact />,          title: 'React',       href: 'https://react.dev' },
  { node: <SiNextdotjs />,      title: 'Next.js',     href: 'https://nextjs.org' },
  { node: <SiNodedotjs />,      title: 'Node.js',     href: 'https://nodejs.org' },
  { node: <SiGit />,            title: 'Git',         href: 'https://git-scm.com' },
  { node: <SiVscodium />,       title: 'VS Code',     href: 'https://code.visualstudio.com' },
  { node: <SiFigma />,          title: 'Figma',       href: 'https://figma.com' },
  { node: <SiAmazonwebservices />, title: 'AWS',      href: 'https://aws.amazon.com' },
];

// Row 2 — QA / soft skill icons
const QA_LOGOS = [
  { node: <TbTestPipe />,        title: 'Manual Testing'     },
  { node: <TbBug />,             title: 'Bug Identification'  },
  { node: <TbReportAnalytics />, title: 'Regression Testing' },
  { node: <TbFileDescription />, title: 'Documentation'      },
  { node: <TbUsers />,           title: 'Collaboration'      },
  { node: <TbBrain />,           title: 'Analytical Thinking'},
  { node: <TbTestPipe />,        title: 'Data Validation'    },
  { node: <TbReportAnalytics />, title: 'Progress Reporting' },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const headingRef    = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const logoRowRef    = useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── logo rows entrance ───────────────────────────────────────────────
      gsap.from(logoRowRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: logoRowRef.current,
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

      {/* ── LogoLoop rows ── */}
      <div ref={logoRowRef} className="relative z-10 flex flex-col gap-0 mb-12 border-y border-[#1E1E1E] py-1">
        {/* Row 1 — tech stack, scrolls left */}
        <div className="py-3 border-b border-[#141414]">
          <LogoLoop
            logos={TECH_LOGOS}
            speed={60}
            direction="left"
            logoHeight={36}
            gap={48}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#0a0a0a"
            scaleOnHover
            ariaLabel="Tech stack"
            style={{ color: '#888' }}
          />
        </div>
        {/* Row 2 — QA skills, scrolls right */}
        <div className="py-3">
          <LogoLoop
            logos={QA_LOGOS}
            speed={45}
            direction="right"
            logoHeight={32}
            gap={48}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#0a0a0a"
            scaleOnHover
            ariaLabel="QA and soft skills"
            style={{ color: '#555' }}
          />
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
