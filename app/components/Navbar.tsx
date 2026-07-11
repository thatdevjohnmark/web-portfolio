'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Animate mobile menu open/close
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (isOpen) {
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      // Stagger the link items in
      const items = menu.querySelectorAll('.mobile-nav-item');
      gsap.fromTo(
        items,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05, duration: 0.25, ease: 'power2.out', delay: 0.05 }
      );
    } else {
      gsap.to(menu, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <nav className="bg-[#000000] sticky top-0 z-50 border-b-[3px] border-[#333333] crt-flicker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-[#FFFFFF] transition-opacity hover:opacity-80 active:opacity-60"
          >
            <Image
              src="/thatdevjohnmark_mark_only.svg"
              alt="thatdevjohnmark logo"
              width={32}
              height={32}
              priority
              className="pixelated"
            />
            <span className="font-pixel text-[10px] tracking-wider glitch-hover">thatdevjohnmark</span>
          </Link>

          {/* Desktop Navigation */}
          <FluidNav links={navLinks} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#FFFFFF] active:opacity-60 transition-opacity"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="pb-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.href} className="mobile-nav-item">
                <Link
                  href={link.href}
                  className="block px-4 py-2 text-[#FFFFFF] hover:bg-[#1A1A1A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ── FluidNav: morphing underline driven by GSAP ──────────────────────────────

const TAB_W = 110; // px — must match the link width

function FluidNav({ links }: { links: { label: string; href: string }[] }) {
  const pathname = usePathname();
  const activeIndex = links.findIndex((l) => l.href === pathname);
  const prevIndexRef = useRef(activeIndex);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = underlineRef.current;
    if (!bar) return;

    const prev = prevIndexRef.current;
    const distance = Math.abs(activeIndex - prev);
    prevIndexRef.current = activeIndex;

    // Stretch toward target then settle
    const bulgeWidth = TAB_W + distance * 28;

    gsap.killTweensOf(bar);
    gsap.to(bar, {
      left: activeIndex * TAB_W,
      width: bulgeWidth,
      duration: 0.2,
      ease: 'power2.out',
      onComplete() {
        gsap.to(bar, { width: TAB_W, duration: 0.3, ease: 'power2.inOut' });
      },
    });
  }, [activeIndex]);

  return (
    <div className="hidden md:flex items-stretch relative">
      {links.map((link) => {
        const isActive = link.href === pathname;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center justify-center font-pixel text-[10px] tracking-wider transition-colors duration-150 ${
              isActive ? 'text-[#FFFFFF]' : 'text-[#B0B0B0] hover:text-[#FFFFFF]'
            }`}
            style={{ width: TAB_W }}
          >
            {link.label}
          </Link>
        );
      })}

      {/* GSAP-controlled underline bar */}
      <div
        ref={underlineRef}
        className="absolute bottom-0 h-[3px] bg-[#FFFFFF] rounded-full"
        style={{ left: activeIndex * TAB_W, width: TAB_W }}
      />
    </div>
  );
}
