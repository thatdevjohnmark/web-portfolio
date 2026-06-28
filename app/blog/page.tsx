'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import SectionTitle from '../components/ui/SectionTittle';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

// Mock data for the UI
const blogPosts = [
  {
    id: '1',
    slug: 'future-of-qa-automation',
    title: 'The Future of QA Automation in a Generative AI World',
    excerpt: 'Exploring how LLMs are reshaping the landscape of automated testing and what it means for traditional QA engineers.',
    date: 'Oct 24, 2023',
    readTime: '6 min read',
    category: 'QA & Testing',
    tags: ['AI', 'Automation', 'Software-Quality']
  },
  {
    id: '2',
    slug: 'mastering-framer-motion',
    title: 'Mastering Framer Motion for Industrial UI Apps',
    excerpt: 'A deep dive into creating performant, meaningful animations for complex data dashboards and enterprise tools.',
    date: 'Sep 12, 2023',
    readTime: '12 min read',
    category: 'Development',
    tags: ['React', 'Animation', 'UX']
  },
  {
    id: '3',
    slug: 'clean-code-validation',
    title: 'Clean Code: Beyond the Linter',
    excerpt: 'Structural validation techniques that ensure your codebase remains scalable and maintainable over years of iteration.',
    date: 'Aug 05, 2023',
    readTime: '8 min read',
    category: 'Engineering',
    tags: ['Best-Practices', 'TypeScript', 'Architecture']
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'QA & Testing', 'Development', 'Engineering'];

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFFFF]">
      <Navbar />

      <section className="py-20">
        <Container className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle
              title="[ INSIGHTS & ARTICLES ]"
              subtitle="Thoughts on software quality, full-stack engineering, and the evolving tech landscape."
              centered
            />
          </motion.div>

          {/* Category Filter */}
          <div className="mt-12 mb-16 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-pixel text-[9px] tracking-wider transition-all duration-150 border-[2px] ${
                  activeCategory === cat
                    ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                    : 'border-[#333] bg-[#0A0A0A] text-[#B0B0B0] hover:text-[#FFFFFF] hover:border-[#808080]'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Blog Feed */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`}>
                  <Card 
                    hover 
                    className="p-6 md:p-8"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 font-pixel text-[8px] text-[#B0B0B0] tracking-wider">
                          <span>{post.date}</span>
                          <span className="text-[#333]">|</span>
                          <span>{post.readTime}</span>
                        </div>
                        <Badge variant="secondary" className="text-[8px]">
                          {post.category}
                        </Badge>
                      </div>

                      <h2 className="font-pixel text-[13px] text-[#FFFFFF] leading-relaxed tracking-wider hover:text-[#B0B0B0] transition-colors">
                        {post.title}
                      </h2>

                      <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="font-pixel text-[8px] text-[#808080] tracking-wider">
                            #{tag.toLowerCase()}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 border-t-[2px] border-[#333] mt-2 flex items-center gap-2 font-pixel text-[9px] text-[#FFFFFF] hover:text-[#808080] transition-colors tracking-wider group/btn">
                        [ READ FULL ARTICLE ]
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-150">
                          →
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}