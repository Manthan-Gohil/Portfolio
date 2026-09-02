'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cursor } from '@/components/Cursor';
import { Loader } from '@/components/Loader';
import { Noise } from '@/components/Noise';
import { Awwwards } from '@/components/Awwwards';
import { Header } from '@/components/Header';
import { Menu } from '@/components/Menu';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/home/Hero';
import { Manifesto } from '@/components/home/Manifesto';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { About } from '@/components/home/About';
import { Services } from '@/components/home/Services';
import { Recognition } from '@/components/home/Recognition';
import { PixelMosaic } from '@/components/home/PixelMosaic';
import { WorkIndex } from '@/components/pages/WorkIndex';
import { AboutPage } from '@/components/pages/AboutPage';
import { CasePage } from '@/components/pages/CasePage';
import { scroll } from '@/lib/scroll';
import { portfolioData } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type PageName = 'home' | 'work' | 'about' | 'case';

interface Route {
  name: PageName;
  id?: string;
  anchor?: string | null;
}

function parseHash(): Route {
  if (typeof window === 'undefined') return { name: 'home' };
  const h = window.location.hash.replace(/^#/, '') || '/';
  const m = h.match(/^\/work\/([\w-]+)/);
  if (m) return { name: 'case', id: m[1] };
  switch (h) {
    case '/work':
      return { name: 'work' };
    case '/about':
      return { name: 'about' };
    case '/services':
      return { name: 'home', anchor: 'services' };
    case '/contact':
      return { name: 'home', anchor: 'contact' };
    default:
      return { name: 'home' };
  }
}

const LABELS: Record<PageName, string> = {
  home: 'Home',
  work: 'All work',
  about: 'About',
  case: 'Case study',
};

const TITLES: Record<PageName, string> = {
  home: 'Manthan Gohil — AI & Full Stack Developer | Intelligent Systems That Scale',
  work: 'Work & Projects — Manthan Gohil',
  about: 'About & Experience — Manthan Gohil',
  case: 'Manthan Gohil',
};

export function Site() {
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const wipeRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const pendingRef = useRef<Route | null>(null);
  const routeRef = useRef(route);
  const loadingRef = useRef(loading);
  routeRef.current = route;
  loadingRef.current = loading;

  const scrollToAnchor = useCallback((anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) scroll.instance?.scrollTo(el, { offset: 0, duration: 1.1 });
  }, []);

  const runWipe = useCallback((next: Route) => {
    const wipe = wipeRef.current;
    if (!wipe || busyRef.current) return;
    busyRef.current = true;

    const cols = Math.max(6, Math.floor(window.innerWidth / 56));
    const rows = Math.max(4, Math.floor(window.innerHeight / 56));
    wipe.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement('i');
      cell.className = 'bg-orange opacity-0 block w-full h-full';
      frag.appendChild(cell);
    }
    wipe.appendChild(frag);
    const cells = Array.from(wipe.children) as HTMLElement[];
    wipe.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    wipe.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const label = document.createElement('span');
    label.className =
      'absolute inset-0 flex items-center justify-center font-semibold uppercase tracking-[-0.02em] text-[clamp(30px,6vw,84px)] text-black pointer-events-none opacity-0 z-10';
    let labelText = LABELS[next.name];
    if (next.name === 'case') {
      const p = portfolioData.projects.find((x) => x.id === next.id);
      labelText = p?.name ?? 'Case study';
    }
    label.textContent = labelText;
    wipe.appendChild(label);

    gsap.set(cells, { scaleY: 0, transformOrigin: 'center bottom', opacity: 1 });
    gsap.set(label, { autoAlpha: 0 });

    const watchdog = window.setTimeout(() => {
      if (busyRef.current) {
        busyRef.current = false;
        if (wipe) wipe.innerHTML = '';
      }
    }, 2500);

    const tl = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(watchdog);
        busyRef.current = false;
        if (wipe) wipe.innerHTML = '';
        const pending = pendingRef.current;
        if (pending) {
          pendingRef.current = null;
          requestAnimationFrame(() => runWipe(pending));
        }
      },
    });

    tl.to(cells, {
      scaleY: 1,
      duration: 0.4,
      stagger: { each: 0.004, from: 'random' },
      ease: 'power2.in',
    })
      .to(label, { autoAlpha: 1, duration: 0.25 }, '-=0.15')
      .add(() => {
        try {
          setRoute(next);
          scroll.toTop();
          if (next.anchor) {
            window.setTimeout(() => {
              const el = document.getElementById(next.anchor as string);
              if (el) scroll.instance?.scrollTo(el, { offset: 0, duration: 1.1 });
            }, 220);
          }
        } catch (err) {
          console.error('wipe swap failed', err);
        }
        requestAnimationFrame(() => ScrollTrigger.refresh());
      })
      .to(label, { autoAlpha: 0, duration: 0.2 })
      .to(
        cells,
        {
          scaleY: 0,
          transformOrigin: 'center top',
          duration: 0.35,
          stagger: { each: 0.003, from: 'end' },
          ease: 'power2.in',
        },
        '-=0.1'
      );
  }, []);

  const navigate = useCallback(
    (next: Route) => {
      pendingRef.current = next;
      if (busyRef.current) return;
      const pending = pendingRef.current;
      pendingRef.current = null;
      setMenuOpen(false);
      setMenuVisible(false);
      runWipe(pending);
    },
    [runWipe]
  );

  useEffect(() => {
    scroll.init();
    const initial = parseHash();
    setRoute(initial);
    return () => scroll.destroy();
  }, []);

  useEffect(() => {
    const onHash = () => {
      const next = parseHash();
      if (next.anchor && routeRef.current.name === 'home' && !loadingRef.current) {
        scrollToAnchor(next.anchor);
        return;
      }
      navigate(next);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [navigate, scrollToAnchor]);

  useEffect(() => {
    let title = TITLES[route.name] ?? TITLES.home;
    if (route.name === 'case') {
      const p = portfolioData.projects.find((x) => x.id === route.id);
      title = `${p?.name ?? 'Project'} — Manthan Gohil`;
    }
    document.title = title;
  }, [route]);

  useEffect(() => {
    if (!loading && route.anchor) {
      window.setTimeout(() => scrollToAnchor(route.anchor as string), 120);
    }
  }, [loading, route.anchor, scrollToAnchor]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((o) => {
      const next = !o;
      if (next) setMenuVisible(true);
      return next;
    });
  }, []);

  return (
    <>
      <Awwwards />
      <Cursor />
      <Noise />
      <Header menuOpen={menuOpen} onMenuToggle={toggleMenu} />
      <Menu
        open={menuOpen}
        onNavigate={() => setMenuOpen(false)}
        onCloseDone={() => setMenuVisible(false)}
      />

      {/* Wipe element */}
      <div
        ref={wipeRef}
        className="fixed inset-0 z-[150] pointer-events-none grid"
        aria-hidden="true"
      />

      {loading && <Loader onComplete={() => setLoading(false)} />}

      <main id="main-content" className="relative z-[1]">
        {!loading && (
          <>
            {route.name === 'home' && (
              <>
                <Hero />
                <Manifesto />
                <FeaturedWork />
                <PixelMosaic variant="toGrey" />
                <About />
                <Services />
                <PixelMosaic variant="toBlack" />
                <Recognition />
                <Footer />
              </>
            )}

            {route.name === 'work' && (
              <>
                <WorkIndex />
                <Footer />
              </>
            )}

            {route.name === 'about' && (
              <>
                <AboutPage />
                <Footer />
              </>
            )}

            {route.name === 'case' && (
              <>
                <CasePage id={route.id ?? ''} />
                <Footer />
              </>
            )}
          </>
        )}
      </main>

      {/* Floating Back Button on Case Studies */}
      {!loading && route.name === 'case' && (
        <button
          onClick={() => {
            window.location.hash = '#/work';
          }}
          className="fixed left-pad bottom-6 z-[85] text-[11px] font-semibold tracking-[0.12em] uppercase bg-black text-grey border border-line rounded-full py-3 px-4.5 transition-colors duration-300 hover:text-orange hover:border-orange cursor-pointer shadow-lg"
          aria-label="Back to all work"
        >
          &larr; All work
        </button>
      )}
    </>
  );
}