import React, { useRef, useEffect, CSSProperties } from 'react';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');

    const onPointerMove = (e: PointerEvent | { x: number; y: number }) => {
      // Handle both native PointerEvent (clientX/Y) and custom initialization object (x/y)
      const pointerX = 'clientX' in e ? e.clientX : e.x;
      const pointerY = 'clientY' in e ? e.clientY : e.y;

      const rect = container.getBoundingClientRect();
      const cellWidth = rect.width / columns;
      const cellHeight = rect.height / rows;

      items.forEach((item, index) => {
        const rIndex = Math.floor(index / columns);
        const cIndex = index % columns;

        // Mathematical calculation of the cell's center relative to the viewport
        const centerX = rect.left + (cIndex + 0.5) * cellWidth;
        const centerY = rect.top + (rIndex + 0.5) * cellHeight;

        const b = pointerX - centerX;
        const a = pointerY - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointerY > centerY ? 1 : -1);

        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    window.addEventListener('pointermove', onPointerMove as EventListener);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove as EventListener);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        '--rotate': `${baseAngle}deg`,
        transform: 'rotate(var(--rotate))',
        display: 'block',
        transformOrigin: 'center',
        willChange: 'transform',
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        transition: 'background-color 0.3s ease, width 0.3s ease, height 0.3s ease'
      } as CSSProperties}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        justifyItems: 'center',
        alignItems: 'center',
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
}
