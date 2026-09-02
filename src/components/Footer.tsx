'use client';

import { Logo } from './Logo';
import { portfolioData } from '@/lib/data';
import { scroll } from '@/lib/scroll';

export function Footer() {
  const profile = portfolioData.profile;

  return (
    <footer
      className="relative overflow-hidden pt-[clamp(70px,12vh,150px)] pb-6 border-t border-line section-pad"
      id="contact"
      role="contentinfo"
    >
      {/* Background Watermark Logo */}
      <div
        className="absolute left-1/2 -bottom-[15vw] -translate-x-1/2 w-[min(58vw,700px)] opacity-[0.07] pointer-events-none fill-orange select-none"
        aria-hidden="true"
      >
        <Logo className="w-full h-auto" />
      </div>

      {/* Main CTA */}
      <a
        className="block text-center group cursor-pointer"
        data-mail=""
        href={`mailto:${profile.email}`}
        data-magnet="0.06"
      >
        <span className="lbl text-mut">Ready to build something impactful?</span>
        <span
          className="block overflow-hidden mt-4 font-semibold uppercase tracking-[-0.035em] leading-none text-[clamp(64px,15.5vw,250px)] h-[1em]"
          aria-hidden="true"
        >
          <span className="block transition-transform duration-550 ease-folio group-hover:-translate-y-[1em]">
            <span className="block h-[1em] leading-none">
              LET&rsquo;S <span className="text-orange">CONNECT</span>
            </span>
            <span className="block h-[1em] leading-none text-orange">
              LET&rsquo;S CONNECT
            </span>
          </span>
        </span>
      </a>

      {/* Email link with animated underline */}
      <a
        className="block text-center mt-6.5 text-[clamp(15px,1.7vw,20px)] font-medium tracking-[0.03em] text-mut transition-colors duration-300 hover:text-orange relative z-[2]"
        data-mail=""
        href={`mailto:${profile.email}`}
      >
        <span className="relative inline-block text-grey font-semibold group">
          {profile.email}
          <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-orange scale-x-0 origin-right transition-transform duration-500 ease-folio group-hover:scale-x-100 group-hover:origin-left" />
        </span>
      </a>

      {/* Sitemap & Socials */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-start mt-[clamp(60px,10vh,120px)] relative z-[2]">
        <div>
          <small className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-mut mb-2.5">
            Navigation
          </small>
          <a
            href="#/work"
            className="block text-[15px] font-medium py-[3px] transition-colors duration-300 hover:text-orange"
          >
            Featured Work
          </a>
          <a
            href="#/about"
            className="block text-[15px] font-medium py-[3px] transition-colors duration-300 hover:text-orange"
          >
            About & Experience
          </a>
          <a
            href="#/services"
            className="block text-[15px] font-medium py-[3px] transition-colors duration-300 hover:text-orange"
          >
            What I Build
          </a>
        </div>

        <div>
          <small className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-mut mb-2.5">
            Profiles & Code
          </small>
          <a
            data-social="github"
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[15px] font-medium py-[3px] transition-colors duration-300 hover:text-orange"
          >
            GitHub ↗
          </a>
          <a
            data-social="linkedin"
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[15px] font-medium py-[3px] transition-colors duration-300 hover:text-orange"
          >
            LinkedIn ↗
          </a>
          <a
            data-social="leetcode"
            href={profile.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[15px] font-medium py-[3px] transition-colors duration-300 hover:text-orange"
          >
            LeetCode (180+ Solved) ↗
          </a>
        </div>

        <button
          className="w-[58px] h-[58px] rounded-full border border-line flex items-center justify-center text-lg justify-self-start md:justify-self-end transition-all duration-300 hover:border-orange hover:bg-orange hover:text-black cursor-pointer"
          onClick={() => scroll.toTop()}
          aria-label="Back to top"
          data-magnet="0.3"
        >
          ↑
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between flex-wrap gap-3.5 mt-[clamp(46px,8vh,90px)] pt-[18px] border-t border-line text-[11px] font-semibold tracking-[0.1em] uppercase text-mut relative z-[2]">
        <span>© 2026 {profile.name}</span>
        <span>{profile.location}</span>
        <span>Engineered to Scale</span>
      </div>
    </footer>
  );
}