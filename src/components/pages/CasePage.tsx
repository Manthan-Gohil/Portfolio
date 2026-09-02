'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/lib/data';
import { PixelMosaic } from '@/components/home/PixelMosaic';

gsap.registerPlugin(ScrollTrigger);

export function CasePage({ id }: { id: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const projects = portfolioData.projects;
  const idx = projects.findIndex((p) => p.id === id);
  const project = projects[idx >= 0 ? idx : 0];
  const next = projects[(idx >= 0 ? idx : 0) + 1] ?? projects[0];

  useEffect(() => {
    document.body.classList.add('-case');
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      const blinds = gsap.utils.toArray<HTMLElement>('.case-blinds i', root);
      const img = root.querySelector('.case-hero-img');
      const title = gsap.utils.toArray<HTMLElement>('.case-title-line > span', root);
      const meta = root.querySelector('.case-meta');
      const idxEl = root.querySelector('.case-idx');

      gsap.set(blinds, { scaleY: 1 });
      blinds.forEach((b, i) => {
        gsap.set(b, { transformOrigin: i % 2 ? '50% 0%' : '50% 100%' });
      });
      gsap.set(img, { scale: 1.22 });
      gsap.set(title, { yPercent: 110 });
      gsap.set(meta, { autoAlpha: 0, y: 24 });
      gsap.set(idxEl, { autoAlpha: 0, x: 20 });

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(img, { scale: 1, duration: 1.4, ease: 'power2.out' })
        .to(
          blinds,
          {
            scaleY: 0,
            duration: 0.7,
            stagger: { each: 0.05, from: 'start' },
            ease: 'power4.inOut',
          },
          0.4
        )
        .to(title, { yPercent: 0, duration: 1, stagger: 0.1 }, '-=0.3')
        .to(idxEl, { autoAlpha: 1, x: 0, duration: 0.6 }, '-=0.7')
        .to(meta, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.5');

      gsap.to(img, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.querySelector('.case-hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      const parallaxImgs = gsap.utils.toArray<HTMLElement>('.case-prl img', root);
      parallaxImgs.forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.15, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el.parentElement, start: 'top 100%', end: 'bottom 30%', scrub: 1 },
          }
        );
      });

      const blocks = gsap.utils.toArray<HTMLElement>('.case-anim-block', root);
      gsap.set(blocks, { autoAlpha: 0, y: 50 });
      gsap.to(blocks, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 45%', once: true },
      });

      const stats = gsap.utils.toArray<HTMLElement>('.case-stats div', root);
      gsap.set(stats, { autoAlpha: 0, y: 50 });
      gsap.to(stats, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.case-stats', start: 'top 88%', once: true },
      });
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.classList.remove('-case');
    };
  }, [project]);

  return (
    <article ref={rootRef} aria-labelledby="case-title">
      {/* Hero */}
      <div className="case-hero relative h-[88svh] overflow-hidden flex items-end">
        <Image
          src={project.imgs[0]}
          alt={`${project.name} — hero image of the project`}
          fill
          sizes="100vw"
          priority
          className="case-hero-img object-cover filter brightness-60"
        />
        <div className="case-blinds absolute inset-0 z-[3] flex flex-col pointer-events-none" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <i key={i} className="flex-1 bg-black block w-full" />
          ))}
        </div>
        <div
          className="case-idx absolute z-[2] top-[104px] right-pad font-semibold tracking-[-0.02em] text-[clamp(40px,7vw,110px)] text-grey/30 num"
          aria-hidden="true"
        >
          {String(idx >= 0 ? idx + 1 : 1).padStart(2, '0')}
        </div>
        <h1
          id="case-title"
          className="relative z-[2] px-pad pb-[6vh] font-semibold uppercase tracking-[-0.03em] leading-[0.94] text-[clamp(52px,10.5vw,170px)]"
        >
          {project.title.map((t, i) => (
            <span key={i} className="case-title-line block overflow-hidden">
              <span className="inline-block">{t}</span>
            </span>
          ))}
        </h1>
      </div>

      {/* Metadata Bar */}
      <div className="case-meta grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4.5 py-6 px-pad border-b border-line">
        <div>
          <small className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-mut mb-1.5">
            Category
          </small>
          <b className="font-semibold text-[15px]">{project.client}</b>
        </div>
        <div>
          <small className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-mut mb-1.5">
            Role
          </small>
          <b className="font-semibold text-[15px]">{project.role}</b>
        </div>
        <div>
          <small className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-mut mb-1.5">
            Stack & Architecture
          </small>
          <b className="font-semibold text-[15px]">{project.services}</b>
        </div>
        <div>
          <small className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-mut mb-1.5">
            Year
          </small>
          <b className="font-semibold text-[15px] num">{project.year}</b>
        </div>
        {(project.github || project.live) && (
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-center gap-3 pt-2 lg:pt-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border border-line hover:border-orange hover:text-orange transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full bg-orange text-black font-bold hover:bg-white transition-colors"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        )}
      </div>

      {/* The Brief */}
      <div className="case-anim-block py-[clamp(56px,9vh,110px)] px-pad grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 md:gap-[clamp(24px,4vw,80px)]">
        <span className="lbl !text-orange">The brief</span>
        <p className="text-[clamp(20px,2.3vw,32px)] leading-[1.32] font-medium tracking-[-0.01em]">
          {project.intro}
        </p>
      </div>

      {/* Full Bleed Visual */}
      <figure className="case-prl relative overflow-hidden mx-pad aspect-[16/9]">
        <Image
          src={project.imgs[3] ?? project.imgs[0]}
          alt={`${project.name} — design overview`}
          fill
          sizes="100vw"
          className="object-cover scale-[1.15] will-change-transform"
        />
      </figure>

      {/* The Problem */}
      <div className="case-anim-block py-[clamp(56px,9vh,110px)] px-pad grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 md:gap-[clamp(24px,4vw,80px)]">
        <h3 className="font-semibold uppercase tracking-[-0.02em] text-[clamp(24px,3.2vw,44px)]">
          The <span className="text-orange">problem</span>
        </h3>
        <div>
          <p className="text-mut max-w-[56ch] mb-4 text-base leading-relaxed">
            {project.challenge}
          </p>
        </div>
      </div>

      {/* Duo Visuals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(14px,2vw,28px)] mx-pad my-[clamp(14px,2vw,28px)]">
        <figure className="case-prl relative overflow-hidden aspect-[4/5]">
          <Image
            src={project.imgs[1] ?? project.imgs[0]}
            alt={`${project.name} — interface detail 1`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover scale-[1.15] will-change-transform"
          />
        </figure>
        <figure className="case-prl relative overflow-hidden aspect-[4/5]">
          <Image
            src={project.imgs[2] ?? project.imgs[0]}
            alt={`${project.name} — interface detail 2`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover scale-[1.15] will-change-transform"
          />
        </figure>
      </div>

      {/* The Move */}
      <div className="case-anim-block py-[clamp(56px,9vh,110px)] px-pad grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 md:gap-[clamp(24px,4vw,80px)]">
        <h3 className="font-semibold uppercase tracking-[-0.02em] text-[clamp(24px,3.2vw,44px)]">
          The <span className="text-orange">move</span>
        </h3>
        <div>
          <p className="text-mut max-w-[56ch] mb-4 text-base leading-relaxed">
            {project.approach}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="case-stats grid grid-cols-1 sm:grid-cols-3 gap-0.5 px-pad pb-[clamp(56px,9vh,110px)]">
        {project.stats.map(([val, label], i) => (
          <div key={i} className="border-t-2 border-orange pt-3">
            <b className="block font-semibold tracking-[-0.03em] text-[clamp(34px,4.6vw,70px)] leading-none text-orange num">
              {val}
            </b>
            <small className="text-[11px] font-semibold tracking-[0.12em] uppercase text-mut">
              {label}
            </small>
          </div>
        ))}
      </div>

      {/* Transition to Next Project */}
      <PixelMosaic variant="toGrey" />

      {/* Next Project Teaser */}
      <a
        className="block py-[clamp(64px,11vh,130px)] px-pad text-center bg-grey text-black group cursor-pointer transition-colors duration-300"
        href={`#/work/${next.id}`}
      >
        <small className="text-[11px] font-semibold tracking-[0.16em] uppercase text-mut-l block">
          Next project
        </small>
        <span className="block font-semibold uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(48px,9.5vw,150px)] mt-3 transition-colors duration-300 group-hover:text-orange">
          {next.name} &rarr;
        </span>
      </a>
    </article>
  );
}