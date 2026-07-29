// src/components/ui/shooting-stars.tsx
"use client";
import React, { useEffect, useRef } from "react";

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  maxDistance: number;
  colorObj: { r: number; g: number; b: number };
  trailLength: number;
  glowIntensity: number;
  opacity: number;
  thickness: number;
  driftFrequency: number;
  driftAmplitude: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const PALETTE = [
  { r: 158, g: 0, b: 255 },   // Purple
  { r: 46, g: 185, b: 223 },  // Blue
  { r: 0, g: 240, b: 255 },   // Cyan
  { r: 255, g: 255, b: 255 }, // White
  { r: 255, g: 82, b: 158 },  // Pink
  { r: 255, g: 179, b: 71 },  // Light Orange
];

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 3,
  maxSpeed = 8,
  minDelay = 400,
  maxDelay = 1200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 30,
  starHeight = 2,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<ShootingStar[]>([]);
  const nextSpawnTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const updateCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const createStar = (width: number, height: number): ShootingStar => {
      const roll = Math.random();
      let x, y, angle;

      if (roll < 0.40) {
        // 1. Top → Bottom Right (Primary cinematic direction ~40%)
        x = Math.random() * (width + 100) - 50;
        y = -50 - Math.random() * 30;
        angle = Math.random() * 20 + 35; // 35° to 55°
      } else if (roll < 0.75) {
        // 4. Top Right → Bottom Left (Primary cinematic direction ~35%)
        x = width * 0.3 + Math.random() * (width * 0.7 + 50);
        y = -50 - Math.random() * 30;
        angle = Math.random() * 20 + 125; // 125° to 145°
      } else if (roll < 0.80) {
        // 2. Left → Bottom Right (~5%)
        x = -50 - Math.random() * 30;
        y = Math.random() * (height * 0.4);
        angle = Math.random() * 20 + 15; // 15° to 35°
      } else if (roll < 0.85) {
        // 3. Right → Bottom Left (~5%)
        x = width + 50 + Math.random() * 30;
        y = Math.random() * (height * 0.4);
        angle = Math.random() * 20 + 145; // 145° to 165°
      } else if (roll < 0.90) {
        // 5. Top → Bottom Left (~5%)
        x = Math.random() * width;
        y = -50 - Math.random() * 30;
        angle = Math.random() * 20 + 120; // 120° to 140°
      } else if (roll < 0.95) {
        // 6. Left → Top Right (occasionally ~5%)
        x = -50 - Math.random() * 30;
        y = height * 0.3 + Math.random() * (height * 0.4);
        angle = Math.random() * 20 - 40; // -40° to -20°
      } else {
        // 7. Right → Bottom Right / Top-Right area down-right (~5%)
        x = width * 0.5 + Math.random() * (width * 0.5 + 50);
        y = -50 - Math.random() * 30;
        angle = Math.random() * 20 + 35; // 35° to 55°
      }

      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
      const colorObj = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const trailLength = Math.random() * 50 + 60; // Long cinematic trail
      const glowIntensity = Math.random() * 18 + 14; // Richer, smoother glow
      const opacity = Math.random() * 0.2 + 0.8;
      const maxDistance = Math.hypot(width, height) * 0.9;
      
      // Random trail thickness variation (subtle and realistic)
      const thickness = starHeight * (Math.random() * 0.6 + 0.7);
      
      // Extremely subtle atmospheric drift parameters using sinusoidal offset
      const driftFrequency = Math.random() * 0.02 + 0.01;
      const driftAmplitude = Math.random() * 0.4 + 0.2;

      return {
        x,
        y,
        angle,
        scale: Math.random() * 0.4 + 0.8,
        speed,
        distance: 0,
        maxDistance,
        colorObj,
        trailLength,
        glowIntensity,
        opacity,
        thickness,
        driftFrequency,
        driftAmplitude,
      };
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Adaptive density calculation based on screen size/area
      const screenArea = canvas.width * canvas.height;
      const maxConcurrent = Math.min(6, Math.max(2, Math.floor(screenArea / 300000)));

      // Spawn timing: use a single computed nextSpawnTimeRef
      if (starsRef.current.length < maxConcurrent && time >= nextSpawnTimeRef.current) {
        starsRef.current.push(createStar(canvas.width, canvas.height));
        const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
        nextSpawnTimeRef.current = time + randomDelay;
      }

      for (let i = starsRef.current.length - 1; i >= 0; i--) {
        const star = starsRef.current[i];

        ctx.save();
        const baseRadians = (star.angle * Math.PI) / 180;

        // Calculate a subtle atmospheric perpendicular drift offset using sinusoidal function based on traveled distance
        const driftOffset = Math.sin(star.distance * star.driftFrequency) * star.driftAmplitude;
        
        // Base linear movement coordinates
        const baseCurrentX = star.x;
        const baseCurrentY = star.y;

        // Apply perpendicular offset for natural atmospheric fluctuation without changing true heading angle
        const perpAngle = baseRadians + Math.PI / 2;
        const currentX = baseCurrentX + Math.cos(perpAngle) * driftOffset;
        const currentY = baseCurrentY + Math.sin(perpAngle) * driftOffset;

        // Smooth fade-in and fade-out based on travel distance
        const totalTravel = star.maxDistance;
        let fadeAlpha = 1;
        if (star.distance < 60) {
          fadeAlpha = star.distance / 60;
        } else if (star.distance > totalTravel - 120) {
          fadeAlpha = Math.max(0, (totalTravel - star.distance) / 120);
        }

        ctx.globalAlpha = Math.min(1, Math.max(0, star.opacity * fadeAlpha));

        const { r, g, b } = star.colorObj;
        ctx.shadowBlur = star.glowIntensity;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.95)`;

        ctx.lineWidth = star.thickness * star.scale;
        ctx.beginPath();
        const effectiveTrailWidth = starWidth * star.scale * (star.trailLength / 35);
        const tailX = currentX - Math.cos(baseRadians) * effectiveTrailWidth;
        const tailY = currentY - Math.sin(baseRadians) * effectiveTrailWidth;

        const gradient = ctx.createLinearGradient(currentX, currentY, tailX, tailY);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
        gradient.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, 0.6)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.strokeStyle = gradient;

        ctx.moveTo(currentX, currentY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Premium dual-layer meteor head
        // 1. Larger colored glow around the core using the meteor's own color
        ctx.beginPath();
        ctx.arc(currentX, currentY, star.thickness * star.scale * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
        ctx.fill();

        // 2. Small bright white core
        ctx.beginPath();
        ctx.arc(currentX, currentY, star.thickness * star.scale * 0.95, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.98)`;
        ctx.fill();

        ctx.restore();

        star.x += Math.cos(baseRadians) * star.speed;
        star.y += Math.sin(baseRadians) * star.speed;
        star.distance += star.speed;

        if (
          star.x < -150 ||
          star.x > canvas.width + 150 ||
          star.y < -150 ||
          star.y > canvas.height + 150 ||
          star.distance >= star.maxDistance
        ) {
          starsRef.current.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay, starColor, trailColor, starWidth, starHeight]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};