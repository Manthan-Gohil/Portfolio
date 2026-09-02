'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Logo } from './Logo';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    const pct = pctRef.current;
    const grid = gridRef.current;
    if (!root || !fill || !pct || !grid) return;

    const cols = Math.max(8, Math.floor(window.innerWidth / 70));
    const rows = Math.max(5, Math.floor(window.innerHeight / 70));
    grid.innerHTML = '';
    const cells: HTMLElement[] = [];
    for (let i = 0; i < cols * rows; i++) {
      const c = document.createElement('i');
      c.className = 'bg-orange opacity-0 block w-full h-full';
      grid.appendChild(c);
      cells.push(c);
    }
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        const n = Math.round(counter.v);
        pct.textContent = String(n);
        fill.style.clipPath = `inset(${100 - n}% 0 0 0)`;
      },
    })
      .to('.loader-logo', {
        scale: 1.05,
        duration: 0.25,
        ease: 'power2.out',
      })
      .set(cells, { opacity: 1 })
      .set(root, { background: 'transparent' })
      .set('.loader-logo, .loader-pct, .loader-tag', { opacity: 0 })
      .to(cells, {
        opacity: 0,
        duration: 0.02,
        stagger: { amount: 0.7, from: 'random' },
      }, '<.05');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center pointer-events-auto"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loader-logo relative w-[min(62vmin,560px)] z-[2]">
        <Logo className="w-full h-auto block fill-[#1e1e1e]" />
        <div
          ref={fillRef}
          className="absolute inset-0 [clip-path:inset(100%_0_0_0)]"
        >
          <Logo className="w-full h-auto block fill-orange" />
        </div>
      </div>

      <p className="loader-tag lbl absolute left-pad bottom-[calc(clamp(20px,4vw,72px)*0.5+12px)] z-[2] text-mut">
        Manthan Gohil — Folio &rsquo;26
      </p>

      <div className="loader-pct num absolute right-pad bottom-[calc(clamp(20px,4vw,72px)*0.5)] z-[2] font-semibold tracking-[-0.03em] text-[clamp(70px,13vw,170px)] leading-none text-grey select-none">
        <span ref={pctRef}>0</span>
        <sup className="text-[0.26em] text-orange ml-1">%</sup>
      </div>

      <div
        ref={gridRef}
        className="absolute inset-0 z-[3] grid pointer-events-none"
      />
    </div>
  );
}