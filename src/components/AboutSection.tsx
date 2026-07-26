import React from 'react';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';
import FadeIn from './FadeIn';
import ScrollFadeElement from './ScrollFadeElement';

export default function AboutSection() {
  const bioText = "Hi, I'm MD Javed, an aspiring Data Analyst from the City of Joy, Kolkata. My journey started in finance, but playing with data is what I actually enjoy doing! Curiosity is what keeps me engaged—exploring data, discovering patterns, and turning complex info into simple insights. Every project I work on is a chance to learn, grow, and create something with purpose.";

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center bg-transparent px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden select-none"
    >
      {/* Decorative Corner Objects */}
      {/* 1. Moon Icon (Top Left) */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none select-none w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Decorative moon"
          className="w-full h-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* 2. 3D object (Bottom Left) */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 pointer-events-none select-none w-[100px] sm:w-[140px] md:w-[180px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Decorative crystal element"
          className="w-full h-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* 3. Lego icon (Top Right) */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 pointer-events-none select-none w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Decorative block element"
          className="w-full h-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* 4. 3D group (Bottom Right) */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 pointer-events-none select-none w-[130px] sm:w-[170px] md:w-[220px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="Decorative rings group"
          className="w-full h-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center max-w-4xl w-full z-10 text-center">
        {/* Title */}
        <FadeIn delay={0} y={40} as="div" className="mb-12 sm:mb-16 w-full">
          <ScrollFadeElement className="hero-heading font-black uppercase leading-[1.1] tracking-normal text-[clamp(3rem,12vw,160px)]">
            About me
          </ScrollFadeElement>
        </FadeIn>

        {/* Character Scroll Reveal Paragraph */}
        <div className="flex justify-center w-full px-4">
          <AnimatedText text={bioText} />
        </div>
      </div>
    </section>
  );
}