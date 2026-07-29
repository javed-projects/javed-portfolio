// src/components/ui/hover-expand-002.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, ArrowDownRight, ExternalLink, X, Award } from "lucide-react";

interface Signature {
  name: string;
  title: string;
}

interface Certificate {
  src?: string;
  alt: string;
  code: string;
  title?: string;
  issuer?: string;
  verifyUrl?: string;
  credentialId?: string;
  date?: string;
  recipient?: string;
  signatures?: Signature[];
  platform?: string;
  partner?: string;
  duration?: string;
}

interface HoverExpand_002Props {
  images: Certificate[];
  className?: string;
}

/* --- ORIGINAL REACT BITS MAGNET LINES COMPONENT (BRIGHTNESS ADJUSTED) --- */
const MagnetLines = React.memo(function MagnetLines({
  rows = 7,
  columns = 16,
  containerSize = "100%",
  lineColor = "rgba(255, 255, 255, 0.24)", // Increased brightness for better visibility
  lineWidth = "2px",
  lineHeight = "12px",
  baseAngle = -45,
}: {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("span");
    let animationFrameId: number;
    let lastX = -1000;
    let lastY = -1000;
    let ticking = false;

    const onPointerMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (!ticking) {
        ticking = true;
        animationFrameId = requestAnimationFrame(() => {
          items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;

            const b = lastX - centerX;
            const a = lastY - centerY;
            const c = Math.sqrt(a * a + b * b) || 1;
            const r = ((Math.acos(b / c) * 180) / Math.PI) * (lastY > centerY ? 1 : -1);

            item.style.setProperty("--rotate", `${r}deg`);
          });
          ticking = false;
        });
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ clientX: rect.x, clientY: rect.y } as PointerEvent);
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = useMemo(() => {
    return Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        style={
          {
            display: "block",
            transformOrigin: "center",
            willChange: "transform",
            transform: "rotate(var(--rotate))",
            backgroundColor: lineColor,
            width: lineWidth,
            height: lineHeight,
            transition: "transform 0.1s ease-out",
          } as React.CSSProperties
        }
      />
    ));
  }, [total, lineColor, lineWidth, lineHeight]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {spans}
    </div>
  );
});

const DigitalCertificatePreview = React.memo(function DigitalCertificatePreview({ image }: { image: Certificate }) {
  if (image.src) {
    return (
      <div className="w-full h-full relative overflow-hidden rounded-xl bg-black flex items-center justify-center">
        <img 
          src={image.src} 
          alt={image.title || image.alt} 
          className="w-full h-full object-contain" 
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          width={560}
          height={420}
        />
      </div>
    );
  }

  const isIBM = image.issuer?.includes("IBM");

  if (isIBM) {
    return (
      <div className="w-full h-full relative bg-[#FCFAF8] p-3 flex flex-col justify-between text-slate-800 font-sans text-left border border-neutral-200 select-none overflow-hidden rounded-xl shadow-md">
        <div className="absolute right-0 top-0 bottom-0 w-7 bg-[#F2ECE4] border-l border-neutral-200/50 flex flex-col items-center justify-between py-1.5 z-0">
          <span className="text-[3px] font-mono font-black text-[#5C554E] tracking-[0.25em] uppercase whitespace-nowrap transform rotate-90 translate-y-3">
            CERTIFICATE
          </span>
          <div className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center bg-[#FCFAF8] scale-90">
            <span className="text-[3px] font-black text-[#0056D2] font-sans scale-[0.6]">coursera</span>
          </div>
        </div>
        <div className="flex items-center z-10">
          <div className="flex flex-col gap-[0.5px] w-6 shrink-0">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[0.5px] w-full bg-[#0F62FE]" />
            ))}
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-center max-w-[80%] z-10 mt-1">
          <span className="text-[4px] font-sans text-[#7D736A] font-semibold">{image.date || "2026"}</span>
          <h3 className="text-[8px] font-serif font-bold text-black mt-0.5 leading-none tracking-wide">
            {image.recipient || "Md Javed"}
          </h3>
          <p className="text-[3px] font-sans text-[#7D736A] mt-0.5">has successfully completed</p>
          <h2 className="text-[6.5px] font-serif font-black text-[#111111] leading-tight tracking-tight my-0.5 max-w-[110px] line-clamp-2">
            {image.title || image.alt}
          </h2>
        </div>
        <div className="flex items-end justify-between z-10 max-w-[80%] border-t border-neutral-200/60 pt-0.5">
          <span className="text-[2.5px] font-bold text-neutral-400 uppercase tracking-widest leading-none">IBM</span>
          <div className="flex items-center gap-0.5 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200 scale-75 origin-right">
            <ShieldCheck className="w-1.5 h-1.5 text-blue-600" />
            <span className="font-mono text-[3px] font-bold text-neutral-600">VERIFIED</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative p-3 flex flex-col justify-between text-white font-sans text-left bg-gradient-to-br from-[#1E1E2F] to-[#11111F] border border-white/10 select-none overflow-hidden rounded-xl shadow-md">
      <div className="flex items-center justify-between z-10">
        <span className="text-[6px] font-bold tracking-widest text-sky-400 font-mono uppercase">{image.issuer}</span>
        <ShieldCheck className="w-2.5 h-2.5 text-sky-400" />
      </div>
      <div className="flex flex-col justify-center my-auto z-10 mt-1">
        <span className="text-[4px] uppercase tracking-widest font-semibold text-sky-400/80">Course Certificate</span>
        <h4 className="text-[7.5px] font-bold text-white tracking-wide font-sans leading-none mt-0.5 truncate">
          {image.recipient || "Md Javed"}
        </h4>
        <p className="text-[6px] font-black text-white/95 uppercase tracking-tight leading-tight line-clamp-2 mt-1">
          {image.title || image.alt}
        </p>
      </div>
      <div className="flex items-end justify-between z-10 border-t border-white/5 pt-0.5">
        <span className="text-[3.5px] font-mono text-white/40 tracking-wider">Date: {image.date || "2026"}</span>
        <span className="text-[3.5px] font-mono font-bold tracking-wider text-sky-400 bg-sky-950/30 px-1 py-0.2 rounded border border-sky-800/20 scale-90">APPROVED</span>
      </div>
    </div>
  );
});

/* --- CLEAN CERTIFICATE MODAL COMPONENT --- */
interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

const MODAL_OVERLAY_INITIAL = { opacity: 0 };
const MODAL_OVERLAY_ANIMATE = { opacity: 1 };
const MODAL_OVERLAY_EXIT = { opacity: 0 };

const MODAL_CONTENT_INITIAL = { scale: 0.96, y: 15 };
const MODAL_CONTENT_ANIMATE = { scale: 1, y: 0 };
const MODAL_CONTENT_EXIT = { scale: 0.96, y: 15 };
const MODAL_CONTENT_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

const CertificateModal = React.memo(function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  if (!certificate) return null;

  const titleToDisplay = certificate.title || certificate.alt;

  return (
    <motion.div
      initial={MODAL_OVERLAY_INITIAL}
      animate={MODAL_OVERLAY_ANIMATE}
      exit={MODAL_OVERLAY_EXIT}
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 z-10 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs sm:text-sm text-white/80 uppercase tracking-widest font-bold">
            {certificate.issuer} — {titleToDisplay}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-200 text-sm font-black tracking-wider uppercase font-mono shadow-2xl cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
            <span>Close</span>
          </button>
        </div>
      </div>

      <motion.div
        initial={MODAL_CONTENT_INITIAL}
        animate={MODAL_CONTENT_ANIMATE}
        exit={MODAL_CONTENT_EXIT}
        transition={MODAL_CONTENT_TRANSITION}
        className="w-full max-w-4xl relative shadow-[0_35px_80px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center p-2 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {certificate.src ? (
          <img 
            src={certificate.src} 
            alt={titleToDisplay} 
            className="w-full h-auto max-h-[82vh] object-contain rounded-lg"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
          />
        ) : (
          <div className="text-white text-sm py-20">Certificate image not found</div>
        )}
      </motion.div>
    </motion.div>
  );
});

interface CertificateRowProps {
  image: Certificate;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
  onHover: (index: number) => void;
  onOpenModal: (image: Certificate) => void;
}

const ROW_TRANSITION = {
  type: "spring" as const,
  stiffness: 320,
  damping: 30,
  mass: 1,
};
const EXPANDED_INITIAL = { opacity: 0 };
const EXPANDED_ANIMATE = { opacity: 1 };
const EXPANDED_EXIT = { opacity: 0 };
const EXPANDED_TRANSITION = { duration: 0.15 };
const EXPANDED_STYLE: React.CSSProperties = { paddingLeft: "1.5rem", willChange: "opacity" };

const CertificateRow = React.memo(function CertificateRow({
  image,
  index,
  isActive,
  onClick,
  onHover,
  onOpenModal,
}: CertificateRowProps) {
  const handleClick = useCallback(() => onClick(index), [index, onClick]);
  const handleHover = useCallback(() => onHover(index), [index, onHover]);
  const handleOpenClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenModal(image);
  }, [image, onOpenModal]);

  const titleToDisplay = image.title || image.alt;

  const rowAnimate = useMemo(() => ({ height: isActive ? "18rem" : "4.25rem" }), [isActive]);
  const rowStyle = useMemo<React.CSSProperties>(() => ({ willChange: isActive ? "height" : "auto" }), [isActive]);

  const actionButtons = useMemo(() => (
    <div className="mt-4 flex gap-2">
      <button
        onClick={handleOpenClick}
        className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black text-white bg-gradient-to-r from-[#FF529E]/20 to-[#FF529E]/10 hover:from-[#FF529E] hover:to-[#FF529E] hover:text-white px-4 py-2 rounded-full border border-[#FF529E]/30 hover:border-[#FF529E] transition-all duration-300 uppercase tracking-widest shadow-md cursor-pointer"
      >
        <span>Open Certificate</span>
        <Award className="w-3 h-3" />
      </button>
      
      {image.verifyUrl && (
        <a
          href={image.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black text-white/60 bg-white/5 hover:bg-white hover:text-black px-4 py-2 rounded-full border border-white/15 hover:border-white transition-all duration-300 uppercase tracking-widest shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Verify</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  ), [handleOpenClick, image.verifyUrl]);

  return (
    <motion.div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[34px] border transition-colors duration-300",
        isActive 
          ? "border-[#FF529E]/60 bg-black/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),_0_0_35px_rgba(255,82,158,0.18)]" 
          : "border-white/10 bg-[#0e0e0e]/15 hover:border-white/25 hover:bg-[#0e0e0e]/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      )}
      initial={{ height: "4.25rem" }}
      animate={rowAnimate}
      transition={ROW_TRANSITION}
      style={rowStyle}
      onClick={handleClick}
      onHoverStart={handleHover}
    >
      {/* MagnetLines with slightly increased brightness */}
      {isActive && <MagnetLines rows={6} columns={14} baseAngle={-45} lineColor="rgba(255, 255, 255, 0.24)" lineWidth="1.5px" lineHeight="12px" />}

      <div className="absolute top-0 inset-x-0 h-[4.25rem] w-full flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-3 sm:gap-4 translate-x-4 sm:translate-x-6">
          <span className={cn(
            "font-mono text-xs font-bold transition-colors duration-300",
            isActive ? "text-[#FF529E]" : "text-white/30"
          )}>
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <span className={cn(
            "font-mono text-[9px] sm:text-[10px] font-black tracking-widest uppercase border px-2 py-0.5 rounded transition-all duration-300",
            isActive 
              ? "bg-[#FF529E]/20 text-[#FF529E] border-[#FF529E]/30" 
              : "bg-white/5 text-white/60 border-white/10 group-hover:text-white group-hover:border-white/20"
          )}>
            {image.code}
          </span>
          <h4 className={cn(
            "text-xs sm:text-base font-black uppercase tracking-wide truncate max-w-[150px] sm:max-w-md transition-colors duration-300",
            isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
          )}>
            {titleToDisplay}
          </h4>
        </div>

        <div className="flex items-center gap-3 -translate-x-4 sm:-translate-x-6 pointer-events-auto">
          {image.issuer && (
            <span className="hidden sm:inline-block font-mono text-[10px] text-white/30 uppercase tracking-widest">
              {image.issuer}
            </span>
          )}
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300",
            isActive 
              ? "border-[#FF529E]/30 bg-[#FF529E]/10 text-[#FF529E]" 
              : "border-white/10 text-white/40 group-hover:text-white/70"
          )}>
            <ArrowDownRight className={cn("w-3.5 h-3.5 transition-transform duration-300", isActive && "-rotate-90 text-[#FF529E]")} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={EXPANDED_INITIAL}
            animate={EXPANDED_ANIMATE}
            exit={EXPANDED_EXIT}
            transition={EXPANDED_TRANSITION}
            style={EXPANDED_STYLE} 
            className="absolute inset-x-0 top-[4.25rem] pr-6 pt-3 flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-10 z-10"
          >
            <div 
              className="w-full sm:w-[14rem] aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/20 flex items-center justify-center shrink-0 shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-105 hover:border-[#FF529E]/50 transition-all duration-300 relative group/preview cursor-pointer"
              onClick={handleOpenClick}
            >
              <DigitalCertificatePreview image={image} />
            </div>

            <div className="flex-none max-w-md md:max-w-lg flex flex-col justify-center text-left w-full sm:pl-4">
              {image.issuer && (
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                  {image.issuer}
                </span>
              )}
              <h5 className="text-sm sm:text-md md:text-lg font-black text-white uppercase tracking-wide leading-tight line-clamp-2">
                {image.alt}
              </h5>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-mono font-black text-emerald-400 tracking-widest uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> SECURED & VERIFIED
                </span>
              </div>

              {actionButtons}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}, (prev, next) => prev.image === next.image && prev.isActive === next.isActive);

const CONTAINER_INITIAL = { opacity: 0, y: 20 };
const CONTAINER_ANIMATE = { opacity: 1, y: 0 };
const CONTAINER_TRANSITION = {
  duration: 0.4,
  ease: "easeOut" as const,
};

const HoverExpand_002 = React.memo(function HoverExpand_002({
  images,
  className,
}: HoverExpand_002Props) {
  const [activeImage, setActiveImage] = useState<number | null>(0);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleRowClick = useCallback((index: number) => {
    setActiveImage(index);
  }, []);

  const handleRowHover = useCallback((index: number) => {
    setActiveImage(index);
  }, []);

  const handleOpenModal = useCallback((cert: Certificate) => {
    setSelectedCert(cert);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCert(null);
  }, []);

  const renderedRows = useMemo(() => {
    return images.map((image, index) => (
      <CertificateRow
        key={image.code || index}
        image={image}
        index={index}
        isActive={activeImage === index}
        onClick={handleRowClick}
        onHover={handleRowHover}
        onOpenModal={handleOpenModal}
      />
    ));
  }, [images, activeImage, handleRowClick, handleRowHover, handleOpenModal]);

  return (
    <>
      <motion.div
        initial={CONTAINER_INITIAL}
        animate={CONTAINER_ANIMATE}
        transition={CONTAINER_TRANSITION}
        className={cn("relative w-full max-w-4xl mx-auto px-4", className)}
      >
        <div className="flex w-full flex-col gap-3">
          {renderedRows}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            certificate={selectedCert}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
});

export { HoverExpand_002 };