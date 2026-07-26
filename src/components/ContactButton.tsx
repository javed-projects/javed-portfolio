import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function ContactButton({ onClick, href = '#contact', className = '' }: ContactButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
  };

  const commonClassNames = `
    inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest
    transition-all duration-300 ease-out active:scale-95 cursor-pointer
    px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
    text-xs sm:text-sm md:text-base
    outline-2 outline-white -outline-offset-3 hover:brightness-110 hover:shadow-[0px_6px_15px_rgba(181,1,167,0.4)]
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (href && !onClick) {
    return (
      <a href={href} onClick={handleClick} style={buttonStyle} className={commonClassNames}>
        Contact Me
      </a>
    );
  }

  return (
    <button onClick={handleClick} style={buttonStyle} className={commonClassNames}>
      Contact Me
    </button>
  );
}
