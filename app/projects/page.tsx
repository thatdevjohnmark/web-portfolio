'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/app/components/Container';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/app/data/project';

export default function ProjectsPage() {
  const [showAll, setShowAll] = React.useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <Container className="py-20">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-pixel text-[#FFFFFF] mb-4 tracking-wider"
          >
            [ PROJECTS ]
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="font-terminal text-[20px] text-[#B0B0B0] max-w-2xl"
          >
            A collection of work spanning full-stack development, QA specialization, and data validation.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-[#1A1A1A] border-[3px] border-[#333] overflow-hidden flex flex-col group transition-colors hover:border-[#808080]"
              >
                <div className="relative h-48 w-full bg-[#1A1A1A] overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-pixel text-[13px] text-[#FFFFFF] mb-3 tracking-wider leading-relaxed">
                    {project.title}
                  </h3>
                  <p className="font-terminal text-[18px] text-[#B0B0B0] line-clamp-3 mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="font-pixel text-[8px] tracking-wider px-2 py-1 bg-[#0A0A0A] text-[#B0B0B0] border-[2px] border-[#333]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/projects/articles/${project.id}`}
                    className="inline-flex items-center gap-2 font-pixel text-[10px] text-[#FFFFFF] mt-auto group/link tracking-wider hover:text-[#808080] transition-colors"
                  >
                    [ VIEW FULL ARTICLE ]
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && projects.length > 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 font-pixel text-[11px] text-[#FFFFFF] bg-[#1A1A1A] border-[3px] border-[#333] px-8 py-4 hover:border-[#808080] hover:bg-[#222] transition-all cursor-pointer"
            >
              [ SEE ALL PROJECTS ]
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.span>
            </button>
          </motion.div>
        )}
      </Container>
      <Footer />
    </main>
  );
}