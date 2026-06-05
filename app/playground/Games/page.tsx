"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import SectionTitle from '../../components/ui/SectionTittle';
import Button from '../../components/ui/Button';

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState<'hardware' | 'library'>('hardware');

  const rigSpecs = [
    { component: "GPU", name: "ASUS ROG Strix Radeon RX 9900 XTX", status: "Active // Thermal_Nominal" },
    { component: "CPU", name: "AMD Ryzen 9 11950X (Zen 6)", status: "Stable // Multi-Core_Benchmarked" },
    { component: "Power Supply", name: "Corsair HX1500i Platinum ATX 3.1", status: "Nominal Load // Peak_Efficiency" },
    { component: "UPS Backup", name: "CyberPower PR1500 Professional Series", status: "Online // Voltage_Protected" },
    { component: "IPS", name: "Converge FiberX Dedicated", status: "2.5 Gbps Symmetrical" },
  ];

  const gamingLibrary = [
    { title: "The Last of Us Part I", platform: "PC", status: "100% Clear", assessment: "A benchmark for narrative-driven gameplay and emotional storytelling mechanics.", image: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg" },
    { title: "The Last of Us Part II", platform: "PC", status: "100% Clear", assessment: "Unparalleled technical achievement in animation and complex character writing.", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/TLOU_P2_Box_Art_2.png/250px-TLOU_P2_Box_Art_2.png" },
    { title: "Resident Evil 2 Remake", platform: "PC", status: "Completed", assessment: "Masterful survival horror atmosphere with perfectly balanced resource management.", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Resident_Evil_2_Remake.jpg/250px-Resident_Evil_2_Remake.jpg" },
    { title: "Resident Evil 3 Remake", platform: "PC", status: "Completed", assessment: "High-octane survival with action-oriented cinematic set pieces.", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Resident_Evil_3.jpg/250px-Resident_Evil_3.jpg" },
    { title: "Resident Evil 4 Remake", platform: "PC", status: "100% Clear", assessment: "Exceptional hardware optimization scaling and masterclass pacing.", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Resident_Evil_4_remake_cover_art.jpg/250px-Resident_Evil_4_remake_cover_art.jpg" },
    { title: "Resident Evil 7: Biohazard", platform: "PC", status: "Completed", assessment: "The pinnacle of survival horror tension and first-person atmosphere.", image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_7_cover_art.jpg" },
    { title: "Resident Evil Village", platform: "PC", status: "Completed", assessment: "Excellent graphical atmosphere. Shadows of Rose expansion cleared.", image: "https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png" },
    { title: "Resident Evil 9: Requiem", platform: "PC", status: "Completed", assessment: "Analyzed the latest evolution in campaign systems and survival mechanics.", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Resident_Evil_Requiem_Cover_Art.jpg/250px-Resident_Evil_Requiem_Cover_Art.jpg" },
    { title: "Genshin Impact", platform: "PC", status: "Completed", assessment: "Chapter VI: Snezhnaya arc clear. Analyzing the high-overhead rendering optimizations for the Khaenri'ah transition.", image: "https://cdn1.epicgames.com/spt-assets/99dc46c68ea14324964a856d18dcac5b/genshin-impact-hqdph.jpg" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="py-16">
        <Container>
          <SectionTitle
            title="Gaming & Hardware Matrix"
            subtitle="Performance benchmarking datasets, diagnostic tool workflows, and a survival horror index."
            centered
          />

          {/* Controls Bar */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <Link href="/playground" passHref>
              <Button className="border border-[#222222] bg-white hover:bg-[#111111] text-xs font-mono">
                ← Return to Playground
              </Button>
            </Link>

            {/* Matrix Tab Switcher */}
            <div className="flex bg-[#111111] border border-[#222222] p-1 rounded-md font-mono text-xs">
              <button
                onClick={() => setActiveTab('hardware')}
                className={`px-4 py-2 rounded transition-all duration-200 ${
                  activeTab === 'hardware' 
                    ? 'bg-[#222222] text-white font-bold border border-[#333333]' 
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                HARDWARE_RIG
              </button>
              <button
                onClick={() => setActiveTab('library')}
                className={`px-4 py-2 rounded transition-all duration-200 ${
                  activeTab === 'library' 
                    ? 'bg-[#222222] text-white font-bold border border-[#333333]' 
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                GAME_LIBRARY
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'hardware' ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
              <div className="space-y-6">
                {/* Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rigSpecs.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-[#141414] border border-[#222222] rounded-md p-5 flex flex-col justify-between transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-[#444444] hover:shadow-xl hover:shadow-white/[0.02]"
                    >
                      <div>
                        <div className="text-[10px] font-mono text-[#E50914] uppercase tracking-widest mb-1">
                          {item.component}
                        </div>
                        <h4 className="text-lg font-bold text-white tracking-tight">
                          {item.name}
                        </h4>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#888888]">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Telemetry Notice Card */}
                <div className="bg-[#111111] border border-[#222222] rounded-md p-6">
                  <div className="text-xs font-mono text-[#B0B0B0] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    DIAGNOSTIC_METRICS_ACTIVE
                  </div>
                  <p className="text-[#888888] text-sm leading-relaxed">
                    System telemetry regularly monitored using <span className="text-white font-semibold">HWiNFO64</span> to evaluate actual power draws, clock speeds, and thermal constraints under full load. Graphical baselines generated and verified using high-overhead loop cycles inside <span className="text-white font-semibold">UNIGINE Superposition</span> benchmarks.
                  </p>
                </div>
              </div>

              {/* Visual Hardware Panel */}
              <div className="relative group hidden lg:block">
                <div className="animate-glow absolute -inset-2 rounded-2xl bg-[#E50914]/5 blur-xl group-hover:bg-[#E50914]/10 transition-all" />
                <div className="animate-float relative h-full min-h-[400px] overflow-hidden rounded-2xl border border-[#222222] bg-[#0A0A0A] transition-all group-hover:border-[#E50914]/30">
                  <Image
                    src="/images/profile/man-holding-coffee.jpg"
                    alt="Hardware Visualization"
                    fill
                    className="object-cover opacity-50 grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-80"
                  />
                  
                  {/* Technical Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="h-1 w-12 bg-[#E50914]/40" />
                    <div className="text-[8px] font-mono text-[#E50914]/60 uppercase">Hardware_Viz // 0.9.4</div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6">
                    <div className="text-[10px] font-mono text-[#E50914] mb-1">DATA_SOURCE: RIG_01</div>
                    <div className="text-sm font-bold text-white uppercase tracking-tighter italic">Stationary Unit Visualization</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Game Archive Panel */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {gamingLibrary.map((game, index) => (
                <div 
                  key={index} 
                  className="bg-[#141414] border border-[#222222] rounded-md p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-[#e50914]/40 hover:shadow-xl hover:shadow-[#e50914]/5 group"
                >
                  <div>
                    {/* Game Thumbnail */}
                    <div className="relative aspect-[2/3] mb-5 overflow-hidden rounded border border-[#222222] bg-black">
                      <Image
                        src={game.image}
                        alt={`${game.title} cover art`}
                        fill
                        unoptimized={game.image.startsWith('http')}
                        className="object-cover opacity-40 grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent opacity-60" />
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-mono text-[#888888] border border-[#222222] px-2 py-0.5 rounded bg-[#111111]">
                        {game.platform}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        game.status === 'In Progress' 
                          ? 'bg-amber-950 text-amber-400 border border-amber-800' 
                          : 'bg-green-950 text-green-400 border border-green-800'
                      }`}>
                        {game.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E50914] transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-[#888888] text-sm leading-relaxed">
                      {game.assessment}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#222222] text-[10px] font-mono text-[#555555] tracking-wider">
                    CLASSIFICATION // SURVIVAL_HORROR_CORE
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  );
}