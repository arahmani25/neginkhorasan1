import Link from 'next/link';
import Hero from '@/components/Hero';
import { SectionHead, PackageCard, DestinationCard, PostCard, ServiceCard } from '@/components/cards';
import { getPackages, getDestinations, getServices, getNews, getBlogPosts, getGallery } from '@/lib/data';
import { SLIDES, ICON_STRIP } from '@/lib/seed';

export const revalidate = 60;

export default async function Home() {
  const [packages, destinations, services, news, posts, gallery] = await Promise.all([
    getPackages(), getDestinations(), getServices(), getNews(), getBlogPosts(), getGallery()
  ]);
  const featured = packages.filter((p) => p.featured).slice(0, 3);
  const images = gallery.filter((g) => g.media_type === 'image').slice(0, 6);

  return (
    <>
      <Hero slides={SLIDES} />

      {/* Icon strip */}
      <section className="relative z-10 -mt-16">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ICON_STRIP.map((s, i) => (
            <div
              key={s.title}
              className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_rgba(12,43,41,0.12)] ring-1 ring-forest/5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-mist text-forest-mid">
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

      {/* Destinations */}
      <section className="py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Top Destinations"
            title="Popular Destinations"
            sub="Hand-picked places our travelers love most."
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
            title="Tour Packages & Programs"
            sub="Curated trips and scholarship opportunities across Afghanistan and beyond."
          />
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <PackageCard key={p.id} p={p} />)}
          </div>
          <div className="mt-12 text-center">
            <Link href="/packages" className="btn-forest">View All Packages</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="What We Do"
            title="Our Services"
            sub="From nature expeditions to study-abroad programs — we handle every detail."
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
      <section className="relative overflow-hidden bg-forest py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #EAC06B 0, transparent 45%)' }}
        />
        <div className="container-x relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-cream md:text-4xl">
            Let us help you explore the best. Contact us now.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/75">
            Tell us where you want to go — we will craft the journey around your pace and interests.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/contact" className="btn-amber">Get in Touch</Link>
            <Link href="/packages" className="btn-ghost">Browse Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
