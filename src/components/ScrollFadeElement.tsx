import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollFadeElementProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'h1' | 'h2' | 'div';
}

export default function ScrollFadeElement({ children, className = '', id, as = 'h2' }: ScrollFadeElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of the element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate the opacity curve:
  // - Entering from bottom (0.0 -> 0.35): fades in from 0.85 (highly visible & bright) to 1.0 (maximum brightness)
  // - In viewport middle focus area (0.35 -> 0.65): stays fully bright at 1.0
  // - Exiting towards top (0.65 -> 0.95): fades down from 1.0 to 0.85 (remains highly visible & bright)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 0.95],
    [0.85, 1, 1, 0.85]
  );

  let Component: any = motion.h2;
  if (as === 'h1') {
    Component = motion.h1;
  } else if (as === 'div') {
    Component = motion.div;
  }

  return (
    <div ref={containerRef} className="w-full overflow-visible">
      <Component
        id={id}
        style={{ 
          opacity,
          willChange: 'opacity',
        }}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
}
