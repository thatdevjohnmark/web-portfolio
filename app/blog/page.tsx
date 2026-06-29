'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import HeroHeader from '../components/ui/HeroHeader';
import SectionLabel from '../components/ui/SectionLabel';
import Badge from '../components/ui/Badge';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'QA & Testing', 'Development', 'Engineering'];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="INSIGHT_FEED"
        title="[ BLOG ]"
        description="Thoughts on software quality, full-stack engineering, and the evolving tech landscape."
      />

      {/* ════════════ ARTICLES ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionLabel number="01" label="ARTICLES" />
          </motion.div>

          {/* Category filter */}
          <div className="mb-12 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-pixel text-[10px] tracking-wider transition-colors duration-150 border-[2px] cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                    : 'border-[#333] bg-[#0A0A0A] text-[#B0B0B0] hover:text-[#FFFFFF] hover:border-[#808080]'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Blog feed */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-8"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#808080] transition-colors duration-150">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 font-pixel text-[9px] text-[#B0B0B0] tracking-wider">
                          <span>{post.date}</span>
                          <span className="text-[#333]">|</span>
                          <span>{post.readTime}</span>
                        </div>
                        <Badge variant="secondary" className="text-[9px]">
                          {post.category}
                        </Badge>
                      </div>

                      <h2 className="font-pixel text-[13px] text-[#FFFFFF] leading-relaxed tracking-wider hover:text-[#B0B0B0] transition-colors">
                        {post.title}
                      </h2>

                      <p className="font-terminal text-[18px] text-[#B0B0B0] leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="font-pixel text-[9px] text-[#808080] tracking-wider">
                            #{tag.toLowerCase()}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 border-t-[2px] border-[#333] flex items-center gap-2 font-pixel text-[10px] text-[#FFFFFF] hover:text-[#808080] transition-colors tracking-wider">
                        [ READ FULL ARTICLE ]
                        <span className="group-hover:translate-x-1 transition-transform duration-150">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
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
