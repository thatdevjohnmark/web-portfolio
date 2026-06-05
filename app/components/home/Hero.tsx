'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import Container from '../Container';
import Link from 'next/link';

const logLines = [
  'Initializing QA integrity audit...',
  'Checking system requirements manifest...',
  '[PASS] Requirement 101: Manual exploratory flows verified.',
  '[PASS] Requirement 102: Cross-viewport responsive alignment stable.',
  'Scanning DOM layout for WCAG contrast compliance...',
  '[PASS] WCAG AAA: Contrast ratio satisfies all guidelines.',
  'Running edge-case boundary checks on state input fields...',
  '[PASS] Error boundary handlers active and stable.',
  'Validating local storage state persistence...',
  '[PASS] State persistence verified across sessions.',
  'Manual review sequence: COMPLETE.',
  'System integrity: 100% VERIFIED.',
  '------------------------------------------------',
  'Awaiting deployment trigger. Standing by...'
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'profile' | 'logs' | 'specs'>('profile');
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const roles = [
    'QA Specialist',
    'Programmer',
    'Full-stack Developer',
    'Manual Tester'
  ];
  const [currentRole, setCurrentRole] = useState(roles[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prevRole) => {
        const remainingRoles = roles.filter((r) => r !== prevRole);
        const randomIndex = Math.floor(Math.random() * remainingRoles.length);
        return remainingRoles[randomIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cycle logs to simulate test runner
  useEffect(() => {
    if (activeTab !== 'logs') return;
    
    // Reset if index is 0
    if (logIndex === 0) {
      setVisibleLogs([logLines[0]]);
      setLogIndex(1);
      return;
    }

    const interval = setTimeout(() => {
      if (logIndex < logLines.length) {
        setVisibleLogs((prev) => [...prev, logLines[logIndex]]);
        setLogIndex((prev) => prev + 1);
      } else {
        // Hold for 4 seconds, then restart logs loop
        const resetTimeout = setTimeout(() => {
          setLogIndex(0);
        }, 4000);
        return () => clearTimeout(resetTimeout);
      }
    }, 700);

    return () => clearTimeout(interval);
  }, [logIndex, activeTab]);

  // Autoscroll terminal logs
  useEffect(() => {
    if (activeTab === 'logs' && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [visibleLogs, activeTab]);

  return (
    <section className="relative overflow-hidden border-b border-[#1A1A1A] bg-[#000000] py-20 lg:py-28">
      {/* Decorative Technical Grid & Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33333315_1px,transparent_1px),linear-gradient(to_bottom,#33333315_1px,transparent_1px)] bg-[size:30px_30px] animate-grid-move [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />
      
      {/* Sleek radial background glows */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#FFFFFF]/2 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#808080]/3 blur-[110px] pointer-events-none" />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="space-y-8">
          {/* Diagnostic status badge */}
          <div className="badge-pulse inline-flex items-center gap-3 rounded border border-[#222222] bg-[#0A0A0A]/90 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#B0B0B0] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            SYSTEM_STATUS: ACTIVE // MAN_QA_INTEGRITY_OK
          </div>

          {/* Core branding title */}
          <div className="animate-fade-in-up">
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.1] text-[#FFFFFF] md:text-6xl tracking-tight font-sans">
              Ensuring integrity
              <span className="block mt-1 bg-gradient-to-r from-[#FFFFFF] via-[#808080] to-[#FFFFFF] bg-clip-text text-transparent">
                at the speed of dev.
              </span>
              <span className="mt-4 block text-2xl font-normal text-[#666666] font-mono">
                thatdevjohnmark <span className="inline-block animate-cursor-blink text-white font-sans">_</span>
              </span>
            </h1>
          </div>

          {/* Pitch statement */}
          <p className="max-w-2xl text-base leading-7 text-[#B0B0B0] md:text-lg font-mono">
            Exploratory testing protocols, rigorous UI/UX audits, and bulletproof bug verification. I break systems systematically to ensure they hold strong in production.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/projects">
              <Button size="lg" className="bg-[#FFFFFF] text-[#000000] hover:bg-[#E0E0E0] border border-white hover:border-[#E0E0E0] shadow-md hover:shadow-xl transition-all duration-300 font-semibold cursor-pointer">
                Execute Review
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-[#333333] hover:border-white text-white bg-transparent hover:bg-white/5 transition-all duration-300 cursor-pointer">
                Open Connection
              </Button>
            </Link>
          </div>

          {/* QA diagnostic panels */}
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                id: 'M01',
                title: 'MANUAL TESTING',
                val: '100% Coverage',
                progress: 'w-full',
                status: 'COMPLETE'
              },
              {
                id: 'M02',
                title: 'BUG REPLICATION',
                val: 'Reproducible',
                progress: 'w-[90%]',
                status: 'VERIFIED'
              },
              {
                id: 'M03',
                title: 'AUDIT REPORTING',
                val: 'Zero Ambiguity',
                progress: 'w-full',
                status: 'SECURE'
              }
            ].map(({ id, title, val, progress, status }) => (
              <div
                key={id}
                className="group relative overflow-hidden rounded border border-[#1A1A1A] bg-[#050505] p-4 transition-all duration-300 hover:border-[#444444] hover:bg-[#0A0A0A]"
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-[#555555]">
                  <span>{id} // PROT_LVL</span>
                  <span className="text-[#888888]">{status}</span>
                </div>
                <div className="mt-2 font-sans font-bold text-xs text-[#FFFFFF] tracking-wider uppercase">
                  {title}
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#B0B0B0]">
                  {val}
                </div>
                {/* Micro progress bar for interactive flavor */}
                <div className="mt-3 h-1 w-full bg-[#151515] rounded-full overflow-hidden">
                  <div className={`h-full bg-white transition-all duration-500 ${progress}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Immersive Tech Mockup with Interactive Tabs */}
        <div className="relative w-full max-w-lg lg:max-w-none">
          {/* Shadow glow base */}
          <div className="absolute -inset-2 rounded-2xl bg-white/3 blur-2xl pointer-events-none animate-glow" />
          
          {/* Main frame wrapper */}
          <div className="relative overflow-hidden rounded-xl border border-[#222222] bg-[#0A0A0A] shadow-2xl transition-all duration-500 hover:border-[#333333]">
            {/* Terminal Window top bar */}
            <div className="flex items-center justify-between border-b border-[#1A1A1A] bg-[#0F0F0F] px-4 py-3">
              {/* Window controls */}
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#333333]" />
                <div className="h-3 w-3 rounded-full bg-[#222222]" />
                <div className="h-3 w-3 rounded-full bg-[#444444]" />
              </div>
              <div className="font-mono text-[10px] text-[#555555] tracking-widest uppercase">
                INTEGRITY_CONSOLE_V1.0
              </div>
              <div className="h-3 w-6" /> {/* Balance spacer */}
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-[#1A1A1A] bg-[#070707] text-xs font-mono">
              {[
                { key: 'profile', label: '👤 profile.json' },
                { key: 'logs', label: '🧪 test-runner.log' },
                { key: 'specs', label: '📋 specs.md' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`border-r border-[#1A1A1A] px-4 py-2.5 transition-all text-left cursor-pointer ${
                    activeTab === key
                      ? 'bg-[#0A0A0A] text-[#FFFFFF] border-b border-b-white font-medium'
                      : 'text-[#666666] hover:bg-[#0E0E0E] hover:text-[#B0B0B0]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Terminal / Code screen area */}
            <div className="terminal-screen relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A] p-5 font-mono text-[12px] leading-relaxed text-[#B0B0B0]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFFFFF]/1 to-transparent pointer-events-none animate-scanline-move h-1/2 w-full" />
              
              {/* Tab 1 content: JSON specification */}
              {activeTab === 'profile' && (
                <div className="h-full overflow-y-auto space-y-2 text-[#888888]">
                  <p className="text-[#555555]">// Full audit candidate specification</p>
                  <p>
                    <span className="text-[#FFFFFF]">{'{'}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-[#B0B0B0]">&quot;candidate&quot;</span>: <span className="text-[#FFFFFF]">&quot;Tactacan, John Mark&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-[#B0B0B0]">&quot;role&quot;</span>: <span className="text-[#FFFFFF]">&quot;{currentRole}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-[#B0B0B0]">&quot;verification_focus&quot;</span>: <span className="text-[#FFFFFF]">&quot;Exploratory & Sanity Auditing&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-[#B0B0B0]">&quot;location&quot;</span>: <span className="text-[#FFFFFF]">&quot;Nueva Ecija, PH&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-[#B0B0B0]">&quot;coverage_rate&quot;</span>: <span className="text-[#FFFFFF]">&quot;100% Manual Integrity&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-[#B0B0B0]">&quot;status&quot;</span>: <span className="text-[#FFFFFF]">&quot;ready_for_verification_contracts&quot;</span>
                  </p>
                  <p>
                    <span className="text-[#FFFFFF]">{'}'}</span>
                  </p>
                </div>
              )}

              {/* Tab 2 content: Running log output */}
              {activeTab === 'logs' && (
                <div ref={logsContainerRef} className="h-full overflow-y-auto space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#555555] border-b border-[#1A1A1A] pb-1.5 mb-2">
                    <span>$ npm run test:integrity</span>
                    <span className="animate-pulse text-[#FFFFFF]">● LIVE MONITOR</span>
                  </div>
                  {visibleLogs.map((line, idx) => {
                    const isPass = line.startsWith('[PASS]');
                    return (
                      <div
                        key={idx}
                        className={`text-[11px] whitespace-pre-wrap font-mono ${
                          isPass
                            ? 'text-white font-medium'
                            : line.startsWith('[INFO]')
                            ? 'text-[#888888]'
                            : 'text-[#666666]'
                        }`}
                      >
                        {line}
                      </div>
                    );
                  })}
                  {/* Flashing terminal cursor at the log tail */}
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-[#FFFFFF]">$</span>
                    <div className="h-3 w-1.5 bg-[#FFFFFF] animate-cursor-blink" />
                  </div>
                </div>
              )}

              {/* Tab 3 content: Specs comparing testing paradigms */}
              {activeTab === 'specs' && (
                <div className="h-full overflow-y-auto space-y-3 text-[11px]">
                  <p className="text-[#555555]">// High-Fidelity Manual Assurance Specs</p>
                  <div className="border border-[#1A1A1A] rounded p-2.5 bg-[#070707] space-y-2">
                    <div className="flex justify-between border-b border-[#151515] pb-1 font-bold text-white">
                      <span>AUDIT METHOD</span>
                      <span>USER BENEFIT</span>
                    </div>
                    <div className="flex justify-between text-[#888888]">
                      <span>Manual Exploratory Checks</span>
                      <span>Catches visual & logic anomalies</span>
                    </div>
                    <div className="flex justify-between text-[#888888]">
                      <span>Boundary Edge-Cases</span>
                      <span>Blocks critical data breakdowns</span>
                    </div>
                    <div className="flex justify-between text-[#888888]">
                      <span>User Flow Auditing</span>
                      <span>Assures smooth checkout & signup</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#555555] leading-relaxed">
                    Automated frameworks check logs; manual verification checks reality. I act as the bridge between requirements and actual human usage.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Floating ID Card Overlay */}
          <div className="animate-float absolute -bottom-8 -right-4 md:-right-8 w-[190px] rounded-xl border border-[#333333] bg-[#0D0D0D]/95 p-3.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#666666] z-30">
            {/* Barcode top design */}
            <div className="flex justify-between items-center text-[8px] font-mono text-[#555555] mb-2 border-b border-[#1A1A1A] pb-1.5">
              <span>LOC_ID // PH_NE</span>
              <span className="text-white font-bold">QA PASS</span>
            </div>
            
            {/* Portrait Image container */}
            <div className="relative aspect-square w-full overflow-hidden rounded bg-[#151515] border border-[#222222]">
              <Image
                src="/images/profile/3D avatar.png"
                alt="John Mark Tactacan profile photo"
                fill
                priority
                sizes="180px"
                className="object-cover grayscale contrast-125 transition-all duration-700 hover:scale-105"
              />
            </div>

            {/* Profile info details */}
            <div className="mt-2.5 space-y-0.5">
              <div className="font-mono text-[9px] text-[#555555] uppercase tracking-wider">SPECIALIST ID</div>
              <div className="font-sans font-bold text-[13px] text-[#FFFFFF] leading-tight">J. M. Tactacan</div>
              <div className="font-mono text-[10px] text-[#888888] flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFFFFF]" />
                {currentRole}
              </div>
            </div>

            {/* Graphic barcode container */}
            <div className="mt-3 flex items-center justify-between border-t border-[#1A1A1A] pt-2">
              <div className="flex items-center gap-[1.5px] h-4 opacity-40">
                <div className="w-[1px] bg-white h-full" />
                <div className="w-[2px] bg-white h-full" />
                <div className="w-[1px] bg-white h-full" />
                <div className="w-[3px] bg-white h-full" />
                <div className="w-[1px] bg-white h-full" />
                <div className="w-[2px] bg-white h-full" />
                <div className="w-[4px] bg-white h-full" />
                <div className="w-[1px] bg-white h-full" />
                <div className="w-[1px] bg-white h-full" />
                <div className="w-[3px] bg-white h-full" />
              </div>
              <span className="font-mono text-[8px] text-[#444444]">SYS_OK_993A</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
