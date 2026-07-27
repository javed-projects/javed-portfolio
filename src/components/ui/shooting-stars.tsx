"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  starColorStop: string;
  trailColorStop: string;
}

const COLOR_PALETTES = [
  { starColor: "#FF2A6D", trailColor: "#FF5252" },
  { starColor: "#10B981", trailColor: "#34D399" },
  { starColor: "#FFFFFF", trailColor: "#CBD5E1" },
  { starColor: "#D8B4FE", trailColor: "#C084FC" },
  { starColor: "#00F2FE", trailColor: "#4FACFE" },
  { starColor: "#FFB800", trailColor: "#F59E0B" },
  { starColor: "#FF007F", trailColor: "#FF75C3" },
];

function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

const PREPROCESSED_PALETTES = COLOR_PALETTES.map((p) => ({
  starColorStop: hexToRgba(p.starColor, 1),
  trailColorStop: hexToRgba(p.trailColor, 0),
}));

const COS_45 = Math.cos((45 * Math.PI) / 180);
const SIN_45 = Math.sin((45 * Math.PI) / 180);
const RAD_45 = (45 * Math.PI) / 180;

export const ShootingStars = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const parent = canvas.parentElement;
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (parent) {
      resizeObserver.observe(parent);
    }

    const spawnStar = () => {
      const w = width || (typeof window !== "undefined" ? window.innerWidth : 1200);
      const h = height || (typeof window !== "undefined" ? window.innerHeight : 800);
      const palette = PREPROCESSED_PALETTES[Math.floor(Math.random() * PREPROCESSED_PALETTES.length)];

      const newStar: ShootingStar = {
        x: Math.random() * w,
        y: Math.random() * (h / 2),
        angle: 45,
        scale: 1,
        speed: Math.random() * 20 + 15,
        distance: 0,
        starColorStop: palette.starColorStop,
        trailColorStop: palette.trailColorStop,
      };

      const stars = starsRef.current;
      if (stars.length >= 9) {
        stars.shift();
      }
      stars.push(newStar);

      timeoutId = setTimeout(spawnStar, Math.random() * 800 + 400);
    };

    spawnStar();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;
      const limitX = width + 50;
      const limitY = height + 50;

      let writeIdx = 0;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.speed * COS_45;
        star.y += star.speed * SIN_45;
        star.distance += star.speed;
        star.scale = 1 + star.distance / 100;

        if (star.x <= limitX && star.y <= limitY) {
          stars[writeIdx++] = star;

          const rectWidth = 14 * star.scale;
          const rectHeight = 1.8;
          const cx = star.x + rectWidth / 2;
          const cy = star.y + 0.9;

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(RAD_45);
          ctx.scale(star.scale, 1);

          const grad = ctx.createLinearGradient(-7, -0.9, 7, 0.9);
          grad.addColorStop(0, star.trailColorStop);
          grad.addColorStop(1, star.starColorStop);

          ctx.fillStyle = grad;
          ctx.fillRect(-7, -0.9, 14, 1.8);
          ctx.restore();
        }
      }

      stars.length = writeIdx;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (parent) resizeObserver.unobserve(parent);
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full absolute inset-0 pointer-events-none", className)}
    />
  );
};