import React, { useRef, useState, useEffect } from 'react';

const ROW_1_IMAGES = [
  '/certificates/project1.jpeg',
  '/certificates/project2.jpeg',
  '/certificates/project3.jpeg',
];

const ROW_2_IMAGES = [
  '/certificates/project5.jpeg',
  '/certificates/project6.jpeg',
  '/certificates/project7.jpeg',
];

// Tripling the images for a seamless scrolling effect
const row1Tripled = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
const row2Tripled = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;

      // Scroll offset calculation: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set starting position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: Moves RIGHT on scroll */}
        <div className="w-full overflow-hidden">
          <div
            className="flex flex-row gap-3"
            style={{
              transform: `translate3d(${offset - 200}px, 0px, 0px)`,
              willChange: 'transform',
              width: 'max-content',
            }}
          >
            {row1Tripled.map((id, i) => (
              <div
                key={`r1-${i}`}
                id={`${id}-${i}`}
                className="w-[480px] h-[270px] rounded-2xl border-2 border-[#D7E2EA]/10 bg-black hover:border-[#D7E2EA]/30 transition-all duration-300 shrink-0 select-none pointer-events-none overflow-hidden"
              >
                <img src={id} alt="Portfolio Project" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div className="w-full overflow-hidden">
          <div
            className="flex flex-row gap-3"
            style={{
              transform: `translate3d(${-(offset - 200)}px, 0px, 0px)`,
              willChange: 'transform',
              width: 'max-content',
            }}
          >
            {row2Tripled.map((id, i) => (
              <div
                key={`r2-${i}`}
                id={`${id}-${i}`}
                className="w-[480px] h-[270px] rounded-2xl border-2 border-[#D7E2EA]/10 bg-black hover:border-[#D7E2EA]/30 transition-all duration-300 shrink-0 select-none pointer-events-none overflow-hidden"
              >
                <img src={id} alt="Portfolio asset" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}