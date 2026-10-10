'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' }
];

export default function Navbar({ site }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-forest-deep/90 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-navbar.png"
            alt="Negin Khorasan logo"
            className="h-14 w-14 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110"
          />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-cream">
              {site?.site_name || 'Negin Khorasan'}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-amber-light/80">
              Tours & Travel
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                pathname === l.href
                  ? 'bg-cream/10 text-amber-light'
                  : 'text-cream/85 hover:bg-cream/5 hover:text-cream'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/packages" className="btn-amber ml-3 !px-5 !py-2.5">
            Book Now
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center rounded-xl text-cream lg:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-cream/10 bg-forest-deep/95 px-5 pb-6 pt-2 backdrop-blur-md lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                pathname === l.href ? 'bg-cream/10 text-amber-light' : 'text-cream/85'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/packages" className="btn-amber mt-3 w-full">
            Book Now
          </Link>
        </nav>
      )}
    </header>
  );
}
