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
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 85%', once: true },
          }
        );
      });
    }, rootRef);

    return () => {
      document.body.classList.remove('-case');
      ctx.revert();
    };
  }, [id]);

  return (
    <article ref={rootRef} className="relative z-[1] overflow-x-hidden">
      {/* Hero Visual with Blinds */}
      <div className="case-hero relative h-[86svh] overflow-hidden">
        <div className="case-blinds absolute inset-0 z-[3] flex pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <i key={i} className="flex-1 h-full bg-black origin-top block will-change-transform" />
          ))}
        </div>

        <Image
          src={project.imgs[0]}
          alt={`${project.name} — project cover`}
          fill
          priority
          sizes="100vw"
          className="case-hero-img object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 z-[2]" />

        {/* Hero Title & Index */}
        <div className="absolute left-pad right-pad bottom-[clamp(28px,6vh,64px)] z-[4] flex justify-between items-end">
          <div className="lbl text-grey -plain">
            <span className="case-idx text-orange font-bold text-lg mr-3">
              {String((idx >= 0 ? idx : 0) + 1).padStart(2, '0')}
            </span>
            {project.tags.slice(0, 3).join(' · ')}
          </div>
        </div>

        <h1 className="absolute left-pad right-pad bottom-[clamp(70px,12vh,120px)] z-[4] font-semibold uppercase tracking-[-0.035em] leading-[0.92] text-[clamp(44px,9vw,150px)] max-w-[12ch]">
          {project.title.map((t, i) => (
            <span key={i} className="case-title-line block overflow-hidden">
              <span className="inline-block">{t}</span>
            </span>
          ))}
        </h1>
      </div>

      {/* Metadata & Direct Links Bar */}
      <div className="case-meta grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 py-6 px-pad border-b border-line bg-black/40 backdrop-blur-sm">
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
            Timeline
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
                className="text-[11px] font-bold uppercase tracking-[0.12em] px-4 py-2 rounded-full border border-line hover:border-orange hover:text-orange transition-colors flex items-center gap-1.5"
              >
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-orange text-black font-bold hover:bg-white transition-colors flex items-center gap-1.5"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        )}
      </div>

      {/* The Brief */}
      <div className="case-anim-block py-[clamp(56px,9vh,110px)] px-pad grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 md:gap-[clamp(24px,4vw,80px)]">
        <span className="lbl !text-orange">Project Overview</span>
        <p className="text-[clamp(20px,2.3vw,32px)] leading-[1.36] font-medium tracking-[-0.01em]">
          {project.intro}
        </p>
      </div>

      {/* System Architecture Flow Diagram */}
      {project.architecture && project.architecture.length > 0 && (
        <section className="case-anim-block px-pad pb-[clamp(50px,8vh,100px)]">
          <div className="p-6 md:p-10 border border-line rounded-2xl bg-[#111110]">
            <span className="lbl !text-mut mb-4 block">System Architecture & Pipeline</span>
            <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mt-4">
              {project.architecture.map((step, idx) => (
                <div key={step} className="flex items-center gap-2.5 md:gap-3">
                  <div className="px-4 py-2.5 rounded-lg border border-line bg-black flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-orange/15 text-orange text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-grey">
                      {step}
                    </span>
                  </div>
                  {idx < (project.architecture?.length ?? 0) - 1 && (
                    <span className="text-orange font-bold text-lg select-none">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full Bleed Parallax Visual */}
      <figure className="case-prl relative overflow-hidden mx-pad aspect-[16/9] rounded-xl">
        <Image
          src={project.imgs[3] ?? project.imgs[0]}
          alt={`${project.name} — interface overview`}
          fill
          sizes="100vw"
          className="object-cover scale-[1.15] will-change-transform"
        />
      </figure>

      {/* The Challenge & Approach */}
      <div className="case-anim-block py-[clamp(56px,9vh,110px)] px-pad grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[clamp(30px,5vw,90px)] border-b border-line">
        <div>
          <h3 className="font-semibold uppercase tracking-[-0.02em] text-[clamp(24px,3.2vw,40px)] mb-4">
            The <span className="text-orange">Challenge</span>
          </h3>
          <p className="text-mut text-[16px] leading-[1.65] max-w-[50ch]">
            {project.challenge}
          </p>
        </div>

        <div>
          <h3 className="font-semibold uppercase tracking-[-0.02em] text-[clamp(24px,3.2vw,40px)] mb-4">
            The <span className="text-orange">Engineering Solution</span>
          </h3>
          <p className="text-mut text-[16px] leading-[1.65] max-w-[50ch]">
            {project.approach}
          </p>
        </div>
      </div>

      {/* Core Features & Highlights Grid */}
      {project.features && project.features.length > 0 && (
        <section className="case-anim-block py-[clamp(56px,9vh,110px)] px-pad">
          <span className="lbl mb-6 block">Core Features & Technical Depth</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {project.features.map((f, i) => (
              <div
                key={f.title}
                className="p-6 md:p-8 border border-line rounded-xl bg-black/60 hover:border-orange/60 transition-colors duration-300 group"
              >
                <span className="text-orange font-bold text-xs uppercase tracking-[0.14em] block mb-2">
                  0{i + 1} — Feature
                </span>
                <h4 className="font-semibold uppercase tracking-[-0.02em] text-[20px] text-grey mb-3 group-hover:text-white transition-colors">
                  {f.title}
                </h4>
                <p className="text-mut text-[15px] leading-[1.6]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Duo Visuals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(14px,2vw,28px)] mx-pad mb-[clamp(40px,8vh,90px)]">
        <figure className="case-prl relative overflow-hidden aspect-[4/5] rounded-xl">
          <Image
            src={project.imgs[1] ?? project.imgs[0]}
            alt={`${project.name} — interface screen 1`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover scale-[1.15] will-change-transform"
          />
        </figure>
        <figure className="case-prl relative overflow-hidden aspect-[4/5] rounded-xl">
          <Image
            src={project.imgs[2] ?? project.imgs[0]}
            alt={`${project.name} — interface screen 2`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover scale-[1.15] will-change-transform"
          />
        </figure>
      </div>

      {/* Key Project Stats */}
      <div className="case-anim-block border-t border-b border-line py-[clamp(48px,8vh,90px)] px-pad bg-[#111110]">
        <span className="lbl !text-orange mb-6 block">Impact & Metrics</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {project.stats.map(([num, label]) => (
            <div key={label} className="border-t border-line pt-4">
              <b className="block font-semibold tracking-[-0.03em] text-[clamp(40px,5.5vw,78px)] leading-none num text-grey">
                {num}
              </b>
              <small className="text-[12px] font-semibold tracking-[0.14em] uppercase text-mut mt-2 block">
                {label}
              </small>
            </div>
          ))}
        </div>
      </div>

      <PixelMosaic variant="toGrey" />

      {/* Next Project Teaser */}
      <a
        className="block bg-grey text-black py-[clamp(80px,14vh,160px)] px-pad group transition-colors duration-300 hover:bg-white"
        href={`#/work/${next.id}`}
        aria-label={`Next project: ${next.name}`}
      >
        <div className="flex justify-between items-baseline mb-4 text-[#7b7b76]">
          <span className="lbl !text-mut-l">Next Project</span>
          <span className="lbl -plain font-bold text-xs uppercase text-black">
            {next.tags.slice(0, 2).join(' · ')}
          </span>
        </div>
        <div className="flex justify-between items-end gap-6">
          <span className="font-semibold uppercase tracking-[-0.035em] leading-[0.92] text-[clamp(48px,9.5vw,140px)] group-hover:text-orange transition-colors duration-300">
            {next.name}
          </span>
          <span className="text-[clamp(32px,6vw,72px)] font-bold text-black group-hover:text-orange group-hover:translate-x-3 transition-all duration-300">
            &rarr;
          </span>
        </div>
      </a>
    </article>
  );
}