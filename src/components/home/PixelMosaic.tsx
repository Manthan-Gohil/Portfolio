'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PixelMosaicProps {
  variant?: 'toGrey' | 'toBlack';
}

export function PixelMosaic({ variant = 'toGrey' }: PixelMosaicProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const grid = useMemo(() => {
    if (typeof window === 'undefined') return { cols: 18, rows: 4 };
    const cell = 44;
    const cols = Math.max(8, Math.ceil(window.innerWidth / cell));
    const h = Math.min(280, Math.max(150, window.innerHeight * 0.26));
    const rows = Math.max(2, Math.ceil(h / cell));
    return { cols, rows };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;
      const cells = gsap.utils.toArray<HTMLElement>('i', root);
      gsap.set(cells, { opacity: 0 });
      gsap.to(cells, {
        opacity: 1,
        duration: 0.6,
        stagger: { each: 0.008, from: 'random' },
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: root,
          start: 'top 92%',
          end: 'bottom 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const isToGrey = variant === 'toGrey';

  return (
    <div
      ref={rootRef}
      className={`grid w-full h-[clamp(150px,26vh,280px)] ${
        isToGrey ? 'bg-black' : 'bg-grey'
      }`}
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
        gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: grid.cols * grid.rows }).map((_, i) => (
        <i
          key={i}
          className={`block w-full h-full opacity-0 ${
            isToGrey ? 'bg-grey' : 'bg-black'
          }`}
        />
      ))}
    </div>
  );
}