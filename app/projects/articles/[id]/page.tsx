'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/app/data/project';
import Container from '@/app/components/Container';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectArticlePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const project = projects.find((p) => p.id === parseInt(resolvedParams.id));

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <Container className="py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm text-[#B0B0B0] hover:text-[#FFFFFF] transition-colors mb-8 group"
          >
            <motion.span
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ←
            </motion.span>
            Back to Projects
          </Link>

          <header className="mb-12">
            <motion.h1 
              className="text-4xl md:text-6xl font-pixel text-[#FFFFFF] mb-6 tracking-wider leading-relaxed"
            >
              {project.title}
            </motion.h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-[#1A1A1A] text-[#B0B0B0] border border-[#333333] rounded">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden border border-[#333333]">
            <Image 
              src={project.image} 
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-invert max-w-none"
              >
                <p className="text-[#B0B0B0] text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="mt-12 p-8 bg-[#0A0A0A] border border-[#333333] rounded-xl">
                  <h3 className="font-pixel text-[15px] text-[#FFFFFF] mb-4 tracking-wider">
                    Project Overview
                  </h3>
                  <p className="text-[#B0B0B0] leading-relaxed">
                    This project demonstrates a commitment to high-quality software delivery through rigorous testing and validation. 
                    The focus was on ensuring a seamless user experience and robust system stability.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="sticky top-24 p-6 bg-[#1A1A1A] border border-[#333333] rounded-xl"
              >
               
                <h4 className="text-sm font-bold text-[#FFFFFF] uppercase tracking-widest mb-4">
                  Project Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[#666666] uppercase">Live Demo</p>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FFFFFF] hover:underline text-sm block transition-all"
                    >
                      Visit Website →
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-[#666666] uppercase">Source Code</p>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FFFFFF] hover:underline text-sm block transition-all"
                    >
                      GitHub Repository →
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
      <Footer />
    </main>
  );
}
