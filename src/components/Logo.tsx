interface LogoProps {
  className?: string;
}

const MARK = [
  'M 42 390 V 62 H 130 L 220 268 L 310 62 H 398 V 390 H 328 V 175 L 235 368 H 205 L 112 175 V 390 Z',
  'M 650 148 L 596 186 C 580 154 554 130 512 130 C 445 130 405 180 405 228 C 405 276 445 328 512 328 C 562 328 595 302 602 268 H 518 V 212 H 665 V 386 C 622 420 572 444 512 444 C 395 444 338 355 338 228 C 338 100 400 62 512 62 C 576 62 626 96 650 148 Z',
];

export function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 708 452" className={className} aria-hidden="true">
      <g transform="skewX(-7) translate(32, 0)">
        {MARK.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}