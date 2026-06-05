'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/app/components/Container';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'next/navigation';

export default function ProjectArticle() {
  const { slug } = useParams();

  // In a real application, you would fetch project data based on the slug.
  const projectTitle = typeof slug === 'string'
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Project Story';

  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="text-[#B0B0B0] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-2 mb-12 group text-sm font-medium"
          >
            <motion.span
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              ←
            </motion.span>
            Back to Projects
          </Link>
        </motion.div>

        <article className="max-w-3xl">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Inter' }}>
              {projectTitle}
            </h1>
            <div className="h-1 w-12 bg-[#FFFFFF]" />
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#B0B0B0] text-lg leading-relaxed space-y-8"
          >
            <p className="text-xl text-[#FFFFFF]">Overview</p>
            <p>This is where the full story of your project lives. You can explain the problem you solved, the technical hurdles you overcame as a QA Specialist, and the data validation strategies you implemented.</p>
            <p>Detailed documentation and manual testing logs could be highlighted here to showcase your thoroughness and attention to detail.</p>
          </motion.div>
        </article>
      </Container>
      <Footer />
    </main>
  );
}