import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-[#1A1A1A] border-[3px] border-[#333333] p-6
        shadow-[4px_4px_0_#333333]
        ${hover ? 'hover:border-[#808080] hover:shadow-[6px_6px_0_#555] hover:-translate-y-[2px] transition-[border-color,box-shadow,transform] duration-150' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
