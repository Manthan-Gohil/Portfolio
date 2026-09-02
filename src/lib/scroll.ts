import Lenis from 'lenis';

export const scroll = {
  instance: null as Lenis | null,

  init() {
    if (typeof window === 'undefined' || scroll.instance) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    scroll.instance = lenis;
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  },

  destroy() {
    scroll.instance?.destroy();
    scroll.instance = null;
  },

  toTop() {
    scroll.instance?.scrollTo(0, { immediate: true });
  },
};