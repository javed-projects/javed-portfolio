"use client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React, { useEffect, useState } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  starColor: string;
  trailColor: string;
}

const COLOR_PALETTES = [
  { starColor: "#FF2A6D", trailColor: "#FF5252" }, // Red
  { starColor: "#10B981", trailColor: "#34D399" }, // Emerald
  { starColor: "#FFFFFF", trailColor: "#CBD5E1" }, // White
  { starColor: "#D8B4FE", trailColor: "#C084FC" }, // Lavender
  { starColor: "#00F2FE", trailColor: "#4FACFE" }, // Cyan
  { starColor: "#FFB800", trailColor: "#F59E0B" }, // Gold
  { starColor: "#FF007F", trailColor: "#FF75C3" }, // Pink
];

export const ShootingStars = ({ className }: { className?: string }) => {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const spawnStar = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      const h = typeof window !== "undefined" ? window.innerHeight : 800;
      const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
      const newStar: ShootingStar = {
        id: Date.now() + Math.random(),
        x: Math.random() * w,
        y: Math.random() * (h / 2),
        angle: 45,
        scale: 1,
        speed: Math.random() * 20 + 15,
        distance: 0,
        starColor: palette.starColor,
        trailColor: palette.trailColor,
      };
      setStars((prev) => [...prev.slice(-8), newStar]);
      timeoutId = setTimeout(spawnStar, Math.random() * 800 + 400);
    };
    spawnStar();
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    let frameId: number;
    const moveStars = () => {
      setStars((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.speed * Math.cos((s.angle * Math.PI) / 180),
            y: s.y + s.speed * Math.sin((s.angle * Math.PI) / 180),
            distance: s.distance + s.speed,
            scale: 1 + s.distance / 100,
          }))
          .filter((s) => s.x <= (window.innerWidth || 1200) + 50 && s.y <= (window.innerHeight || 800) + 50)
      );
      frameId = requestAnimationFrame(moveStars);
    };
    frameId = requestAnimationFrame(moveStars);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <svg className={cn("w-full h-full absolute inset-0 pointer-events-none", className)}>
      <defs>
        {stars.map((star) => (
          <linearGradient key={`grad-${star.id}`} id={`grad-${star.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: star.trailColor, stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: star.starColor, stopOpacity: 1 }} />
          </linearGradient>
        ))}
      </defs>
      {stars.map((star) => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={14 * star.scale}
          height={1.8}
          fill={`url(#grad-${star.id})`}
          transform={`rotate(${star.angle}, ${star.x + (14 * star.scale) / 2}, ${star.y + 0.9})`}
        />
      ))}
    </svg>
  );
};