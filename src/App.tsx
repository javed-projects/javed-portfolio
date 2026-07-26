// src/App.tsx
import React from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import InternshipsSection from './components/InternshipsSection';
import SkillsSection from './components/SkillsSection';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import { StarsBackground } from './components/ui/stars-background';
import { ShootingStars } from './components/ui/shooting-stars';

export default function App() {
  return (
    <div 
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans antialiased selection:bg-[#B600A8] selection:text-white relative"
      style={{ overflowX: 'clip' }}
    >
      {/* Global Background Effects (Fixed Layer visible across all sections) */}
      <StarsBackground className="fixed inset-0 z-0 opacity-70 pointer-events-none" />
      <ShootingStars className="fixed inset-0 z-0 opacity-90 pointer-events-none" />

      {/* Content Sections Wrapper */}
      <div className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ProjectsSection />
        <InternshipsSection />
        <SkillsSection />
        <CertificatesSection />
        <ContactSection />
      </div>
    </div>
  );
}