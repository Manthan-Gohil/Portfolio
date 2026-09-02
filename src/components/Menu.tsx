'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { portfolioData } from '@/lib/data';

interface MenuProps {
  open: boolean;
  onNavigate: () => void;
  onCloseDone: () => void;
}

const LINKS = [
  { idx: '01', label: 'Work', href: '#/work' },
  { idx: '02', label: 'About', href: '#/about' },
  { idx: '03', label: 'What I do', href: '#/services' },
  { idx: '04', label: 'Contact', href: '#/contact' },
];

export function Menu({ open, onNavigate, onCloseDone }: MenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pxRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const profile = portfolioData.profile;

  useEffect(() => {
    const root = rootRef.current;
    const px = pxRef.current;
    const inner = innerRef.current;
    if (!root || !px || !inner) return;

    const build = (n: number) => {
      px.innerHTML = '';
      const frag = document.createDocumentFragment();
      for (let i = 0; i < n; i++) {
        const c = document.createElement('i');
        c.className = 'bg-orange opacity-0 block w-full h-full';
        frag.appendChild(c);
      }
      px.appendChild(frag);
      return Array.from(px.children) as HTMLElement[];
    };

    const cols = Math.max(8, Math.floor(window.innerWidth / 56));
    const rows = Math.max(5, Math.floor(window.innerHeight / 56));
    let cells = build(cols * rows);
    px.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    px.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    gsap.set(cells, { scaleY: 0, transformOrigin: 'center bottom' });
    gsap.set(inner, { autoAlpha: 0, y: 30 });

    const openTl = gsap.timeline({ paused: true });
    openTl
      .to(cells, {
        scaleY: 1,
        opacity: 1,
        duration: 0.55,
        stagger: { each: 0.008, from: 'random' },
        ease: 'power2.in',
      })
      .to(
        inner,
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.25'
      );

    const closeTl = gsap.timeline({ paused: true });
    closeTl
      .to(inner, { autoAlpha: 0, y: 20, duration: 0.25, ease: 'power3.in' })
      .to(
        cells,
        {
          scaleY: 0,
          transformOrigin: 'center top',
          duration: 0.45,
          stagger: { each: 0.006, from: 'end' },
          ease: 'power2.in',
        },
        '-=0.1'
      );

    if (open) {
      closeTl.progress(0);
      openTl.progress(0).play();
    } else {
      openTl.progress(0);
      closeTl.eventCallback('onComplete', () => {
        if (!open) onCloseDone();
      });
      closeTl.progress(0).play();
    }

    const onResize = () => {
      const nc = Math.max(8, Math.floor(window.innerWidth / 56));
      const nr = Math.max(5, Math.floor(window.innerHeight / 56));
      cells = build(nc * nr);
      px.style.gridTemplateColumns = `repeat(${nc}, 1fr)`;
      px.style.gridTemplateRows = `repeat(${nr}, 1fr)`;
      gsap.set(cells, {
        scaleY: open ? 1 : 0,
        opacity: open ? 1 : 0,
        transformOrigin: 'center bottom',
      });
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open, onCloseDone]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[110] transition-opacity duration-300 ${
        open
          ? 'visible pointer-events-auto'
          : 'invisible pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div ref={pxRef} className="absolute inset-0 grid pointer-events-none" />

      <div
        ref={innerRef}
        className="relative z-[2] h-full flex flex-col pt-[110px] pb-[26px] px-pad text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-8 md:gap-[clamp(24px,4vw,80px)] flex-1 content-center">
          <nav className="flex flex-col" aria-label="Main">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className="flex items-baseline gap-[clamp(12px,2vw,26px)] py-[clamp(8px,1.4vh,16px)] group"
              >
                <small className="text-xs font-bold text-black/60 num transition-all duration-300 group-hover:text-white group-hover:opacity-100">
                  {link.idx}
                </small>
                <b className="font-semibold uppercase tracking-[-0.03em] leading-[1.08] text-black text-[clamp(40px,7vw,100px)] inline-block transition-all duration-500 ease-folio group-hover:translate-x-[clamp(10px,1.8vw,26px)] group-hover:text-white">
                  {link.label}
                </b>
              </a>
            ))}
          </nav>

          <div className="flex flex-col justify-center gap-[clamp(20px,3.5vh,36px)]">
            <div>
              <small className="block text-[11px] font-bold tracking-[0.16em] uppercase text-black mb-2.5">
                Say hi
              </small>
              <a
                href={`mailto:${profile.email}`}
                className="block text-[clamp(15px,1.4vw,19px)] font-semibold text-black py-[3px] transition-colors duration-300 hover:text-white"
              >
                {profile.email}
              </a>
            </div>

            <div>
              <small className="block text-[11px] font-bold tracking-[0.16em] uppercase text-black mb-2.5">
                Elsewhere
              </small>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[clamp(15px,1.4vw,19px)] font-semibold text-black py-[3px] transition-colors duration-300 hover:text-white"
              >
                GitHub ↗
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[clamp(15px,1.4vw,19px)] font-semibold text-black py-[3px] transition-colors duration-300 hover:text-white"
              >
                LinkedIn ↗
              </a>
              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[clamp(15px,1.4vw,19px)] font-semibold text-black py-[3px] transition-colors duration-300 hover:text-white"
              >
                LeetCode ↗
              </a>
            </div>

            <div>
              <small className="block text-[11px] font-bold tracking-[0.16em] uppercase text-black mb-2.5">
                Status
              </small>
              <a
                href="#/contact"
                onClick={onNavigate}
                className="block text-[clamp(13px,1.2vw,16px)] font-semibold text-black py-[3px] transition-colors duration-300 hover:text-white"
              >
                ● {profile.availability}
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.14em] uppercase text-black/60 pt-4 border-t border-black/15 mt-auto">
          <span>© 2026 {profile.name}</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </div>
  );
}