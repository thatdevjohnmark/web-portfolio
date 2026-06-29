'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' }
  ];

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-[#000000] sticky top-0 z-50 border-b-[3px] border-[#333333] crt-flicker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/" className="flex items-center gap-3 text-[#FFFFFF]">
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
          </motion.div>

          {/* Desktop Navigation */}
          <FluidNav links={navLinks} />

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-[#FFFFFF]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden pb-4 space-y-2 overflow-hidden"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-2 text-[#FFFFFF] hover:bg-[#1A1A1A] rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ── FluidNav: morphing underline that stretches toward the target tab ──────────

const TAB_W = 110; // px — must match the link width

function FluidNav({ links }: { links: { label: string; href: string }[] }) {
  const pathname = usePathname();
  const activeIndex = links.findIndex((l) => l.href === pathname);
  const prevIndexRef = useRef(activeIndex);
  const distance = Math.abs(activeIndex - prevIndexRef.current);

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Bar briefly stretches proportional to jump distance, then snaps back
  const bulgeWidth = TAB_W + distance * 28;

  // Keyframes: start at normal width → bulge toward target → settle
  const widthAnim =
    distance > 0 ? [TAB_W, bulgeWidth, TAB_W] : TAB_W;

  return (
    <div className="hidden md:flex items-stretch relative">
      {links.map((link) => {
        const isActive = link.href === pathname;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center justify-center font-pixel text-[10px] tracking-wider transition-colors duration-150 ${
              isActive
                ? 'text-[#FFFFFF]'
                : 'text-[#B0B0B0] hover:text-[#FFFFFF]'
            }`}
            style={{ width: TAB_W }}
          >
            {link.label}
          </Link>
        );
      })}

      <motion.div
        className="absolute bottom-0 h-[3px] bg-[#FFFFFF] rounded-full"
        animate={{
          left: activeIndex * TAB_W,
          width: widthAnim,
        }}
        initial={false}
        transition={{
          left: {
            type: 'spring',
            stiffness: 160,
            damping: 23,
            mass: 0.35,
          },
          width: {
            duration: 0.5,
            times: [0, 0.3, 1],
            ease: 'easeInOut',
          },
        }}
      />
    </div>
  );
}
