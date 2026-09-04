'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function HackathonsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hackathons = portfolioData.hackathons;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Exactly matches /Animations/awwwards-scrolltrigger-pin-cards-main/index.html
      const pinCards = gsap.utils.toArray<HTMLElement>('.pin-card', container);

      pinCards.forEach((eachCard, index) => {
        if (index < pinCards.length - 1) {
          ScrollTrigger.create({
            trigger: eachCard,
            start: 'top top',
            endTrigger: pinCards[pinCards.length - 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
          });

          ScrollTrigger.create({
            trigger: pinCards[index + 1],
            start: 'top bottom',
            end: 'top top',
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(eachCard, {
                scale: 1 - progress * 0.22,
                rotation: index % 2 === 0 ? progress * 4 : -progress * 4,
                rotationX: index % 2 === 0 ? progress * 32 : -progress * 32,
                transformPerspective: 1000,
                transformOrigin: 'center center',
              });

              const overlay = eachCard.querySelector('.pin-overlay');
              if (overlay) {
                gsap.set(overlay, {
                  opacity: progress * 0.55,
                });
              }
            },
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, [hackathons.length]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a09]">
      {/* Intro Section (matches .intro from awwwards-scrolltrigger) */}
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 py-24 bg-[#0a0a09]">
        <span className="lbl !text-orange mb-3">Recognitions & Podiums</span>
        <h2 className="font-semibold uppercase tracking-[-0.035em] text-[clamp(36px,6vw,96px)] leading-[0.96] max-w-[18ch] text-white">
          Podium <span className="text-orange">Finishes</span> & DSA.
        </h2>
        <p className="text-mut text-[clamp(15px,1.4vw,19px)] max-w-[58ch] mt-5 leading-[1.6]">
          Competing under intense time limits to architect, build, and pitch complete working software systems that solve real human challenges.
        </p>
        <div className="mt-8 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-mut">
          <span>Scroll to explore</span>
          <span className="text-orange animate-bounce">↓</span>
        </div>
      </div>

      {/* Pinned Stacking Cards: One Achievement per Interface */}
      <div>
        {hackathons.map((h, i) => (
          <section
            key={h.title}
            className="pin-card relative w-full min-h-screen flex flex-col md:flex-row justify-between items-center px-[6vw] pt-[75px] pb-[110px] md:pt-[85px] md:pb-[120px] border-b border-line bg-[#111110] text-white overflow-hidden shadow-2xl"
            style={{ perspective: '1000px' }}
          >
            {/* Darkening Overlay for Scroll Swapping */}
            <div
              className="pin-overlay absolute inset-0 bg-black opacity-0 pointer-events-none z-20 transition-opacity"
              aria-hidden="true"
            />

            {/* Glowing Accent Top Line */}
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-orange/30 to-transparent z-10" />

            {/* Large Number Index (01), (02) - Elevated and positioned clearly */}
            <span className="text-[clamp(44px,7.5vw,130px)] font-bold text-mut/25 font-mono self-start md:self-center select-none leading-none mb-4 md:mb-0">
              ({String(i + 1).padStart(2, '0')})
            </span>

            {/* Pin Card Content (Elevated with compact spacing to guarantee bottom visibility) */}
            <div className="w-full md:w-[68%] flex flex-col items-start justify-center z-10 space-y-3.5 md:space-y-4">
              {/* Rank Badge & Event Info */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange bg-orange/15 border border-orange/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                  {h.rank}
                </span>
                <span className="text-[11.5px] font-semibold text-mut num">
                  {h.event} • {h.date}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-[clamp(24px,3.2vw,48px)] font-semibold uppercase tracking-[-0.03em] text-white leading-[1.02]">
                  {h.title}
                </h3>
                <p className="text-[12px] font-semibold text-orange tracking-wider uppercase mt-1">
                  {h.project}
                </p>
              </div>

              {/* Rich Photo Image Container (Optimized height to prevent bottom overflow) */}
              {h.image && (
                <div className="relative w-full aspect-[21/9] md:aspect-[16/7] max-h-[250px] md:max-h-[280px] rounded-2xl overflow-hidden border border-line/80 bg-black/60 shadow-xl group/img">
                  <Image
                    src={h.image}
                    alt={h.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 68vw"
                    className="object-cover scale-100 group-hover/img:scale-105 transition-transform duration-700 ease-folio"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                  {h.highlight && (
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-grey bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-line">
                      <span className="text-orange font-semibold">{h.highlight}</span>
                      <span className="hidden sm:inline text-mut">{h.event}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-mut text-[13.5px] md:text-[14.5px] leading-[1.55] max-w-[62ch]">
                {h.description}
              </p>

              {/* Tags & Action Link (Elevated and 100% visible) */}
              <div className="flex flex-wrap items-center justify-between w-full gap-3 pt-2.5 border-t border-line/40">
                <div className="flex flex-wrap gap-1.5">
                  {h.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] md:text-[10.5px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-md border border-line bg-black/50 text-mut"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {h.link && (
                  <a
                    href={h.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btnAll !py-2 !px-4 text-[11.5px] uppercase tracking-wider !inline-flex items-center gap-1.5"
                  >
                    View Project <b>↗</b>
                  </a>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Outro Section (matches .outro from awwwards-scrolltrigger) */}
      <div className="min-h-[50vh] flex flex-col justify-center items-center text-center px-6 py-20 bg-[#0a0a09] border-t border-line">
        <h2 className="font-semibold uppercase tracking-[-0.03em] text-[clamp(28px,4.5vw,68px)] text-white">
          Relentless <span className="text-orange">Execution.</span>
        </h2>
        <p className="text-mut text-[clamp(14px,1.2vw,17px)] max-w-[50ch] mt-3 leading-[1.6]">
          From 54-hour sleepless hackathons to daily algorithmic discipline — built to deliver real software value.
        </p>
      </div>
    </div>
  );
}
