"use client";
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrollFadeElement from './ScrollFadeElement';
import SocialFlipButton from './SocialFlipButton';
import FadeIn from './FadeIn';
import { Boxes } from '@/components/ui/background-boxes';
import { StarsBackground } from '@/components/ui/stars-background';
import { ShootingStars } from '@/components/ui/shooting-stars';

export default function ContactSection() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-12 pt-24 pb-16 sm:pt-32 sm:pb-24 relative z-30 border-t border-[#D7E2EA]/10 overflow-hidden min-h-[50vh]"
    >
      {/* 1. Static Star Field Canvas Background */}
      <StarsBackground className="z-0 opacity-70" />

      {/* 2. Background 3D Grid Boxes Effect */}
      <Boxes className="z-0" />

      {/* 3. Meteor Shower Effect */}
      <ShootingStars className="pointer-events-none z-10 opacity-90" />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 w-full h-full bg-[#0C0C0C]/40 z-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_65%,white_100%)] opacity-80" />

      {/* Main Content Stack */}
      <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-[50vh] gap-16 relative z-20 pointer-events-none">
        <div className="flex flex-col items-start text-left gap-12 pt-8">
          <FadeIn delay={0} y={30} as="div" className="w-full text-left flex flex-col items-start pl-4 sm:pl-10 md:pl-16">
            <ScrollFadeElement className="hero-heading font-black uppercase text-[clamp(2.5rem,7vw,90px)] leading-[1.1] tracking-normal text-left">
              LET&apos;S WORK<br />TOGETHER
            </ScrollFadeElement>
            <p className="text-[#D7E2EA]/60 font-light mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-left pointer-events-auto">
              If my work caught your attention, let&apos;s start a conversation. Whether it&apos;s an opportunity, a new challenge, or simply an exchange of ideas, I&apos;d be glad to connect and explore what&apos;s possible.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} y={30} as="div" className="w-full flex justify-start pl-4 sm:pl-10 md:pl-16 pointer-events-auto">
            <div className="flex flex-col gap-2 items-start text-left">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40">Primary Email</span>
              <a
                href="mailto:mdj32807@gmail.com"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D7E2EA] hover:text-[#B600A8] transition-colors duration-300 flex items-center justify-start gap-3"
              >
                mdj32807@gmail.com
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 opacity-60" />
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2 mt-4">
          <FadeIn delay={0.25} y={15} as="div" className="w-full text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/40 font-semibold block">
              Let&apos;s Connect
            </span>
          </FadeIn>

          <div className="w-full relative flex flex-col md:flex-row items-center justify-center min-h-[5rem]">
            <div className="flex justify-center items-center w-full pointer-events-auto">
              <SocialFlipButton className="!justify-center !p-0 mx-auto" />
            </div>

            <div className="w-full md:w-auto mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 flex justify-center pointer-events-auto">
              <FadeIn delay={0.35} y={20} as="div" className="shrink-0">
                <a
                  href="/Javed_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-block focus:outline-none cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-[#2D2D2D] translate-y-[8px] transition-all duration-100 group-hover:translate-y-[10px] group-active:translate-y-[2px] border-b border-black/40" />
                  <span className="relative block px-8 py-3 sm:px-10 sm:py-3.5 text-center text-[14px] sm:text-[16px] font-bold tracking-wider uppercase text-white bg-gradient-to-b from-[#FFAED7] to-[#FF529E] border border-white/20 rounded-md transition-all duration-100 translate-y-0 group-hover:-translate-y-[3px] group-active:translate-y-[6px] select-none shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.7),0_10px_20px_rgba(255,82,158,0.2)]">
                    CV
                  </span>
                </a>
              </FadeIn>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-[#D7E2EA]/10 flex flex-col gap-8">
          <FadeIn delay={0.3} y={20} as="div" className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#D7E2EA]/40">
            <span>&copy; {new Date().getFullYear()} JAVED. ALL RIGHTS RESERVED.</span>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 hover:text-[#D7E2EA] transition-colors duration-200 font-medium uppercase tracking-widest cursor-pointer pointer-events-auto"
            >
              Back to Top
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}