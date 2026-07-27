import React, { useRef, useEffect, useMemo } from 'react';
import { useScroll } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  id?: string;
}

export default function AnimatedText({ text, className = "", id }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = useMemo(() => text.split(' '), [text]);
  const totalChars = text.length;

  // Track global character index to keep animation synchronized perfectly
  let charCounter = 0;

  // Sync scroll progress to a parent CSS custom property
  useEffect(() => {
    if (!scrollYProgress) return;
    
    const updateProgress = (latest: number) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--scroll-progress', latest.toFixed(4));
      }
    };

    // Try modern .on('change', ...)
    let unsubscribe: () => void;
    if (typeof scrollYProgress.on === 'function') {
      unsubscribe = scrollYProgress.on('change', updateProgress);
    } else if (typeof scrollYProgress.onChange === 'function') {
      // Fallback to older .onChange(...)
      unsubscribe = (scrollYProgress as any).onChange(updateProgress);
    } else {
      return;
    }

    // Set initial value
    updateProgress(scrollYProgress.get());

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <p
      ref={containerRef}
      id={id}
      className={`relative text-center leading-relaxed text-[#D7E2EA] font-medium max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] ${className}`}
      style={{
        wordBreak: 'normal',
        overflowWrap: 'normal',
        whiteSpace: 'normal',
        ['--scroll-progress' as any]: '0'
      }}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const startIndex = charCounter;
        charCounter += wordChars.length;

        const renderSpace = wordIndex < words.length - 1;
        if (renderSpace) {
          charCounter += 1; // Increment for the space character to preserve global timing
        }

        return (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((char, charIndex) => (
                <Character
                  key={charIndex}
                  char={char}
                  index={startIndex + charIndex}
                  total={totalChars}
                />
              ))}
            </span>
            {renderSpace && " "}
          </React.Fragment>
        );
      })}
    </p>
  );
}

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  key?: React.Key;
}

const Character = React.memo(function Character({
  char,
  index,
  total,
}: CharacterProps) {
  // Map index to a portion of scroll space
  // We use a small window size so that characters fade in progressively,
  // creating a beautiful wave effect.
  const windowSize = Math.max(2, Math.floor(total * 0.15)); // 15% of the total length
  const start = (index / total) * 0.85; // leave some buffer at the end
  const end = Math.min(1, start + (windowSize / total));

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="invisible select-none" aria-hidden="true">{char}</span>
      <span
        style={{
          ['--start' as any]: start.toFixed(4),
          ['--end' as any]: end.toFixed(4),
          opacity: 'clamp(0.2, calc(0.2 + 0.8 * (var(--scroll-progress, 0) - var(--start)) / (var(--end) - var(--start))), 1)',
        }}
        className="absolute left-0 top-0 select-none"
      >
        {char}
      </span>
    </span>
  );
});