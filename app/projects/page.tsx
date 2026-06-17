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
  return (
    <main className="min-h-screen bg-background dark:bg-background-dark">
      <Navbar />
      <Container className="py-20">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-text-primary dark:text-text-primary-dark mb-4"
            style={{ fontFamily: 'Inter' }}
          >
            Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-text-secondary dark:text-text-secondary-dark text-lg max-w-2xl"
          >
            A collection of work spanning full-stack development, QA specialization, and data validation.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-surface dark:bg-surface-dark border-border dark:border-border-dark rounded-xl overflow-hidden flex flex-col group transition-colors hover:border-accent dark:hover:border-accent-dark"
              >
                <div className="relative h-48 w-full bg-surface dark:bg-surface-dark overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-text-primary dark:text-text-primary-dark mb-3" style={{ fontFamily: 'Inter' }}>
                    {project.title}
                  </h3>
                  <p className="text-text-secondary dark:text-text-secondary-dark text-sm line-clamp-3 mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-surface dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark border-border dark:border-border-dark rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/projects/articles/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-primary dark:text-text-primary-dark mt-auto group/link"
                  >
                    View Full Article
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
      </Container>
      <Footer />
    </main>
  );
}