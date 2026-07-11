'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import HeroHeader from '../components/ui/HeroHeader';
import Badge from '../components/ui/Badge';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: '1',
    slug: 'future-of-qa-automation',
    title: 'The Future of QA Automation in a Generative AI World',
    excerpt:
      'Exploring how LLMs are reshaping the landscape of automated testing and what it means for traditional QA engineers.',
    date: 'Oct 24, 2023',
    readTime: '6 min read',
    category: 'QA & Testing',
    tags: ['AI', 'Automation', 'Software-Quality'],
  },
  {
    id: '2',
    slug: 'mastering-framer-motion',
    title: 'Mastering Framer Motion for Industrial UI Apps',
    excerpt:
      'A deep dive into creating performant, meaningful animations for complex data dashboards and enterprise tools.',
    date: 'Sep 12, 2023',
    readTime: '12 min read',
    category: 'Development',
    tags: ['React', 'Animation', 'UX'],
  },
  {
    id: '3',
    slug: 'clean-code-validation',
    title: 'Clean Code: Beyond the Linter',
    excerpt:
      'Structural validation techniques that ensure your codebase remains scalable and maintainable over years of iteration.',
    date: 'Aug 05, 2023',
    readTime: '8 min read',
    category: 'Engineering',
    tags: ['Best-Practices', 'TypeScript', 'Architecture'],
  },
];

// ── per-card cursor glow ───────────────────────────────────────────────────
function BlogCard({ post }: { post: typeof blogPosts[number] }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    gsap.to(glow, {
      x: e.clientX - rect.left - 150,
      y: e.clientY - rect.top  - 150,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleEnter = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(innerRef.current, { y: -3, duration: 0.35, ease: 'power2.out' });
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(innerRef.current, { y: 0, duration: 0.45, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('mousemove',  handleMove  as EventListener);
    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove',  handleMove  as EventListener);
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleEnter, handleLeave]);

  return (
    <div
      ref={cardRef}
      className="blog-card relative overflow-hidden cursor-default"
      style={{ willChange: 'clip-path, opacity' }}
    >
      {/* cursor glow spot */}
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
          willChange: 'transform, opacity',
        }}
      />

      <Link href={`/blog/${post.slug}`}>
        <div
          ref={innerRef}
          className="relative z-10 border-[3px] border-[#333] bg-[#1A1A1A] p-6 lg:p-8 hover:border-[#555] transition-colors duration-200"
          style={{ willChange: 'transform' }}
        >
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
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-pixel text-[9px] text-[#808080] tracking-wider"
                >
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t-[2px] border-[#333] flex items-center gap-2 font-pixel text-[10px] text-[#FFFFFF] hover:text-[#808080] transition-colors tracking-wider">
              [ READ FULL ARTICLE ]
              <span>→</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'QA & Testing', 'Development', 'Engineering'];
  const pageRef    = useRef<HTMLElement>(null);
  const feedRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const filterRef  = useRef<HTMLDivElement>(null);

  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  // ── initial scroll reveals ───────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.from(labelRef.current, {
        opacity: 0, y: 24, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(ruleRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' } }
      );

      if (!prefersReduced && filterRef.current) {
        gsap.from(Array.from(filterRef.current.children), {
          opacity: 0, y: 14, duration: 0.45, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: filterRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── re-animate feed on filter change ────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const cards = feedRef.current?.querySelectorAll('.blog-card');
      if (!cards || !cards.length) return;

      // outgoing: clip-path up
      gsap.fromTo(
        Array.from(cards),
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, feedRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <main ref={pageRef} className="min-h-screen bg-[#000000]">
      <Navbar />

      <HeroHeader
        badge="INSIGHT_FEED"
        title="[ BLOG ]"
        description="Thoughts on software quality, full-stack engineering, and the evolving tech landscape."
      />

      {/* ════════════ ARTICLES ════════════ */}
      <section className="py-20 lg:py-28 bg-[#000000]">
        <Container>

          {/* Section label */}
          <div ref={labelRef} className="mb-12">
            <div className="flex items-baseline gap-5 mb-4">
              <span
                className="font-pixel text-[#1A1A1A] select-none leading-none shrink-0"
                style={{ fontSize: 'clamp(56px, 10vw, 112px)', lineHeight: 1 }}
                aria-hidden="true"
              >
                01
              </span>
              <h2
                className="font-pixel text-[#FFFFFF] tracking-wider"
                style={{ fontSize: 'clamp(14px, 2.5vw, 22px)' }}
              >
                ARTICLES
              </h2>
            </div>
            <div ref={ruleRef} className="h-[2px] w-full bg-gradient-to-r from-[#555] via-[#333] to-transparent" />
          </div>

          {/* Category filter */}
          <div ref={filterRef} className="mb-12 flex flex-wrap gap-3">
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
          <div ref={feedRef} className="space-y-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
