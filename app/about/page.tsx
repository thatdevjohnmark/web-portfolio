'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Container from '@/app/components/Container';
import HeroHeader from '@/app/components/ui/HeroHeader';
import SectionLabel from '@/app/components/ui/SectionLabel';
import Badge from '@/app/components/ui/Badge';
import Button from '@/app/components/ui/Button';

const coreCompetencies = [
  'Manual Testing',
  'Bug Identification & Resolution',
  'Data Accuracy Validation',
  'Requirement Analysis',
  'Process Documentation',
  'Progress Reporting',
  'Attention to Detail',
  'Analytical Thinking',
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="IDENTITY_RECORD"
        title="[ ABOUT ]"
        description="Detail-oriented IT graduate transitioning into a QA role — with hands-on experience in full-stack development, manual testing, and data validation."
      />

      {/* ════════════ PROFILE ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionLabel number="01" label="PROFILE" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8"
            >
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider leading-relaxed">
                John Mark Tactacan
              </h3>
              <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed">
                Detail-oriented IT graduate with hands-on experience in full-stack development,
                manual testing, data validation, and bug resolution across multiple projects.
                Experienced in requirement analysis, process documentation, and progress reporting
                to supervisors and stakeholders. Seeking to transition into a QA role by applying
                strong analytical skills, attention to detail, and practical testing experience in a
                collaborative environment.
              </p>

              <div className="mt-6 font-terminal text-[18px] text-[#B0B0B0]">
                <div className="font-pixel text-[10px] text-[#FFFFFF] tracking-wider mb-1">LOCATION</div>
                <div>Carranglan, Nueva Ecija, Philippines</div>
              </div>

              <div className="mt-6">
                <Link href="/playground">
                  <Button variant="outline" size="sm" className="font-pixel text-[9px]">
                    [ VISIT PLAYGROUND ]
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8"
            >
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider">
                CORE COMPETENCIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreCompetencies.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ════════════ EDUCATION & CERTS ════════════ */}
      <section className="py-20 lg:py-28 border-t-[3px] border-[#1A1A1A] bg-[#000000]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionLabel number="02" label="EDUCATION & CERTIFICATIONS" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8"
            >
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider">
                EDUCATION
              </h3>
              <div className="font-terminal text-[18px] text-[#B0B0B0]">
                <div className="text-[#FFFFFF] font-terminal text-[20px] leading-relaxed">
                  Bachelor of Science in Information Technology
                </div>
                <div className="text-[#B0B0B0]">Major in Systems Development</div>
                <div className="mt-3">Central Luzon State University</div>
                <div className="mt-1">08/2021 – 01/2026</div>
                <div className="mb-4">Science City of Muñoz, Nueva Ecija, Philippines</div>

                <Link href="/journal">
                  <Button variant="outline" size="sm" className="font-pixel text-[9px] w-full">
                    [ VIEW CHRONOLOGICAL JOURNAL ]
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8"
            >
              <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-4 tracking-wider">
                LICENSES & CERTIFICATIONS
              </h3>
              <div className="font-terminal text-[18px] text-[#B0B0B0]">
                <div className="text-[#FFFFFF] font-terminal text-[20px] leading-relaxed">
                  AWS Academy Cloud Foundations
                </div>
                <div className="mt-1 text-[#808080]">Amazon Web Services</div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
