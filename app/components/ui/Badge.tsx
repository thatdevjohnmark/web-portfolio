import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'primary',
  className = ''
}: BadgeProps) {
  const variants = {
    primary: 'bg-[#FFFFFF]/20 text-[#FFFFFF]',
    secondary: 'bg-[#808080]/20 text-[#B0B0B0]',
    success: 'bg-[#666666]/20 text-[#999999]',
    warning: 'bg-[#999999]/20 text-[#CCCCCC]'
  };

  return (
    <span
      className={`
        inline-block px-3 py-1 rounded-full text-sm font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
