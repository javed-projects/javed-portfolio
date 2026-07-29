import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Award, Sparkles, TrendingUp, Cpu, Database, BarChart3, Globe, ShieldCheck, ChevronLeft, ChevronRight, Upload, Trash2, Image } from 'lucide-react';
import FadeIn from './FadeIn';
import ScrollFadeElement from './ScrollFadeElement';
import { Boxes } from './ui/background-boxes';
import { StarsBackground } from './ui/stars-background';
import { ShootingStars } from './ui/shooting-stars';

// Define the type for our custom certificates
interface Certificate {
  id: string;
  title: string;
  issuer: string;
  skills: string[];
  credentialUrl: string;
  color: string;
  glowColor: string;
  accentGrad: string;
  borderStyle: string;
  textGrad: string;
  badgeText: string;
  icon: React.ReactNode;
  chartType: 'line' | 'bar' | 'radar' | 'scatter' | 'wave';
  date: string;
  enrolmentCode: string;
  userCode: string;
  tasks: string[];
  signatureName: string;
  signatureTitle: string;
  imageUrl?: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'deloitte-da',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte',
    skills: ['Data Analysis', 'Forensic Technology', 'Analytical Thinking', 'Critical Decision Making'],
    credentialUrl: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_fRBH9CZuZYd6wXLL3_1750844748696_completion_certificate.pdf',
    color: '#86BC25',
    glowColor: 'rgba(134, 188, 37, 0.45)',
    accentGrad: 'from-[#86BC25]/20 to-[#000000]/20',
    borderStyle: 'border-[#86BC25]/30 group-hover:border-[#86BC25]/80',
    textGrad: 'from-emerald-400 to-green-400',
    badgeText: 'Deloitte UK',
    icon: <Database className="w-5 h-5 text-[#86BC25]" />,
    chartType: 'bar',
    date: 'June 25th, 2025',
    enrolmentCode: 'QAdjAPu58c8CypN72',
    userCode: 'fRBH9CZuZYd6wXLL3',
    tasks: [
  'Data analysis',
  'Forensic technology'],
    signatureName: 'Tina McCreery',
    signatureTitle: 'Chief Human Resources Officer, Deloitte',
    imageUrl: '/certificates/deloitte data analytics job simulation.webp',
  },
  {
    id: 'tata-genai',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata Group',
    skills: ['Exploratory Data Analysis', 'Risk Profiling', 'Predicting Delinquency with AI', 'AI Collections Strategy'],
    credentialUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_fRBH9CZuZYd6wXLL3_1767964143062_completion_certificate.pdf',
    color: '#005A9C',
    glowColor: 'rgba(0, 90, 156, 0.45)',
    accentGrad: 'from-[#005A9C]/20 to-[#4FACFE]/20',
    borderStyle: 'border-[#005A9C]/30 group-hover:border-[#005A9C]/80',
    textGrad: 'from-blue-400 to-cyan-400',
    badgeText: 'TATA Group',
    icon: <Cpu className="w-5 h-5 text-[#005A9C]" />,
    chartType: 'line',
    date: 'January 9th, 2026',
    enrolmentCode: 'GRgpbQRB2KnbdfSit',
    userCode: 'fRBH9CZuZYd6wXLL3',
    tasks: [
      'Exploratory data analysis and risk profiling',
      'Predicting delinquency with AI',
      'Business report and data storytelling for collections strategy',
      'Implementing an AI-driven collections strategy'
    ],
    signatureName: 'Tom Brunskill',
    signatureTitle: 'CEO, Co-Founder of Forage',
    imageUrl: '/certificates/tata genai powered data analytics job simulation.webp',
  },
  {
    id: 'tata-dv',
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'Tata Group',
    skills: ['Framing Business Scenarios', 'Choosing Right Visuals', 'Creating Effective Visuals', 'Communicating Insights'],
    credentialUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_fRBH9CZuZYd6wXLL3_1767889852717_completion_certificate.pdf',
    color: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    accentGrad: 'from-[#0284C7]/20 to-[#3B82F6]/20',
    borderStyle: 'border-[#0284C7]/30 group-hover:border-[#0284C7]/80',
    textGrad: 'from-sky-400 to-indigo-400',
    badgeText: 'TATA Group',
    icon: <BarChart3 className="w-5 h-5 text-[#0284C7]" />,
    chartType: 'wave',
    date: 'January 8th, 2026',
    enrolmentCode: 'NH38YAqcLjGgGRkep',
    userCode: 'fRBH9CZuZYd6wXLL3',
    tasks: [
      'Framing the Business Scenario',
      'Choosing the Right Visuals',
      'Creating Effective Visuals',
      'Communicating Insights and Analysis'
    ],
    signatureName: 'Tom Brunskill',
    signatureTitle: 'CEO, Co-Founder of Forage',
    imageUrl: '/certificates/tata data visualisation.webp',
  },
  {
    id: 'gs-ops',
    title: 'Operations Job Simulation',
    issuer: 'Goldman Sachs',
    skills: ['Foundations of Operations', 'UHNW Transactions', 'Risk Assessment', 'Process Engineering'],
    credentialUrl: 'https://www.theforage.com/completion-certificates/MBA4MnZTNFEoJZGnk/wNge9cjzNTXD2acrv_MBA4MnZTNFEoJZGnk_fRBH9CZuZYd6wXLL3_1768041424762_completion_certificate.pdf',
    color: '#AE8E5F',
    glowColor: 'rgba(174, 142, 95, 0.45)',
    accentGrad: 'from-[#AE8E5F]/20 to-[#121212]/20',
    borderStyle: 'border-[#AE8E5F]/30 group-hover:border-[#AE8E5F]/80',
    textGrad: 'from-amber-500 to-yellow-600',
    badgeText: 'Goldman Sachs',
    icon: <TrendingUp className="w-5 h-5 text-[#AE8E5F]" />,
    chartType: 'radar',
    date: 'January 10th, 2026',
    enrolmentCode: 'WS4uQv7hhDhnGzp8f',
    userCode: 'fRBH9CZuZYd6wXLL3',
    tasks: [
      'Foundations of operations',
      'Facilitating ultra-high net worth transactions'
    ],
    signatureName: 'Tom Brunskill',
    signatureTitle: 'CEO, Co-Founder of Forage',
    imageUrl: '/certificates/goldman sach operations job simulation.webp',
  }
];

// Helper to draw realistic mock data charts based on certificate topic
const MiniDataChart: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  if (type === 'line') {
    return (
      <svg className="w-full h-full opacity-60" viewBox="0 0 100 40">
        <path
          d="M5 35 Q 25 15, 45 28 T 85 8 T 95 5"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 35 Q 25 15, 45 28 T 85 8 T 95 5 L 95 40 L 5 40 Z"
          fill={`url(#grad-line-${color.replace('#', '')})`}
          opacity="0.15"
        />
        <defs>
          <linearGradient id={`grad-line-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="5" y1="40" x2="95" y2="40" stroke="white" strokeOpacity="0.1" strokeDasharray="2 2" />
        <line x1="5" y1="20" x2="95" y2="20" stroke="white" strokeOpacity="0.05" strokeDasharray="2 2" />
        <circle cx="45" cy="28" r="1.5" fill={color} />
        <circle cx="85" cy="8" r="1.5" fill={color} />
      </svg>
    );
  }
  if (type === 'bar') {
    return (
      <svg className="w-full h-full opacity-60" viewBox="0 0 100 40">
        {[20, 32, 18, 25, 38, 28, 35, 22].map((height, i) => (
          <rect
            key={i}
            x={10 + i * 10}
            y={40 - height}
            width="5"
            height={height}
            rx="1"
            fill={color}
            opacity={0.3 + (i / 8) * 0.7}
          />
        ))}
        <line x1="5" y1="40" x2="95" y2="40" stroke="white" strokeOpacity="0.1" />
      </svg>
    );
  }
  if (type === 'radar') {
    return (
      <svg className="w-full h-full opacity-65" viewBox="0 0 100 40">
        <polygon
          points="50,5 75,18 68,38 32,38 25,18"
          fill="none"
          stroke="white"
          strokeOpacity="0.08"
          strokeWidth="0.75"
        />
        <polygon
          points="50,12 68,20 62,32 38,32 32,20"
          fill="none"
          stroke="white"
          strokeOpacity="0.15"
          strokeWidth="0.75"
        />
        <polygon
          points="50,8 72,18 64,30 42,34 30,22"
          fill={`${color}22`}
          stroke={color}
          strokeWidth="1.2"
        />
        <circle cx="50" cy="23" r="1.5" fill="white" fillOpacity="0.4" />
      </svg>
    );
  }
  if (type === 'wave') {
    return (
      <svg className="w-full h-full opacity-60" viewBox="0 0 100 40">
        <path
          d="M 5 20 C 20 5, 30 35, 50 20 C 70 5, 80 35, 95 20"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 5 25 C 20 10, 30 40, 50 25 C 70 10, 80 40, 95 25"
          fill="none"
          stroke={color}
          strokeWidth="0.75"
          strokeDasharray="2 2"
          opacity="0.5"
        />
      </svg>
    );
  }
  return (
    <svg className="w-full h-full opacity-60" viewBox="0 0 100 40">
      {[
        { x: 15, y: 30 }, { x: 25, y: 22 }, { x: 35, y: 28 }, { x: 42, y: 15 },
        { x: 55, y: 18 }, { x: 62, y: 10 }, { x: 75, y: 12 }, { x: 82, y: 6 },
        { x: 30, y: 12 }, { x: 50, y: 25 }, { x: 70, y: 20 }, { x: 90, y: 15 }
      ].map((pt, i) => (
        <circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r="1.5"
          fill={color}
          opacity={0.4 + (pt.y / 35) * 0.6}
        />
      ))}
      <path d="M10 32 L 90 8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
    </svg>
  );
};

// Render the high fidelity Portrait Vector Certificate inside the card
const VectorCertificate: React.FC<{ cert: Certificate; size?: 'normal' | 'large' }> = ({ cert, size = 'normal' }) => {
  const isLarge = size === 'large';
  
  const certIcon = React.isValidElement(cert.icon)
    ? React.cloneElement(cert.icon as React.ReactElement<any>, {
        className: `text-white ${isLarge ? 'w-5 h-5' : 'w-4 h-4'} shrink-0`,
      })
    : cert.icon;

  return (
    <div className={`relative w-full h-full bg-[#0B0B0B] rounded-2xl overflow-hidden flex flex-col justify-between border border-white/5 ${isLarge ? 'p-6 sm:p-7 md:p-8' : 'p-4 sm:p-4.5'} text-left selection:bg-transparent shadow-2xl`}>
      
      {/* 3D Glass Glossy reflection sheen overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.005] via-white/[0.015] to-white/[0.1] z-30 mix-blend-overlay" />
      <div className="absolute -inset-y-24 -inset-x-24 rotate-12 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent w-1/2 pointer-events-none z-30" />
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_65%)] z-20" />

      {/* Dynamic Colored Glow Mesh background matching the company theme */}
      <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-[50px] pointer-events-none opacity-50 bg-gradient-to-br ${cert.accentGrad}`} />
      <div className={`absolute -bottom-16 -left-16 w-36 h-36 rounded-full blur-[50px] pointer-events-none opacity-25 bg-gradient-to-tr ${cert.accentGrad}`} />

      {/* Security Guilloché Pattern */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none flex items-center justify-center">
        <svg className="w-full h-full scale-110" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="90" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="80" strokeWidth="0.2" strokeDasharray="3 1" />
          <circle cx="100" cy="100" r="70" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="60" strokeWidth="0.2" />
          <circle cx="100" cy="100" r="45" strokeWidth="0.3" strokeDasharray="1 2" />
          <path d="M0,100 L200,100 M100,0 L100,200" strokeWidth="0.15" />
        </svg>
      </div>

      {/* 1. Header Metadata Section */}
      <div className={`relative z-10 flex justify-between items-center border-b border-white/5 ${isLarge ? 'pb-3 gap-3' : 'pb-2 sm:pb-2.5 gap-2'}`}>
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <div className={`rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ${isLarge ? 'w-9 h-9' : 'w-7 h-7'}`}>
            {certIcon}
          </div>
          <div className="min-w-0 flex-1">
            <span className={`block uppercase font-mono tracking-widest text-white/30 truncate ${isLarge ? 'text-[8.5px] sm:text-[9.5px]' : 'text-[7px] sm:text-[8px]'}`}>
              Verified Issuer
            </span>
            <span className={`block font-black text-white leading-normal py-0.5 truncate ${isLarge ? 'text-xs sm:text-sm md:text-base' : 'text-[10px] sm:text-xs'}`}>
              {cert.issuer}
            </span>
          </div>
        </div>
        <div className={`rounded-full bg-white/[0.04] border border-white/10 font-mono tracking-wider text-white/60 uppercase truncate text-center whitespace-nowrap block shrink-0 ${isLarge ? 'px-2.5 py-1 text-[8.5px] sm:text-[9.5px] max-w-[75%]' : 'px-1.5 py-0.5 text-[7px] sm:text-[8px] max-w-[70%]'}`}>
          {cert.badgeText}
        </div>
      </div>

      {/* 2. Middle Certificate Body */}
      <div className={`relative z-10 my-auto flex flex-col justify-center items-center text-center ${isLarge ? 'py-4 sm:py-6' : 'py-2 sm:py-3.5'}`}>
        
        {/* Verification stamp watermark */}
        <div className={`rounded-full border border-dashed border-white/10 flex items-center justify-center opacity-35 shrink-0 ${isLarge ? 'w-9 h-9 sm:w-11 sm:h-11 mb-2.5 sm:mb-4' : 'w-7 h-7 sm:w-9 sm:h-9 mb-1.5 sm:mb-2.5'}`}>
          <ShieldCheck className={`text-white ${isLarge ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-3.5 h-3.5 sm:w-4.5 sm:h-4.5'}`} style={{ color: cert.color }} />
        </div>

        <div className="flex items-center gap-1 mb-1 sm:mb-1.5 justify-center">
          <Award className={`text-[#FFB800] shrink-0 ${isLarge ? 'w-3 h-3 sm:w-3.5 sm:h-3.5' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'}`} />
          <span className={`font-mono uppercase tracking-[0.2em] text-white/40 ${isLarge ? 'text-[8px] sm:text-[9px]' : 'text-[6px] sm:text-[7px]'}`}>
            Certificate of Completion
          </span>
        </div>

        <h3 className={`font-black tracking-tight text-white leading-snug uppercase max-w-[95%] mb-1.5 sm:mb-2.5 text-center line-clamp-2 ${isLarge ? 'text-sm sm:text-base md:text-lg' : 'text-[10px] sm:text-xs md:text-sm'}`}>
          {cert.title}
        </h3>

        <div className={`h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent my-1 sm:my-1.5 ${isLarge ? 'w-16' : 'w-10 sm:w-12'}`} />

        <div className="flex flex-col gap-0.5 mt-0.5 sm:mt-1 items-center">
          <span className={`font-mono text-white/30 uppercase tracking-widest ${isLarge ? 'text-[7.5px] sm:text-[8.5px]' : 'text-[5.5px] sm:text-[6.5px]'}`}>
            AWARDED TO
          </span>
          <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D7E2EA] to-white/70 tracking-wider py-0.5 ${isLarge ? 'text-sm sm:text-base md:text-lg' : 'text-[10px] sm:text-xs'}`}>
            Md Javed
          </span>
          
          {!isLarge && (
            <div className="mt-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[6px] font-mono uppercase tracking-[0.1em] text-white/60 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
              View Simulation
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer Competency tags & Data analytics graphs */}
      <div className={`relative z-10 border-t border-white/5 flex flex-col ${isLarge ? 'pt-4 gap-3.5' : 'pt-2 sm:pt-3 gap-2 sm:gap-2.5'}`}>
        <div>
          <span className={`block font-mono uppercase text-white/30 tracking-widest mb-1 sm:mb-1.5 ${isLarge ? 'text-[7.5px] sm:text-[8.5px]' : 'text-[5.5px] sm:text-[6.5px]'}`}>
            Key Competencies:
          </span>
          <div className="flex flex-wrap gap-0.5 sm:gap-1">
            {cert.skills.slice(0, isLarge ? 4 : 3).map((skill, idx) => (
              <span
                key={idx}
                className={`rounded bg-white/[0.02] border border-white/5 text-white/70 font-mono tracking-wide whitespace-nowrap ${isLarge ? 'px-2 py-0.5 text-[7.5px] sm:text-[8.5px]' : 'px-1 py-0.5 text-[5.5px] sm:text-[6.5px]'}`}
              >
                {skill}
              </span>
            ))}
            {!isLarge && cert.skills.length > 3 && (
              <span className="px-1 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[5.5px] text-white/40 font-mono whitespace-nowrap">
                +{cert.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className={`overflow-hidden flex items-end justify-center ${isLarge ? 'w-full h-[32px] sm:h-[40px]' : 'w-full h-[20px] sm:h-[28px]'}`}>
          <MiniDataChart type={cert.chartType} color={cert.color} />
        </div>
      </div>
    </div>
  );
};

const CertificateDisplay: React.FC<{ cert: Certificate; mode: 'landscape' | 'portrait' }> = ({ cert, mode }) => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [triedExtensions, setTriedExtensions] = useState<string[]>([]);
  const [currentSrc, setCurrentSrc] = useState(cert.imageUrl);

  useEffect(() => {
    setCurrentSrc(cert.imageUrl);
    setTriedExtensions([]);
    setHasError(false);
    setLoading(true);
  }, [cert.imageUrl]);

  if (!cert.imageUrl || hasError) {
    if (mode === 'landscape') {
      return <LandscapeCertificate cert={cert} />;
    } else {
      return <VectorCertificate cert={cert} size="large" />;
    }
  }

  const handleImageError = () => {
    const extensions = ['.png', '.jpg', '.jpeg', '.webp'];
    const baseName = cert.imageUrl ? cert.imageUrl.substring(0, cert.imageUrl.lastIndexOf('.')) : '';
    
    if (!baseName) {
      setHasError(true);
      setLoading(false);
      return;
    }

    const nextExt = extensions.find(ext => {
      const pathWithExt = baseName + ext;
      return pathWithExt !== currentSrc && !triedExtensions.includes(pathWithExt);
    });

    if (nextExt) {
      const nextSrc = baseName + nextExt;
      setTriedExtensions(prev => [...prev, currentSrc || '']);
      setCurrentSrc(nextSrc);
    } else {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-white shadow-lg border border-white/10 ${mode === 'landscape' ? 'aspect-[1.414/1]' : 'aspect-[1/1.38]'}`}>
      {loading && (
        <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-white/20 border-t-[#FF529E] rounded-full animate-spin" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={`${cert.issuer} Certificate - ${cert.title}`}
        className="w-full h-full object-contain bg-white"
        referrerPolicy="no-referrer"
        onLoad={() => setLoading(false)}
        onError={handleImageError}
      />
      {mode === 'portrait' && (
        <div className="absolute top-4 left-2 sm:top-5 sm:left-3 z-20 pointer-events-none flex items-center">
          {cert.issuer.includes('Deloitte') ? (
            <div className="flex items-baseline">
              <span style={{ fontFamily: 'Inter, sans-serif' }} className="font-black text-lg sm:text-xl text-black tracking-tighter whitespace-nowrap">
                Deloitte
              </span>
              <span className="w-1.5 h-1.5 sm:w-[6px] sm:h-[6px] rounded-full bg-[#86BC25] ml-[1.5px]"></span>
            </div>
          ) : cert.issuer.includes('Tata') || cert.issuer.includes('TATA') ? (
            <span style={{ fontFamily: 'Inter, sans-serif' }} className="font-black text-lg sm:text-xl text-[#005A9C] tracking-tighter uppercase whitespace-nowrap">
              TATA
            </span>
          ) : cert.issuer.includes('Goldman') ? (
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="font-bold text-lg sm:text-xl text-black tracking-wide whitespace-nowrap">
              Goldman Sachs
            </span>
          ) : (
            <span className="font-sans font-bold text-base sm:text-lg text-slate-800 tracking-tight whitespace-nowrap">
              {cert.issuer}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const LandscapeCertificate: React.FC<{ cert: Certificate }> = ({ cert }) => {
  const isDeloitte = cert.issuer.includes("Deloitte");
  const isGS = cert.issuer.includes("Goldman");
  const isTATA = cert.issuer.includes("Tata") || cert.issuer.includes("TATA");

  return (
    <div className="relative w-full aspect-[1.414/1] bg-white text-slate-800 border-4 border-neutral-200/50 p-6 sm:p-10 flex flex-col justify-between overflow-hidden rounded-xl shadow-2xl select-none font-sans">
      {isDeloitte && (
        <div className="absolute inset-0 bg-white p-6 sm:p-10 flex flex-col justify-between h-full w-full">
          <div className="flex items-center justify-between">
            <svg viewBox="0 0 150 40" className="h-8 sm:h-9">
              <text x="0" y="30" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="30" fill="#000000" letterSpacing="-1.5">Deloitte</text>
              <circle cx="118" cy="27" r="4.5" fill="#86BC25" />
            </svg>
          </div>

          <div className="flex-grow flex flex-col justify-center max-w-2xl mt-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-none">
              Md Javed
            </h3>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight tracking-tight mt-1 mb-2">
              {cert.title}
            </h2>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-700 tracking-wide uppercase font-mono">
              Certificate of Completion
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{cert.date}</span>
            
            <div className="h-[1px] bg-slate-200 w-full my-4" />

            <p className="text-[9px] sm:text-[10px] text-slate-600 leading-relaxed max-w-xl">
              Over the period of June 2025, Md Javed has completed practical tasks in:
            </p>
            <div className="flex flex-col gap-1 mt-2 pl-1">
              {cert.tasks.map((task, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86BC25] mt-1.5 shrink-0" />
                  <span className="text-[8px] sm:text-[10px] text-slate-700 font-medium">{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between border-t border-slate-100 pt-3">
            <div className="flex flex-col">
              <span className="font-serif italic text-base sm:text-lg text-neutral-800 h-6 flex items-end font-medium">
                Tina McCreery
              </span>
              <div className="h-[1px] w-28 bg-slate-200 my-1" />
              <span className="text-[7px] sm:text-[8px] font-black text-slate-800 uppercase tracking-wider">
                Tina McCreery
              </span>
              <span className="text-[7px] sm:text-[8px] text-slate-500 leading-tight">
                Chief Human Resources Officer, Deloitte
              </span>
            </div>

            <div className="text-right flex flex-col gap-0.5 text-[7px] sm:text-[8px] font-mono text-slate-400">
              <span>Enrolment Verification Code {cert.enrolmentCode}</span>
              <span>User Verification Code {cert.userCode}</span>
              <span className="text-slate-500 font-bold mt-0.5">Issued by Forage</span>
            </div>
          </div>
        </div>
      )}

      {(isTATA || isGS) && (
        <div className="absolute inset-0 bg-white flex flex-col justify-between h-full w-full">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#2C6AE3]" />
          <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#2C6AE3]" />

          <div className="px-6 sm:px-10 py-6 sm:py-8 flex-grow flex flex-col justify-between">
            <div className="flex items-start justify-between w-full">
              {isTATA && (
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 120 40" className="h-8 sm:h-9 flex items-center">
                    <g transform="translate(0, 2)" stroke="#005A9C" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="20" cy="18" rx="18" ry="15" strokeWidth="2" />
                      <path d="M12,12 C16,10 24,10 28,12 M20,10 L20,28 M12,18 C16,21 24,21 28,18" />
                    </g>
                    <text x="48" y="26" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="18" fill="#005A9C" letterSpacing="2">TATA</text>
                  </svg>
                </div>
              )}
              {isGS && (
                <div className="flex items-center">
                  <svg viewBox="0 0 200 40" className="h-8 sm:h-9">
                    <text x="0" y="28" fontFamily="'Playfair Display', 'Georgia', serif" fontWeight="bold" fontSize="22" fill="#005A9C" letterSpacing="0.5">Goldman Sachs</text>
                  </svg>
                </div>
              )}

              <div className="absolute top-0 right-10 w-24 sm:w-28 bg-[#2C6AE3] text-white p-2.5 sm:p-3 rounded-b-xl flex flex-col items-center justify-center text-center shadow-sm">
                <div className="flex items-center gap-1 mb-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="12,2 22,8 22,18 12,23 2,18 2,8" fill="white" />
                    <polygon points="12,6 18,10 18,16 12,19 6,16 6,10" fill="#2C6AE3" />
                  </svg>
                  <span className="font-sans font-black text-[10px] sm:text-xs tracking-wide">Forage</span>
                </div>
                <p className="text-[5px] font-medium leading-tight text-white/90">Inspiring and empowering future professionals</p>
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-center max-w-2xl mt-4">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-none">
                Md Javed
              </h3>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight tracking-tight mt-1 mb-2 max-w-[85%]">
                {cert.title}
              </h2>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-600 tracking-wider uppercase font-mono flex items-center gap-1.5">
                Certificate of Completion
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{cert.date}</span>

              <div className="h-[1px] bg-slate-100 w-full my-3" />

              <p className="text-[9px] sm:text-[10px] text-slate-500 leading-relaxed">
                Over the period of {cert.date.includes("January") ? "January 2026" : "June 2025"}, Md Javed has completed practical tasks in:
              </p>
              <div className="flex flex-col gap-1 mt-2 pl-1">
                {cert.tasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#2C6AE3] mt-1.5 shrink-0" />
                    <span className="text-[8px] sm:text-[10px] text-slate-600 font-medium">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-slate-100 pt-3">
              <div className="flex flex-col">
                <span className="font-serif italic text-base sm:text-lg text-neutral-800 h-6 flex items-end font-medium">
                  Tom Brunskill
                </span>
                <div className="h-[1px] w-28 bg-slate-200 my-1" />
                <span className="text-[7px] sm:text-[8px] font-black text-slate-800 uppercase tracking-wider">
                  Tom Brunskill
                </span>
                <span className="text-[7px] sm:text-[8px] text-slate-500 leading-tight">
                  CEO, Co-Founder of Forage
                </span>
              </div>

              <div className="text-right flex flex-col gap-0.5 text-[7px] sm:text-[8px] font-mono text-slate-400">
                <span>Enrolment Verification Code {cert.enrolmentCode}</span>
                <span>User Verification Code {cert.userCode}</span>
                <span className="text-slate-500 font-bold mt-0.5">Issued by Forage</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function InternshipsSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [currentPosition, setCurrentPosition] = useState(2);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [dimensions, setDimensions] = useState({ cardWidth: 260, gap: 32 });
  const [containerWidth, setContainerWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const isInteractingRef = useRef(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const [uploadedCerts, setUploadedCerts] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('user_portfolio_certificates');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const dynamicCertificates = CERTIFICATES.map(cert => ({
    ...cert,
    imageUrl: uploadedCerts[cert.id] || cert.imageUrl
  }));

  const activeCert = selectedCert ? dynamicCertificates.find(c => c.id === selectedCert.id) || selectedCert : null;

  useEffect(() => {
    if (!isInteractingRef.current) {
      const N = dynamicCertificates.length;
      const nearestIndex = Math.round(currentPosition) % N;
      if (nearestIndex !== activeIndex) {
        setActiveIndex(nearestIndex);
      }
    }
  }, [currentPosition, activeIndex, dynamicCertificates.length]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ cardWidth: 180, gap: 16 });
      } else if (width < 1024) {
        setDimensions({ cardWidth: 220, gap: 24 });
      } else {
        setDimensions({ cardWidth: 260, gap: 32 });
      }

      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let observer: ResizeObserver | null = null;
    if (containerRef.current) {
      observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const cardWidth = dimensions.cardWidth;
  const gap = dimensions.gap;
  const totalWidth = cardWidth + gap;

  useEffect(() => {
    if (!isInViewport) return;

    const animate = () => {
      setCurrentPosition((prev) => {
        const N = dynamicCertificates.length;

        if (isInteractingRef.current) {
          let diff = activeIndex - prev;
          if (diff > N / 2) {
            diff -= N;
          } else if (diff < -N / 2) {
            diff += N;
          }

          if (Math.abs(diff) < 0.01) {
            isInteractingRef.current = false;
            return activeIndex;
          }
          let next = prev + diff * 0.12;
          if (next < 0) next += N;
          if (next >= N) next -= N;
          return next;
        } else {
          if (selectedCert) return prev;

          let next = prev + 0.00333;
          if (next >= N) next -= N;
          return next;
        }
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [activeIndex, selectedCert, dynamicCertificates.length, isInViewport]);

  const handlePrev = () => {
    isInteractingRef.current = true;
    setActiveIndex((prev) => (prev - 1 + dynamicCertificates.length) % dynamicCertificates.length);
  };

  const handleNext = () => {
    isInteractingRef.current = true;
    setActiveIndex((prev) => (prev + 1) % dynamicCertificates.length);
  };

  const handleCardClick = (index: number) => {
    isInteractingRef.current = true;
    setActiveIndex(index);
    setSelectedCert(dynamicCertificates[index]);
  };

  return (
    <section
      ref={sectionRef}
      id="internships"
      className="relative flex flex-col items-center justify-center bg-transparent px-0 py-24 sm:py-32 overflow-hidden select-none border-t border-[#D7E2EA]/5"
    >
      <div className="w-full z-10 flex flex-col items-center">
        
        <div className="text-center mb-12 sm:mb-16 px-5 pt-24 sm:pt-32 w-full">
          <FadeIn delay={0} y={40} as="div" className="w-full">
            <ScrollFadeElement as="div">
              <h2 className="hero-heading font-black uppercase leading-[1.1] tracking-normal text-[clamp(2.5rem,8vw,120px)] text-[#D7E2EA]">
                Virtual Internships
              </h2>
              <p className="text-[#D7E2EA] hero-heading font-black tracking-[0.15em] uppercase text-[15px] sm:text-[18px] mt-6">
                & Job Simulations
              </p>
            </ScrollFadeElement>
          </FadeIn>
        </div>

        <div className="relative w-full flex items-center justify-center px-4 sm:px-12 md:px-20">
          
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 md:left-12 z-30 p-3 sm:p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center justify-center shadow-lg"
            aria-label="Previous Certificate"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-6 md:right-12 z-30 p-3 sm:p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center justify-center shadow-lg"
            aria-label="Next Certificate"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div 
            ref={containerRef}
            className="relative w-full max-w-[1200px] h-[390px] sm:h-[530px] flex items-center justify-center overflow-visible pointer-events-none"
            style={{ perspective: '850px' }}
          >
            <div className="absolute inset-y-0 left-0 w-16 sm:w-44 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-44 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-20 pointer-events-none" />

            <div
              className="relative flex items-center justify-center w-full h-full pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {dynamicCertificates.map((cert, index) => {
                const N = dynamicCertificates.length;
                let offset = index - currentPosition;

                if (offset > N / 2) {
                  offset -= N;
                } else if (offset < -N / 2) {
                  offset += N;
                }

                const absN = Math.abs(offset);
                const translateX = offset * totalWidth;
                const rotateY = offset * -22; 
                const translateZ = -Math.pow(absN, 1.1) * 110;
                const translateXCorrected = -offset * Math.pow(absN, 1.1) * 8;
                const scale = 1 - (absN * 0.05);
                const opacity = Math.max(0.52, 1 - absN * 0.22);

                return (
                  <div
                    key={cert.id}
                    onClick={() => handleCardClick(index)}
                    className="absolute cursor-pointer transition-shadow duration-500 hover:scale-[1.03] active:scale-[0.98] group pointer-events-auto"
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardWidth * 1.38}px`,
                      transform: `translateX(${translateX + translateXCorrected}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      transformStyle: 'preserve-3d',
                      opacity: opacity,
                      zIndex: Math.round((dynamicCertificates.length - absN) * 100) + 10,
                      boxShadow: absN < 0.85 ? `0 20px 45px -10px rgba(0,0,0,0.85), 0 0 45px -15px ${cert.color}25` : 'none',
                    }}
                  >
                    <CertificateDisplay cert={cert} mode="portrait" />
                    <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/5 group-hover:border-white/20 transition-all duration-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6 sm:mt-10 z-20">
          {dynamicCertificates.map((cert, idx) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-6 bg-[#FF529E]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Open ${cert.title}`}
              title={`Open ${cert.title}`}
            />
          ))}
        </div>

        <div className="mt-4" />
      </div>

      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/92 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[380px] md:max-w-[760px] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden p-5 sm:p-6 z-10 flex flex-col gap-4 shadow-[0_30px_70px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto my-auto"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3 gap-3">
                <div className="flex items-center gap-2 min-w-0" style={{ paddingLeft: "16px" }}>
                  <Award className="w-4 h-4 shrink-0" style={{ color: activeCert.color }} />
                  <h4 className="text-xs sm:text-sm font-black uppercase text-white tracking-wider truncate" title={activeCert.title}>
                    {activeCert.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#FF529E] hover:bg-white/10 hover:border-[#FF529E]/30 hover:scale-110 active:scale-95 transition-all duration-300 shrink-0 shadow-lg"
                  aria-label="Close"
                  title="Close"
                >
                  <X className="w-4.5 h-4.5 sm:w-5 h-5" />
                </button>
              </div>

              <div className="w-full relative">
                <div className="hidden md:block w-full">
                  <CertificateDisplay cert={activeCert} mode="landscape" />
                </div>
                <div className="md:hidden w-full relative">
                  <CertificateDisplay cert={activeCert} mode="portrait" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 pt-5 pb-8 mb-4 border-t border-white/5 w-full">
                <div className="text-left w-full sm:w-auto min-w-0" style={{ paddingLeft: "16px" }}>
                  <span className="block text-[8.5px] sm:text-[9.5px] font-mono uppercase tracking-widest text-white/40 pb-1">
                    Credential Program
                  </span>
                  <span className="block text-sm sm:text-base font-bold text-white/90 leading-loose pb-2 truncate">
                    {activeCert.issuer} Job Simulation
                  </span>
                </div>

                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-1.5 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-opacity-90 active:scale-95 transition-all duration-300 shrink-0"
                  style={{ marginRight: "16px" }}
                >
                  <span>View Credential</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
