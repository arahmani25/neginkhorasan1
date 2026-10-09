'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const DURATION = 6500;

export default function Hero({ slides }) {
  const [idx, setIdx] = useState(0);
  const [tick, setTick] = useState(0); // re-triggers text animation

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
      setTick((k) => k + 1);
    }, DURATION);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[idx];

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-forest-deep">
      {/* Slides */}
      {slides.map((sl, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={sl.img}
            alt=""
            className={`h-full w-full object-cover ${i === idx ? 'animate-kenburns' : ''}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/35 to-black/30" />

      {/* Content */}
      <div className="container-x relative z-10 pb-28 pt-44" key={tick}>
        <p className="eyebrow animate-rise !text-amber-light" style={{ animationDelay: '.05s' }}>
          {s.eyebrow}
        </p>
        <h1
          className="mt-4 max-w-3xl animate-rise font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.06] text-cream"
          style={{ animationDelay: '.15s' }}
        >
          {s.title}
        </h1>
        <p
          className="mt-5 max-w-xl animate-rise text-base leading-relaxed text-cream/85 md:text-lg"
          style={{ animationDelay: '.25s' }}
        >
          {s.sub}
        </p>
        <div className="mt-8 flex animate-rise flex-wrap gap-3" style={{ animationDelay: '.35s' }}>
          <Link href="/packages" className="btn-amber">Explore Packages</Link>
          <Link href="/contact" className="btn-ghost">Plan a Custom Trip</Link>
        </div>
      </div>

      {/* Dots with progress */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setTick((k) => k + 1); }}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === idx ? 'w-10 bg-amber' : 'w-4 bg-cream/40 hover:bg-cream/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-9 right-8 z-10 hidden animate-fadein text-cream/60 md:block">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          Scroll
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-cream/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
