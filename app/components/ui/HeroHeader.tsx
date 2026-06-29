'use client';

import { motion } from 'framer-motion';
import Container from '../Container';

interface HeroHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export default function HeroHeader({ badge, title, description }: HeroHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-[#1A1A1A] bg-[#000000] py-20 lg:py-28">
      {/* Pixel grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 border-[2px] border-[#333] bg-[#0A0A0A] px-4 py-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-none bg-white opacity-50" />
              <span className="relative inline-flex h-3 w-3 bg-white" />
            </span>
            <span className="font-pixel text-[9px] text-[#B0B0B0] tracking-[0.15em]">
              {badge}
            </span>
          </div>

          <h1 className="font-pixel text-4xl md:text-6xl text-[#FFFFFF] tracking-wider mb-4 leading-relaxed">
            {title}
          </h1>
          <p className="font-terminal text-[20px] text-[#B0B0B0] max-w-2xl leading-relaxed">
            {description}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
