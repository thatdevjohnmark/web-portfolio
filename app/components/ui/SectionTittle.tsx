import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className = ''
}: SectionTitleProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-pixel text-[#FFFFFF] mb-3 tracking-wider uppercase leading-relaxed">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl font-terminal text-[#B0B0B0] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`h-[4px] bg-[#FFFFFF] mt-4 ${centered ? 'mx-auto w-16' : 'w-16'}`} />
      <div className={`h-[4px] bg-[#808080] mt-[4px] ${centered ? 'mx-auto w-8' : 'w-8'}`} />
    </div>
  );
}
