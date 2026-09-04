'use client';

import { portfolioData } from '@/lib/data';

export function Recognition() {
  const awards = portfolioData.awards;

  return (
    <section
      className="py-[clamp(70px,11vh,140px)] section-pad"
      id="recog"
      aria-labelledby="recog-title"
    >
      <div className="flex justify-between items-baseline pb-5.5">
        <span className="lbl" id="recog-title">
          Recognition &amp; Podiums
        </span>
        <span className="lbl -plain">National &amp; Competitive</span>
      </div>

      <div className="flex flex-col">
        {awards.map((aw) => (
          <div
            key={aw.name}
            className="relative grid grid-cols-1 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] gap-4 items-center py-[clamp(18px,2.6vh,28px)] px-[clamp(6px,1.2vw,20px)] border-t border-line last:border-b overflow-hidden group cursor-default"
          >
            {/* Hover slide-up orange background */}
            <span
              className="absolute inset-0 bg-orange scale-y-0 origin-bottom transition-transform duration-500 ease-folio group-hover:scale-y-100 z-0 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-[1] flex items-center gap-3">
              {aw.badge && (
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-orange/15 text-orange group-hover:bg-black/20 group-hover:text-black transition-colors shrink-0">
                  {aw.badge}
                </span>
              )}
              <span className="font-semibold uppercase tracking-[-0.02em] text-[clamp(18px,2.2vw,32px)] text-grey transition-colors duration-300 group-hover:text-black">
                {aw.name}
              </span>
            </div>

            <span className="relative z-[1] text-xs font-semibold tracking-[0.08em] uppercase text-mut transition-colors duration-300 group-hover:text-black hidden sm:block">
              {aw.detail}
            </span>

            <span
              className="relative z-[1] w-2.5 h-2.5 rounded-full bg-orange justify-self-end transition-colors duration-300 group-hover:bg-black hidden sm:block"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}