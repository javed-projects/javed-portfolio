import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';
import ScrollFadeElement from './ScrollFadeElement';

// High-fidelity handcrafted SVG logos for premium vector sharpness
const PythonLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <path d="M11.93 2c-2.45.02-4.8.18-5.32.48-1.12.6-1.12 1.83-1.12 1.83l.03 2.15h6.46V7.6H4.26S2.14 7.23 2.14 11.6c0 4.14 1.86 4.3 1.86 4.3l1.83-.02v-2.58c0-2.3 2.1-4.3 4.3-4.3h6.35s2.1-.12 2.1-2.14V4.3s-.1-2.14-2.13-2.28C15.24 2.04 13.43 2 11.93 2z" fill="#3776AB" />
    <path d="M12.07 22c2.45-.02 4.8-.18 5.32-.48 1.12-.6 1.12-1.83 1.12-1.83l-.03-2.15h-6.46V16.4h7.72s2.12.37 2.12-4c0-4.14-1.86-4.3-1.86-4.3l-1.83.02v2.58c0 2.3-2.1 4.3-4.3 4.3H7.5s-2.1.12-2.1 2.14V19.7s.1 2.14 2.13 2.28c1.22.14 3.03.18 4.54.02z" fill="#FFE052" />
    <circle cx="8.3" cy="5.1" r="0.8" fill="#fff" />
    <circle cx="15.7" cy="18.9" r="0.8" fill="#111" />
  </svg>
);

const SqlLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <path d="M20 18c0 2.2-3.6 4-8 4s-8-1.8-8-4v-4h16v4zm0-6c0 2.2-3.6 4-8 4s-8-1.8-8-4V8h16v4zm0-6c0 2.2-3.6 4-8 4s-8-1.8-8-4V4c0-2.2 3.6-4 8-4s8 1.8 8 4v2z" fill="url(#sql-grad)" />
    <ellipse cx="12" cy="4" rx="8" ry="2" fill="#00E5FF" opacity="0.6" />
    <ellipse cx="12" cy="10" rx="8" ry="2" fill="#00E5FF" opacity="0.4" />
    <ellipse cx="12" cy="16" rx="8" ry="2" fill="#00E5FF" opacity="0.4" />
    <defs>
      <linearGradient id="sql-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#29B6F6" />
        <stop offset="100%" stopColor="#0288D1" />
      </linearGradient>
    </defs>
  </svg>
);

const ExcelLogo = () => (
  <svg viewBox="0 0 48 48" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <path d="M26 4H8C5.8 4 4 5.8 4 8v32c0 2.2 1.8 4 4 4h18c2.2 0 4-1.8 4-4V8c0-2.2-1.8-4-4-4z" fill="#107C41" />
    <rect x="10" y="10" width="14" height="28" fill="#0A5C30" opacity="0.4" />
    <line x1="10" y1="17" x2="24" y2="17" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
    <line x1="10" y1="24" x2="24" y2="24" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
    <line x1="10" y1="31" x2="24" y2="31" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
    <line x1="17" y1="10" x2="17" y2="38" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
    <path d="M16 12h24c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H16c-1.1 0-2-.9-2-2V14c0-1.1.9-2 2-2z" fill="#21A366" />
    <text x="24" y="29" fill="#FFFFFF" fontSize="20" fontFamily="Inter, sans-serif" fontWeight="bold">X</text>
  </svg>
);

const PowerBiLogo = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <rect x="22" y="4" width="6" height="24" rx="1" fill="#E27602" />
    <rect x="13" y="10" width="6" height="18" rx="1" fill="#F2A104" />
    <rect x="4" y="16" width="6" height="12" rx="1" fill="#F2C811" />
  </svg>
);

const TableauLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <path d="M50 35 v30 M35 50 h30" stroke="#E15759" strokeWidth="6" strokeLinecap="round" />
    <path d="M72 32 v16 M64 40 h16" stroke="#76B7B2" strokeWidth="4" strokeLinecap="round" />
    <path d="M28 68 v16 M20 76 h16" stroke="#59A14F" strokeWidth="4" strokeLinecap="round" />
    <path d="M28 32 v16 M20 40 h16" stroke="#4E79A7" strokeWidth="4" strokeLinecap="round" />
    <path d="M72 68 v16 M64 76 h16" stroke="#EDC948" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const SapLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <path d="M5 25 h90 L75 75 h-60 Z" fill="#004085" />
    <text x="46" y="56" fill="#FFFFFF" fontSize="20" fontFamily="'Inter', sans-serif" fontWeight="900" textAnchor="middle">SAP</text>
    <rect x="18" y="64" width="46" height="4" fill="#FFC107" />
    <text x="50" y="86" fill="#FFC107" fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">S/4HANA</text>
  </svg>
);

const CognosLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <text x="50" y="42" fill="#052FAD" fontSize="24" fontFamily="'Inter', sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="1">IBM</text>
    <line x1="15" y1="24" x2="85" y2="24" stroke="#0C0C0C" strokeWidth="2" />
    <line x1="15" y1="29" x2="85" y2="29" stroke="#0C0C0C" strokeWidth="2" />
    <line x1="15" y1="34" x2="85" y2="34" stroke="#0C0C0C" strokeWidth="2" />
    <line x1="15" y1="39" x2="85" y2="39" stroke="#0C0C0C" strokeWidth="2" />
    <line x1="15" y1="44" x2="85" y2="44" stroke="#0C0C0C" strokeWidth="2" />
    <polygon points="50,52 75,64 75,88 50,100 25,88 25,64" fill="none" stroke="#00D2FF" strokeWidth="2" />
    <rect x="37" y="74" width="6" height="12" fill="#00D2FF" rx="1" />
    <rect x="47" y="66" width="6" height="20" fill="#00D2FF" rx="1" />
    <rect x="57" y="58" width="6" height="28" fill="#00D2FF" rx="1" />
  </svg>
);

const PandasLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <circle cx="30" cy="35" r="14" fill="#151935" />
    <circle cx="70" cy="35" r="14" fill="#151935" />
    <circle cx="50" cy="55" r="30" fill="#FFFFFF" stroke="#151935" strokeWidth="4" />
    <ellipse cx="38" cy="55" rx="10" ry="12" fill="#012A4A" transform="rotate(-15 38 55)" />
    <ellipse cx="62" cy="55" rx="10" ry="12" fill="#FF9F1C" transform="rotate(15 62 55)" />
    <circle cx="40" cy="54" r="3" fill="#FFFFFF" />
    <circle cx="60" cy="54" r="3" fill="#FFFFFF" />
    <polygon points="46,65 54,65 50,70" fill="#151935" />
  </svg>
);

const NumpyLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <path d="M50 20 L75 35 L50 50 L25 35 Z" fill="#4DABF7" />
    <path d="M25 35 L50 50 L50 80 L25 65 Z" fill="#1C7ED6" />
    <path d="M50 50 L75 35 L75 65 L50 80 Z" fill="#1864AB" />
    <path d="M50 20 L62.5 12.5 L50 5 L37.5 12.5 Z" fill="#FFA94D" />
    <path d="M37.5 12.5 L50 20 L50 35 L37.5 27.5 Z" fill="#FD7E14" />
    <path d="M50 20 L62.5 12.5 L62.5 27.5 L50 35 Z" fill="#E8590C" />
  </svg>
);

const MatplotlibLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300">
    <rect x="15" y="15" width="70" height="70" rx="6" fill="#111" stroke="#333" strokeWidth="1" />
    <line x1="15" y1="50" x2="85" y2="50" stroke="#444" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="50" y1="15" x2="50" y2="85" stroke="#444" strokeWidth="1" strokeDasharray="3,3" />
    <path d="M 15 50 Q 32.5 20, 50 50 T 85 50" fill="none" stroke="#FF529E" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="30" cy="35" r="3.5" fill="#00D2FF" />
    <circle cx="45" cy="65" r="3.5" fill="#00FF66" />
    <circle cx="65" cy="30" r="3.5" fill="#FFC107" />
    <circle cx="75" cy="60" r="3.5" fill="#E15759" />
  </svg>
);

interface SkillItem {
  name: string;
  logo: React.ReactNode;
  glowColor: string;
}

export default function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skills: SkillItem[] = [
    { name: "Python", logo: <PythonLogo />, glowColor: "shadow-[#3776AB]/45" },
    { name: "SQL", logo: <SqlLogo />, glowColor: "shadow-[#00D2FF]/45" },
    { name: "Microsoft Excel", logo: <ExcelLogo />, glowColor: "shadow-[#107C41]/45" },
    { name: "Power BI", logo: <PowerBiLogo />, glowColor: "shadow-[#F2A104]/45" },
    { name: "Tableau", logo: <TableauLogo />, glowColor: "shadow-[#76B7B2]/45" },
    { name: "SAP S/4HANA FICO", logo: <SapLogo />, glowColor: "shadow-[#004085]/45" },
    { name: "IBM Cognos Analytics", logo: <CognosLogo />, glowColor: "shadow-[#00D2FF]/45" },
    { name: "Pandas", logo: <PandasLogo />, glowColor: "shadow-[#FF9F1C]/45" },
    { name: "NumPy", logo: <NumpyLogo />, glowColor: "shadow-[#1C7ED6]/45" },
    { name: "Matplotlib", logo: <MatplotlibLogo />, glowColor: "shadow-[#FF529E]/45" },
  ];

  // Dynamic displacement calculations for a physical elastic overlap effect
  const getDisplacement = (index: number) => {
    if (hoveredIndex === null) return { x: 0, y: 0 };
    
    if (index === hoveredIndex) {
      return { x: 0, y: -20 };
    }

    const distance = index - hoveredIndex;
    const direction = distance > 0 ? 1 : -1;
    const absDistance = Math.abs(distance);

    let xDisplacement = 0;
    if (absDistance === 1) xDisplacement = direction * 36;
    else if (absDistance === 2) xDisplacement = direction * 18;
    else xDisplacement = direction * 6;

    return { x: xDisplacement, y: 0 };
  };

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.3;
    if (distance === 1) return 1.1;
    if (distance === 2) return 1.02;
    return 0.92;
  };

  const getZIndex = (index: number) => {
    if (hoveredIndex === null) return index + 10;
    if (index === hoveredIndex) return 100;
    const distance = Math.abs(index - hoveredIndex);
    return 90 - distance;
  };

  const getTooltipX = (index: number) => {
    if (index === 0) return "-15%";
    if (index === 1) return "-30%";
    if (index === skills.length - 1) return "-85%";
    if (index === skills.length - 2) return "-70%";
    return "-50%";
  };

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center bg-transparent px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden select-none border-t border-[#D7E2EA]/5"
    >
      {/* Accent ambient backlighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF529E]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Grid Wrapper */}
      <div className="max-w-5xl w-full z-10 flex flex-col items-center">
        {/* Title Container */}
        <div className="text-center mb-12 sm:mb-16">
          <FadeIn delay={0} y={40} as="div" className="w-full">
            <ScrollFadeElement className="hero-heading font-black uppercase leading-[1.1] tracking-normal text-[clamp(3rem,10vw,120px)] text-[#D7E2EA]">
              Skills
            </ScrollFadeElement>
          </FadeIn>
        </div>

        {/* Dynamic Skill Showcase Container */}
        <div className="relative w-full h-44 sm:h-52 flex items-center justify-center mt-2">
          
          {/* Interactive Compact Stack */}
          <div 
            className="flex items-center justify-center w-full max-w-3xl px-4 flex-nowrap"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {skills.map((skill, index) => {
              const scale = getScale(index);
              const { x: translateX, y: translateY } = getDisplacement(index);
              const zIndex = getZIndex(index);
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={index}
                  className="relative cursor-pointer select-none -mx-[22px] sm:-mx-[30px]"
                  animate={{
                    x: translateX,
                    y: translateY,
                    scale: scale,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                    mass: 0.5
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onTouchStart={() => setHoveredIndex(index)}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, x: getTooltipX(index), scale: 0.8 }}
                        animate={{ opacity: 1, y: -10, x: getTooltipX(index), scale: 1 }}
                        exit={{ opacity: 0, y: 10, x: getTooltipX(index), scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 450, damping: 22 }}
                        className="absolute bottom-full left-1/2 mb-4 bg-[#121212]/95 border border-[#FF529E]/40 text-[#D7E2EA] px-3.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-[0_12px_28px_rgba(255,82,158,0.25)] whitespace-nowrap z-[110] flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-[#FF529E] rounded-full relative flex items-center justify-center shrink-0">
                          <span className="absolute w-full h-full bg-[#FF529E] rounded-full animate-ping opacity-75" />
                        </div>
                        <span className="px-0.5">{skill.name}</span>
                        <div className="w-1.5 h-1.5 bg-[#FF529E] rounded-full relative flex items-center justify-center shrink-0">
                          <span className="absolute w-full h-full bg-[#FF529E] rounded-full animate-ping opacity-75" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`
                    w-14 h-14 sm:w-16 sm:h-16 rounded-full 
                    bg-white/[0.04] border-2 border-white/[0.12]
                    flex items-center justify-center p-2.5 sm:p-3
                    transition-all duration-300
                    shadow-[0_8px_24px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.05)]
                    ${isHovered ? `bg-white/[0.14] border-[#FF529E]/60 shadow-[0_20px_40px_rgba(255,82,158,0.35)] ${skill.glowColor}` : 'hover:bg-white/[0.07] hover:border-white/[0.18]'}
                  `}>
                    <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                      {skill.logo}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Decorative subtle dynamic line below */}
        <div className="mt-8 flex items-center gap-1.5 opacity-20 hover:opacity-40 transition-opacity duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]" />
          <span className="w-8 h-[1px] bg-[#D7E2EA]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]" />
        </div>
      </div>
    </section>
  );
}