import React, { useRef, useEffect } from 'react';

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

const MarqueeSection = React.memo(function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let frameId = 0;

    const updateTransform = () => {
      const section = sectionRef.current;
      if (!section || !row1Ref.current || !row2Ref.current) {
        ticking = false;
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;

      // Scroll offset calculation: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      
      row1Ref.current.style.transform = `translate3d(${calculatedOffset - 200}px, 0px, 0px)`;
      row2Ref.current.style.transform = `translate3d(${-(calculatedOffset - 200)}px, 0px, 0px)`;
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        frameId = window.requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set starting position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
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
            ref={row1Ref}
            className="flex flex-row gap-3"
            style={{
              transform: `translate3d(-200px, 0px, 0px)`,
              willChange: 'transform',
              width: 'max-content',
            }}
          >
            {row1Tripled.map((id, i) => (
              <div
                key={`r1-${i}`}
                className="w-[480px] h-[270px] rounded-2xl border-2 border-[#D7E2EA]/10 bg-black hover:border-[#D7E2EA]/30 transition-all duration-300 shrink-0 select-none pointer-events-none overflow-hidden"
              >
                <img 
                  src={id} 
                  alt="Portfolio Project" 
                  className="w-full h-full object-contain" 
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div className="w-full overflow-hidden">
          <div
            ref={row2Ref}
            className="flex flex-row gap-3"
            style={{
              transform: `translate3d(200px, 0px, 0px)`,
              willChange: 'transform',
              width: 'max-content',
            }}
          >
            {row2Tripled.map((id, i) => (
              <div
                key={`r2-${i}`}
                className="w-[480px] h-[270px] rounded-2xl border-2 border-[#D7E2EA]/10 bg-black hover:border-[#D7E2EA]/30 transition-all duration-300 shrink-0 select-none pointer-events-none overflow-hidden"
              >
                <img 
                  src={id} 
                  alt="Portfolio asset" 
                  className="w-full h-full object-cover" 
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default MarqueeSection;