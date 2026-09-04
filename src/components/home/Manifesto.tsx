'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;
      const words = gsap.utils.toArray<HTMLElement>('.w', root);
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: {
          trigger: root.querySelector('p:last-child'),
          start: 'top 82%',
          end: 'bottom 45%',
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="py-[clamp(70px,12vh,150px)] border-t border-line section-pad"
      aria-labelledby="manifesto-title"
    >
      <span className="lbl" id="manifesto-title">
        Philosophy
      </span>
      <p className="mt-[22px] font-semibold tracking-[-0.02em] leading-[1.18] text-[clamp(28px,4.4vw,70px)] max-w-[25ch] uppercase">
        <span className="w inline-block mr-[0.25em]">I</span>
        <span className="w inline-block mr-[0.25em]">build</span>
        <span className="w inline-block mr-[0.25em]">systems</span>
        <span className="w inline-block mr-[0.25em]">that</span>
        <span className="w inline-block mr-[0.25em]">go</span>
        <span className="w inline-block mr-[0.25em]">beyond</span>
        <span className="w inline-block mr-[0.25em]">demos</span>
        <span className="w inline-block mr-[0.25em]">—</span>
        <span className="w inline-block mr-[0.25em]">grounded</span>
        <em className="o not-italic inline">
          <span className="w inline-block mr-[0.25em]">AI</span>
          <span className="w inline-block mr-[0.25em]">pipelines,</span>
        </em>
        <span className="w inline-block mr-[0.25em]">multi-agent</span>
        <span className="w inline-block mr-[0.25em]">workflows,</span>
        <span className="w inline-block mr-[0.25em]">and</span>
        <span className="w inline-block mr-[0.25em]">scalable</span>
        <em className="o not-italic inline">
          <span className="w inline-block mr-[0.25em]">full-stack</span>
        </em>
        <span className="w inline-block mr-[0.25em]">architecture</span>
        <span className="w inline-block mr-[0.25em]">with</span>
        <span className="w inline-block mr-[0.25em]">real-world</span>
        <span className="w inline-block mr-[0.25em]">substance.</span>
      </p>
    </section>
  );
}