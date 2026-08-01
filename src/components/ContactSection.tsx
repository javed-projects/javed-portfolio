"use client";
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrollFadeElement from './ScrollFadeElement';
import SocialFlipButton from './SocialFlipButton';
import FadeIn from './FadeIn';
import { Boxes } from '@/components/ui/background-boxes';

export default function ContactSection() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="bg-transparent text-[#D7E2EA] px-6 md:px-12 pt-24 pb-16 sm:pt-32 sm:pb-24 relative z-30 border-t border-[#D7E2EA]/10 overflow-hidden min-h-[50vh]"
    >
      {/* Background 3D Grid Boxes Effect */}
      <Boxes className="z-0" />

      {/* Main Content Stack */}
      <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-[50vh] gap-16 relative z-20 pointer-events-none">
        <div className="flex flex-col items-start text-left gap-12 pt-8 pointer-events-none">
          <FadeIn delay={0} y={30} as="div" className="w-full text-left flex flex-col items-start pl-4 sm:pl-10 md:pl-16 pointer-events-none">
            <ScrollFadeElement className="hero-heading font-black uppercase text-[clamp(2.5rem,7vw,90px)] leading-[1.1] tracking-normal text-left">
              LET&apos;S WORK<br />TOGETHER
            </ScrollFadeElement>
            <p className="text-[#D7E2EA]/60 font-light mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-left pointer-events-none">
              If my work caught your attention, let&apos;s start a conversation. Whether it&apos;s an opportunity, a new challenge, or simply an exchange of ideas, I&apos;d be glad to connect and explore what&apos;s possible.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} y={30} as="div" className="w-full flex justify-start pl-4 sm:pl-10 md:pl-16 pointer-events-none">
            <div className="flex flex-col gap-2 items-start text-left">
              <span className="text-sm sm:text-base font-semibold uppercase tracking-widest text-[#D7E2EA] pointer-events-none">Primary Email</span>
              <a
                href="mailto:mdj32807@gmail.com"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D7E2EA] hover:text-[#B600A8] transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-start gap-3 pointer-events-auto group"
              >
                mdj32807@gmail.com
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 opacity-60 transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2 mt-4 pointer-events-none">
          <div className="w-full relative flex flex-col md:flex-row items-center justify-center min-h-[5rem]">
            
            {/* Social Flip Group */}
            <div className="flex flex-col items-center justify-center w-full pointer-events-none md:translate-x-16 gap-2">
              <FadeIn delay={0.25} y={15} as="div" className="w-full text-center pointer-events-none">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/40 font-semibold block text-center pointer-events-none">
                  Let&apos;s Connect
                </span>
              </FadeIn>
              <div className="pointer-events-auto">
                <SocialFlipButton className="!justify-center !p-0 mx-auto" />
              </div>
            </div>

            {/* CV Button with increased padding and font size for a larger, balanced look */}
            <div className="w-full md:w-auto mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-[10%] flex justify-center pointer-events-none">
              <FadeIn delay={0.35} y={20} as="div" className="shrink-0 pointer-events-auto">
                <a
                  href="/Javed_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-block focus:outline-none cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-[#2D2D2D] translate-y-[8px] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-[10px] group-active:translate-y-[2px] border-b border-black/40" />
                  <span className="relative block px-12 py-4 sm:px-16 sm:py-4.5 text-center text-[16px] sm:text-[18px] font-bold tracking-wider uppercase text-white bg-gradient-to-b from-[#FFAED7] to-[#FF529E] border border-white/20 rounded-md transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-0 group-hover:-translate-y-[3px] group-active:translate-y-[6px] select-none shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.7),0_10px_20px_rgba(255,82,158,0.2)]">
                    CV
                  </span>
                </a>
              </FadeIn>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-[#D7E2EA]/10 flex flex-col gap-8 pointer-events-none">
          <FadeIn delay={0.3} y={20} as="div" className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#D7E2EA]/40 pointer-events-none">
            <span className="pointer-events-none">&copy; {new Date().getFullYear()} JAVED. ALL RIGHTS RESERVED.</span>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 hover:text-[#D7E2EA] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] font-medium uppercase tracking-widest cursor-pointer pointer-events-auto group"
            >
              Back to Top
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}