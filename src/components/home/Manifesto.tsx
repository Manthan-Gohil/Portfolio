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
      <p className="mt-[22px] font-semibold tracking-[-0.02em] leading-[1.12] text-[clamp(28px,4.4vw,70px)] max-w-[25ch] uppercase">
        <span className="w inline-block">I </span>{' '}
        <span className="w inline-block">build </span>{' '}
        <span className="w inline-block">systems </span>{' '}
        <span className="w inline-block">that </span>{' '}
        <span className="w inline-block">go </span>{' '}
        <span className="w inline-block">beyond </span>{' '}
        <span className="w inline-block">demos </span>{' '}
        <span className="w inline-block">— </span>{' '}
        <span className="w inline-block">grounded </span>{' '}
        <em className="o not-italic inline">
          <span className="w inline-block">AI </span>{' '}
          <span className="w inline-block">pipelines, </span>
        </em>{' '}
        <span className="w inline-block">multi-agent </span>{' '}
        <span className="w inline-block">workflows, </span>{' '}
        <span className="w inline-block">and </span>{' '}
        <span className="w inline-block">scalable </span>{' '}
        <em className="o not-italic inline">
          <span className="w inline-block">full-stack </span>
        </em>{' '}
        <span className="w inline-block">architecture </span>{' '}
        <span className="w inline-block">with </span>{' '}
        <span className="w inline-block">real-world </span>{' '}
        <span className="w inline-block">substance. </span>
      </p>
    </section>
  );
}