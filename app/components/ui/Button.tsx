import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'pixel';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-pixel tracking-wider cursor-pointer transition-all duration-150 active:translate-y-[2px]';

  const variants = {
    primary: 'bg-[#FFFFFF] text-[#000000] hover:bg-[#E0E0E0] pixel-border-light',
    secondary: 'bg-[#333333] text-[#FFFFFF] hover:bg-[#505050] pixel-border',
    outline: 'border-[3px] border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF]/10',
    pixel: 'bg-[#FFFFFF] text-[#000000] pixel-border-light hover:shadow-[6px_6px_0_#808080] active:shadow-[2px_2px_0_#808080]',
  };

  const sizes = {
    sm: 'px-3 py-2 text-[10px]',
    md: 'px-5 py-3 text-[11px]',
    lg: 'px-8 py-4 text-[12px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
