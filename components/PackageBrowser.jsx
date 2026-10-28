'use client';

import { useEffect, useMemo, useState } from 'react';
import { PackageCard } from '@/components/cards';

const PER_PAGE = 9;

export default function PackageBrowser({ packages }) {
  const [q, setQ] = useState('');
  const [dest, setDest] = useState('');
  const [page, setPage] = useState(1);
  const [ready, setReady] = useState(false);

  // Read URL params after mount — avoids useSearchParams() entirely
  // (which requires Suspense and breaks prerendering on some Next.js versions)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get('q') || '');
    setDest(params.get('destination') || '');
    setReady(true);
  }, []);

  const destinations = useMemo(
    () => [...new Set(packages.map((p) => p.location).filter(Boolean))],
    [packages]
  );

  const filtered = useMemo(
    () =>
      packages.filter(
        (p) =>
          (!q ||
            p.name.toLowerCase().includes(q.toLowerCase()) ||
            (p.description || '').toLowerCase().includes(q.toLowerCase())) &&
          (!dest || (p.location || '').toLowerCase() === dest.toLowerCase())
      ),
    [packages, q, dest]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  if (!ready) {
    return (
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {packages.slice(0, 9).map((p) => (
          <div key={p.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-forest/5">
            <div className="h-60 animate-pulse bg-forest-mist" />
            <div className="space-y-3 p-6">
              <div className="h-3 w-24 animate-pulse rounded bg-sand" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-forest-mist" />
              <div className="h-3 w-full animate-pulse rounded bg-sand" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-sand" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 grid gap-3 rounded-3xl bg-white p-4 shadow-[0_10px_30px_rgba(12,43,41,0.08)] ring-1 ring-forest/5 sm:grid-cols-[2fr_1.5fr_auto]">
        <input
          className="input"
          aria-label="Search journeys" placeholder="Search journeys…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        <select
          className="input"
          aria-label="Filter by destination" value={dest}
          onChange={(e) => { setDest(e.target.value); setPage(1); }}
        >
          <option value="">All destinations</option>
          {destinations.map((d) => (
            <option key={d} value={d}>{d[0].toUpperCase() + d.slice(1)}</option>
          ))}
        </select>
        <button
          className="btn-outline"
          onClick={() => { setQ(''); setDest(''); setPage(1); }}
        >
          Reset
        </button>
      </div>

      {slice.length ? (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {slice.map((p) => <PackageCard key={p.id} p={p} />)}
        </div>
      ) : (
        <div className="rounded-3xl bg-sand/60 py-16 text-center text-ink/60">
          <p className="font-display text-xl text-forest">No packages found.</p>
          <p className="mt-1 text-sm">Try clearing filters or searching a different destination.</p>
        </div>
      )}

      {pages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          <button className="btn-outline !px-4" disabled={current <= 1} onClick={() => setPage(current - 1)}>‹</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`!px-4 ${p === current ? 'btn-forest' : 'btn-outline'}`}
            >
              {p}
            </button>
          ))}
          <button className="btn-outline !px-4" disabled={current >= pages} onClick={() => setPage(current + 1)}>›</button>
        </div>
      )}
    </>
  );
}
