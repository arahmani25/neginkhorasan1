'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PackageCard } from '@/components/cards';

const PER_PAGE = 9;

export default function PackageBrowser({ packages }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [dest, setDest] = useState(params.get('destination') || '');
  const [page, setPage] = useState(1);

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
          (!dest || p.location === dest)
      ),
    [packages, q, dest]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <div className="mb-10 grid gap-3 rounded-3xl bg-white p-4 shadow-[0_10px_30px_rgba(12,43,41,0.08)] ring-1 ring-forest/5 sm:grid-cols-[2fr_1.5fr_auto]">
        <input
          className="input"
          placeholder="Search packages…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        <select
          className="input"
          value={dest}
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
