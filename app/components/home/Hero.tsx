'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import Button from '../ui/Button';
import Container from '../Container';
import Link from 'next/link';
import Lanyard from '../Lanyard';

const fullTitle = 'thatdevjohnmark';
const roles = ['QA_SPECIALIST', 'PROGRAMMER', 'FULLSTACK_DEV', 'MANUAL_TESTER'];

const metricsData = [
  { label: 'MANUAL', value: '100%', sub: 'COVERAGE' },
  { label: 'BUG REPRO', value: 'FULL', sub: 'VERIFIED' },
  { label: 'AUDIT', value: 'ZERO', sub: 'AMBIGUITY' },
];

const ROLES_PERIOD = 8;

// ── text scramble ──────────────────────────────────────────────────────────────
// ponytail: manual char cycle, text-scatter plugin feels like overkill for one label
function scrambleText(
  target: HTMLElement,
  finalText: string,
  duration: number = 1.2
) {
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const len = finalText.length;
  const frameRate = 1 / 30;
  const totalFrames = Math.floor(duration / frameRate);
  const startIndex = Math.floor(totalFrames * 0.3);
  const settleFrames = (totalFrames - startIndex) / len;

  let frame = 0;
  const interval = setInterval(() => {
    let output = '';
    for (let i = 0; i < len; i++) {
      if (frame > startIndex + i * settleFrames) {
        output += finalText[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    target.textContent = output;
    frame++;
    if (frame >= totalFrames) {
      target.textContent = finalText;
      clearInterval(interval);
    }
  }, frameRate * 1000);

  return () => clearInterval(interval);
}

// ── component ──────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const roleOuterRef = useRef<HTMLDivElement>(null);
  const roleInnerRef = useRef<HTMLSpanElement>(null);
  const pitchRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const roleFrameRef = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  // ── GSAP entrance timeline (replaces framer-motion) ────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // entrance: badge
      tl.fromTo(badgeRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 });
      // pre-title "ENSURING INTEGRITY" line
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.1'
      );
      // role badge
      tl.fromTo(
        roleOuterRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.15'
      );
      // pitch line
      tl.fromTo(
        pitchRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.15'
      );
      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.1'
      );
      // metrics
      tl.fromTo(
        metricsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── text scramble on name ─────────────────────────────────────────────────
  useEffect(() => {
    if (!nameRef.current) return;
    const timeout = setTimeout(() => {
      scrambleText(nameRef.current!, fullTitle);
    }, 1100);
    return () => clearTimeout(timeout);
  }, []);

  // ── pixel grid mouse parallax ─────────────────────────────────────────────
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!gridRef.current) return;
    const { clientX, clientY } = e;
    const xPct = (clientX / window.innerWidth - 0.5) * 2;
    const yPct = (clientY / window.innerHeight - 0.5) * 2;
    gsap.to(gridRef.current, {
      x: xPct * -8,
      y: yPct * -8,
      duration: 1.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: xPct * 12,
        y: yPct * 12,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // ── role cycling with GSAP crossfade ──────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      roleFrameRef.current += 1;
      if (roleFrameRef.current % ROLES_PERIOD === 0) {
        const nextIndex = (currentRoleIndex + 1) % roles.length;
        // crossfade
        if (roleInnerRef.current) {
          gsap.to(roleInnerRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.12,
            ease: 'power2.in',
            onComplete: () => {
              setCurrentRoleIndex(nextIndex);
              if (roleInnerRef.current) {
                gsap.fromTo(
                  roleInnerRef.current,
                  { opacity: 0, scale: 0.8 },
                  { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)' }
                );
              }
            },
          });
        }
      }
    }, 150);
    return () => clearInterval(interval);
  }, [currentRoleIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative border-b-[3px] border-[#1A1A1A] bg-[#000000] py-16 lg:py-24"
    >
      {/* Pixel Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#FFFFFF]/[0.02] blur-[100px] pointer-events-none" />
      <div
        ref={glowRef}
        className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#808080]/[0.03] blur-[80px] pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-[58%_42%] lg:gap-16">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Status badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-3 border-[2px] border-[#333] bg-[#0A0A0A] px-4 py-2" style={{ opacity: 0 }}>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-none bg-white opacity-50" />
              <span className="relative inline-flex h-3 w-3 bg-white" />
            </span>
            <span className="font-pixel text-[9px] text-[#B0B0B0] tracking-[0.15em]">
              SYS:ACTIVE
            </span>
          </div>

          {/* Title */}
          <div ref={titleRef} style={{ opacity: 0 }}>
            <h1 className="space-y-3">
              <span className="block font-pixel text-[clamp(14px,3vw,22px)] text-[#FFFFFF] leading-relaxed tracking-wider">
                ENSURING INTEGRITY
              </span>
              <span className="block font-pixel text-[clamp(11px,2.2vw,16px)] text-[#808080] tracking-wider">
                AT THE SPEED OF DEV.
              </span>
              <span className="mt-4 block font-terminal text-[clamp(24px,5vw,40px)] text-[#FFFFFF]">
                <span ref={nameRef}>{fullTitle}</span>
                <span className="inline-block ml-1 text-white animate-pulse">_</span>
              </span>
            </h1>
          </div>

          {/* Role display */}
          <div ref={roleOuterRef} className="border-[2px] border-[#333] bg-[#0A0A0A] px-4 py-3 inline-block" style={{ opacity: 0 }}>
            <span className="font-pixel text-[10px] text-[#666] tracking-wider">ROLE: </span>
            <span
              ref={roleInnerRef}
              className="font-pixel text-[10px] text-[#FFFFFF] tracking-wider glitch-hover"
            >
              {roles[currentRoleIndex]}
            </span>
          </div>

          {/* Pitch */}
          <p
            ref={pitchRef}
            className="max-w-xl font-terminal text-[18px] md:text-[22px] text-[#B0B0B0] leading-relaxed"
            style={{ opacity: 0 }}
          >
            I build full-stack applications and break them systematically. From Next.js architecture
            to manual testing protocols and UI/UX audits — I ship software that actually holds up.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 pt-2" style={{ opacity: 0 }}>
            <Link href="/projects">
              <Button variant="pixel" size="lg">
                [ EXECUTE REVIEW ]
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="font-pixel text-[11px]">
                [ OPEN CONNECTION ]
              </Button>
            </Link>
          </div>

          {/* Metric blocks */}
          <div ref={metricsRef} className="grid grid-cols-3 gap-3 max-w-lg pt-4" style={{ opacity: 0 }}>
            {metricsData.map(({ label, value, sub }) => (
              <div
                key={label}
                className="border-[2px] border-[#333] bg-[#0A0A0A] p-3 text-center hover:border-[#808080] transition-colors duration-150"
              >
                <div className="font-pixel text-[8px] text-[#666] tracking-wider mb-1">{label}</div>
                <div className="font-pixel text-[14px] text-[#FFFFFF]">{value}</div>
                <div className="font-pixel text-[7px] text-[#555] tracking-wider mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — Lanyard anchor */}
        <div className="relative overflow-visible h-[800px]">
          {mounted && (
            <div className="absolute top-[-120px] right-[-40px] w-[700px] h-[900px] overflow-visible">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage="/images/profile/man-holding-coffee.jpg" />
            </div>
          )}
        </div>

      </Container>

    </section>
  );
}
