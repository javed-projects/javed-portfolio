"use client";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  FileText,
  X,
  ExternalLink,
  Sparkles,
  RefreshCw,
} from "lucide-react";

// Local cn helper to prevent dependencies on deleted utility files
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 127.14 96.36"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.8-.59,1.57-1.22,2.31-1.88a75.14,75.14,0,0,0,73.41,0c.74,0.66,1.51,1.29,2.31,1.88a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,123.48,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
  </svg>
);

export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SocialFlipButtonProps {
  items?: SocialItem[];
  className?: string;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}

const defaultItems: SocialItem[] = [
  { letter: "C", icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Gmail", href: "mailto:mdj32807@gmail.com" },
  { letter: "O", icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />, label: "LinkedIn", href: "https://www.linkedin.com/in/md-javed-da" },
  { letter: "N", icon: <Github className="w-5 h-5 sm:w-6 sm:h-6" />, label: "GitHub", href: "https://github.com/javed-projects" },
  { letter: "T", icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Instagram", href: "https://instagram.com/4u.javed" },
  { letter: "A", icon: <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />, label: `Twitter/X: "No tweets... I prefer building projects."`, href: "https://x.com" },
  { letter: "C", icon: <DiscordIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: `Discord: "Are you a gamer? 😄 I don't have Discord."`, href: "https://discord.gg" },
  { letter: "T", icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Resume (CV)", href: "/Javed_CV.pdf" },
];

const SocialFlipNode = ({
  item,
  index,
  isHovered,
  itemClassName,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
  key?: any;
}) => {
  const [isNodeHovered, setIsNodeHovered] = useState(false);
  const hasClick = typeof item.onClick === "function";
  const Wrapper = item.href && item.href !== "#" && !hasClick ? "a" : "div";
  const wrapperProps = item.href && item.href !== "#" && !hasClick
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: item.onClick };

  return (
    <Wrapper
      {...wrapperProps}
      className={cn("relative h-10 w-10 cursor-pointer select-none", itemClassName)}
      onMouseEnter={() => setIsNodeHovered(true)}
      onMouseLeave={() => setIsNodeHovered(false)}
    >
      <AnimatePresence>
        {isNodeHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -52, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 z-50 pointer-events-none whitespace-nowrap rounded-lg bg-neutral-950 px-4 pt-2 pb-2.5 text-sm md:text-base font-bold text-white shadow-2xl dark:bg-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 flex flex-col items-center justify-center"
          >
            <span className="relative z-10">{item.label}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rotate-45 bg-neutral-950 dark:bg-white border-b border-r border-neutral-800 dark:border-neutral-200 z-0" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full" style={{ perspective: "1000px" }}>
        <motion.div
          className="relative h-full w-full"
          initial={false}
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 150,
            damping: 18,
          }}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {/* Front - Letter */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-50 text-lg font-bold text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-600",
              frontClassName
            )}
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {item.letter}
          </div>

          {/* Back - Icon */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-700 text-lg text-white dark:bg-neutral-100 dark:text-black border border-neutral-600 dark:border-neutral-200",
              backClassName
            )}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(0)",
            }}
          >
            {item.icon}
          </div>
        </motion.div>
      </div>

      {/* Invisible flat overlay to ensure hover stays perfectly continuous and stable during 3D card rotation */}
      <div className="absolute inset-0 bg-black/0 z-20 rounded-lg cursor-pointer" />
    </Wrapper>
  );
};

export default function SocialFlipButton({
  items = defaultItems,
  className,
  itemClassName,
  frontClassName,
  backClassName,
}: SocialFlipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeModal, setActiveModal] = useState<"discord" | "twitter" | null>(null);
  
  // Test/simulation states
  const [isTesting, setIsTesting] = useState(false);
  const [testRun, setTestRun] = useState(false);

  const handleOpenModal = (type: "discord" | "twitter") => {
    setActiveModal(type);
    setIsTesting(false);
    setTestRun(false);
  };

  const runTest = () => {
    setIsTesting(true);
    setTestRun(false);
    setTimeout(() => {
      setIsTesting(false);
      setTestRun(true);
    }, 850);
  };

  const mappedItems = items.map((item) => {
    if (item.label.includes("Twitter/X")) {
      return {
        ...item,
        onClick: () => handleOpenModal("twitter"),
      };
    }
    if (item.label.includes("Discord")) {
      return {
        ...item,
        onClick: () => handleOpenModal("discord"),
      };
    }
    return item;
  });

  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      <div
        className="group relative flex flex-wrap items-center justify-center gap-2 rounded-2xl p-4 bg-transparent border border-neutral-200/10 dark:border-neutral-800/20 mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-black/30 to-transparent dark:via-white/30"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-black/30 to-transparent dark:via-white/30"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        {mappedItems.map((item, index) => (
          <SocialFlipNode
            key={index}
            item={item}
            index={index}
            isHovered={isHovered}
            itemClassName={itemClassName}
            frontClassName={frontClassName}
            backClassName={backClassName}
          />
        ))}
      </div>

      {/* Modals overlay */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-[#121212] border border-neutral-800/80 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl text-[#D7E2EA] z-10"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-20 text-neutral-400 hover:text-white transition-colors duration-150 p-1.5 rounded-full bg-black/30 hover:bg-black/60 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === "discord" ? (
                <div>
                  {/* Top Banner (Discord Theme) */}
                  <div className="h-24 bg-[#5865F2] relative flex items-end px-6">
                    <div className="absolute -bottom-8 left-6 h-16 w-16 rounded-full border-4 border-[#121212] bg-[#5865F2] flex items-center justify-center shadow-lg">
                      <DiscordIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="pt-10 px-6 pb-6 text-left">
                    {/* Username Title */}
                    <div className="flex items-center gap-2 mt-1">
                      <h3 className="text-xl font-bold text-white">Javed</h3>
                      <span className="bg-[#5865F2]/20 text-[#5865F2] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#5865F2]/30 uppercase tracking-wider">
                        Discord
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-medium">@4u.javed</p>

                    {/* The List of People / Connections Section */}
                    <div className="mt-5 border-t border-neutral-800/80 pt-4">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3">
                        Connections (List of contacts)
                      </h4>
                      <div className="space-y-2.5">
                        {/* Discord list entry */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/50">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 flex items-center justify-center font-bold text-[#5865F2] text-xs">
                              🎮
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                                Javed <span className="text-[10px] text-[#5865F2] font-semibold bg-[#5865F2]/10 px-1 py-0.2 rounded">Discord</span>
                              </p>
                              <p className="text-[11px] text-neutral-400 truncate">Are you a gamer? 😄 I don't have Discord.</p>
                            </div>
                          </div>
                        </div>

                        {/* Email connection */}
                        <a
                          href="mailto:mdj32807@gmail.com"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/20 hover:bg-neutral-900/60 border border-neutral-800/30 hover:border-neutral-800/70 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center font-bold text-pink-400 text-xs">
                              ✉️
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">mdj32807@gmail.com</p>
                              <p className="text-[11px] text-neutral-400">Primary contact</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase font-bold bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded border border-pink-500/30">
                              Gmail
                            </span>
                            <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-pink-400 transition-colors" />
                          </div>
                        </a>

                        {/* LinkedIn connection */}
                        <a
                          href="https://www.linkedin.com/in/md-javed-da"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/20 hover:bg-neutral-900/60 border border-neutral-800/30 hover:border-neutral-800/70 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center font-bold text-[#0A66C2] text-xs">
                              💼
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-[#0A66C2] transition-colors">Javed Da</p>
                              <p className="text-[11px] text-neutral-400">Professional network</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase font-bold bg-[#0A66C2]/20 text-[#0A66C2] px-2 py-0.5 rounded border border-[#0A66C2]/30">
                              LinkedIn
                            </span>
                            <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-[#0A66C2] transition-colors" />
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Connection Test / Diagnostic */}
                    <div className="mt-5 border-t border-neutral-800/80 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500">
                          Connection Diagnostic Test
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono border border-amber-500/20">
                          Offline Mode
                        </span>
                      </div>

                      <button
                        onClick={runTest}
                        disabled={isTesting}
                        className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#5865F2] to-[#7289DA] hover:opacity-95 text-white text-sm font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isTesting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Pinging Mock Server...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Run Funny Text Test
                          </>
                        )}
                      </button>

                      <AnimatePresence mode="wait">
                        {testRun && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-3.5 p-3 rounded-xl bg-[#1e1f22] border border-[#2f3136] relative overflow-hidden"
                          >
                            <div className="flex gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                                🎮
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-xs font-bold text-white">Javed</span>
                                  <span className="text-[9px] px-1 py-0.1 rounded bg-[#5865F2] text-white font-bold uppercase tracking-tight scale-90">
                                    Discord
                                  </span>
                                  <span className="text-[9px] text-neutral-400">Just now</span>
                                </div>
                                <p className="text-xs text-neutral-200 mt-1 leading-relaxed bg-[#2b2d31] p-2 rounded-lg border border-neutral-800 select-all font-sans">
                                  "Are you a gamer? 😄 I don't have Discord."
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Top Banner (Twitter / X Theme) */}
                  <div className="h-24 bg-[#1DA1F2] relative flex items-end px-6">
                    <div className="absolute -bottom-8 left-6 h-16 w-16 rounded-full border-4 border-[#121212] bg-black flex items-center justify-center shadow-lg">
                      <Twitter className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="pt-10 px-6 pb-6 text-left">
                    {/* Username Title */}
                    <div className="flex items-center gap-2 mt-1">
                      <h3 className="text-xl font-bold text-white">Javed</h3>
                      <span className="bg-[#1DA1F2]/20 text-[#1DA1F2] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1DA1F2]/30 uppercase tracking-wider">
                        Creator
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-medium">@4u.javed</p>

                    {/* The List of People / Connections Section */}
                    <div className="mt-5 border-t border-neutral-800/80 pt-4">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3">
                        Connections (List of contacts)
                      </h4>
                      <div className="space-y-2.5">
                        {/* Twitter status entry */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/50">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 flex items-center justify-center font-bold text-[#1DA1F2] text-xs">
                              🐦
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                                Javed <span className="text-[10px] text-[#1DA1F2] font-semibold bg-[#1DA1F2]/10 px-1 py-0.2 rounded">Twitter/X</span>
                              </p>
                              <p className="text-[11px] text-neutral-400 truncate">No tweets... I prefer building projects.</p>
                            </div>
                          </div>
                        </div>

                        {/* GitHub Connection */}
                        <a
                          href="https://github.com/javed-projects"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/20 hover:bg-neutral-900/60 border border-neutral-800/30 hover:border-neutral-800/70 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-neutral-700/30 border border-neutral-600/30 flex items-center justify-center font-bold text-neutral-300 text-xs">
                              💻
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">javed-projects</p>
                              <p className="text-[11px] text-neutral-400">Open-source contributions</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase font-bold bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
                              GitHub
                            </span>
                            <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-pink-400 transition-colors" />
                          </div>
                        </a>

                        {/* LinkedIn connection */}
                        <a
                          href="https://www.linkedin.com/in/md-javed-da"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/20 hover:bg-neutral-900/60 border border-neutral-800/30 hover:border-neutral-800/70 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center font-bold text-[#0A66C2] text-xs">
                              💼
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-[#0A66C2] transition-colors">Javed Da</p>
                              <p className="text-[11px] text-neutral-400">Professional network</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase font-bold bg-[#0A66C2]/20 text-[#0A66C2] px-2 py-0.5 rounded border border-[#0A66C2]/30">
                              LinkedIn
                            </span>
                            <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-[#0A66C2] transition-colors" />
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Status Diagnostic Section */}
                    <div className="mt-5 border-t border-neutral-800/80 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500">
                          Twitter/X Status Test
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500 font-mono border border-teal-500/20">
                          Static Feed
                        </span>
                      </div>

                      <button
                        onClick={runTest}
                        disabled={isTesting}
                        className="w-full py-2 px-4 rounded-xl bg-white hover:bg-neutral-100 text-black text-sm font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isTesting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-black" />
                            Fetching Tweet...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-[#1DA1F2]" />
                            Run Tweet Mock Test
                          </>
                        )}
                      </button>

                      <AnimatePresence mode="wait">
                        {testRun && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-3.5 p-3 rounded-xl bg-black border border-neutral-800 relative overflow-hidden"
                          >
                            <div className="flex gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                🐦
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-white hover:underline cursor-pointer">Javed</span>
                                  <span className="text-[10px] text-neutral-500">@4u.javed</span>
                                  <span className="text-[10px] text-neutral-500">•</span>
                                  <span className="text-[10px] text-neutral-500">Just now</span>
                                </div>
                                <p className="text-xs text-neutral-200 mt-1 leading-relaxed select-all font-sans bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/50">
                                  "No tweets... I prefer building projects."
                                </p>
                                <div className="flex items-center justify-between text-neutral-600 mt-2.5 max-w-[160px] text-[10px]">
                                  <span className="hover:text-blue-400 cursor-pointer">💬 0</span>
                                  <span className="hover:text-green-400 cursor-pointer">🔁 0</span>
                                  <span className="hover:text-red-400 cursor-pointer">❤️ 99+</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}