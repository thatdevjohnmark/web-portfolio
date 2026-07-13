'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import HeroHeader from '../components/ui/HeroHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { journalEntries } from '../data/journal';

gsap.registerPlugin(ScrollTrigger);

// ── individual journal entry ──────────────────────────────────────────────
function JournalEntry({
  entry,
  isExpanded,
  onToggle,
}: {
  entry: typeof journalEntries[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const prevExpanded = useRef(isExpanded);

  // ── clip-path expand/collapse on body text ────────────────────────────
  useEffect(() => {
    if (prevExpanded.current === isExpanded) return;
    prevExpanded.current = isExpanded;
    const body = bodyRef.current;
    if (!body) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (isExpanded) {
      gsap.fromTo(body, { clipPath: 'inset(0 0 100% 0)', opacity: 0 }, {
        clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.45, ease: 'power3.out',
      });
    } else {
      gsap.to(body, { clipPath: 'inset(0 0 100% 0)', opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isExpanded]);

  // ── hover on card: glow dot ────────────────────────────────────────────
  const handleEnter = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(dotRef.current, { scale: 1.5, duration: 0.25, ease: 'power2.out' });
  }, []);
  const handleLeave = useCallback(() => {
    gsap.to(dotRef.current, { scale: 1, duration: 0.3, ease: 'expo.out' });
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleEnter, handleLeave]);

  return (
    <div
      ref={cardRef}
      className="journal-entry relative pl-14"
      style={{ willChange: 'clip-path, opacity' }}
    >
      <div
        ref={dotRef}
        className="absolute left-[12px] top-[6px] h-4 w-4 bg-[#FFFFFF] border-[3px] border-[#000000] z-10"
        style={{ willChange: 'transform' }}
      />

      <div className="font-pixel text-[8px] tracking-wider text-[#B0B0B0] border-[2px] border-[#333] bg-[#0A0A0A] px-3 py-1 inline-block mb-4">
        {entry.date}{' // '}{entry.type.toUpperCase()}
      </div>

      <div className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#555] transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {entry.image && (
            <div className="relative w-full sm:w-32 aspect-video sm:aspect-square flex-shrink-0 overflow-hidden border-[2px] border-[#333]">
              <Image
                src={entry.image}
                alt={entry.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div className="flex-grow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-pixel text-[13px] text-[#FFFFFF] tracking-wider leading-relaxed">
                  {entry.title}
                </h3>
                <p className="font-terminal text-[16px] text-[#B0B0B0] mt-0.5">
                  {entry.subtitle}
                </p>
              </div>
              <Badge
                variant={
                  entry.type === 'education'
                    ? 'primary'
                    : entry.type === 'milestone'
                    ? 'warning'
                    : 'success'
                }
                className="font-pixel text-[8px] shrink-0"
              >
                {entry.type}
              </Badge>
            </div>

            {/* always show collapsed preview; full text revealed via clip-path */}
            {!isExpanded && (
              <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mt-4 line-clamp-2">
                {entry.description}
              </p>
            )}
            {isExpanded && (
              <p
                ref={bodyRef}
                className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mt-4"
                style={{ willChange: 'clip-path, opacity' }}
              >
                {entry.description}
              </p>
            )}

            <button
              onClick={onToggle}
              className="mt-3 font-pixel text-[9px] text-[#FFFFFF] hover:text-[#808080] transition-colors tracking-wider cursor-pointer"
            >
              {isExpanded ? '[−] COLLAPSE' : '[+] EXPAND'}
            </button>

            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-[2px] border-[#333]">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-pixel text-[8px] text-[#808080] tracking-wider"
                  >
                    #{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────
export default function JournalPage() {
  const [filter,    setFilter]    = useState<'all' | 'education' | 'milestone' | 'project'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});

  const pageRef      = useRef<HTMLElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLDivElement>(null);
  const ruleRef      = useRef<HTMLDivElement>(null);
  const controlsRef  = useRef<HTMLDivElement>(null);

  const toggleExpand = useCallback((id: string) => {
    setExpandedEntries((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const sortedEntries = useMemo(() => {
    const filtered = journalEntries.filter((entry) => {
      if (filter === 'all') return true;
      return entry.type === filter;
    });
    return [...filtered].sort((a, b) =>
      sortOrder === 'desc'
        ? b.timestamp.localeCompare(a.timestamp)
        : a.timestamp.localeCompare(b.timestamp)
    );
  }, [filter, sortOrder]);

  // ── heading reveal ───────────────────────────────────────────────────
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
      gsap.from(controlsRef.current, {
        opacity: 0, y: 16, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: controlsRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── scrub-drawn vertical timeline line ──────────────────────────────
  useEffect(() => {
    if (!lineRef.current || !timelineRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
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
    });
    return () => ctx.revert();
  }, [sortedEntries]);

  // ── clip-path wipe each entry on scroll ──────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const entries = timelineRef.current?.querySelectorAll('.journal-entry');
      if (!entries || !entries.length) return;
      entries.forEach((entry) => {
        gsap.fromTo(
          entry,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, timelineRef);
    return () => ctx.revert();
  }, [sortedEntries]);

  return (
    <main ref={pageRef} className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="HISTORICAL_RECORD"
        title="[ JOURNAL ]"
        description="Historical timeline records from college enrollment to graduation and specialized training."
      />

      {/* ════════════ TIMELINE ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>

          <div ref={labelRef} className="mb-12">
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
                TIMELINE
              </h2>
            </div>
            <div ref={ruleRef} className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          {/* Controls */}
          <div
            ref={controlsRef}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b-[2px] border-[#333] pb-6 mb-12"
          >
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all'       as const, label: 'ALL_LOGS'   },
                { key: 'education' as const, label: 'EDUCATION'  },
                { key: 'milestone' as const, label: 'MILESTONES' },
                { key: 'project'   as const, label: 'PROJECTS'   },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 font-pixel text-[9px] tracking-wider border-[2px] transition-all duration-150 cursor-pointer ${
                    filter === key
                      ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                      : 'border-[#333] bg-[#0A0A0A] text-[#B0B0B0] hover:text-[#FFFFFF] hover:border-[#808080]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="font-pixel text-[9px] tracking-wider px-3 py-1.5 border-[2px] border-[#333] bg-[#0A0A0A] text-[#B0B0B0] hover:text-[#FFFFFF] hover:border-[#808080] transition-all duration-150 cursor-pointer"
            >
              {sortOrder === 'desc' ? '▼ NEWEST FIRST' : '▲ OLDEST FIRST'}
            </button>
          </div>

          {/* Timeline */}
          {sortedEntries.length > 0 ? (
            <div className="relative mt-8">
              {/* scrub-drawn vertical line */}
              <div
                ref={lineRef}
                className="absolute left-[19px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#555] to-[#1A1A1A]"
                style={{ willChange: 'transform' }}
              />

              <div ref={timelineRef} className="space-y-12">
                {sortedEntries.map((entry) => (
                  <JournalEntry
                    key={entry.id}
                    entry={entry}
                    isExpanded={!!expandedEntries[entry.id]}
                    onToggle={() => toggleExpand(entry.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-16 text-center py-20 border-[3px] border-dashed border-[#333] bg-[#0A0A0A]">
              <div className="font-pixel text-[24px] text-[#333]">◈</div>
              <div className="mt-3 font-pixel text-[10px] text-[#666] tracking-wider">
                NO RECORDS FOUND FOR FILTER
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-16 flex justify-center gap-4">
            <Link href="/about">
              <Button variant="outline" size="sm" className="font-pixel text-[9px]">
                [ BACK TO ABOUT ]
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="sm" className="font-pixel text-[9px]">
                [ VIEW PROJECTS ]
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
