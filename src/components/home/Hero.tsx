'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const profile = portfolioData.profile;

  useEffect(() => {
    const pool = profile.heroChips;
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      const lines = gsap.utils.toArray<HTMLElement>('.hero-line > span', root);
      const meta = root.querySelector('.hero-meta');
      const blurb = root.querySelector('.hero-blurb');
      const scroll = root.querySelector('.hero-scroll');
      const chips = gsap.utils.toArray<HTMLElement>('.hero-chip', root);

      gsap.set(lines, { yPercent: 110 });
      gsap.set(meta, { autoAlpha: 0, y: -14 });
      gsap.set(blurb, { autoAlpha: 0, y: 24 });
      gsap.set(scroll, { autoAlpha: 0, y: 12 });
      gsap.set(chips, { scale: 0, rotate: -8, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power4.out' } });
      tl.to(lines, { yPercent: 0, duration: 1.25, stagger: 0.12 })
        .to(meta, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=1.0')
        .to(
          chips,
          { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' },
          '-=0.7'
        )
        .to(blurb, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.6')
        .to(scroll, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.4');

      gsap.utils.toArray<HTMLElement>('.hero-line', root).forEach((line) => {
        const drift = parseFloat(line.dataset.drift ?? '0') || 0;
        gsap.to(line, {
          xPercent: drift,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      let idx = 0;
      const interval = window.setInterval(() => {
        idx = (idx + 1) % pool.length;
        const nextSrc = pool[idx];
        chips.forEach((chip) => {
          const img = chip.querySelector('img');
          if (!img) return;
          gsap.to(img, {
            autoAlpha: 0,
            scale: 1.3,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              img.src = nextSrc;
              gsap.fromTo(
                img,
                { autoAlpha: 0, scale: 0.8 },
                { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
              );
            },
          });
        });
      }, 3500);

      return () => window.clearInterval(interval);
    }, rootRef);

    return () => ctx.revert();
  }, [profile.heroChips]);

  return (
    <section
      ref={rootRef}
      className="min-h-[100svh] flex flex-col justify-end pb-[4vh] relative overflow-hidden section-pad"
      aria-labelledby="heroH1"
    >
      <div className="hero-meta flex justify-between gap-5 text-mut pt-[110px] mb-auto">
        <span className="lbl">{profile.name} — {profile.role}</span>
        <span className="lbl -plain">Portfolio — 2026</span>
      </div>

      <h1
        className="mt-[5vh] font-semibold uppercase tracking-[-0.035em] leading-[0.95] text-[clamp(38px,8vw,140px)] select-none"
        id="heroH1"
      >
        <span className="hero-line block overflow-hidden" data-drift="-8">
          <span className="inline-flex items-center gap-[0.18em] will-change-transform">
            I BUILD{' '}
            <span className="hero-chip inline-block h-[0.68em] w-[1.6em] rounded-full overflow-hidden align-middle relative origin-left">
              <img
                src={profile.heroChips[0]}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </span>
          </span>
        </span>
        <span className="hero-line block overflow-hidden" data-drift="6">
          <span className="inline-flex items-center gap-[0.18em] will-change-transform">
            INTELLIGENT
          </span>
        </span>
        <span
          className="hero-line block overflow-hidden pl-[clamp(16px,4vw,90px)]"
          data-drift="-5"
        >
          <span className="inline-flex items-center gap-[0.18em] will-change-transform">
            SYSTEMS <em className="o not-italic">THAT</em> SCALE{' '}
            <span className="hero-chip inline-block h-[0.68em] w-[1.6em] rounded-full overflow-hidden align-middle relative origin-left">
              <img
                src={profile.heroChips[1]}
                alt="Project Preview"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </span>
          </span>
        </span>
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-[4vh]">
        <p className="hero-blurb max-w-[44ch] text-mut text-[clamp(14px,1.1vw,17px)]">
          I'm Manthan Gohil, an AI & Full Stack Developer and CS student at BML Munjal University
          building agentic workflows, RAG pipelines, and production-ready applications with Next.js,
          TypeScript, Python, and LangGraph.
        </p>
        <div className="hero-scroll flex items-center gap-3 text-mut text-xs font-semibold tracking-[0.12em] uppercase">
          <span className="w-[9px] h-[9px] rounded-full bg-orange animate-blink" />
          Scroll
        </div>
      </div>
    </section>
  );
}