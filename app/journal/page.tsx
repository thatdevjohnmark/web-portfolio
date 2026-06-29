'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import HeroHeader from '../components/ui/HeroHeader';
import SectionLabel from '../components/ui/SectionLabel';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { journalEntries, JournalEntry } from '../data/journal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function JournalPage() {
  const [filter, setFilter] = useState<'all' | 'education' | 'milestone' | 'project'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedEntries(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedEntries = useMemo(() => {
    const filtered = journalEntries.filter((entry) => {
      if (filter === 'all') return true;
      return entry.type === filter;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.timestamp.localeCompare(a.timestamp);
      } else {
        return a.timestamp.localeCompare(b.timestamp);
      }
    });
  }, [filter, sortOrder]);

  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="HISTORICAL_RECORD"
        title="[ JOURNAL ]"
        description="Historical timeline records from college enrollment to graduation and specialized training."
      />

      {/* ════════════ TIMELINE ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionLabel number="01" label="TIMELINE" />
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b-[2px] border-[#333] pb-6 mb-12">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all' as const, label: 'ALL_LOGS' },
                { key: 'education' as const, label: 'EDUCATION' },
                { key: 'milestone' as const, label: 'MILESTONES' },
                { key: 'project' as const, label: 'PROJECTS' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 font-pixel text-[9px] tracking-wider border-[2px] transition-all duration-150 cursor-pointer ${
                    filter === key
                      ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                      : 'border-[#333] bg-[#0A0A0A] text-[#B0B0B0] hover:text-[#FFFFFF] hover:border-[#808080]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="font-pixel text-[9px] tracking-wider px-3 py-1.5 border-[2px] border-[#333] bg-[#0A0A0A] text-[#B0B0B0] hover:text-[#FFFFFF] hover:border-[#808080] transition-all duration-150 cursor-pointer"
            >
              {sortOrder === 'desc' ? '▼ NEWEST FIRST' : '▲ OLDEST FIRST'}
            </button>
          </div>

          {/* Timeline */}
          {sortedEntries.length > 0 ? (
            <div className="relative mt-8">
              <div className="absolute left-[19px] top-4 bottom-4 w-[3px] bg-[#333333]" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="space-y-12"
              >
                {sortedEntries.map((entry) => {
                  const isExpanded = expandedEntries[entry.id];

                  return (
                    <motion.div
                      key={entry.id}
                      variants={itemVariants}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="relative pl-14"
                    >
                      <div className="absolute left-[12px] top-[6px] h-4 w-4 bg-[#FFFFFF] border-[3px] border-[#000000] z-10" />

                      <div className="font-pixel text-[8px] tracking-wider text-[#B0B0B0] border-[2px] border-[#333] bg-[#0A0A0A] px-3 py-1 inline-block mb-4">
                        {entry.date} // {entry.type.toUpperCase()}
                      </div>

                      <div className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#808080] transition-colors duration-150">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          {entry.image && (
                            <div className="relative w-full sm:w-32 aspect-video sm:aspect-square flex-shrink-0 overflow-hidden border-[2px] border-[#333]">
                              <Image
                                src={entry.image}
                                alt={entry.title}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          )}

                          <div className="flex-grow">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-pixel text-[13px] text-[#FFFFFF] tracking-wider leading-relaxed">
                                  {entry.title}
                                </h3>
                                <p className="font-terminal text-[16px] text-[#B0B0B0] mt-0.5">
                                  {entry.subtitle}
                                </p>
                              </div>
                              <Badge
                                variant={entry.type === 'education' ? 'primary' : entry.type === 'milestone' ? 'warning' : 'success'}
                                className="font-pixel text-[8px]"
                              >
                                {entry.type}
                              </Badge>
                            </div>

                            <p className={`font-terminal text-[18px] text-[#B0B0B0] leading-relaxed mt-4 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                              {entry.description}
                            </p>

                            <button
                              onClick={() => toggleExpand(entry.id)}
                              className="mt-3 font-pixel text-[9px] text-[#FFFFFF] hover:text-[#808080] transition-colors tracking-wider cursor-pointer"
                            >
                              {isExpanded ? '[−] COLLAPSE' : '[+] EXPAND'}
                            </button>

                            {entry.tags && entry.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-[2px] border-[#333]">
                                {entry.tags.map((tag) => (
                                  <span key={tag} className="font-pixel text-[8px] text-[#808080] tracking-wider">
                                    #{tag.toLowerCase()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ) : (
            <div className="mt-16 text-center py-20 border-[3px] border-dashed border-[#333] bg-[#0A0A0A]">
              <div className="font-pixel text-[24px] text-[#333]">◈</div>
              <div className="mt-3 font-pixel text-[10px] text-[#666] tracking-wider">
                NO RECORDS FOUND FOR FILTER
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-16 flex justify-center gap-4">
            <Link href="/about">
              <Button variant="outline" size="sm" className="font-pixel text-[9px]">
                [ BACK TO ABOUT ]
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="sm" className="font-pixel text-[9px]">
                [ VIEW PROJECTS ]
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
