"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import SectionTitle from '../../components/ui/SectionTittle';
import Button from '../../components/ui/Button';

export default function Formula1() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const f1Grid = [
    {
      team: "Oracle Red Bull Racing",
      color: "#0600EF",
      car: "RB22",
      driver: "Max Verstappen // Liam Lawson",
      engine: "Red Bull Ford Power Unit",
      feature: "Advanced 350kW ERS-K energy recovery",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/redbullracing/2026redbullracingcarright.webp",
      telemetry: [
        { sector: "S1", progress: 94 },
        { sector: "S2", progress: 91 },
        { sector: "S3", progress: 93 }
      ]
    },
    {
      team: "Scuderia Ferrari HP",
      color: "#EF1A2D",
      car: "SF-26",
      driver: "Lewis Hamilton // Charles Leclerc",
      engine: "Ferrari 067",
      feature: "Active aero 'X-Mode' drag reduction",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/ferrari/2026ferraricarright.webp",
      telemetry: [
        { sector: "S1", progress: 92 },
        { sector: "S2", progress: 90 },
        { sector: "S3", progress: 94 }
      ]
    },
    {
      team: "Mercedes-AMG Petronas",
      color: "#27F4D2",
      car: "W17",
      driver: "George Russell // Kimi Antonelli",
      engine: "Mercedes-AMG High Performance Powertrains",
      feature: "MOM (Manual Override Mode) deployment",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/mercedes/2026mercedescarright.webp",
      telemetry: [
        { sector: "S1", progress: 89 },
        { sector: "S2", progress: 87 },
        { sector: "S3", progress: 90 }
      ]
    },
    {
      team: "McLaren Formula 1 Team",
      color: "#FF8700",
      car: "MCL40",
      driver: "Lando Norris // Oscar Piastri",
      engine: "Mercedes-AMG High Performance Powertrains",
      feature: "Sustainable fuel combustion optimization",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/mclaren/2026mclarencarright.webp",
      telemetry: [
        { sector: "S1", progress: 91 },
        { sector: "S2", progress: 92 },
        { sector: "S3", progress: 95 }
      ]
    },
    {
      team: "Aston Martin Aramco",
      color: "#006F62",
      car: "AMR26",
      driver: "Fernando Alonso // Lance Stroll",
      engine: "Honda Power Unit",
      feature: "Bespoke integrated Honda thermal recovery",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/astonmartin/2026astonmartincarright.webp",
      telemetry: [
        { sector: "S1", progress: 88 },
        { sector: "S2", progress: 89 },
        { sector: "S3", progress: 87 }
      ]
    },
    {
      team: "Alpine F1 Team",
      color: "#0093CC",
      car: "A526",
      driver: "Pierre Gasly // Jack Doohan",
      engine: "Mercedes-AMG (Customer)",
      feature: "New chassis-to-PU interface efficiency",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/alpine/2026alpinecarright.webp",
      telemetry: [
        { sector: "S1", progress: 84 },
        { sector: "S2", progress: 82 },
        { sector: "S3", progress: 85 }
      ]
    },
    {
      team: "Williams Racing",
      color: "#00A0DE",
      car: "FW48",
      driver: "Alexander Albon // Carlos Sainz",
      engine: "Mercedes-AMG High Performance Powertrains",
      feature: "Low-drag suspension geometry",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/williams/2026williamscarright.webp",
      telemetry: [
        { sector: "S1", progress: 87 },
        { sector: "S2", progress: 85 },
        { sector: "S3", progress: 88 }
      ]
    },
    {
      team: "Audi F1 Team",
      color: "#A5A5A5",
      car: "RS Q F1",
      driver: "Nico Hulkenberg // Gabriel Bortoleto",
      engine: "Audi Power Unit",
      feature: "Full factory powertrain integration",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/audi/2026audicarright.webp",
      telemetry: [
        { sector: "S1", progress: 85 },
        { sector: "S2", progress: 86 },
        { sector: "S3", progress: 84 }
      ]
    },
    {
      team: "Haas F1 Team",
      color: "#EF1A2D",
      car: "VF-26",
      driver: "Esteban Ocon // Oliver Bearman",
      engine: "Ferrari 067 (Customer)",
      feature: "Simplified rear-end cooling solution",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/haas/2026haascarright.webp",
      telemetry: [
        { sector: "S1", progress: 82 },
        { sector: "S2", progress: 81 },
        { sector: "S3", progress: 83 }
      ]
    },
    {
      team: "Visa Cash App RB",
      color: "#6692FF",
      car: "VCARB 03",
      driver: "Yuki Tsunoda // Isack Hadjar",
      engine: "Red Bull Ford Power Unit",
      feature: "High-density battery storage system",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/racingbulls/2026racingbullscarright.webp",
      telemetry: [
        { sector: "S1", progress: 86 },
        { sector: "S2", progress: 84 },
        { sector: "S3", progress: 85 }
      ]
    },
    {
      team: "Cadillac Formula 1 Team",
      color: "#F5F5F5",
      car: "V-Series.F1",
      driver: "Colton Herta // TBD",
      engine: "Cadillac Power Unit",
      feature: "Custom integrated PU with hybrid focus",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/cadillac/2026cadillaccarright.webp",
      telemetry: [
        { sector: "S1", progress: 83 },
        { sector: "S2", progress: 80 },
        { sector: "S3", progress: 82 }
      ]
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % f1Grid.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + f1Grid.length) % f1Grid.length);

  const getTelemetryColor = (progress: number) => {
    if (progress >= 94) return '#B15EFF'; // Purple: Ultimate Performance
    if (progress >= 90) return '#00D2BE'; // Green: Optimal / Personal Best
    if (progress >= 85) return '#FFFF00'; // Yellow: Competitive / Average
    return '#FF1801'; // Red: Caution / Low Output
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative overflow-hidden border-b border-[#1A1A1A] py-16 lg:py-24">
        {/* Background Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,0,0,0.05),_transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

        <Container className="relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="badge-pulse inline-flex items-center gap-3 rounded-full border border-[#222222] bg-[#0A0A0A]/80 px-4 py-1.5 text-xs font-mono tracking-wider text-[#E50914] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-40"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
              </span>
              LIVE_TELEMETRY: REG_2026_PROTOTYPE // V_BETA_0.1
            </div>
          </div>

          <SectionTitle
            title="F1 // Engineering Matrix"
            subtitle="Analyzing the 2026 technical overhaul: Sustainable fuels, 50/50 power split, and active aerodynamics."
            centered
          />

          <div className="mt-12 max-w-5xl mx-auto">
            {/* Carousel Container */}
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl border border-[#222222] bg-[#0A0A0A] shadow-2xl">
                <div className="flex flex-col">
                  {/* Image Section */}
                  <div 
                    className="relative aspect-video lg:aspect-[21/9] overflow-hidden transition-colors duration-700 border-b border-[#1A1A1A]"
                    style={{ 
                      background: `radial-gradient(circle at center, ${f1Grid[currentIndex].color}22 0%, #000000 100%)`
                    }}
                  >
                    <Image
                      src={f1Grid[currentIndex].image}
                      alt={f1Grid[currentIndex].team}
                      fill
                      unoptimized
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>

                  {/* Data Section */}
                  <div className="p-8 lg:p-10 flex flex-col space-y-8">
                    <div>
                      <div 
                        className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2 transition-colors duration-500"
                        style={{ color: f1Grid[currentIndex].color }}
                      >CONSTRUCTOR_ID // 0{currentIndex + 1}</div>
                      <h3 className="text-3xl font-bold text-white tracking-tighter italic">{f1Grid[currentIndex].team}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { label: 'Chassis_Model', value: f1Grid[currentIndex].car },
                        { label: 'Power_Unit', value: f1Grid[currentIndex].engine },
                        { label: 'Aero_Focus', value: f1Grid[currentIndex].feature },
                        { label: 'Driver_Lineup', value: f1Grid[currentIndex].driver },
                      ].map((stat) => (
                        <div key={stat.label} className="border-l border-[#222222] pl-4">
                          <div className="text-[9px] font-mono uppercase text-[#555555] tracking-widest">{stat.label}</div>
                          <div className="text-sm font-semibold text-[#B0B0B0] mt-1">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Telemetry Chart Section */}
                    <div className="pt-6 border-t border-[#222222]">
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555555] mb-4 italic">Telemetry_Log // Live_Sectors</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                        {f1Grid[currentIndex].telemetry.map((t) => (
                          <div key={t.sector} className="group/bar">
                            <div className="flex justify-between text-[10px] font-mono mb-1.5 uppercase tracking-tighter">
                              <span 
                                className="text-[#888888] group-hover/bar:brightness-125 transition-colors"
                                style={{ color: `${getTelemetryColor(t.progress)}cc` }}
                              >{t.sector}</span>
                              <span className="text-white font-bold">{t.progress}%</span>
                            </div>
                            <div className="h-1 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
                              <div 
                                className="h-full transition-all duration-1000 ease-out"
                                style={{ 
                                  width: `${t.progress}%`,
                                  background: `linear-gradient(to right, ${getTelemetryColor(t.progress)}44, ${getTelemetryColor(t.progress)})`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#0A0A0A] border border-[#222222] p-2 rounded-full shadow-xl">
                <button onClick={prevSlide} className="p-2 hover:text-[#E50914] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="text-[10px] font-mono text-[#555555] px-2">
                  {currentIndex + 1} / {f1Grid.length}
                </div>
                <button  onClick={nextSlide} className="p-2 hover:text-[#E50914] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Favorite Tracks Section */}
      <section className="py-20 bg-[#050505]">
        <Container>
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-[10px] font-mono text-[#E50914] uppercase tracking-widest mb-2">CIRCUIT_DATA // SELECTION</div>
              <h2 className="text-4xl font-bold tracking-tighter">Favorite Tracks</h2>
            </div>
            <div className="h-[1px] flex-grow mx-8 bg-[#1A1A1A] hidden md:block mb-4" />
            <div className="text-xs font-mono text-[#555555] mb-4 uppercase">Archive_Ref: 2026_CALENDAR</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div className="group relative overflow-hidden rounded-xl border border-[#222222] bg-[#0A0A0A] p-1">
              <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
                <Image 
                  src=" https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/common/f1/2026/track/2026trackspafrancorchampsdetailed.webp"
                  alt="Spa-Francorchamps Circuit Map"
                  fill
                  unoptimized
                  className="object-contain p-8 opacity-40 transition-opacity group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 italic">Circuit de Spa-Francorchamps</h3>
                <p className="text-sm text-[#888888] leading-relaxed font-mono uppercase tracking-tight">
                  Location: Stavelot, Belgium // Length: 7.004 km // Highlight: Eau Rouge & Raidillon. 
                  The ultimate engineering test for 2026's active aero "Z-Mode" high-downforce requirements.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}