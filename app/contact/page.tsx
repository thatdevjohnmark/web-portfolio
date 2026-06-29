'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import HeroHeader from '../components/ui/HeroHeader';
import SectionLabel from '../components/ui/SectionLabel';
import Button from '../components/ui/Button';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="COMM_LINK // STANDBY"
        title="[ CONTACT ]"
        description="Available for technical consultation, QA auditing, and full-stack collaboration."
      />

      {/* ════════════ CONNECTION CHANNELS ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionLabel number="01" label="CONNECTION CHANNELS" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative border-[3px] border-[#333] bg-[#1A1A1A] p-8 lg:p-12">
              {/* Corner accents */}
              <div className="absolute top-0 right-0 h-12 w-12 border-t-[3px] border-r-[3px] border-[#555]" />
              <div className="absolute bottom-0 left-0 h-12 w-12 border-b-[3px] border-l-[3px] border-[#555]" />

              <div className="space-y-10 text-[#B0B0B0]">
                <div>
                  <div className="font-pixel text-[9px] tracking-[0.2em] text-[#808080] mb-2">
                    COMM_CHANNEL // EMAIL
                  </div>
                  <a
                    className="font-terminal text-[22px] md:text-[26px] text-[#FFFFFF] hover:text-[#808080] transition-colors break-all"
                    href="mailto:johnmark.tactacan@gmail.com"
                  >
                    johnmark.tactacan@gmail.com
                  </a>
                </div>

                <div>
                  <div className="font-pixel text-[9px] tracking-[0.2em] text-[#808080] mb-2">
                    COMM_CHANNEL // VOICE
                  </div>
                  <a
                    className="font-terminal text-[22px] md:text-[26px] text-[#FFFFFF] hover:text-[#808080] transition-colors"
                    href="tel:+639762159529"
                  >
                    09762159529
                  </a>
                </div>

                <div>
                  <div className="font-pixel text-[9px] tracking-[0.2em] text-[#808080] mb-2">
                    GEO_LOC // COORDINATES
                  </div>
                  <div className="font-terminal text-[20px] text-[#FFFFFF]">
                    Carranglan, Nueva Ecija, Philippines
                  </div>
                </div>

                <div className="pt-6 border-t-[2px] border-[#333]">
                  <a href="mailto:johnmark.tactacan@gmail.com">
                    <Button size="lg" className="w-full font-pixel text-[11px] bg-[#FFFFFF] text-[#000000] hover:bg-[#E0E0E0]">
                      [ INITIALIZE TRANSMISSION ]
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
