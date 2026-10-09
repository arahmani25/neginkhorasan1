import Link from 'next/link';
import { utils } from '@/lib/data';

export function SectionHead({ eyebrow, title, sub, center = true }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow justify-center">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-3xl font-semibold text-forest md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 leading-relaxed text-ink/60">{sub}</p>}
    </div>
  );
}

export function PackageCard({ p }) {
  return (
    <Link href={`/packages/${p.id}`} className="card group block">
      <div className="relative h-60 overflow-hidden">
        <img
          src={p.image_path || 'https://picsum.photos/seed/ae-fallback/900/700'}
          alt={p.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <span className="chip absolute left-4 top-4 bg-forest-deep/70 text-cream backdrop-blur-sm">
          {p.type === 'scholarship' ? 'Scholarship' : 'Tour'}
        </span>
        <span className="chip absolute bottom-4 right-4 bg-amber font-bold text-forest-deep">
          {utils.money(p.price)} <span className="font-medium opacity-70">/ person</span>
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-dark">
          {p.location || 'Afghanistan'}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold text-forest transition group-hover:text-forest-soft">
          {p.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">{p.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-soft">
          View & Book
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function DestinationCard({ d }) {
  return (
    <Link href={`/packages?destination=${encodeURIComponent(d.title.toLowerCase())}`} className="group relative block h-[380px] overflow-hidden rounded-3xl shadow-lg">
      <img
        src={d.image_path}
        alt={d.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-light">{d.subtitle}</p>
        <h3 className="mt-1 font-display text-3xl font-semibold text-cream">{d.title}</h3>
        <p className="mt-1 text-sm text-cream/75">{d.caption}</p>
      </div>
    </Link>
  );
}

export function PostCard({ item, base }) {
  return (
    <Link href={`${base}/${item.id}`} className="card group block">
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image_path || 'https://picsum.photos/seed/ae-fallback/900/560'}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <p className="text-xs text-ink/50">
          {item.author || 'Admin'} · {utils.date(item.created_at)}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-forest transition group-hover:text-forest-soft">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{utils.excerpt(item.content, 130)}</p>
      </div>
    </Link>
  );
}

export function ServiceCard({ s }) {
  return (
    <div className="card group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={s.image_path || 'https://picsum.photos/seed/ae-fallback/900/600'}
          alt={s.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-forest">{s.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.text}</p>
        <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-soft">
          Contact us
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="relative overflow-hidden bg-forest pb-16 pt-40 text-cream md:pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #EAC06B 0, transparent 40%), radial-gradient(circle at 85% 70%, #EAC06B 0, transparent 35%)'
        }}
      />
      <div className="container-x relative">
        {eyebrow && <p className="eyebrow !text-amber-light">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
          {title}
        </h1>
        {sub && <p className="mt-4 max-w-xl text-cream/75">{sub}</p>}
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber via-amber-light to-amber" />
    </section>
  );
}
