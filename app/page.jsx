import Link from 'next/link';
import Hero from '@/components/Hero';
import { SectionHead, PackageCard, DestinationCard, PostCard, ServiceCard } from '@/components/cards';
import { getPackages, getDestinations, getServices, getNews, getBlogPosts, getGallery } from '@/lib/data';
import { SLIDES, ICON_STRIP } from '@/lib/seed';

export const revalidate = 60;

const TICKER = ['Kabul', 'Bamyan', 'Band-e-Amir', 'Herat', 'Mazar-e-Sharif', 'Balkh', 'Paghman', 'Hindu Kush'];

const STATS = [
  { value: '100%', label: 'Local guides' },
  { value: '4', label: 'Signature journeys' },
  { value: '3', label: 'UNESCO sites visited' },
  { value: '24/7', label: 'On-trip support' }
];

export default async function Home() {
  const [packages, destinations, services, news, posts, gallery] = await Promise.all([
    getPackages(), getDestinations(), getServices(), getNews(), getBlogPosts(), getGallery()
  ]);
  const featured = packages.filter((p) => p.featured).slice(0, 3);
  const images = gallery.filter((g) => g.media_type === 'image').slice(0, 6);

  return (
    <>
      <Hero slides={SLIDES} />

      {/* Destination ticker */}
      <div className="overflow-hidden border-y border-forest/10 bg-forest py-4">
        <div className="marquee flex whitespace-nowrap">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 items-center">
              {TICKER.map((t) => (
                <span key={t} className="mx-6 flex items-center gap-6 font-display text-lg tracking-wide text-cream/85">
                  {t}
                  <span className="text-amber">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Icon strip */}
      <section className="relative z-10 -mt-2 bg-cream pt-16">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ICON_STRIP.map((s) => (
            <div
              key={s.title}
              className="group rounded-3xl bg-white p-6 shadow-[0_18px_40px_rgba(12,43,41,0.10)] ring-1 ring-forest/5 transition hover:-translate-y-1 hover:shadow-[0_26px_50px_rgba(12,43,41,0.16)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-mist text-forest-mid transition group-hover:bg-amber group-hover:text-forest-deep">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-cream pb-20 pt-14">
        <div className="container-x grid grid-cols-2 gap-6 rounded-[2rem] bg-forest px-8 py-10 md:grid-cols-4">
          {STATS.map((st) => (
            <div key={st.label} className="text-center">
              <p className="font-display text-4xl font-semibold text-amber md:text-5xl">{st.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="pb-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Top Destinations"
            title="Places that stay with you"
            sub="Hand-picked regions our travelers fall in love with — every one led by guides who grew up there."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {destinations.slice(0, 3).map((d) => <DestinationCard key={d.id} d={d} />)}
          </div>
        </div>
      </section>

      {/* Featured packages */}
      <section className="bg-forest-mist/50 py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Featured"
            title="Signature Journeys"
            sub="Carefully crafted trips — request a booking and we will confirm every detail by email."
          />
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <PackageCard key={p.id} p={p} />)}
          </div>
          <div className="mt-12 text-center">
            <Link href="/packages" className="btn-forest">View All Journeys</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="What We Do"
            title="Every detail, handled"
            sub="From nature expeditions to photography journeys — we design the trip around you."
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s) => <ServiceCard key={s.id} s={s} />)}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-forest-deep py-24">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow !text-amber-light">Moments</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-cream md:text-4xl">
                From Our Gallery
              </h2>
            </div>
            <Link href="/gallery" className="btn-ghost">View Full Gallery</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((g) => (
              <Link
                key={g.id}
                href="/gallery"
                className="group relative block overflow-hidden rounded-2xl"
              >
                <img
                  src={g.image_path}
                  alt={g.caption || 'Gallery image'}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                {g.caption && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/80 to-transparent px-4 pb-3 pt-8 text-sm font-medium text-cream">
                    {g.caption}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="Updates" title="Latest News" />
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map((n) => <PostCard key={n.id} item={n} base="/news" />)}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-forest-mist/50 py-24">
        <div className="container-x">
          <SectionHead eyebrow="Stories" title="From the Blog" />
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((b) => <PostCard key={b.id} item={b} base="/blog" />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-forest py-24 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #EAC06B 0, transparent 45%)' }}
        />
        <div className="container-x relative">
          <p className="eyebrow justify-center !text-amber-light">Begin your journey</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-cream md:text-5xl">
            The mountains are calling. Let us take you there.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/75">
            Tell us where you want to go — we will craft the journey around your pace and interests.
          </p>
          <div className="mt-9 flex justify-center gap-3">
            <Link href="/contact" className="btn-amber">Get in Touch</Link>
            <Link href="/packages" className="btn-ghost">Browse Journeys</Link>
          </div>
        </div>
      </section>
    </>
  );
}
