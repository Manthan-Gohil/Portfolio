'use client';

import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/lib/data';

export function SkillsGuidingLight() {
  const sectionRef = useRef<HTMLElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const animInstanceRef = useRef<any>(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    // Dynamically load lottie-web for Next.js SSR safety
    import('lottie-web').then((lottieModule) => {
      if (isCancelled || !lottieRef.current) return;
      const lottie = lottieModule.default || lottieModule;

      try {
        animInstanceRef.current = lottie.loadAnimation({
          container: lottieRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/fire.json',
        });
      } catch (err) {
        console.warn('Lottie fire animation load failed:', err);
      }
    });

    const state = {
      isTracking: false,
      cursorDetected: false,
    };

    const pos = {
      mouse: {
        target: { x: 0, y: 0 },
        current: { x: 0, y: 0 },
        last: { x: 0, y: 0 },
      },
      lottie: {
        current: { x: 0, y: 0 },
        center: { x: 0, y: 0 },
      },
    };

    function init() {
      const section = sectionRef.current;
      const lottieContainer = lottieContainerRef.current;
      if (!section || !lottieContainer) return;

      const spotlightRect = section.getBoundingClientRect();
      const lottieRect = lottieContainer.getBoundingClientRect();

      pos.lottie.center.x =
        lottieRect.left - spotlightRect.left + lottieRect.width / 2;
      pos.lottie.center.y =
        lottieRect.top - spotlightRect.top + lottieRect.height / 2;

      if (!state.isTracking) {
        pos.mouse.current.x = pos.mouse.target.x = pos.lottie.center.x;
        pos.mouse.current.y = pos.mouse.target.y = pos.lottie.center.y;
      }
    }

    function updateCursor(x: number, y: number) {
      const section = sectionRef.current;
      const mask = maskRef.current;
      const glow = glowRef.current;
      if (!section || !mask || !glow) return;

      pos.mouse.last.x = x;
      pos.mouse.last.y = y;

      const rect = section.getBoundingClientRect();
      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      if (isInside) {
        pos.mouse.target.x = x - rect.left;
        pos.mouse.target.y = y - rect.top;
        state.isTracking = true;
        setIsHovered(true);
        mask.classList.add('active');
        glow.classList.add('active');
      } else {
        state.isTracking = false;
        setIsHovered(false);
        mask.classList.remove('active');
        glow.classList.remove('active');
      }
    }

    const onMouseEnter = (e: MouseEvent) => {
      state.cursorDetected = true;
      updateCursor(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      state.cursorDetected = true;
      updateCursor(e.clientX, e.clientY);
    };

    const onScroll = () => {
      if (state.cursorDetected) {
        updateCursor(pos.mouse.last.x, pos.mouse.last.y);
      }
    };

    const onResize = () => {
      init();
    };

    window.addEventListener('mouseenter', onMouseEnter, { once: true });
    window.addEventListener('mouseover', onMouseEnter, { once: true });
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    let animationFrameId: number;

    function animate() {
      const section = sectionRef.current;
      const lottieContainer = lottieContainerRef.current;

      pos.mouse.current.x += (pos.mouse.target.x - pos.mouse.current.x) * 0.1;
      pos.mouse.current.y += (pos.mouse.target.y - pos.mouse.current.y) * 0.1;

      if (section) {
        section.style.setProperty('--mouse-x', `${pos.mouse.current.x}px`);
        section.style.setProperty('--mouse-y', `${pos.mouse.current.y}px`);
      }

      const targetX = state.isTracking
        ? pos.mouse.current.x - pos.lottie.center.x
        : 0;
      const targetY = state.isTracking
        ? pos.mouse.current.y - pos.lottie.center.y
        : 0;

      pos.lottie.current.x += (targetX - pos.lottie.current.x) * 0.09;
      pos.lottie.current.y += (targetY - pos.lottie.current.y) * 0.09;

      if (lottieContainer) {
        lottieContainer.style.transform = `translate(${pos.lottie.current.x}px, ${pos.lottie.current.y}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    const timer = setTimeout(() => {
      init();
      animate();
    }, 120);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (animInstanceRef.current) {
        animInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="guiding-light-spotlight relative py-[clamp(64px,10vh,120px)] border-t border-line section-pad bg-[#0a0a09] overflow-hidden select-none"
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      {/* Background Subtle Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main Content Layout */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="lbl !mb-0">Skills & Tech Stack</span>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-orange/30 bg-orange/5 text-[11px] font-mono tracking-wider uppercase text-orange/90">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-orange ${
                isHovered ? 'animate-ping' : 'animate-pulse'
              }`}
            />
            <span>{isHovered ? 'Guiding Light Active' : 'Hover to Illuminate'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 md:gap-[clamp(24px,5vw,80px)] mt-6">
          {/* Left Column: Heading, Bio, and Flame Anchor */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-semibold uppercase tracking-[-0.03em] leading-[0.98] text-[clamp(32px,4.6vw,68px)] max-w-[14ch] text-white">
                Technical Ecosystem.
              </h2>
              <p className="text-mut text-[15px] leading-[1.65] mt-5 max-w-[42ch]">
                Comprehensive proficiencies across frontend engineering, backend architecture, AI/LLM
                agentic workflows, and distributed database systems.
              </p>
            </div>

            {/* Guiding Light Flame Anchor Station */}
            <div className="mt-8 pt-6 border-t border-line/60">
              <div className="flex items-center gap-4">
                {/* Lottie Fire Container (glides across whole section when tracking) */}
                <div
                  ref={lottieContainerRef}
                  className="lottie-container relative w-16 h-16 pointer-events-none flex-shrink-0 z-30 transition-opacity duration-300"
                  style={{
                    willChange: 'transform',
                  }}
                >
                  <div
                    ref={lottieRef}
                    className="lottie w-full h-full transform scale-125"
                  />
                  <div className="fire-glow" />
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white/80 font-semibold flex items-center gap-2">
                    <span>Guiding Light</span>
                    <span className="text-orange text-[10px]">✦</span>
                  </div>
                  <p className="text-[12px] text-mut mt-1 leading-snug">
                    Move your cursor anywhere across the tech stack to lead the flame and illuminate skills.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills Matrix Categorized */}
          <div className="space-y-7">
            {portfolioData.skills.map((cat, catIdx) => (
              <div
                key={cat.category}
                className="border-t border-line/70 pt-4 first:border-t-0 first:pt-0"
              >
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-orange flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange/70" />
                    {cat.category}
                  </h3>
                  <span className="text-[11px] font-mono text-mut">
                    0{catIdx + 1} / {cat.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="skill-pill relative text-[13px] font-medium tracking-[-0.01em] px-3.5 py-2 rounded-lg border border-line/80 bg-[#121211]/90 text-white/80 transition-all duration-200 hover:border-orange hover:text-white hover:bg-orange/15 hover:shadow-[0_0_18px_rgba(255,92,0,0.35)] cursor-pointer"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Guiding Light Glow (Tracks with mouse) */}
      <div ref={glowRef} className="guiding-light-glow" />

      {/* Guiding Light Spotlight Mask (Shrouds outer area while revealing circle around mouse) */}
      <div ref={maskRef} className="guiding-light-mask" />

      {/* Scoped CSS for Guiding Light Spotlight & Fire Physics */}
      <style jsx>{`
        .fire-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 55%;
          height: 110%;
          background: radial-gradient(
            circle,
            rgba(255, 92, 0, 0.85) 0%,
            rgba(255, 145, 0, 0.6) 30%,
            rgba(255, 242, 140, 0.25) 55%,
            transparent 75%
          );
          filter: blur(18px);
          opacity: 0.45;
          animation: firePulse 2s ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes firePulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scaleY(1);
            opacity: 0.5;
          }
          25% {
            transform: translate(-50%, -50%) scaleY(1.22);
            opacity: 0.4;
          }
          50% {
            transform: translate(-50%, -50%) scaleY(0.92);
            opacity: 0.35;
          }
          75% {
            transform: translate(-50%, -50%) scaleY(1.12);
            opacity: 0.5;
          }
        }

        .guiding-light-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 92, 0, 0.18) 0%,
            rgba(255, 130, 0, 0.07) 45%,
            transparent 75%
          );
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 12;
        }

        .guiding-light-glow.active {
          opacity: 1;
        }

        .guiding-light-mask {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: #0a0a09;
          -webkit-mask: radial-gradient(
            circle 240px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            transparent 0%,
            transparent 42%,
            #000 82%,
            #000 100%
          );
          mask: radial-gradient(
            circle 240px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            transparent 0%,
            transparent 42%,
            #000 82%,
            #000 100%
          );
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          z-index: 14;
        }

        .guiding-light-mask.active {
          opacity: 0.85;
        }

        @media (hover: none) {
          .guiding-light-mask.active {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
