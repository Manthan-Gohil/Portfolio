'use client';

import { useEffect } from 'react';
import { scroll } from '@/lib/scroll';

export default function NotFound() {
  useEffect(() => {
    scroll.toTop();
  }, []);

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-black text-grey px-[clamp(20px,4vw,72px)] text-center">
      <div>
        <p className="lbl text-mut">Error</p>
        <h1
          className="font-semibold tracking-[-0.04em] leading-none text-[clamp(64px,18vw,220px)]"
          style={{ margin: '18px 0 26px' }}
        >
          404<span className="text-orange">.</span>
        </h1>
        <p className="text-mut max-w-[44ch] mx-auto mb-[40px]">
          Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
        </p>
        <a className="btnAll -ink" href="#/">
          Back to home <b>↑</b>
        </a>
      </div>
    </div>
  );
}