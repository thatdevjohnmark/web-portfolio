'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import SectionTitle from '../components/ui/SectionTittle';
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function JournalPage() {
  const [filter, setFilter] = useState<'all' | 'education' | 'milestone' | 'project'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // 'desc' is recent first, 'asc' is oldest first
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
    <main className="min-h-screen bg-[#000000] text-[#FFFFFF]">
      <Navbar />

      <section className="py-20 bg-[#000000] border-b border-[#333333]">
        <Container className="max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle
              title="Chronological Journal"
              subtitle="Historical timeline records from college enrollment to graduation and specialized training"
              centered
            />
          </motion.div>

          {/* Controls Bar (Filter + Sort) */}
          <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[#1A1A1A] pb-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { key: 'all', label: 'ALL_LOGS' },
                { key: 'education', label: 'EDUCATION' },
                { key: 'milestone', label: 'MILESTONES' },
                { key: 'project', label: 'PROJECTS' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-3 py-1.5 rounded border transition-all duration-300 cursor-pointer ${
                    filter === key
                      ? 'bg-white text-black border-white font-bold'
                      : 'border-[#222222] bg-[#0A0A0A] text-[#888888] hover:text-white hover:border-[#444444]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sorting Toggle */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#555555]">SORT_ORDER:</span>
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="px-3 py-1.5 rounded border border-[#222222] bg-[#0A0A0A] text-[#B0B0B0] hover:text-white hover:border-[#444444] transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>{sortOrder === 'desc' ? '▼ NEWEST_FIRST' : '▲ OLDEST_FIRST'}</span>
              </button>
            </div>
          </div>

          {/* Timeline Feed */}
          {sortedEntries.length > 0 ? (
            <div className="relative mt-24">
              {/* Central Line */}
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-[18.5px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4)_30%,transparent_30%)] bg-[size:100%_50px] origin-top" 
              />
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-32"
              >
                {sortedEntries.map((entry, index) => {
                  const isLeft = index % 2 === 0;
                  const isExpanded = expandedEntries[entry.id];

                  return (
                    <motion.div 
                      key={entry.id} 
                      variants={itemVariants}
                      className="relative group grid grid-cols-[40px_1fr] md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-12 items-start"
                    >
                      {/* Desktop Left Side */}
                      <div className={`hidden md:block ${isLeft ? '' : 'invisible'}`}>
                        {isLeft && <TimelineItem entry={entry} isExpanded={isExpanded} onToggle={() => toggleExpand(entry.id)} />}
                      </div>

                      {/* Center Point */}
                      <div className="flex justify-center pt-8 z-10">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black border-2 border-white transition-all duration-300 group-hover:scale-125 group-hover:border-[#E50914]">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        </span>
                      </div>

                      {/* Right Side / Mobile Side */}
                      <div className={`${!isLeft ? '' : 'md:invisible'}`}>
                        {/* Always show on mobile, show on desktop if not left */}
                        <div className="md:hidden">
                          <TimelineItem entry={entry} isExpanded={isExpanded} onToggle={() => toggleExpand(entry.id)} />
                        </div>
                        <div className="hidden md:block">
                          {!isLeft && <TimelineItem entry={entry} isExpanded={isExpanded} onToggle={() => toggleExpand(entry.id)} />}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ) : (
            <div className="mt-16 text-center py-20 border border-dashed border-[#1A1A1A] rounded bg-[#050505]">
              <div className="text-3xl text-[#333333]">◈</div>
              <div className="mt-3 text-sm font-mono text-[#666666]">
                NO_RECORDS_FOUND_FOR_FILTER
              </div>
            </div>
          )}

          {/* Navigation Action Buttons */}
          <div className="mt-16 flex justify-center gap-4">
            <Link href="/about" passHref>
              <Button variant="outline" className="border-[#333333] hover:border-white text-white">
                Back to About
              </Button>
            </Link>
            <Link href="/projects" passHref>
              <Button className="bg-white text-black hover:bg-gray-200">
                View Projects
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}

function TimelineItem({ entry, isExpanded, onToggle }: { entry: JournalEntry & { image?: string }, isExpanded: boolean, onToggle: () => void }) {
  return (
    <div className="relative">
      {/* Date label */}
      <div className="text-[10px] font-mono text-[#666666] tracking-widest uppercase mb-2">
        {entry.date} // {entry.type.toUpperCase()}
      </div>

      <Card
        hover
        className="border-[#1A1A1A] bg-[#050505] p-5 md:p-6 hover:border-[#444444] transition-all duration-300 overflow-hidden"
      >
        <div className={`flex flex-col ${entry.image ? 'lg:flex-row' : ''} gap-6`}>
          {entry.image && (
            <div className="relative w-full lg:w-40 xl:w-48 aspect-video lg:aspect-square flex-shrink-0 rounded-lg overflow-hidden border border-[#1A1A1A] bg-[#111111]">
              <Image
                src={entry.image}
                alt={entry.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                unoptimized
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </div>
          )}
          
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide font-sans group-hover:text-[#E50914] transition-colors">
                  {entry.title}
                </h3>
                <p className="text-xs font-mono text-[#888888] mt-0.5">
                  {entry.subtitle}
                </p>
              </div>
              
              <div className="self-start">
                <Badge
                  variant={entry.type === 'education' ? 'primary' : entry.type === 'milestone' ? 'warning' : 'success'}
                  className="font-mono text-[9px] uppercase px-2 py-0.5"
                >
                  {entry.type}
                </Badge>
              </div>
            </div>

            <motion.p 
              layout
              className={`text-[#B0B0B0] text-sm leading-relaxed mt-4 font-sans ${!isExpanded ? 'line-clamp-2' : ''}`}
            >
              {entry.description}
            </motion.p>

            <button
              onClick={onToggle}
              className="mt-3 text-[10px] font-mono text-[#FFFFFF] hover:text-[#E50914] transition-colors uppercase tracking-widest flex items-center gap-1 cursor-pointer"
            >
              {isExpanded ? '[−] COLLAPSE_STORY' : '[+] EXPAND_STORY'}
            </button>

            {/* Metadata tags */}
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#121212]">
                {entry.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-[#444444] bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#1A1A1A]">
                    #{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
