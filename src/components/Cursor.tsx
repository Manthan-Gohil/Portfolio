'use client';

import { useEffect, useRef } from 'react';

const CASE_TARGETS =
  'a[href*="#/work/"], .track-l a, .track-r a, .mobile-slide, .work-index-row';

export function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const label = labelRef.current;
    if (!wrap || !label) return;

    const hasCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hasCoarse || reduced) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let visible = false;

    wrap.style.opacity = '0';

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      wrap.style.transform = `translate3d(${rx - wrap.offsetWidth / 2}px, ${
        ry - wrap.offsetHeight / 2
      }px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        wrap.style.opacity = '1';
      }
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const isCase = !!t.closest?.(CASE_TARGETS);
      const isLink = !!t.closest?.('a, button, [role="button"]');
      label.textContent = isCase ? 'Open' : '';
      wrap.classList.toggle('-case', isCase);
      wrap.classList.toggle('-ring', isLink && !isCase);
    };

    const onLeave = () => {
      visible = false;
      wrap.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, true);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver, true);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="cursor" aria-hidden="true">
      <span ref={labelRef}>Open</span>
    </div>
  );
}