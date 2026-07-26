import React from 'react';
import { motion } from 'motion/react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: any; // e.g. 'div', 'h1', 'p', 'span'
  className?: string;
  id?: string;
  key?: React.Key;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
  id,
}: FadeInProps) {
  // Use static motion elements to prevent recreating component types and causing unmounts/layout shifts on every render
  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </Component>
  );
}
