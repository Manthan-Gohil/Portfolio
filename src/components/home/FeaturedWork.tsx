'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedWork() {
  const rootRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  const projects = portfolioData.projects.filter((p) => p.featured);
  const total = portfolioData.projects.length;
  const n = projects.length;
  const reversed = [...projects].reverse();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      const head = root.querySelector('.work-head');
      if (head) {
        gsap.set(head, { autoAlpha: 0, y: 30 });
        gsap.to(head, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: head, start: 'top 85%', once: true },
        });
      }

      const wshow = root.querySelector<HTMLElement>('#wshow');
      const trackL = root.querySelector<HTMLElement>('.track-l');
      const trackR = root.querySelector<HTMLElement>('.track-r');
      const countEl = root.querySelector<HTMLElement>('#showCur');

      // Desktop counter-scrolling split showcase
      if (wshow && trackL && trackR && window.innerWidth >= 821) {
        const step = 100 / n;
        gsap.set(trackR, { yPercent: -step * (n - 1) });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wshow,
            start: 'top top',
            end: `+=${n * 100}%`,
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const i = Math.min(n - 1, Math.floor(self.progress * (n - 1) + 0.5));
              setCurrent(i);
              if (countEl) countEl.textContent = String(i + 1).padStart(2, '0');
            },
          },
        });

        for (let i = 0; i < n - 1; i++) {
          tl.to({}, { duration: 0.55 })
            .to(trackL, {
              yPercent: -step * (i + 1),
              duration: 1,
              ease: 'power3.inOut',
            })
            .to(
              trackR,
              {
                yPercent: -step * (n - 1 - (i + 1)),
                duration: 1,
                ease: 'power3.inOut',
              },
              '<'
            );
        }
        tl.to({}, { duration: 0.55 });
      }

      // Mobile slide animations
      const slides = gsap.utils.toArray<HTMLElement>('.mobile-slide', root);
      slides.forEach((slide) => {
        const img = slide.querySelector('img');
        const ui = slide.querySelector('.mobile-ui');
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: slide, start: 'top 90%', once: true },
          });
        }
        if (ui) {
          gsap.fromTo(
            ui,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: slide, start: 'top 70%', once: true },
            }
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [n]);

  return (
    <section ref={rootRef} className="relative" id="work" aria-labelledby="work-title">
      <div className="work-head flex justify-between items-baseline text-mut pt-[clamp(70px,11vh,140px)] pb-[clamp(24px,4vh,44px)] px-pad">
        <span className="lbl" id="work-title">
          Featured Work
        </span>
        <span className="lbl -plain num">{String(n).padStart(2, '0')} — selected</span>
      </div>

      {/* Desktop split column counter-scroller */}
      <div className="hidden md:block relative h-[100svh] overflow-hidden bg-black" id="wshow">
        <span className="absolute left-pad bottom-[clamp(24px,5vh,48px)] z-50 text-[13px] font-bold tracking-[0.1em] text-grey pointer-events-none bg-black py-2 px-3">
          <b id="showCur" className="text-orange">
            {String(current + 1).padStart(2, '0')}
          </b>{' '}
          / {String(n).padStart(2, '0')}
        </span>
        <span className="absolute right-pad top-24 z-50 text-[11px] font-semibold tracking-[0.14em] uppercase text-grey/60 pointer-events-none">
          Keep scrolling
        </span>

        {/* Left Column */}
        <div className="absolute top-0 left-0 h-full w-[calc(50%+1px)] overflow-hidden">
          <div className="track-l absolute top-0 left-0 w-full will-change-transform" style={{ height: `${n * 100}%` }}>
            {projects.map((p) => (
              <Cell key={p.id} project={p} n={n} isRight={false} />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="absolute top-0 left-[calc(50%-1px)] h-full w-[calc(50%+1px)] overflow-hidden">
          <div className="track-r absolute top-0 left-0 w-full will-change-transform" style={{ height: `${n * 100}%` }}>
            {reversed.map((p) => (
              <Cell key={p.id} project={p} n={n} isRight={true} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Slides fallback */}
      <div className="block md:hidden">
        {projects.map((p, i) => (
          <a
            key={p.id}
            className="mobile-slide relative block h-[70svh] mx-pad mb-3.5 overflow-hidden group"
            href={`#/work/${p.id}`}
            aria-label={`${p.name} — open case study`}
          >
            <Image
              src={p.imgs[0]}
              alt={`${p.name} — project visual`}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/65" />
            <div className="mobile-ui absolute inset-0 z-[2] flex flex-col justify-between p-5">
              <div className="flex justify-between items-baseline gap-3">
                <span className="lbl -plain num text-grey">
                  {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-grey">
                  {p.tags.slice(0, 2).join(' · ')}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(40px,12vw,76px)]">
                  {p.name}
                </span>
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-grey">
                  Read case <b className="text-orange font-bold">↗</b>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="flex justify-center py-[clamp(40px,7vh,80px)] px-pad">
        <a className="btnAll" href="#/work">
          All work <b>{String(total).padStart(2, '0')}</b>
        </a>
      </div>
    </section>
  );
}

function Cell({
  project,
  n,
  isRight,
}: {
  project: (typeof portfolioData.projects)[number];
  n: number;
  isRight: boolean;
}) {
  return (
    <div className="relative overflow-hidden w-full" style={{ height: `${100 / n}%` }}>
      <a
        className="absolute top-0 left-0 h-full w-[100vw] block group"
        style={{
          transform: isRight ? 'translateX(calc(-50% + 1px))' : 'none',
        }}
        href={`#/work/${project.id}`}
        aria-label={`${project.name} — open case study`}
      >
        <Image
          src={project.imgs[0]}
          alt={`${project.name} — project visual`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0c0c0c]/40 transition-colors duration-300 group-hover:bg-transparent" />
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-[clamp(14px,2.4vh,24px)] text-center px-pad">
          <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-grey">
            {project.tags.map((t, i) => (
              <span key={t}>
                {t}
                {i < project.tags.length - 1 && <i className="not-italic text-orange px-2">·</i>}
              </span>
            ))}
          </div>
          <span className="font-semibold uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(56px,10.5vw,180px)] transition-colors duration-300 group-hover:text-white whitespace-pre-line">
            {project.title.join('\n')}
          </span>
        </div>
      </a>
    </div>
  );
}