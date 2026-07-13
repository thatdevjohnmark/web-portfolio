'use client';

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../Container';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import { projects } from '../../../data/project';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// ─── individual project row ───────────────────────────────────────────────────

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const rowRef      = useRef<HTMLDivElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const indexRef    = useRef<HTMLSpanElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const borderRef   = useRef<HTMLDivElement>(null);

  const label = String(index + 1).padStart(2, '0');

  // ── cursor glow ────────────────────────────────────────────────────────────
  const handleMove = useCallback((e: MouseEvent) => {
    const row  = rowRef.current;
    const glow = glowRef.current;
    if (!row || !glow) return;
    const rect = row.getBoundingClientRect();
    gsap.to(glow, {
      x: e.clientX - rect.left - 120,
      y: e.clientY - rect.top  - 120,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  // ── row hover: slide right + index brighten + left border ─────────────────
  const handleEnter = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // slide inner content 8px right
    gsap.to(innerRef.current, {
      x: 8,
      duration: 0.35,
      ease: 'power2.out',
    });

    // brighten index number
    gsap.to(indexRef.current, {
      color: '#2A2A2A',
      duration: 0.35,
      ease: 'power2.out',
    });

    // reveal left border
    gsap.to(borderRef.current, {
      opacity: 1,
      scaleY: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleLeave = useCallback(() => {
    // fade glow
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // slide back
    gsap.to(innerRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power3.out',
    });

    // dim index number
    gsap.to(indexRef.current, {
      color: '#1A1A1A',
      duration: 0.4,
      ease: 'power3.out',
    });

    // hide left border
    gsap.to(borderRef.current, {
      opacity: 0,
      scaleY: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    row.addEventListener('mousemove',  handleMove  as EventListener);
    row.addEventListener('mouseenter', handleEnter as EventListener);
    row.addEventListener('mouseleave', handleLeave);
    return () => {
      row.removeEventListener('mousemove',  handleMove  as EventListener);
      row.removeEventListener('mouseenter', handleEnter as EventListener);
      row.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleEnter, handleLeave]);

  return (
    <div
      ref={rowRef}
      className="relative border-b border-[#1A1A1A] py-10 lg:py-14 overflow-hidden cursor-default"
    >
      {/* cursor glow spot */}
      <div
        ref={glowRef}
        className="absolute w-60 h-60 rounded-full pointer-events-none opacity-0 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* animated left border accent */}
      <div
        ref={borderRef}
        className="absolute left-0 top-0 h-full w-[2px] bg-white origin-top opacity-0"
        style={{ transform: 'scaleY(0)', willChange: 'transform, opacity' }}
      />

      {/* inner content (slides on hover) */}
      <div
        ref={innerRef}
        className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 row-inner-content"
        style={{ willChange: 'transform' }}
      >
        {/* oversized index number */}
        <span
          ref={indexRef}
          className="font-pixel select-none leading-none shrink-0"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: '#1A1A1A',
            willChange: 'color',
            lineHeight: 1,
          }}
        >
          {label}
        </span>

        {/* project info */}
        <div className="flex-1 min-w-0 pt-1">
          {/* title */}
          <h3
            className="font-pixel text-[#FFFFFF] tracking-wider mb-4 leading-snug"
            style={{ fontSize: 'clamp(14px, 2.5vw, 22px)' }}
          >
            {project.title}
          </h3>

          {/* description */}
          <p className="font-terminal text-[18px] text-[#606060] leading-relaxed mb-5 max-w-3xl">
            {project.description}
          </p>

          {/* tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="pixel" className="text-[8px]">
                {tag}
              </Badge>
            ))}
          </div>

          {/* view project link */}
          <Link href={project.link} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="font-pixel text-[9px]">
              [ VIEW PROJECT ]
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── section ─────────────────────────────────────────────────────────────────

export default function ProjectsShowcase() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // ── heading: fade + slide in ──────────────────────────────────────────
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      // ── rule: width expand from left ──────────────────────────────────────
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── rows: clip-path wipe reveal stagger ───────────────────────────────
      const rows = listRef.current?.children;
      if (rows && rows.length > 0) {
        gsap.fromTo(
          Array.from(rows),
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── CTA ───────────────────────────────────────────────────────────────
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });
      // ── row inner content parallax: shift at slow scroll speed ──────
      const rowInners = sectionRef.current?.querySelectorAll('.row-inner-content');
      if (rowInners && rowInners.length > 0) {
        rowInners.forEach((el) => {
          gsap.to(el, {
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('.border-b'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-[#000000] border-b-[3px] border-[#1A1A1A]"
    >
      <Container>

        {/* ── editorial heading ───────────────────────────────────────────── */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-baseline gap-5 mb-4">
            <span className="font-pixel text-[11px] text-[#444] tracking-widest">[01]</span>
            <h2
              className="font-pixel text-[#FFFFFF] tracking-wider leading-none"
              style={{ fontSize: 'clamp(22px, 4vw, 48px)' }}
            >
              FEATURED PROJECTS
            </h2>
          </div>

          {/* expanding rule */}
          <div
            ref={lineRef}
            className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#2A2A2A] to-transparent"
          />

          <p className="font-terminal text-[19px] text-[#555] mt-4">
            Recent work and side projects
          </p>
        </div>

        {/* ── project list ────────────────────────────────────────────────── */}
        <div ref={listRef}>
          {projects.slice(0, 3).map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="text-center mt-16">
          <Link href="/projects">
            <Button variant="pixel" size="lg">[ VIEW ALL PROJECTS ]</Button>
          </Link>
        </div>

      </Container>
    </section>
  );
}
