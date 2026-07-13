"use client";

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import Button from '../../components/ui/Button';

// Load entirely client-side — Three.js + GSAP require browser APIs
const RB19Hero = dynamic(() => import('./RB19Hero/RB19Hero'), { ssr: false });

const ACCENT = '#E8002D'; // F1 red

const stats = [
  { label: 'Favourite Driver', value: 'Max Verstappen', sub: '#1 // Oracle Red Bull Racing' },
  { label: 'Favourite Co-Driver', value: 'Oscar Piastri', sub: '#81 // McLaren F1 Team' },
  { label: 'Favourite Team', value: 'Oracle Red Bull Racing', sub: 'RB Power Unit // Milton Keynes' },
  { label: 'Favourite Race', value: 'São Paulo GP 2024', sub: 'P17 → P1 // Interlagos' },
  { label: 'Favourite Track', value: 'Circuit de Spa-Francorchamps', sub: 'Eau Rouge // Belgium' },
  { label: 'Currently Watching', value: 'F1 2026 Season', sub: 'New regs // 50/50 power split' },
];

const raceHighlight = {
  title: 'São Paulo Grand Prix — 2024',
  subtitle: 'The greatest recovery drive of the modern era.',
  description: `Max Verstappen started from P17 after a grid penalty during a chaotic São Paulo weekend. What followed was one of the most relentless, calculated, and dominant drives in recent Formula 1 history. Lap by lap, Verstappen carved through the field on a drying Interlagos circuit — overtaking world champions, managing tyre deg, and extracting every tenth from the RB20. He crossed the line in P1. From seventeenth. On a circuit that makes overtaking genuinely difficult. It wasn't luck. It was surgical.`,
  stats: [
    { label: 'Start Position', value: 'P17' },
    { label: 'Finish Position', value: 'P1' },
    { label: 'Positions Gained', value: '+16' },
    { label: 'Circuit', value: 'Interlagos' },
  ],
};

export default function Formula1() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ── RB19 Scroll Hero ─────────────────────────────────────────────── */}
      <RB19Hero />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1A1A1A] py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,0,45,0.07),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px]" />

        <Container className="relative z-10">
          {/* Back button */}
          <div className="mb-12">
            <Link href="/playground" passHref>
              <Button className="border-[2px] border-[#222222] bg-white hover:bg-[#111111] text-xs font-mono">
                ← Return to Playground
              </Button>
            </Link>
          </div>

          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8002D] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E8002D]">
              Hobby // Formula 1
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic text-white leading-none mb-6">
            I Watch F1.
          </h1>
          <p className="max-w-xl text-[#888888] font-mono text-sm leading-relaxed">
            Not just for the racing — for the engineering, the strategy, the marginal gains. 
            Every race weekend is a systems analysis: tyre deg, undercut windows, ERS deployment, 
            weather calls. I&apos;m a Max Verstappen fan first, an engineering nerd second.
          </p>
        </Container>
      </section>

      {/* ── Stats Grid ───────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-[#1A1A1A]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-6 flex flex-col gap-2 hover:border-[#333] transition-colors duration-300"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#555]">
                  {s.label}
                </span>
                <span className="text-white font-bold text-lg leading-tight">
                  {s.value}
                </span>
                <span className="text-[11px] font-mono text-[#555]">
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Race Highlight ───────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#1A1A1A]">
        <Container>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E8002D] mb-4">
            Race Highlight
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Text side */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold italic tracking-tighter text-white mb-3 leading-tight">
                {raceHighlight.title}
              </h2>
              <p className="text-sm font-mono text-[#E8002D] mb-6">
                {raceHighlight.subtitle}
              </p>
              <p className="text-[#888] text-sm leading-[1.9] font-mono">
                {raceHighlight.description}
              </p>
            </div>

            {/* Stats side */}
            <div className="flex flex-col gap-4">
              {/* Big P17 → P1 visual */}
              <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8 flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-[11px] font-mono text-[#555] uppercase tracking-widest mb-1">Started</div>
                  <div className="text-6xl font-bold text-[#555] italic">P17</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <svg className="w-8 h-8 text-[#E8002D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="text-[9px] font-mono text-[#E8002D] uppercase tracking-widest">+16</span>
                </div>
                <div className="text-center">
                  <div className="text-[11px] font-mono text-[#555] uppercase tracking-widest mb-1">Finished</div>
                  <div className="text-6xl font-bold text-white italic">P1</div>
                </div>
              </div>

              {/* Meta stats */}
              <div className="grid grid-cols-2 gap-4">
                {raceHighlight.stats.map((s) => (
                  <div key={s.label} className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-4">
                    <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#555] mb-1">
                      {s.label}
                    </div>
                    <div className="text-white font-bold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Favourite Track ──────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E8002D] mb-4">
            Favourite Track
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A]">
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src="https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/common/f1/2026/track/2026trackspafrancorchampsdetailed.webp"
                alt="Spa-Francorchamps Circuit"
                fill
                unoptimized
                className="object-contain p-8 opacity-30 hover:opacity-70 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            </div>

            <div className="p-8 border-t border-[#1A1A1A]">
              <h3 className="text-2xl font-bold italic text-white mb-2">
                Circuit de Spa-Francorchamps
              </h3>
              <p className="text-[11px] font-mono text-[#555] uppercase tracking-wider mb-4">
                Stavelot, Belgium · 7.004 km · 19 corners
              </p>
              <p className="text-sm text-[#888] font-mono leading-relaxed max-w-2xl">
                Spa is the ultimate driver&apos;s circuit — Eau Rouge, Raidillon, Pouhon. It rewards commitment 
                and punishes hesitation. In the wet it becomes a completely different beast. Every lap at 
                Spa feels like a negotiation between man, machine, and weather.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
