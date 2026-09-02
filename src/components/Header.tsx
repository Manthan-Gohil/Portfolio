'use client';

import { Logo } from './Logo';

interface HeaderProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export function Header({ menuOpen, onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[120] flex items-center justify-between py-[18px] px-pad">
      <a
        href="#/"
        className="relative block w-[56px] group"
        aria-label="Home — Manthan Gohil"
      >
        <Logo
          className={`w-full h-auto block transition-colors duration-300 ${
            menuOpen ? 'fill-black' : 'fill-grey'
          }`}
        />
        <span
          className="absolute inset-0 transition-[clip-path] duration-500 ease-folio [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
          aria-hidden="true"
        >
          <Logo className="w-full h-auto block fill-orange" />
        </span>
      </a>

      <button
        className="relative w-[52px] h-[40px] cursor-pointer group"
        onClick={onMenuToggle}
        aria-label="Menu"
        aria-expanded={menuOpen}
        data-magnet="0.35"
      >
        <span
          className={`absolute left-[10px] right-[10px] h-[2px] transition-all duration-500 ease-folio ${
            menuOpen
              ? 'top-[20px] translate-y-[0px] rotate-45 bg-black group-hover:bg-white'
              : 'top-[14px] bg-grey group-hover:bg-orange'
          }`}
        />
        <span
          className={`absolute left-[10px] right-[10px] h-[2px] transition-all duration-500 ease-folio ${
            menuOpen
              ? 'top-[20px] -translate-y-[0px] -rotate-45 bg-black group-hover:bg-white'
              : 'top-[24px] bg-grey group-hover:bg-orange'
          }`}
        />
      </button>
    </header>
  );
}