'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { portfolioData } from '@/lib/data';

export function WorkIndex() {
  const rootRef = useRef<HTMLElement>(null);
  const projects = portfolioData.projects;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;
      const h1 = root.querySelector('.work-index-h1');
      const lbl = root.querySelector('.work-index-lbl');
      const rows = gsap.utils.toArray<HTMLElement>('.work-index-row', root);

      gsap.set(lbl, { autoAlpha: 0, y: -12 });
      gsap.set(h1, { autoAlpha: 0, y: 30 });
      gsap.set(rows, { autoAlpha: 0, y: 40 });

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(lbl, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
        .to(h1, { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.3')
        .to(rows, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 }, '-=0.4');
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-[100svh] pt-[140px]"
      aria-labelledby="work-index-title"
    >
      <div className="pb-[clamp(30px,6vh,60px)] px-pad">
        <span className="lbl work-index-lbl">All Work</span>
        <h1
          id="work-index-title"
          className="work-index-h1 font-semibold uppercase tracking-[-0.035em] leading-[0.95] text-[clamp(52px,10vw,160px)] mt-[18px]"
        >
          Every <span className="text-orange">move</span>
          <br />
          so far.
        </h1>
      </div>

      <div>
        {projects.map((p, i) => (
          <a
            key={p.id}
            className="work-index-row grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,0.9fr)_auto_auto] items-center gap-4 md:gap-[clamp(14px,3vw,44px)] mx-pad py-[clamp(22px,3.4vh,38px)] border-t border-line last:border-b group"
            href={`#/work/${p.id}`}
          >
            <span className="text-xs font-bold text-mut num transition-colors duration-300 group-hover:text-orange">
              {String(i + 1).padStart(2, '0')}
            </span>

            <span className="font-semibold uppercase tracking-[-0.03em] leading-[0.96] text-[clamp(30px,5vw,80px)] transition-all duration-500 ease-folio group-hover:translate-x-[clamp(8px,1.6vw,22px)] group-hover:text-orange">
              {p.name}
            </span>

            <span className="hidden md:block aspect-[16/9] max-w-[280px] w-full overflow-hidden justify-self-end [clip-path:inset(0_0_100%_0)] transition-[clip-path] duration-600 ease-folio group-hover:[clip-path:inset(0_0_0%_0)]">
              <Image
                src={p.imgs[0]}
                alt={`${p.name} — project preview`}
                width={280}
                height={158}
                className="scale-[1.15] transition-transform duration-1000 ease-folio group-hover:scale-[1.02] object-cover w-full h-full"
              />
            </span>

            <span className="hidden md:block text-[11px] font-semibold tracking-[0.12em] uppercase text-mut">
              {p.tags[0]}
            </span>

            <span className="text-xs font-semibold text-mut num">
              {p.year}
            </span>
          </a>
        ))}
      </div>

      <div className="py-[clamp(60px,10vh,110px)] px-pad text-center">
        <a className="btnAll" href="#/contact">
          Got a project? <b>Talk</b>
        </a>
      </div>
    </section>
  );
}