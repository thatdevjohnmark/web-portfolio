import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
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
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 cursor-pointer';
  
  const variants = {
    primary: 'bg-[#FFFFFF] text-[#000000] hover:bg-[#E0E0E0] shadow-md hover:shadow-lg',
    secondary: 'bg-[#333333] text-[#FFFFFF] hover:bg-[#505050] shadow-md hover:shadow-lg font-semibold',
    outline: 'border-2 border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF]/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
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
