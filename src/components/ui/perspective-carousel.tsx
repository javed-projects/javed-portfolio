import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StarsBackground } from "./stars-background";
import { ShootingStars } from "./shooting-stars";

export interface PerspectiveCarouselItem {
  src?: string;
  image?: string;
  title: string;
  id?: string;
  category?: string;
  shortDesc?: string;
  color?: string;
  glowColor?: string;
  badgeText?: string;
  [key: string]: any;
}

export interface PerspectiveCarouselProps {
  items: PerspectiveCarouselItem[];
  defaultActiveIndex?: number;
  activeIndex?: number;
  onChangeActiveIndex?: (index: number) => void;
  onCardClick?: (index: number) => void;
  slideWidth?: number;
  className?: string;
}

export function PerspectiveCarousel({
  items = [],
  defaultActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onChangeActiveIndex,
  onCardClick,
  slideWidth = 240,
  className = "",
}: PerspectiveCarouselProps) {
  const [localActiveIndex, setLocalActiveIndex] = useState(defaultActiveIndex);
  const activeIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : localActiveIndex;

  const handleIndexChange = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= items.length) return;
    if (controlledActiveIndex === undefined) {
      setLocalActiveIndex(newIndex);
    }
    if (onChangeActiveIndex) {
      onChangeActiveIndex(newIndex);
    }
  };

  const handleCardClick = (index: number) => {
    console.log("Carousel: Card clicked", index, "current activeIndex", activeIndex);
    if (onCardClick) {
      console.log("Carousel: Calling onCardClick for index", index);
      onCardClick(index);
    }
    if (index !== activeIndex) {
      console.log("Carousel: Calling handleIndexChange for index", index);
      handleIndexChange(index);
    }
  };

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      handleIndexChange(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      handleIndexChange(activeIndex - 1);
    }
  };

  // Drag constraints & handlers
  const dragThreshold = 50;
  const onDragEnd = (_e: any, info: any) => {
    const offset = info.offset.x;
    if (offset < -dragThreshold) {
      handleNext();
    } else if (offset > dragThreshold) {
      handlePrev();
    }
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-between overflow-hidden py-6 px-4 select-none ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <StarsBackground className="opacity-50" />
        <ShootingStars className="pointer-events-none opacity-80" />
       
      </div>

      {/* 3D Track Viewport (dynamically sized to match the cards exactly to prevent any overflow or overlap) */}
      <div 
        className="relative w-full flex items-center justify-center z-10"
        style={{ 
          perspective: "1200px",
          height: `${slideWidth * 1.56}px`
        }}
      >
        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            
            // Calculate dynamic transforms to form a perfect C-curve facing inward
            // Matching user image exactly:
            // - Left side rotates clockwise around Y (rotateY > 0)
            // - Right side rotates counter-clockwise around Y (rotateY < 0)
            // - Center is flat (rotateY = 0)
            // We use rotateY, scale, and translateX, and omit deep translateZ to prevent browser 3D hit-testing bugs
            const rotateY = offset * -18; 
            const translateX = offset * (slideWidth * 0.72);
            const scale = 1 - Math.min(absOffset * 0.12, 0.35);
            const opacity = 1 - Math.min(absOffset * 0.25, 0.75);
            const zIndex = 100 - absOffset;
            const isActive = index === activeIndex;

            const imageSrc = item.src || item.image || "";

            return (
              <motion.div
                key={item.id || index}
                onClick={() => handleCardClick(index)}
                animate={{
                  x: translateX,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                  mass: 0.8,
                }}
                style={{
                  position: "absolute",
                  width: `${slideWidth}px`,
                  height: `${slideWidth * 1.50}px`,
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
                className={`group rounded-none overflow-hidden cursor-pointer shadow-2xl border transition-colors duration-500 bg-neutral-900 border-white/10 ${
                  isActive 
                    ? "shadow-white/5 ring-1 ring-white/10" 
                    : "hover:border-white/20"
                }`}
              >
                {/* Image and glossy overlay */}
                <div className="relative w-full h-full">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  />
                  
                  {/* Bottom category/gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />
                  
                  {/* Subtle neon glow reflecting item custom colors */}
                  {item.color && isActive && (
                    <div 
                      className="absolute inset-0 opacity-15 mix-blend-screen blur-xl pointer-events-none transition-opacity duration-500"
                      style={{ backgroundColor: item.color }}
                    />
                  )}

                  {/* Text Details overlay with subtle asymmetrical rightward padding shift */}
                  <div className="absolute bottom-0 left-0 right-0 pt-8 pb-3 pr-3 pl-5.5 sm:pb-3.5 sm:pr-3.5 sm:pl-7 md:pb-4 md:pr-4 md:pl-8 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                    {item.category && (
                      <span className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        {item.category}
                      </span>
                    )}
                    <h3 
                      className="text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-tight text-white leading-snug line-clamp-2"
                      style={{ wordBreak: 'normal', overflowWrap: 'normal', whiteSpace: 'normal' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls (positioned cleanly beneath the 3D cards viewport with safe spacing) */}
      <div className="relative z-10 flex items-center gap-4 mt-8 z-30">
        <div className="flex gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleIndexChange(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-neutral-800 dark:bg-neutral-200"
                  : "w-1.5 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
