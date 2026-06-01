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
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-2" style={{fontFamily: 'Inter'}}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#B0B0B0] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`h-1 bg-gradient-to-r from-[#FFFFFF] to-[#808080] rounded-full mt-4 ${centered ? 'mx-auto w-20' : 'w-20'}`} />
    </div>
  );
}
