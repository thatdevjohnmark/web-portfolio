'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Container from '@/app/components/Container';
import HeroHeader from '@/app/components/ui/HeroHeader';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/app/data/project';

gsap.registerPlugin(ScrollTrigger);

// ── per-card 3D tilt + image zoom ─────────────────────────────────────────
function ProjectCard({ project }: { project: typeof projects[number] }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    gsap.to(card, {
      rotateY:  dx * 7,
      rotateX: -dy * 7,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 900,
    });

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

  const handleEnter = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const img = imgRef.current?.querySelector('img');
    if (img) {
      gsap.to(img, {
        scale: 1.08,
        duration: 0.55,
        ease: 'power2.out',
      });
    }
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.6,
      ease: 'expo.out',
    });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const img = imgRef.current?.querySelector('img');
    if (img) {
      gsap.to(img, {
        scale: 1,
        duration: 0.55,
        ease: 'power2.out',
      });
    }
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('mousemove',  handleMove  as EventListener);
    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove',  handleMove  as EventListener);
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleEnter, handleLeave]);

  return (
    <div
      ref={cardRef}
      className="project-card bg-[#1A1A1A] border-[3px] border-[#333] overflow-hidden flex flex-col hover:border-[#555] transition-colors duration-200 relative cursor-default"
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {/* cursor glow */}
      <div
        ref={glowRef}
        className="absolute w-[240px] h-[240px] rounded-full pointer-events-none opacity-0 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* image */}
      <div ref={imgRef} className="relative h-48 w-full bg-[#111] overflow-hidden z-10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-80"
          style={{ willChange: 'transform' }}
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent pointer-events-none" />
      </div>

      {/* content */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-3 tracking-wider leading-relaxed">
          {project.title}
        </h3>
        <p className="font-terminal text-[18px] text-[#B0B0B0] line-clamp-3 mb-6">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-pixel text-[8px] tracking-wider px-2 py-1 bg-[#0A0A0A] text-[#B0B0B0] border-[2px] border-[#333] hover:border-[#555] hover:text-white transition-colors duration-150"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/articles/${project.id}`}
          className="inline-flex items-center gap-2 font-pixel text-[10px] text-[#FFFFFF] mt-auto tracking-wider hover:text-[#808080] transition-colors"
        >
          [ VIEW FULL ARTICLE ] →
        </Link>
      </div>
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [showAll, setShowAll]     = useState(false);
  const displayedProjects         = showAll ? projects : projects.slice(0, 3);

  const pageRef    = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);

  // ── heading / rule reveal ─────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 24, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(ruleRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' } }
      );
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0, y: 16, duration: 0.45, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── clip-path stagger on grid (re-runs on showAll) ────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (!cards || !cards.length) return;
      gsap.fromTo(
        Array.from(cards),
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [showAll]);

  return (
    <main ref={pageRef} className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="PORTFOLIO_LOG"
        title="[ PROJECTS ]"
        description="A collection of work spanning full-stack development, QA specialization, and data validation."
      />

      {/* ════════════ PROJECTS ════════════ */}
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
                SHOWCASE
              </h2>
            </div>
            <div ref={ruleRef} className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: '900px' }}
          >
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {!showAll && projects.length > 3 && (
            <div ref={ctaRef} className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 font-pixel text-[11px] text-[#FFFFFF] bg-[#1A1A1A] border-[3px] border-[#333] px-8 py-4 hover:border-[#808080] hover:bg-[#222] transition-all duration-200 cursor-pointer"
              >
                [ SEE ALL PROJECTS ] ↓
              </button>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  );
}
