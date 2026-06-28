import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'pixel';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'primary',
  className = ''
}: BadgeProps) {
  const variants = {
    primary: 'bg-[#FFFFFF]/20 text-[#FFFFFF] border border-white/30',
    secondary: 'bg-[#808080]/20 text-[#B0B0B0] border border-[#555]',
    success: 'bg-[#666666]/20 text-[#999999] border border-[#555]',
    warning: 'bg-[#999999]/20 text-[#CCCCCC] border border-[#666]',
    pixel: 'bg-[#000] text-[#FFF] border-[2px] border-[#FFF] shadow-[2px_2px_0_#808080]',
  };

  return (
    <span
      className={`
        inline-block px-3 py-1 text-[11px] font-pixel tracking-wider uppercase
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
