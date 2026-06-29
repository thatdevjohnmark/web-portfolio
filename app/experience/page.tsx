'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Badge from '../components/ui/Badge';
import HeroHeader from '../components/ui/HeroHeader';
import SectionLabel from '../components/ui/SectionLabel';
import { experience } from '../data/experience';

// ── Skills data ──────────────────────────────────────────────────────────────

const skillCategories = [
  {
    label: 'TESTING & QA',
    skills: [
      { name: 'Manual Testing' },
      { name: 'Regression Testing' },
      { name: 'Functional Testing' },
      { name: 'Edge-case Analysis' },
      { name: 'Bug Reporting & Triage' },
    ],
  },
  {
    label: 'DEVELOPMENT',
    skills: [
      { name: 'Next.js / React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Supabase / PostgreSQL' },
      { name: 'Full-stack Architecture' },
    ],
  },
  {
    label: 'DESIGN & DOCS',
    skills: [
      { name: 'UI/UX Design' },
      { name: 'Technical Writing' },
      { name: 'Requirements Gathering' },
      { name: 'User Workflows' },
    ],
  },
  {
    label: 'TOOLS & PLATFORMS',
    skills: [
      { name: 'Git / GitHub' },
      { name: 'VS Code' },
      { name: 'Vercel / CI/CD' },
      { name: 'Postman / API Testing' },
    ],
  },
];

// ── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="CAREER_LOG // v2.0"
        title="[ EXPERIENCE ]"
        description="A chronological log of professional roles — from requirements gathering and manual testing to full-stack development and UI/UX collaboration."
      />

      {/* ════════════ TIMELINE ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionLabel number="01" label="WORK HISTORY" />
          </motion.div>

          <div className="relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-[3px] bg-[#333333]" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-16"
            >
              {experience.map((item) => (
                <TimelineEntry key={item.id} item={item} />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ════════════ SKILLS MATRIX ════════════ */}
      <section className="py-20 lg:py-28 border-t-[3px] border-[#1A1A1A] bg-[#000000]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionLabel number="02" label="SKILLS & COMPETENCIES" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-pixel text-[11px] text-[#808080] tracking-[0.2em] mb-6">
                  {cat.label}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="font-pixel text-[9px] tracking-wider px-3 py-1.5 bg-[#0A0A0A] text-[#B0B0B0] border-[2px] border-[#333]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function TimelineEntry({ item }: { item: typeof experience[number] }) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative pl-14"
    >
      <div className="absolute left-[12px] top-[6px] h-4 w-4 bg-[#FFFFFF] border-[3px] border-[#000000] z-10" />

      <div className="font-pixel text-[8px] tracking-wider text-[#B0B0B0] border-[2px] border-[#333] bg-[#0A0A0A] px-3 py-1 inline-block mb-4">
        {item.period}
      </div>

      <div className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#808080] transition-colors duration-150">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="font-pixel text-[13px] text-[#FFFFFF] tracking-wider leading-relaxed">
              {item.role}
            </h3>
            <p className="font-terminal text-[20px] text-[#B0B0B0] mt-1">
              {item.company}
            </p>
          </div>
        </div>

        <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mb-6">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

