"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

export const StarsBackground = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const starCount = Math.floor((rect.width * rect.height) * 0.0003);

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        radius: Math.random() * 0.8 + 0.6,
        opacity: Math.random() * 0.6 + 0.4,
      }));

      draw();
    };

    resize();

    const parent = canvas.parentElement;

    const observer = new ResizeObserver(() => {
      resize();
    });

    if (parent) {
      observer.observe(parent);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        className
      )}
    />
  );
};