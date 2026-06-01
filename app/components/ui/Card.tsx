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
        bg-[#1A1A1A] rounded-lg shadow-md p-6 border border-[#333333]
        ${hover ? 'hover:shadow-lg hover:border-[#FFFFFF]/30 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
