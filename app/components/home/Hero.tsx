'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Container from '../Container';
import Link from 'next/link';

const logLines = [
  '> INIT.SYS v2.0.1',
  '> Loading QA integrity kernel...',
  '[ OK ] Manual exploratory flows verified.',
  '[ OK ] Cross-viewport responsive alignment stable.',
  '[ OK ] WCAG AAA: Contrast ratio satisfies all guidelines.',
  '[ OK ] Error boundary handlers active and stable.',
  '[ OK ] State persistence verified across sessions.',
  '> Manual review sequence: COMPLETE.',
  '> System integrity: 100% VERIFIED.',
  '> READY.',
];

const specsLines = [
  '================================',
  '  CANDIDATE SPECIFICATION v1.0  ',
  '================================',
  '',
  'NAME:    John Mark Tactacan',
  'ROLE:    QA Specialist',
  'STACK:   Next.js / React / TypeScript',
  'FOCUS:   Manual Testing & Audit',
  '',
  '================================',
  '  QUALITY METRICS               ',
  '================================',
  '',
  'BUG REPRO RATE:    100%',
  'TEST COVERAGE:     Complete',
  'DOCUMENTATION:     Thorough',
  'ATTN TO DETAIL:    Maximum',
  '',
  '================================',
  '  SYSTEM STATUS: NOMINAL        ',
  '================================',
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'specs' | 'logs' | 'stats'>('specs');
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const fullTitle = 'thatdevjohnmark';
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for name
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullTitle.length) {
        setDisplayText(fullTitle.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Cycle logs
  useEffect(() => {
    if (activeTab !== 'logs') return;
    if (logIndex === 0) {
      setVisibleLogs([logLines[0]]);
      setLogIndex(1);
      return;
    }
    const timeout = setTimeout(() => {
      if (logIndex < logLines.length) {
        setVisibleLogs((prev) => [...prev, logLines[logIndex]]);
        setLogIndex((prev) => prev + 1);
      } else {
        const resetTimeout = setTimeout(() => setLogIndex(0), 3000);
        return () => clearTimeout(resetTimeout);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [logIndex, activeTab]);

  useEffect(() => {
    if (activeTab === 'logs' && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [visibleLogs, activeTab]);

  const roles = ['QA_SPECIALIST', 'PROGRAMMER', 'FULLSTACK_DEV', 'MANUAL_TESTER'];
  const [currentRole, setCurrentRole] = useState(roles[0]);
  const [roleFrame, setRoleFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleFrame((prev) => {
        const next = (prev + 1) % (roles.length * 8);
        if (next % 8 === 0) {
          setCurrentRole(roles[next / 8]);
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b-[3px] border-[#1A1A1A] bg-[#000000] py-16 lg:py-24">
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Glowing orbs */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#FFFFFF]/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#808080]/[0.03] blur-[80px] pointer-events-none" />

      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 border-[2px] border-[#333] bg-[#0A0A0A] px-4 py-2"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-none bg-white opacity-50" />
              <span className="relative inline-flex h-3 w-3 bg-white" />
            </span>
            <span className="font-pixel text-[8px] text-[#B0B0B0] tracking-[0.15em]">
              SYS:ACTIVE
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="space-y-3">
              <span className="block font-pixel text-[clamp(14px,3vw,22px)] text-[#FFFFFF] leading-relaxed tracking-wider">
                ENSURING INTEGRITY
              </span>
              <span className="block font-pixel text-[clamp(11px,2.2vw,16px)] text-[#808080] tracking-wider">
                AT THE SPEED OF DEV.
              </span>
              <span className="mt-4 block font-terminal text-[clamp(24px,5vw,40px)] text-[#FFFFFF]">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block ml-1 text-white"
                >
                  _
                </motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Role display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-[2px] border-[#333] bg-[#0A0A0A] px-4 py-3 inline-block"
          >
            <span className="font-pixel text-[10px] text-[#666] tracking-wider">ROLE: </span>
            <span className="font-pixel text-[10px] text-[#FFFFFF] tracking-wider glitch-hover">
              {currentRole}
            </span>
          </motion.div>

          {/* Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl font-terminal text-[18px] md:text-[22px] text-[#B0B0B0] leading-relaxed"
          >
            Exploratory testing protocols, rigorous UI/UX audits, and bulletproof bug verification. 
            I break systems systematically to ensure they hold strong in production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
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
          </motion.div>

          {/* Metric blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 max-w-lg pt-4"
          >
            {[
              { label: 'MANUAL', value: '100%', sub: 'COVERAGE' },
              { label: 'BUG REPRO', value: 'FULL', sub: 'VERIFIED' },
              { label: 'AUDIT', value: 'ZERO', sub: 'AMBIGUITY' },
            ].map(({ label, value, sub }) => (
              <div
                key={label}
                className="border-[2px] border-[#333] bg-[#0A0A0A] p-3 text-center hover:border-[#808080] transition-colors duration-150"
              >
                <div className="font-pixel text-[7px] text-[#666] tracking-wider mb-1">{label}</div>
                <div className="font-pixel text-[14px] text-[#FFFFFF]">{value}</div>
                <div className="font-pixel text-[6px] text-[#555] tracking-wider mt-1">{sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-white/[0.02] blur-xl pointer-events-none" />
          
          <div className="relative border-[3px] border-[#333] bg-[#0A0A0A] overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b-[2px] border-[#333] bg-[#050505] px-4 py-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 border-[2px] border-[#555] bg-[#333]" />
                <div className="w-3 h-3 border-[2px] border-[#555] bg-[#222]" />
                <div className="w-3 h-3 border-[2px] border-[#555] bg-[#444]" />
              </div>
              <span className="font-pixel text-[7px] text-[#555] tracking-[0.2em]">
                TERMINAL_V1.0
              </span>
              <div className="w-10" />
            </div>

            {/* Tabs */}
            <div className="flex border-b-[2px] border-[#333] bg-[#050505]">
              {[
                { key: 'specs' as const, label: '[ SPECS ]' },
                { key: 'logs' as const, label: '[ LOGS ]' },
                { key: 'stats' as const, label: '[ STATS ]' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    if (key === 'logs') setLogIndex(0);
                  }}
                  className={`px-4 py-2 font-pixel text-[9px] tracking-wider cursor-pointer transition-colors duration-150 border-r-[2px] border-[#333] ${
                    activeTab === key
                      ? 'bg-[#0A0A0A] text-[#FFFFFF]'
                      : 'text-[#666] hover:text-[#B0B0B0] hover:bg-[#080808]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Terminal content */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A] p-4">
              {/* Scanline */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] pointer-events-none z-10" />

              {/* SPECS tab */}
              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full overflow-y-auto font-terminal text-[16px] leading-relaxed text-[#B0B0B0] whitespace-pre"
                >
                  {specsLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={line.startsWith('=') ? 'text-[#808080]' : line.startsWith('  ') && line.includes(':') ? 'text-[#FFFFFF]' : 'text-[#B0B0B0]'}
                    >
                      {line}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* LOGS tab */}
              {activeTab === 'logs' && (
                <div
                  ref={logsContainerRef}
                  className="h-full overflow-y-auto font-terminal text-[16px] leading-relaxed space-y-1"
                >
                  <AnimatePresence>
                    {visibleLogs.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={line.startsWith('[ OK ]') ? 'text-[#FFFFFF]' : line.startsWith('>') ? 'text-[#B0B0B0]' : 'text-[#808080]'}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* STATS tab */}
              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full font-terminal text-[16px] space-y-4"
                >
                  {[
                    { label: 'TEST CASES', val: '100%', bar: 'w-full' },
                    { label: 'BUG DETECT', val: '95%', bar: 'w-[95%]' },
                    { label: 'DOCS', val: '100%', bar: 'w-full' },
                    { label: 'DEPLOY', val: 'READY', bar: 'w-[90%]' },
                  ].map(({ label, val, bar }) => (
                    <div key={label}>
                      <div className="flex justify-between font-pixel text-[10px] text-[#B0B0B0] mb-1">
                        <span>{label}</span>
                        <span className="text-[#FFFFFF]">{val}</span>
                      </div>
                      <div className="h-[8px] bg-[#1A1A1A] border border-[#333]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: bar === 'w-full' ? '100%' : bar === 'w-[95%]' ? '95%' : '90%' }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-[#FFFFFF]"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
