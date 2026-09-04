'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/lib/data';
import { PixelMosaic } from '@/components/home/PixelMosaic';
import { BlockReveal } from './BlockReveal';
import { ExperienceInteractive } from './ExperienceInteractive';
import { HackathonsShowcase } from './HackathonsShowcase';

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
          <span key={i} className={bold ? 'text-grey font-semibold' : ''}>
            {words.map((w, j) => (
              <span
                key={`${i}-${j}`}
                className="about-bio-word inline-block opacity-[0.16] mr-[0.28em]"
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

const BIO: Tok[][] = [
  [
    'I am a Computer Science undergraduate at ',
    ['BML Munjal University, Gurgaon (8.62 CGPA)', true],
    ', focused on engineering real-world software systems with solid backend architecture, modern frontend development, and practical AI integration.',
  ],
  [
    'My work spans the full product lifecycle: ',
    ['architecting REST APIs, modeling databases with Prisma & PostgreSQL, building LangGraph multi-agent workflows, and designing responsive React/Next.js interfaces', true],
    '. I care about creating systems that are more than prototypes: applications with clear workflows, secure JWT authentication, state persistence, and real production considerations.',
  ],
  [
    'Through full-stack web internships at ',
    ['Careerwill and USTART', true],
    ', I contributed to production EdTech platforms, building React components, authenticated APIs, and analytics dashboards. Simultaneously, I strengthen my fundamentals with ',
    ['180+ DSA problems solved on LeetCode', true],
    ' and competing in national hackathons with podium wins at DevXpo and HACK KRMU 5.0.',
  ],
];

const DOSSIER = [
  { label: 'Base', value: 'Gurgaon / Delhi NCR, India' },
  { label: 'Education', value: 'B.Tech CSE (8.62 CGPA)' },
  { label: 'University', value: 'BML Munjal University' },
  { label: 'Focus', value: 'AI Engineering & Full Stack SaaS' },
  { label: 'Core Stack', value: 'Next.js · TypeScript · Python · LangGraph' },
  { label: 'Availability', value: '● Internships & Roles ’26' },
];

export function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const badgeId = useId();
  const profile = portfolioData.profile;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      const lines = gsap.utils.toArray<HTMLElement>('.about-hero-line > span', root);
      gsap.set(lines, { yPercent: 110 });
      gsap.set('.about-hero-lbl', { autoAlpha: 0, y: -12 });
      gsap.set('.about-hero-intro', { autoAlpha: 0, y: 24 });
      gsap.set('.about-page-portrait', { clipPath: 'inset(100% 0 0 0)' });

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to('.about-hero-lbl', { autoAlpha: 1, y: 0, duration: 0.5 }, 0.15)
        .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.12 }, '-=0.2')
        .to('.about-hero-intro', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.6')
        .to('.about-page-portrait', { clipPath: 'inset(0% 0 0 0)', duration: 1.1 }, '-=0.5');

      const words = gsap.utils.toArray<HTMLElement>('.about-bio-word', root);
      if (words.length) {
        gsap.to(words, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: { trigger: '.about-bio-copy', start: 'top 82%', end: 'bottom 55%', scrub: true },
        });
      }

      const storyImg = root.querySelector('.story-img-reveal');
      if (storyImg) {
        gsap.fromTo(
          storyImg,
          { width: '48px', opacity: 0.8 },
          {
            width: '130px',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.story-headline-wrap',
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
      }

      const animBlocks = gsap.utils.toArray<HTMLElement>('.page-reveal', root);
      animBlocks.forEach((b) => {
        gsap.fromTo(
          b,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: b, start: 'top 88%', once: true },
          }
        );
      });

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
    <div ref={rootRef}>
      {/* Hero */}
      <section className="min-h-[88svh] pt-[150px] pb-[clamp(40px,7vh,80px)] px-pad grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 md:gap-[clamp(28px,5vw,90px)] items-center">
        <div>
          <span className="lbl about-hero-lbl">About — {profile.name}</span>
          <h1 className="font-semibold uppercase tracking-[-0.035em] leading-[0.95] text-[clamp(48px,9vw,135px)] mt-4.5 mb-6.5">
            <span className="about-hero-line block overflow-hidden">
              <span className="inline-block">Architecture is</span>
            </span>
            <span className="about-hero-line block overflow-hidden">
              <span className="inline-block">
                the <em className="o not-italic">foundation</em>.
              </span>
            </span>
          </h1>
          <p className="about-hero-intro text-mut text-[clamp(16px,1.5vw,21px)] max-w-[44ch] leading-[1.5]">
            Final-year Computer Science undergraduate, AI & Full Stack Developer, and national
            hackathon winner (<b className="text-grey font-semibold">DevXpo, HACK KRMU 5.0</b>).
            Passionate about building scalable systems at the intersection of AI, robust backends, and
            intuitive developer tools.
          </p>
        </div>

        <div className="flex justify-start md:justify-end">
          <div className="about-page-portrait relative max-w-[520px] w-full group">
            <figure className="aspect-[4/5] overflow-hidden relative bg-grey-2">
              <Image
                src={profile.portrait}
                alt="Portrait of Manthan Gohil, AI & Full Stack Developer"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
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
                  <path id={badgeId} d="M56,56 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="text-[11.5px] font-bold tracking-[0.22em] uppercase fill-black">
                  <textPath href={`#${badgeId}`}>Open for select roles — 2026 —</textPath>
                </text>
              </svg>
            </span>
          </div>
        </div>
      </section>

      {/* Marquee Tickers */}
      <div className="overflow-hidden border-t border-b border-line py-[clamp(14px,2.4vh,24px)]" aria-hidden="true">
        <div className="flex gap-[clamp(28px,4vw,60px)] whitespace-nowrap w-max animate-mq will-change-transform">
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)]">
            AI & Full Stack <span className="text-orange">Developer</span>
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)] text-[#242422]">
            LangGraph
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)]">
            RAG Pipelines
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)] text-[#242422]">
            Next.js 15
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)]">
            TypeScript
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)] text-[#242422]">
            ·
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)]">
            Python & FastAPI
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)] text-[#242422]">
            PostgreSQL
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)]">
            Multi-Agent Workflows
          </b>
        </div>
      </div>

      <div className="overflow-hidden border-b border-line py-[clamp(14px,2.4vh,24px)]" aria-hidden="true">
        <div className="flex gap-[clamp(28px,4vw,60px)] whitespace-nowrap w-max animate-mq-rev will-change-transform">
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)] text-[#242422]">
            Gurgaon
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)]">
            180+ LeetCode
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)] text-[#242422]">
            8.62 CGPA
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)]">
            <span className="text-orange">DevXpo</span> 1st Place
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)] text-[#242422]">
            ·
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)] text-[#242422]">
            HACK KRMU Track Winner
          </b>
          <b className="font-semibold uppercase tracking-[-0.02em] leading-none text-[clamp(26px,3.6vw,56px)]">
            Careerwill Intern
          </b>
        </div>
      </div>

      {/* The Story & Dossier */}
      <section className="py-[clamp(64px,10vh,120px)] section-pad">
        <span className="lbl">The story</span>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 md:gap-[clamp(24px,5vw,90px)] mt-6">
          <div className="story-headline-wrap">
            <h2 className="font-semibold uppercase tracking-[-0.03em] leading-[0.98] text-[clamp(32px,4.6vw,72px)] max-w-[14ch]">
              Real systems,
              <br />
              <span className="inline-flex items-center gap-2.5 flex-wrap">
                <span>engineered to</span>
                <span className="story-img-reveal inline-block h-[clamp(30px,4vw,52px)] rounded-xl overflow-hidden relative border border-orange/40 align-middle shrink-0 bg-black/40">
                  <Image
                    src="/images/codesense/cover.jpg"
                    alt="Engineering system preview"
                    fill
                    sizes="200px"
                    className="object-cover scale-110"
                  />
                </span>
                <span className="text-orange">scale.</span>
              </span>
            </h2>
          </div>
          <div className="about-bio-copy">
            {BIO.map((p, i) => (
              <p
                key={i}
                className="text-mut text-[clamp(16px,1.5vw,21px)] leading-[1.55] mb-[1.1em] max-w-[52ch]"
              >
                <Words tokens={p} />
              </p>
            ))}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[clamp(14px,2vw,24px)] mt-[clamp(36px,6vh,60px)]">
              {DOSSIER.map((item) => (
                <div key={item.label} className="border-t border-line pt-3">
                  <small className="block text-[10px] font-bold tracking-[0.16em] uppercase text-mut mb-1.5">
                    {item.label}
                  </small>
                  <b className="text-[clamp(13px,1.2vw,16px)] font-semibold text-grey block">
                    {item.value}
                  </b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section with Spring Cursor Follower (image hover effect) */}
      <section className="page-reveal py-[clamp(64px,10vh,120px)] border-t border-line section-pad bg-[#0f0f0e]">
        <ExperienceInteractive />
      </section>

      {/* Hackathons & Achievements Showcase with Awwwards Pinned Stacking Cards */}
      <section className="border-t border-line bg-[#0a0a09]">
        <HackathonsShowcase />
      </section>

      {/* Technical Skills Matrix */}
      <section className="page-reveal py-[clamp(64px,10vh,120px)] border-t border-line section-pad bg-[#0c0c0b]">
        <span className="lbl">Skills & Tech Stack</span>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 md:gap-[clamp(24px,5vw,90px)] mt-6">
          <div>
            <h2 className="font-semibold uppercase tracking-[-0.03em] leading-[0.98] text-[clamp(32px,4.6vw,68px)] max-w-[14ch]">
              Technical Ecosystem.
            </h2>
            <p className="text-mut text-[15px] leading-[1.6] mt-4 max-w-[40ch]">
              Comprehensive proficiencies across frontend engineering, backend architecture, AI/LLM
              agentic workflows, and database systems.
            </p>
          </div>

          <div className="space-y-6">
            {portfolioData.skills.map((cat) => (
              <div key={cat.category} className="border-t border-line pt-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-orange mb-3">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[13px] font-semibold tracking-[-0.01em] px-3.5 py-1.5 rounded-lg border border-line bg-black/60 text-grey hover:border-orange hover:text-white transition-colors duration-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="bg-grey text-black py-[clamp(64px,10vh,120px)] section-pad">
        <span className="lbl !text-mut-l">Engineering Principles</span>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 md:gap-[clamp(24px,5vw,90px)] mt-6">
          <h2 className="font-semibold uppercase tracking-[-0.03em] leading-[0.98] text-[clamp(32px,4.6vw,72px)] max-w-[14ch]">
            How I approach software.
          </h2>

          <div className="divide-y divide-black/15">
            {portfolioData.principles.map((p, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={p.name} className="py-5">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex justify-between items-center text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="lbl -plain num text-mut-l text-[13px]">{p.count}</span>
                      <span className="font-semibold uppercase text-[clamp(18px,2vw,26px)] tracking-[-0.02em] group-hover:text-orange transition-colors duration-300">
                        {p.name}
                      </span>
                    </span>
                    <span className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-lg transition-transform duration-300 group-hover:border-black shrink-0 ml-4">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-folio ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[#3a3a36] text-[clamp(15px,1.3vw,18px)] leading-[1.55] pt-4 max-w-[50ch]">
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.chips.map((c) => (
                          <span
                            key={c}
                            className="text-[11px] font-semibold uppercase tracking-[0.1em] px-3 py-1 bg-black/5 rounded-full text-[#3a3a36]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transition back to dark */}
      <PixelMosaic variant="toBlack" />

      {/* Metrics / Experience Stats */}
      <section className="py-[clamp(64px,10vh,120px)] section-pad">
        <span className="lbl">Track Record</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <div className="border-t border-line pt-5">
            <b
              className="block font-semibold tracking-[-0.03em] text-[clamp(44px,6vw,90px)] leading-none text-grey num"
              data-count="180"
              data-suffix="+"
            >
              0
            </b>
            <small className="text-[12px] font-semibold tracking-[0.14em] uppercase text-mut mt-2 block">
              LeetCode DSA Solved (C++ / SQL)
            </small>
          </div>
          <div className="border-t border-line pt-5">
            <b
              className="block font-semibold tracking-[-0.03em] text-[clamp(44px,6vw,90px)] leading-none text-grey num"
              data-count="3"
              data-suffix=""
            >
              0
            </b>
            <small className="text-[12px] font-semibold tracking-[0.14em] uppercase text-mut mt-2 block">
              Hackathon Podiums & Wins
            </small>
          </div>
          <div className="border-t border-line pt-5">
            <b
              className="block font-semibold tracking-[-0.03em] text-[clamp(44px,6vw,90px)] leading-none text-grey num"
              data-count="10"
              data-suffix="k+"
            >
              0
            </b>
            <small className="text-[12px] font-semibold tracking-[0.14em] uppercase text-mut mt-2 block">
              Files Ingested in Codebase RAG
            </small>
          </div>
        </div>
      </section>
    </div>
  );
}