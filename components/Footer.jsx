'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase';

export default function Footer({ site }) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  async function subscribe(e) {
    e.preventDefault();
    if (!email) return;
    const sb = getBrowserSupabase();
    if (sb) {
      const { error } = await sb.from('subscribers').insert({ email });
      setMsg(error && error.code !== '23505' ? 'Something went wrong. Try again.' : 'Subscribed. Welcome aboard!');
    } else {
      setMsg('Subscribed. Welcome aboard! (demo mode)');
    }
    setEmail('');
  }

  const year = new Date().getFullYear();
  const links = [
    ['Home', '/'], ['Packages', '/packages'], ['Services', '/services'],
    ['Gallery', '/gallery'], ['News', '/news'], ['Blog', '/blog'],
    ['About', '/about'], ['Contact', '/contact']
  ];

  return (
    <footer className="bg-forest-deep text-cream/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-cream p-0.5 shadow-md ring-2 ring-amber/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-navbar.png" alt="Negin Khorasan logo" className="h-full w-full rounded-full object-cover" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold text-cream">
                {site?.site_name || 'Negin Khorasan'}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-amber-light/70">
                Tours & Travel
              </span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-cream/60">
            Explore the soul of the land. Tailored journeys across Afghanistan — tours,
            scholarships, and unforgettable experiences.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber">Explore</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-amber-light">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber">Contact</h4>
          <ul className="space-y-2.5 text-sm">
            <li>{site?.address}</li>
            <li>
              <a href={`mailto:${site?.email}`} className="transition hover:text-amber-light">
                {site?.email}
              </a>
            </li>
            <li>
              <a href={`tel:${(site?.phone || '').replace(/\s/g, '')}`} className="transition hover:text-amber-light">
                {site?.phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber">Newsletter</h4>
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-full border border-cream/20 bg-cream/10 px-4 py-2.5 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-amber"
            />
            <button className="btn-amber !px-5 !py-2.5" type="submit">Join</button>
          </form>
          {msg && <p className="mt-2 text-xs text-amber-light">{msg}</p>}
          <p className="mt-3 text-xs text-cream/50">Occasional updates about tours and news.</p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        Copyright © {year} {site?.site_name || 'Negin Khorasan'}. All Rights Reserved. ·{' '}
        <Link href="/login" className="underline-offset-2 hover:text-amber-light hover:underline">
          Staff Login
        </Link>
      </div>
    </footer>
  );
}
