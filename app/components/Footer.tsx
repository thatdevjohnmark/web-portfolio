'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_CREDITS =
  '◈ JOHN MARK TACTACAN ◇ QA SPECIALIST ◈ FULL-STACK DEVELOPER ◇ MANUEL TESTER ◈ BUILT WITH NEXT.JS ◇ TAILWIND CSS ◈ GSAP ◇ TYPESCRIPT ◈ JOHN MARK TACTACAN ◇ QA SPECIALIST ◈ FULL-STACK DEVELOPER ◇ MANUAL TESTER ◈ BUILT WITH NEXT.JS ◇ TAILWIND CSS ◈ GSAP ◇ TYPESCRIPT ';

export default function Footer() {
  const currentYear   = new Date().getFullYear();
  const footerRef     = useRef<HTMLElement>(null);
  const cols01Ref     = useRef<HTMLDivElement>(null);
  const ruleRef       = useRef<HTMLHRElement>(null);
  const bottomRef     = useRef<HTMLDivElement>(null);
  const marqueeRef    = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── columns stagger reveal ──────────────────────────────────────
      const cols = cols01Ref.current?.querySelectorAll('.footer-col');
      if (cols && cols.length > 0) {
        gsap.fromTo(
          Array.from(cols),
          { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0 0% 0)',
            opacity: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── rule expand ─────────────────────────────────────────────────
      if (ruleRef.current) {
        gsap.fromTo(ruleRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: ruleRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── bottom line fade up ─────────────────────────────────────────
      if (bottomRef.current) {
        gsap.from(bottomRef.current, {
          opacity: 0, y: 12, duration: 0.45, ease: 'power2.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      }

      // ── infinite marquee credits ────────────────────────────────────
      if (trackRef.current && !prefersReduced) {
        const track = trackRef.current;
        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
          x: -totalWidth,
          duration: 30,
          ease: 'none',
          repeat: -1,
          onRepeat() {
            gsap.set(track, { x: 0 });
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#000000] text-[#FFFFFF] mt-20 border-t-[3px] border-[#333333]"
    >
      {/* ── main footer columns ── */}
      <div ref={cols01Ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* About */}
          <div className="footer-col" style={{ willChange: 'clip-path, opacity' }}>
            <h3 className="font-pixel text-[11px] mb-5 tracking-wider text-[#FFFFFF]">John Mark Tactacan</h3>
            <p className="text-[#808080] font-terminal text-[18px] leading-relaxed">
              QA Specialist focused on manual testing, data validation, and clear documentation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col" style={{ willChange: 'clip-path, opacity' }}>
            <h3 className="font-pixel text-[11px] mb-5 tracking-wider text-[#FFFFFF]">Quick Links</h3>
            <ul className="space-y-3 font-terminal text-[18px] text-[#808080]">
              {[
                { href: '/about',      label: 'About'      },
                { href: '/projects',   label: 'Projects'   },
                { href: '/experience', label: 'Experience' },
                { href: '/contact',    label: 'Contact'    },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col" style={{ willChange: 'clip-path, opacity' }}>
            <h3 className="font-pixel text-[11px] mb-5 tracking-wider text-[#FFFFFF]">Connect</h3>
            <div className="flex flex-col gap-3 font-terminal text-[18px] text-[#808080]">
              <a
                href="https://github.com/thatdevjohnmark"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-150"
              >
                GitHub →
              </a>
              <a
                href="mailto:johnmark.tactacan@gmail.com"
                className="hover:text-white transition-colors duration-150"
              >
                Email →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── divider rule ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr
          ref={ruleRef}
          className="border-none h-[2px] bg-gradient-to-r from-[#333] via-[#222] to-transparent"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* ── bottom copy ── */}
      <div ref={bottomRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-pixel text-[9px] text-[#444] tracking-wider">
            &copy; {currentYear} John Mark Tactacan. All rights reserved.
          </p>
          <p className="font-pixel text-[9px] text-[#333] tracking-wider">
            SYSTEM_STATUS: NOMINAL
          </p>
        </div>
      </div>

      {/* ── scrolling credits marquee ── */}
      <div
        ref={marqueeRef}
        className="
          relative w-full overflow-hidden border-t border-[#1A1A1A] py-2
          before:absolute before:left-0 before:top-0 before:h-full before:w-16
          before:bg-gradient-to-r before:from-[#000000] before:to-transparent before:z-10 before:pointer-events-none
          after:absolute after:right-0 after:top-0 after:h-full after:w-16
          after:bg-gradient-to-l after:from-[#000000] after:to-transparent after:z-10 after:pointer-events-none
        "
        aria-hidden="true"
      >
        <span
          ref={trackRef}
          className="inline-block whitespace-nowrap font-pixel text-[8px] tracking-widest text-[#2A2A2A]"
          style={{ willChange: 'transform' }}
        >
          {/* duplicate for seamless loop */}
          {MARQUEE_CREDITS}
          {MARQUEE_CREDITS}
        </span>
      </div>
    </footer>
  );
}
