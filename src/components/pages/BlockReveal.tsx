'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlockRevealProps {
  children: React.ReactNode;
  className?: string;
  blockColor?: string;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'span';
}

export function BlockReveal({
  children,
  className = '',
  blockColor = '#ff5c00',
  delay = 0,
  duration = 0.65,
  as: Component = 'div',
}: BlockRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const block = blockRef.current;
    const content = contentRef.current;
    if (!el || !block || !content) return;

    gsap.set(content, { opacity: 0 });
    gsap.set(block, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      paused: true,
      delay,
    });

    tl.to(block, {
      scaleX: 1,
      duration: duration * 0.6,
      ease: 'power4.inOut',
    })
      .set(content, { opacity: 1 })
      .set(block, { transformOrigin: 'right center' })
      .to(block, {
        scaleX: 0,
        duration: duration * 0.6,
        ease: 'power4.inOut',
      });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [delay, duration]);

  return React.createElement(
    Component,
    {
      ref: containerRef,
      className: `relative inline-block overflow-hidden ${className}`,
    },
    <>
      <span ref={contentRef} className="block">
        {children}
      </span>
      <span
        ref={blockRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: blockColor }}
        aria-hidden="true"
      />
    </>
  );
}
