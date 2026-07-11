'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Container from '@/app/components/Container';
import HeroHeader from '@/app/components/ui/HeroHeader';
import SectionLabel from '@/app/components/ui/SectionLabel';
import Badge from '@/app/components/ui/Badge';
import Button from '@/app/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const coreCompetencies = [
  'Manual Testing',
  'Bug Identification & Resolution',
  'Data Accuracy Validation',
  'Requirement Analysis',
  'Process Documentation',
  'Progress Reporting',
  'Attention to Detail',
  'Analytical Thinking',
];

// ── reusable tilt card hook ────────────────────────────────────────────────
function useTilt(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(el, {
        rotateY:  dx * 6,
        rotateX: -dy * 6,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    };
    const handleLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'expo.out' });
    };

    el.addEventListener('mousemove',  handleMove  as EventListener);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove',  handleMove  as EventListener);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref]);
}

// ── tilt-enabled card wrapper ──────────────────────────────────────────────
function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref as React.RefObject<HTMLElement>);
  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const pageRef       = useRef<HTMLElement>(null);
  const sec01Ref      = useRef<HTMLElement>(null);
  const sec01LabelRef = useRef<HTMLDivElement>(null);
  const cards01Ref    = useRef<HTMLDivElement>(null);
  const sec02Ref      = useRef<HTMLElement>(null);
  const sec02LabelRef = useRef<HTMLDivElement>(null);
  const cards02Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── helper: reveal a section label ────────────────────────────────
      const revealLabel = (el: HTMLDivElement | null) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
        // expanding rule inside the label
        const rule = el.querySelector('.section-rule') as HTMLElement | null;
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.9,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      };

      // ── helper: clip-path stagger reveal on a grid of cards ───────────
      const revealCards = (container: HTMLDivElement | null) => {
        if (!container) return;
        const cards = Array.from(container.children);
        if (!cards.length) return;

        if (prefersReduced) {
          gsap.set(cards, { opacity: 1 });
          return;
        }

        gsap.fromTo(
          cards,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 0.75,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      };

      revealLabel(sec01LabelRef.current);
      revealLabel(sec02LabelRef.current);
      revealCards(cards01Ref.current);
      revealCards(cards02Ref.current);

      // ── badge burst after cards appear ────────────────────────────────
      if (!prefersReduced) {
        ScrollTrigger.create({
          trigger: cards01Ref.current,
          start: 'top 82%',
          once: true,
          onEnter() {
            const badges = cards01Ref.current?.querySelectorAll('.skill-badge');
            if (!badges) return;
            gsap.fromTo(
              Array.from(badges),
              { opacity: 0, scale: 0.7, y: 6 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.3,
                delay: 0.5,
                stagger: { each: 0.04, from: 'random' },
                ease: 'back.out(1.7)',
              }
            );
          },
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="IDENTITY_RECORD"
        title="[ ABOUT ]"
        description="Detail-oriented IT graduate transitioning into a QA role — with hands-on experience in full-stack development, manual testing, and data validation."
      />

      {/* ════════════ PROFILE ════════════ */}
      <section ref={sec01Ref} className="py-20 lg:py-28 bg-[#000000]">
        <Container>

          {/* section label with oversized index number */}
          <div ref={sec01LabelRef} className="mb-16">
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
                PROFILE
              </h2>
            </div>
            <div className="section-rule h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          <div ref={cards01Ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Profile card — tilt enabled */}
            <TiltCard className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#555] transition-colors duration-300">
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider leading-relaxed">
                John Mark Tactacan
              </h3>
              <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed">
                Detail-oriented IT graduate with hands-on experience in full-stack development,
                manual testing, data validation, and bug resolution across multiple projects.
                Experienced in requirement analysis, process documentation, and progress reporting
                to supervisors and stakeholders. Seeking to transition into a QA role by applying
                strong analytical skills, attention to detail, and practical testing experience in a
                collaborative environment.
              </p>

              <div className="mt-6 font-terminal text-[18px] text-[#B0B0B0]">
                <div className="font-pixel text-[10px] text-[#FFFFFF] tracking-wider mb-1">LOCATION</div>
                <div>Carranglan, Nueva Ecija, Philippines</div>
              </div>

              <div className="mt-6">
                <Link href="/playground">
                  <Button variant="outline" size="sm" className="font-pixel text-[9px]">
                    [ VISIT PLAYGROUND ]
                  </Button>
                </Link>
              </div>
            </TiltCard>

            {/* Competencies card — tilt enabled, badges burst in */}
            <TiltCard className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#555] transition-colors duration-300">
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider">
                CORE COMPETENCIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreCompetencies.map((item) => (
                  <Badge key={item} variant="secondary" className="skill-badge">
                    {item}
                  </Badge>
                ))}
              </div>
            </TiltCard>

          </div>
        </Container>
      </section>

      {/* ════════════ EDUCATION & CERTS ════════════ */}
      <section ref={sec02Ref} className="py-20 lg:py-28 border-t-[3px] border-[#1A1A1A] bg-[#000000]">
        <Container>

          <div ref={sec02LabelRef} className="mb-16">
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
                EDUCATION &amp; CERTIFICATIONS
              </h2>
            </div>
            <div className="section-rule h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          <div ref={cards02Ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <TiltCard className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#555] transition-colors duration-300">
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider">
                EDUCATION
              </h3>
              <div className="font-terminal text-[18px] text-[#B0B0B0]">
                <div className="text-[#FFFFFF] font-terminal text-[20px] leading-relaxed">
                  Bachelor of Science in Information Technology
                </div>
                <div className="text-[#B0B0B0]">Major in Systems Development</div>
                <div className="mt-3">Central Luzon State University</div>
                <div className="mt-1">08/2021 – 01/2026</div>
                <div className="mb-4">Science City of Muñoz, Nueva Ecija, Philippines</div>

                <Link href="/journal">
                  <Button variant="outline" size="sm" className="font-pixel text-[9px] w-full">
                    [ VIEW CHRONOLOGICAL JOURNAL ]
                  </Button>
                </Link>
              </div>
            </TiltCard>

            <TiltCard className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#555] transition-colors duration-300">
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider">
                LICENSES &amp; CERTIFICATIONS
              </h3>
              <div className="font-terminal text-[18px] text-[#B0B0B0]">
                <div className="text-[#FFFFFF] font-terminal text-[20px] leading-relaxed">
                  AWS Academy Cloud Foundations
                </div>
                <div className="mt-1 text-[#808080]">Amazon Web Services</div>
              </div>
            </TiltCard>

          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
