import React from 'react';

interface PillProps {
  text: string;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ text, className = '' }) => {
  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        bg-purple-100 text-purple-800
        hover:bg-purple-200
        transition-colors duration-200 ease-in-out
        ${className}
      `}
    >
      {text}
    </span>
  );
};

