"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Database
} from 'lucide-react';
import FadeIn from './FadeIn';
import { PerspectiveCarousel } from './ui/perspective-carousel';
import ScrollFadeElement from './ScrollFadeElement';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  color: string;
  glowColor: string;
  accentGrad: string;
  borderStyle: string;
  textGrad: string;
  badgeText: string;
}

const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: "IN PROGRESS",
    category: 'In Progress',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    color: '#00F2FE',
    glowColor: 'rgba(0, 242, 254, 0.45)',
    accentGrad: 'from-[#00F2FE]/20 to-[#4FACFE]/20',
    borderStyle: 'border-[#00F2FE]/30 group-hover:border-[#00F2FE]/80',
    textGrad: 'from-cyan-400 to-blue-400',
    badgeText: 'In Progress',
  },
  {
    id: 'project-2',
    title: "IN PROGRESS",
    category: 'In Progress',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    color: '#FF529E',
    glowColor: 'rgba(255, 82, 158, 0.45)',
    accentGrad: 'from-[#FF529E]/20 to-[#B600A8]/20',
    borderStyle: 'border-[#FF529E]/30 group-hover:border-[#FF529E]/80',
    textGrad: 'from-pink-400 to-purple-400',
    badgeText: 'In Progress',
  },
  {
    id: 'project-3',
    title: "IN PROGRESS",
    category: 'In Progress',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    color: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.45)',
    accentGrad: 'from-[#FFB800]/20 to-[#FF529E]/20',
    borderStyle: 'border-[#FFB800]/30 group-hover:border-[#FFB800]/80',
    textGrad: 'from-amber-400 to-orange-400',
    badgeText: 'In Progress',
  },
  {
    id: 'project-4',
    title: "IN PROGRESS",
    category: 'In Progress',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    color: '#8A2BE2',
    glowColor: 'rgba(138, 43, 226, 0.45)',
    accentGrad: 'from-[#8A2BE2]/20 to-[#4B0082]/20',
    borderStyle: 'border-[#8A2BE2]/30 group-hover:border-[#8A2BE2]/80',
    textGrad: 'from-violet-400 to-indigo-400',
    badgeText: 'In Progress',
  },
  {
    id: 'project-5',
    title: "IN PROGRESS",
    category: 'In Progress',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    color: '#00E676',
    glowColor: 'rgba(0, 230, 118, 0.45)',
    accentGrad: 'from-[#00E676]/20 to-[#00B0FF]/20',
    borderStyle: 'border-[#00E676]/30 group-hover:border-[#00E676]/80',
    textGrad: 'from-green-400 to-emerald-400',
    badgeText: 'In Progress',
  }
];

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dimensions, setDimensions] = useState({ cardWidth: 240, gap: 24 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newCardWidth = 240;
      let newGap = 24;

      if (width < 640) {
        newCardWidth = 140;
        newGap = 10;
      } else if (width < 1024) {
        newCardWidth = 200;
        newGap = 16;
      } else {
        newCardWidth = 240;
        newGap = 24;
      }

      setDimensions(prev => {
        if (
          prev.cardWidth === newCardWidth &&
          prev.gap === newGap
        ) {
          return prev;
        }

        return {
          cardWidth: newCardWidth,
          gap: newGap,
        };
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCardClick = useCallback((index: number) => {
    if (index === activeIndex) {
      setSelectedProject(PROJECTS[index]);
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  const carouselItems = useMemo(() => PROJECTS, []);

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-center bg-transparent px-0 pt-24 pb-24 sm:pt-32 sm:pb-32 overflow-hidden select-none border-t border-[#D7E2EA]/5"
    >
      <div className="w-full z-10 flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-10 w-full">
          <FadeIn delay={0} y={15} as="div" className="w-full">
            <ScrollFadeElement className="hero-heading font-black uppercase leading-[1.1] tracking-normal text-[clamp(3.5rem,11.5vw,165px)] text-[#D7E2EA] py-2">
              Projects
            </ScrollFadeElement>
          </FadeIn>
        </div>

        <div className="w-full max-w-5xl z-20 sm:px-6">
          <PerspectiveCarousel
            items={carouselItems}
            activeIndex={activeIndex}
            onChangeActiveIndex={setActiveIndex}
            onCardClick={handleCardClick}
            slideWidth={dimensions.cardWidth}
          />
        </div>

        <div className="text-center mt-2 h-10 flex flex-col items-center justify-center pointer-events-none px-6 z-20">
          <FadeIn delay={0} y={15} as="div">
            <p className="text-white/20 font-mono tracking-[0.2em] text-[10px] uppercase">
              Click the active project to preview.
            </p>
          </FadeIn>
        </div>

        <div className="mt-4" />
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/92 backdrop-blur-md transform-gpu"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.8 }}
              className="relative w-full max-w-[620px] bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 sm:p-8 z-10 flex flex-col items-center justify-center text-center shadow-[0_30px_70px_rgba(0,0,0,0.95)] max-h-[85vh] overflow-y-auto my-auto scrollbar-thin scrollbar-thumb-white/10 transform-gpu will-change-transform"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shrink-0 shadow-lg cursor-pointer transform-gpu"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center justify-center text-center my-auto py-6 w-full">
                <div 
                  className="w-auto max-w-full px-5 py-3 rounded-full bg-white/5 border border-white/10 mb-6 flex items-center justify-center shrink-0"
                  style={{ color: selectedProject.color }}
                >
                  <Database className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 mr-2 sm:mr-2.5" />
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider whitespace-nowrap">
                    {selectedProject.badgeText}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wider mb-4">
                  PROJECT IN PROGRESS
                </h3>

                <p className="text-white/80 text-sm sm:text-base font-light max-w-md leading-relaxed mb-2">
                  This project is currently under development and will be published after completion.
                </p>

                <p className="text-white/40 font-mono text-xs sm:text-sm tracking-wide">
                  Complete case study, dashboard and documentation will be available soon.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}