'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const SHOWCASE_ITEMS = [
  {
    image: '/images/hackathons/devxpo.jpg',
    title: 'DevXpo Hackathon 2025',
    rank: '1st Position • GDSC NSUT',
    highlight: 'Rapid Prototyping & Architecture',
  },
  {
    image: '/images/hackathons/hack-krmu.jpg',
    title: 'HACK KRMU 5.0',
    rank: 'Track Winner • HealthTech',
    highlight: 'Aayu.ai Ayurvedic Ecosystem',
  },
  {
    image: '/images/hackathons/sih.jpg',
    title: 'Smart India Hackathon 2025',
    rank: 'Runner-Up • National Finals',
    highlight: 'System Design & Problem Solving',
  },
  {
    image: '/images/hackathons/leetcode.jpg',
    title: 'LeetCode Problem Solving',
    rank: '180+ Solved • 50 Days Streak',
    highlight: 'C++ & Dynamic Programming',
  },
];

export function Loader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const pct = pctRef.current;
    if (!root || !pct) return;

    const counter = { v: 0 };
    const imgs = gsap.utils.toArray<HTMLElement>('.loader-img-item', root);

    // Initial setup: Image 1 visible and slightly scaled; others hidden and scaled up
    if (imgs[0]) {
      gsap.set(imgs[0], { scale: 1.2, opacity: 1 });
    }
    if (imgs.length > 1) {
      gsap.set(imgs.slice(1), { scale: 1.35, opacity: 0 });
    }

    const mainTl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Initial Curtain Revealers split open (exact animation from cg-kin-landing-page)
    mainTl
      .to('.revealer.r-1', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.9,
        ease: 'power4.inOut',
      }, 0)
      .to('.revealer.r-2', {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        duration: 0.9,
        ease: 'power4.inOut',
      }, 0);

    // 2. Real-time percentage counter: 0 -> 100%
    mainTl.to(counter, {
      v: 100,
      duration: 3.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const n = Math.round(counter.v);
        if (pct) pct.textContent = String(n);

        if (n < 25) {
          setActiveItemIndex(0);
        } else if (n < 50) {
          setActiveItemIndex(1);
        } else if (n < 75) {
          setActiveItemIndex(2);
        } else {
          setActiveItemIndex(3);
        }
      },
    }, 0);

    // 3. Image 1 scale down (cg-kin-landing-page: scaleTl.to('.img:first-child', { scale: 1 }))
    if (imgs[0]) {
      mainTl.to(imgs[0], {
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
      }, 0.1);
    }

    // 4. Sequential Image Scale & Crossfade Transitions
    // Image 2 enters at ~0.8s
    if (imgs[1]) {
      mainTl.to(imgs[1], {
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
      }, 0.85);
    }

    // Image 3 enters at ~1.6s
    if (imgs[2]) {
      mainTl.to(imgs[2], {
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
      }, 1.65);
    }

    // Image 4 enters at ~2.4s
    if (imgs[3]) {
      mainTl.to(imgs[3], {
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
      }, 2.45);
    }

    // 5. Final exit transition cleanly revealing the home screen page
    mainTl
      .to('.loader-info-card, .loader-pct, .loader-brand-tag', {
        opacity: 0,
        y: -15,
        duration: 0.35,
        ease: 'power2.in',
      }, '+=0.2')
      .to(root, {
        opacity: 0,
        scale: 1.04,
        duration: 0.65,
        ease: 'power3.inOut',
      }, '-=0.1');

    return () => {
      mainTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] bg-black overflow-hidden flex items-center justify-center pointer-events-auto"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Top and Bottom Horizontal Curtain Revealers (exact from cg-kin-landing-page) */}
      <div className="revealers absolute inset-0 z-40 pointer-events-none flex flex-col">
        <div
          className="revealer r-1 flex-1 w-full bg-[#0a0a09] border-b border-line/30"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <div
          className="revealer r-2 flex-1 w-full bg-[#0a0a09] border-t border-line/30"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
      </div>

      {/* Full-Screen Images Showcase (directly visible, scaling & crossfading) */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
        {SHOWCASE_ITEMS.map((item, idx) => (
          <div
            key={item.title}
            className="loader-img-item absolute inset-0 w-full h-full will-change-transform"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
            {/* Subtle cinematic vignette for clean contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
          </div>
        ))}
      </div>

      {/* Center Floating Glass Information Card */}
      <div className="loader-info-card relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-xl pointer-events-none drop-shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-orange/40 mb-3.5 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-orange">
            {SHOWCASE_ITEMS[activeItemIndex]?.rank}
          </span>
        </div>

        <h2 className="text-[clamp(28px,4.5vw,56px)] font-semibold uppercase tracking-[-0.03em] text-white leading-[1.02] drop-shadow-lg">
          {SHOWCASE_ITEMS[activeItemIndex]?.title}
        </h2>

        <p className="text-[13px] md:text-[14px] text-mut mt-2 tracking-wide font-medium max-w-[42ch]">
          {SHOWCASE_ITEMS[activeItemIndex]?.highlight}
        </p>

        {/* Milestone Indicator Ticker */}
        <div className="mt-4 flex items-center gap-2">
          {SHOWCASE_ITEMS.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeItemIndex === i ? 'w-8 bg-orange' : 'w-2 bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Top Left Watermark */}
      <div className="loader-brand-tag absolute left-pad top-pad z-30 flex items-center gap-3">
        <span className="font-semibold text-sm tracking-[-0.02em] uppercase text-white">
          Manthan Gohil
        </span>
        <span className="text-line">•</span>
        <span className="text-xs font-mono uppercase tracking-wider text-mut">
          Folio &rsquo;26
        </span>
      </div>

      {/* Bottom Left Active Milestone Count */}
      <p className="loader-brand-tag lbl absolute left-pad bottom-[calc(clamp(20px,4vw,72px)*0.5+14px)] z-30 text-mut flex items-center gap-2 font-mono">
        <span className="text-white font-bold">
          0{activeItemIndex + 1}
        </span>
        <span className="text-line">/</span>
        <span>0{SHOWCASE_ITEMS.length}</span>
        <span className="text-line ml-1">•</span>
        <span className="text-orange text-xs">
          {SHOWCASE_ITEMS[activeItemIndex]?.title}
        </span>
      </p>

      {/* Bottom Right Percentage Counter (Preserved Exactly as Requested) */}
      <div className="loader-pct num absolute right-pad bottom-[calc(clamp(20px,4vw,72px)*0.5)] z-30 font-semibold tracking-[-0.03em] text-[clamp(70px,13vw,170px)] leading-none text-grey select-none drop-shadow-2xl">
        <span ref={pctRef}>0</span>
        <sup className="text-[0.26em] text-orange ml-1">%</sup>
      </div>
    </div>
  );
}