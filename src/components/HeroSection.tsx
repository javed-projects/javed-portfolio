// src/components/HeroSection.tsx
import React, { useCallback } from 'react';
import ContactButton from './ContactButton';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ScrollFadeElement from './ScrollFadeElement';
import { StarsBackground } from './ui/stars-background';
import { ShootingStars } from './ui/shooting-stars';

const HeroSection = React.memo(function HeroSection() {
  const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-between overflow-x-clip bg-transparent select-none">
      {/* Fixed unified background layer to prevent multi-layered scrolling bugs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <StarsBackground className="opacity-70" />
        <ShootingStars className="pointer-events-none opacity-90" />
        <div className="absolute inset-0 bg-[#0C0C0C]/40" />
      </div>

      {/* Top Spacer to balance the layout since the Navbar is removed */}
      <div className="w-full pt-12 md:pt-16"></div>

      {/* 2. HERO PORTRAIT (Centered absolutely) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
        <div className="pointer-events-auto">
          <FadeIn delay={0.6} y={30} as="div">
            <Magnet
              strength={3}
              padding={150}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="w-[280px] sm:w-[360px] md:w-[450px] lg:w-[520px] h-auto"
            >
              <img
                src="/certificates/face.webp"
                alt="Javed - 3D Creator Portrait"
                className="w-full h-auto object-contain select-none pointer-events-none bg-transparent drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                width={1254}
                height={1254}
                style={{ imageRendering: 'auto' }}
              />
            </Magnet>
          </FadeIn>
        </div>
      </div>

      {/* 3. HERO HEADING */}
      <div className="flex-grow flex items-start sm:items-center justify-center pt-20 sm:pt-0 z-0">
        <div className="w-full overflow-visible text-center px-4">
          <FadeIn delay={0.15} y={40} as="div">
            <ScrollFadeElement as="h1" className="hero-heading font-black uppercase tracking-normal leading-none whitespace-nowrap w-full text-[11.5vw] sm:text-[12vw] md:text-[12.5vw] lg:text-[13vw] mt-6 sm:mt-4 md:-mt-5 -translate-y-16 sm:-translate-y-24 md:-translate-y-36 lg:-translate-y-44">
              Hi, i&apos;m javed
            </ScrollFadeElement>
          </FadeIn>
        </div>
      </div>

      {/* 4. BOTTOM BAR */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full gap-4 sm:gap-6">
          {/* Left Description */}
          <FadeIn delay={0.35} y={20} as="div" className="pl-4 sm:pl-12 md:pl-20 lg:pl-28">
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[280px] sm:max-w-[420px] md:max-w-[500px]">
              Aspiring data analytics: turning data into insight with SQL, Python, Excel, and BI.
            </p>
          </FadeIn>

          {/* Right Contact Button */}
          <FadeIn delay={0.4} y={20} as="div" className="shrink-0 self-start sm:self-end -translate-y-3 sm:-translate-y-6 -translate-x-3 sm:-translate-x-8">
            <a
              href="#contact"
              onClick={handleContactClick}
              className="relative group inline-block focus:outline-none cursor-pointer"
            >
              {/* Keyboard key 3D base depth shadow */}
              <span className="absolute inset-0 w-full h-full rounded-md bg-[#2D2D2D] translate-y-[8px] transition-all duration-100 group-hover:translate-y-[10px] group-active:translate-y-[2px] border-b border-black/40" />
              {/* Keyboard key top face */}
              <span className="relative block px-24 py-8 sm:px-32 sm:py-9 text-[14px] sm:text-[16px] font-bold tracking-wider uppercase text-white bg-gradient-to-b from-[#FFAED7] to-[#FF529E] border border-white/20 rounded-md transition-all duration-100 translate-y-0 group-hover:-translate-y-[3px] group-active:translate-y-[6px] select-none shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.7),0_10px_20px_rgba(255,82,158,0.2)]">
                Contact
              </span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;