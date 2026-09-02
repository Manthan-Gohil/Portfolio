'use client';

import { useState } from 'react';
import { portfolioData } from '@/lib/data';

export function Services() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const services = portfolioData.services;

  const toggle = (i: number) => {
    setOpenIdx((cur) => (cur === i ? null : i));
  };

  return (
    <section
      className="bg-grey text-black py-[clamp(70px,11vh,140px)] section-pad"
      id="services"
      aria-labelledby="services-title"
    >
      <span className="lbl !text-mut-l">What I do</span>
      <h2
        id="services-title"
        className="font-semibold uppercase tracking-[-0.03em] leading-[0.98] text-[clamp(34px,5vw,80px)] mt-[22px] mb-[clamp(36px,6vh,64px)] max-w-[16ch]"
      >
        What I actually do.
      </h2>

      <div className="flex flex-col">
        {services.map((srv, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={srv.name}
              className="border-t-2 border-black last:border-b-2 transition-colors duration-300"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                onMouseEnter={() => setOpenIdx(i)}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-[clamp(14px,3vw,40px)] w-full py-[clamp(18px,2.8vh,30px)] group text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-xs font-bold text-orange num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-semibold uppercase tracking-[-0.025em] leading-none text-[clamp(26px,4.6vw,64px)] transition-transform duration-500 ease-folio group-hover:translate-x-[clamp(8px,1.6vw,22px)]">
                  {srv.name}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-mut-l hidden sm:block">
                  {srv.count}
                </span>
                <span className="w-[34px] h-[34px] relative flex-none" aria-hidden="true">
                  <span className="absolute w-[18px] h-[2px] bg-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-folio" />
                  <span
                    className={`absolute w-[2px] h-[18px] bg-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-folio ${
                      isOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                  />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-folio overflow-hidden ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="min-h-0">
                  <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(20px,4vw,70px)] pt-1.5 pb-[clamp(24px,4vh,40px)]">
                    <p className="text-[#3a3a36] max-w-[52ch] text-[clamp(14px,1.15vw,17px)]">
                      {srv.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 content-start">
                      {srv.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-[10px] font-semibold tracking-[0.1em] uppercase border border-line-d rounded-full px-3.5 py-1.5 text-mut-l"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}