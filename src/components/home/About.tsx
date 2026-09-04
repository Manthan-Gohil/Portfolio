'use client';

import { useEffect, useId, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type Tok = string | [string, boolean];

function Words({ tokens }: { tokens: Tok[] }) {
  return (
    <>
      {tokens.map((tok, i) => {
        const bold = Array.isArray(tok);
        const text = bold ? tok[0] : tok;
        const words = text.split(/\s+/).filter(Boolean);
        return (
          <span key={i} className={bold ? 'text-black font-semibold' : ''}>
            {words.map((w, j) => (
              <span
                key={`${i}-${j}`}
                className="about-word inline-block opacity-[0.18] mr-[0.28em]"
              >
                {w}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}

const PARAS: Tok[][] = [
  [
    "I'm ",
    ['Manthan Gohil', true],
    ', an AI & Full Stack Developer and Computer Science undergraduate at BML Munjal University. I build software systems with strong backend architecture, modern frontend engineering, and practical AI integration.',
  ],
  [
    'My development journey centers on ',
    ['Generative AI, LangGraph multi-agent systems, RAG pipelines, and full-stack SaaS', true],
    ' using Next.js, TypeScript, Python, FastAPI, and PostgreSQL. I care about how software operates under the hood — from vector retrieval to API contracts and state persistence.',
  ],
  [
    "I've built systems ranging from ",
    ['PixelLearn (gamified AI coding platform) and CodeSense AI (semantic repo explorer) to Aayu.ai', true],
    ', which won 1st Place in the HealthTech track at HACK KRMU 5.0. I have also gained production experience developing full-stack features during web engineering internships.',
  ],
  [
    'Beyond application building, I consistently sharpen my fundamentals in ',
    ['Data Structures & Algorithms with 180+ problems solved on LeetCode', true],
    ' primarily in C++, compete in national hackathons, and engineer tools that solve real developer problems.',
  ],
];

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const badgeId = useId();
  const profile = portfolioData.profile;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      const words = gsap.utils.toArray<HTMLElement>('.about-word', root);
      if (words.length) {
        gsap.to(words, {
          opacity: 1,
          ease: 'none',
          stagger: 0.03,
          scrollTrigger: {
            trigger: '.about-right',
            start: 'top 88%',
            end: 'bottom 55%',
            scrub: true,
          },
        });
      }

      const img = root.querySelector('.about-portrait img');
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-portrait-wrap',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      const counters = gsap.utils.toArray<HTMLElement>('[data-count]', root);
      counters.forEach((el) => {
        const end = parseInt(el.dataset.count ?? '0', 10);
        const suffix = el.dataset.suffix ?? '';
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: end,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = `${Math.round(obj.val)}${suffix}`;
              },
            });
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-grey text-black pb-[clamp(80px,13vh,160px)] section-pad"
      id="about"
      aria-labelledby="about-h2"
    >
      <span className="lbl !text-mut-l">About</span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[clamp(30px,5vw,100px)] mt-6.5">
        {/* Left column (sticky) */}
        <div className="lg:sticky lg:top-[14vh] self-start">
          <h2
            id="about-h2"
            className="font-semibold uppercase tracking-[-0.03em] leading-[0.96] text-[clamp(40px,5.8vw,92px)]"
          >
            <span className="block overflow-hidden">
              <span className="inline-block">Software with</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block">
                real <em className="o not-italic">substance</em>.
              </span>
            </span>
          </h2>

          <div className="about-portrait-wrap relative mt-[clamp(22px,4vh,40px)] max-w-[460px] group">
            <figure className="about-portrait aspect-[4/5] overflow-hidden relative bg-grey-2">
              <Image
                src={profile.portrait}
                alt="Portrait of Manthan Gohil, AI & Full Stack Developer"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="scale-[1.12] grayscale contrast-[1.06] transition-[filter] duration-500 group-hover:grayscale-0 will-change-transform object-cover"
              />
              <figcaption className="absolute left-3 bottom-2.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-grey mix-blend-difference z-[2]">
                Manthan Gohil — 2026
              </figcaption>
            </figure>

            <span className="absolute -right-8 -top-8 w-[112px] h-[112px] z-[3] pointer-events-none animate-spin-slow">
              <svg viewBox="0 0 112 112" className="w-full h-full">
                <circle cx="56" cy="56" r="56" className="fill-orange" />
                <defs>
                  <path
                    id={badgeId}
                    d="M56,56 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                  />
                </defs>
                <text className="text-[11.5px] font-bold tracking-[0.22em] uppercase fill-black">
                  <textPath href={`#${badgeId}`}>
                    Open for select roles — 2026 —
                  </textPath>
                </text>
              </svg>
            </span>
          </div>
        </div>

        {/* Right column */}
        <div className="about-right">
          {PARAS.map((p, i) => (
            <p
              key={i}
              className="text-[#3a3a36] text-[clamp(16px,1.5vw,22px)] leading-[1.5] mb-[1.1em] max-w-[46ch]"
            >
              <Words tokens={p} />
            </p>
          ))}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 mt-[clamp(36px,6vh,64px)]">
            <div className="border-t-2 border-black pt-3.5">
              <b
                className="block font-semibold tracking-[-0.03em] text-[clamp(36px,4.6vw,70px)] leading-none num"
                data-count="180"
                data-suffix="+"
              >
                0
              </b>
              <small className="text-[11px] font-semibold tracking-[0.12em] uppercase text-mut-l">
                LeetCode Problems Solved
              </small>
            </div>
            <div className="border-t-2 border-black pt-3.5">
              <b
                className="block font-semibold tracking-[-0.03em] text-[clamp(36px,4.6vw,70px)] leading-none num"
                data-count="3"
                data-suffix="+"
              >
                0
              </b>
              <small className="text-[11px] font-semibold tracking-[0.12em] uppercase text-mut-l">
                Hackathon Podiums
              </small>
            </div>
            <div className="border-t-2 border-black pt-3.5 col-span-2 sm:col-span-1">
              <b
                className="block font-semibold tracking-[-0.03em] text-[clamp(36px,4.6vw,70px)] leading-none num"
                data-count="100"
                data-suffix="%"
              >
                0
              </b>
              <small className="text-[11px] font-semibold tracking-[0.12em] uppercase text-mut-l">
                End-to-End Ownership
              </small>
            </div>
          </div>

          <div className="mt-[clamp(26px,4vh,44px)]">
            <a className="btnAll -ink" href="#/about">
              More about me <b>&rarr;</b>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}