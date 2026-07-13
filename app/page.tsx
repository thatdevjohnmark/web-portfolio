'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/home/Hero';
import ProjectsShowcase from './components/home/projects/ProjectsShowcase';
import SkillsSection from './components/home/skills/SkillsSection';
import ContactCTA from './components/home/contact/ContactCTA';
import BootSequence from './components/home/BootSequence';

gsap.registerPlugin(ScrollTrigger);

// ── scroll progress bar ────────────────────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    // ponytail: single ScrollTrigger on the document, not per-section
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-white origin-left"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  );
}

// ── cursor ambient glow ────────────────────────────────────────────────────────
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0 });

  const handleMove = useCallback((e: MouseEvent) => {
    last.current.x = e.clientX;
    last.current.y = e.clientY;
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMove]);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[60]"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }}
    />
  );
}

// ── page ───────────────────────────────────────────────────────────────────────

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <ScrollProgress />
      <CursorGlow />
      <main className="min-h-screen bg-[#000000]">
        <Navbar />
        <Hero />
        <ProjectsShowcase />
        <SkillsSection />
        <ContactCTA />
        <Footer />
      </main>
    </>
  );
}
