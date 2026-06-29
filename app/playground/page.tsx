'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import HeroHeader from '../components/ui/HeroHeader';
import SectionLabel from '../components/ui/SectionLabel';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="DIGITAL_SANDBOX"
        title="[ PLAYGROUND ]"
        description="A digital sandbox exploring personal interests, media, and development experiments."
      />

      {/* ════════════ EXPLORE ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionLabel number="01" label="EXPLORE" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Anime */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Link href="/playground/Anime">
                <div className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 h-full flex flex-col hover:border-[#808080] transition-colors duration-150">
                  <div className="font-pixel text-[9px] text-[#808080] tracking-wider mb-2">HOBBY_01</div>
                  <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-3 tracking-wider">
                    Anime Culture
                  </h3>
                  <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mb-6 flex-1">
                    Exploring compelling storytelling, high-fidelity world-building, and cinematic animation aesthetics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">Studio Ghibli</Badge>
                    <Badge variant="secondary">Type-Moon</Badge>
                    <Badge variant="secondary">Fantasy</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="font-pixel text-[9px]">
                    [ VIEW DETAILS ]
                  </Button>
                </div>
              </Link>
            </motion.div>

            {/* Gaming */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link href="/playground/Games">
                <div className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 h-full flex flex-col hover:border-[#808080] transition-colors duration-150">
                  <div className="font-pixel text-[9px] text-[#808080] tracking-wider mb-2">HOBBY_02</div>
                  <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-3 tracking-wider">
                    Gaming & Hardware
                  </h3>
                  <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mb-6 flex-1">
                    Immersed in atmospheric survival horror franchises and optimization tracking for high-performance PC hardware.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">Resident Evil</Badge>
                    <Badge variant="secondary">PC Benchmarking</Badge>
                    <Badge variant="secondary">Survival Horror</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="font-pixel text-[9px]">
                    [ VIEW DETAILS ]
                  </Button>
                </div>
              </Link>
            </motion.div>

            {/* F1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link href="/playground/F1">
                <div className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 h-full flex flex-col hover:border-[#808080] transition-colors duration-150">
                  <div className="font-pixel text-[9px] text-[#808080] tracking-wider mb-2">HOBBY_03</div>
                  <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-3 tracking-wider">
                    Formula 1 // Telemetry
                  </h3>
                  <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mb-6 flex-1">
                    Analyzing high-speed aerodynamics, race strategy logic, and the technical engineering behind the pinnacle of motorsport.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">Aerodynamics</Badge>
                    <Badge variant="secondary">Telemetry</Badge>
                    <Badge variant="secondary">Motorsport</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="font-pixel text-[9px]">
                    [ VIEW DETAILS ]
                  </Button>
                </div>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
