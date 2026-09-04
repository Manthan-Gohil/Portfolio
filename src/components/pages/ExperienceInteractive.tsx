'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/lib/data';
import { BlockReveal } from './BlockReveal';
import { TextScramble } from './TextScramble';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const experiences = portfolioData.experiences;

  useEffect(() => {
    const container = containerRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    if (!container || !cardsWrapper) return;

    const cards = gsap.utils.toArray<HTMLElement>('.experience-pin-card', cardsWrapper);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Pinned stacking / swap animation inspired by awwwards-scrolltrigger-pin-cards-main
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          // Pin current card until the next card arrives and stacks over it
          ScrollTrigger.create({
            trigger: card,
            start: 'top 110px',
            endTrigger: cards[cards.length - 1],
            end: 'top 110px',
            pin: true,
            pinSpacing: false,
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });

          const nextCard = cards[index + 1];
          const overlay = card.querySelector('.card-overlay');

          ScrollTrigger.create({
            trigger: nextCard,
            start: 'top bottom',
            end: 'top 110px',
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;

              // 3D scale-down and tilt as it gets overridden
              gsap.set(card, {
                scale: 1 - progress * 0.08,
                rotationX: progress * 6,
                transformPerspective: 1000,
                transformOrigin: 'center top',
              });

              if (overlay) {
                gsap.set(overlay, {
                  opacity: progress * 0.75,
                });
              }

              if (progress > 0.5) {
                setActiveIndex(index + 1);
              } else {
                setActiveIndex(index);
              }
            },
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, [experiences.length]);

  return (
    <div ref={containerRef} className="relative pb-24 md:pb-36">
      {/* Section Header */}
      <div className="mb-12 md:mb-16">
        <span className="lbl text-orange">Career Track & Podiums</span>
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <BlockReveal
              as="h2"
              className="font-semibold uppercase tracking-[-0.03em] leading-[0.98] text-[clamp(32px,4.6vw,72px)]"
            >
              Professional Experience.
            </BlockReveal>
            <p className="text-mut text-[14px] max-w-[44ch] leading-[1.5] mt-3">
              Production engineering internships delivering full-stack React systems, live APIs, and high-fidelity SaaS platforms. Scroll to watch the milestone cards stack and swap.
            </p>
          </div>

          {/* Active Milestone Progress Indicator */}
          <div className="flex items-center gap-3 bg-black/60 border border-line rounded-full py-2 px-5 backdrop-blur-md self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-mut">
              Milestone <b className="text-white">0{activeIndex + 1}</b> / 0{experiences.length}
            </span>
            <span className="text-line">|</span>
            <span className="text-xs font-semibold text-orange tracking-wider uppercase">
              {experiences[activeIndex]?.company}
            </span>
          </div>
        </div>
      </div>

      {/* Pinned Stacking Cards Wrapper */}
      <div ref={cardsWrapperRef} className="relative space-y-16 md:space-y-36">
        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            className="experience-pin-card relative w-full min-h-[540px] md:h-[calc(100vh-170px)] max-h-[720px] rounded-3xl border border-line/80 bg-[#111110] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-400 group"
          >
            {/* Stacking Dark Dim Overlay (activated on scroll override) */}
            <div
              className="card-overlay absolute inset-0 bg-black pointer-events-none z-30 opacity-0 transition-opacity"
              aria-hidden="true"
            />

            {/* Subtle Top Glowing Line */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-orange/40 to-transparent z-10" />

            {/* Card Inner Grid */}
            <div className="h-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 p-6 md:p-10 lg:p-12 items-center">
              {/* Left Column: Details */}
              <div className="flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-orange bg-orange/10 border border-orange/20 px-3 py-1 rounded-full uppercase">
                      ( 0{i + 1} ) Milestone
                    </span>
                    <div className="text-[12px] font-semibold text-mut num flex items-center gap-2">
                      <span>{exp.period}</span>
                      <span className="text-line">•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Company & Role */}
                  <div className="mb-4">
                    <h3 className="text-[clamp(28px,3.8vw,56px)] font-semibold uppercase tracking-[-0.03em] text-white leading-none">
                      <TextScramble text={exp.company} />
                    </h3>
                    <p className="text-orange text-[clamp(14px,1.4vw,18px)] font-semibold uppercase tracking-[-0.01em] mt-2">
                      {exp.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-mut text-[clamp(14px,1.2vw,16px)] leading-[1.6] mb-6 max-w-[50ch]">
                    {exp.description}
                  </p>

                  {/* Impact Bullets */}
                  <ul className="space-y-2.5">
                    {exp.bullets.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-[13.5px] md:text-[14px] leading-[1.55] text-[#b8b8b2] flex items-start gap-3"
                      >
                        <span className="text-orange font-bold text-sm shrink-0 mt-0.5">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-line/50">
                  <small className="block text-[10px] font-bold tracking-[0.16em] uppercase text-mut mb-2.5">
                    Technologies Deployed
                  </small>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11.5px] font-semibold uppercase tracking-[0.06em] px-3 py-1 rounded-lg border border-line bg-black/60 text-grey hover:border-orange hover:text-white transition-colors duration-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Preview Media */}
              <div className="relative h-[260px] md:h-full w-full rounded-2xl overflow-hidden border border-line/80 bg-black/60 shadow-xl group/visual">
                {exp.image && (
                  <Image
                    src={exp.image}
                    alt={`${exp.company} production interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-100 group-hover/visual:scale-105 transition-transform duration-700 ease-folio"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Floating Metric Badge */}
                {exp.stats && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-orange border border-orange/30 shadow-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                      {exp.stats}
                    </span>
                  </div>
                )}

                {/* Caption / Watermark */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-mut bg-black/60 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-line">
                  <span className="uppercase tracking-wider text-grey">{exp.company} System</span>
                  <span>Production Ready</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
