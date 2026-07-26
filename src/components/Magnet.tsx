import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;          // default 3
  padding?: number;           // default 150
  activeTransition?: string;   // default "transform 0.3s ease-out"
  inactiveTransition?: string; // default "transform 0.6s ease-in-out"
  className?: string;
  id?: string;
}

export default function Magnet({
  children,
  strength = 3,
  padding = 150,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
  id,
}: MagnetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Mouse distance from element center
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Determine mouse distance to closest edge of the bounding box
      const isInsideX = e.clientX >= rect.left && e.clientX <= rect.right;
      const isInsideY = e.clientY >= rect.top && e.clientY <= rect.bottom;

      let distanceToEdge = 0;
      if (!isInsideX || !isInsideY) {
        const dxEdge = e.clientX < rect.left ? rect.left - e.clientX : e.clientX > rect.right ? e.clientX - rect.right : 0;
        const dyEdge = e.clientY < rect.top ? rect.top - e.clientY : e.clientY > rect.bottom ? e.clientY - rect.bottom : 0;
        distanceToEdge = Math.hypot(dxEdge, dyEdge);
      }

      // Check if mouse is within the specified padding distance of element edge
      const isWithinPadding = distanceToEdge <= padding;

      if (isWithinPadding) {
        setIsActive(true);
        setPosition({
          x: dx / strength,
          y: dy / strength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, padding]);

  const style: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isActive ? activeTransition : inactiveTransition,
    willChange: 'transform',
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`inline-block ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
