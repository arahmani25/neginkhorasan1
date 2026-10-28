'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Arrow, Icon } from './Icons';
export default function Hero({ slides, destinations = [] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches || slides.length < 2) return;
    const timer = setInterval(() => setActive(i => (i + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused, slides.length]);
  const slide = slides[active];
  if (!slide) return null;
  return (
    <section className="hero-shell" aria-label="Discover Afghanistan">
      <div className="hero-stage">
        {slides.map((s, i) => <div key={s.img} className={`hero-image ${i === active ? 'is-active' : ''}`} aria-hidden="true">
          <img src={s.img} alt="" fetchPriority={i === 0 ? 'high' : 'auto'} loading={i === 0 ? 'eager' : 'lazy'} />
        </div>)}
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-kicker"><span /> AFGHANISTAN, THROUGH LOCAL EYES</p>
          <h1>Some places<br />change your <em>perspective.</em></h1>
          <p className="hero-description">Beyond the familiar. Into the extraordinary.<br className="hidden sm:block" /> Discover Afghanistan with the people who call it home.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/packages" className="btn-amber">Find your journey <Arrow /></Link>
            <Link href="/about" className="hero-story"><span className="play-circle"><Icon name="compass" /></span> Our story</Link>
          </div>
        </div>
        <div className="hero-coordinate" aria-hidden="true">34°49′ N &nbsp; 67°49′ E &nbsp; / &nbsp; AFGHANISTAN</div>
        <div className="hero-location"><Icon name="pin" /><span><small>CURRENTLY EXPLORING</small>{slide.eyebrow}</span></div>
        <div className="hero-controls">
          <span className="hero-slide-number">0{active + 1}<small> / 0{slides.length}</small></span>
          {slides.map((s, i) => <button key={s.img} onClick={() => setActive(i)} className={`slide-dot ${active === i ? 'active' : ''}`} aria-label={`Show ${s.eyebrow}`} aria-pressed={active === i} />)}
          <button className="pause-button" onClick={() => setPaused(v => !v)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>{paused ? '▶' : 'Ⅱ'}</button>
        </div>
        <a href="#discover" className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></a>
      </div>
      <form action="/packages" className="journey-search" role="search">
        <div className="search-intro"><span className="search-icon"><Icon name="compass" /></span><span>Your next chapter<small>STARTS RIGHT HERE</small></span></div>
        <label><span>WHERE TO?</span><select name="destination" defaultValue=""><option value="">Anywhere in Afghanistan</option>{destinations.map(d => <option value={d.toLowerCase()} key={d}>{d}</option>)}</select></label>
        <label><span>WHAT INSPIRES YOU?</span><input name="q" placeholder="Mountains, culture, adventure…" /></label>
        <button className="btn-forest" type="submit">Explore journeys <Arrow /></button>
      </form>
    </section>
  );
}

