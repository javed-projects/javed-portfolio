import React from 'react';

interface LiveProjectButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
}

export default function LiveProjectButton({ onClick, href, className = '', label = 'Live Project' }: LiveProjectButtonProps) {
  const commonClassNames = `
    inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest
    transition-all duration-300 ease-out hover:bg-[#D7E2EA]/10 active:scale-95 cursor-pointer
    px-8 py-3 sm:px-10 sm:py-3.5
    text-sm sm:text-base
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={commonClassNames}>
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={commonClassNames}>
      {label}
    </button>
  );
}
