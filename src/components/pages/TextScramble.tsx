'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const GLYPHS = '01#@%&*+=/[]<>~XYZ_';

export function TextScramble({
  text,
  className = '',
  scrambleOnHover = true,
}: {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);

  const scramble = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isRunningRef.current = false;
        setDisplay(text);
      }

      iteration += 1 / 2;
    }, 28);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      className={`inline-block font-mono ${className}`}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
    >
      {display}
    </span>
  );
}
