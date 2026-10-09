import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import { getPackage, getPackages, utils } from '@/lib/data';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const p = await getPackage(params.id);
  return { title: p ? p.name : 'Package' };
}

export default async function PackageDetail({ params }) {
  const pkg = await getPackage(params.id);
  if (!pkg) notFound();

  const all = await getPackages();
  const related = all.filter((p) => p.id !== pkg.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden bg-forest-deep">
        <img
          src={pkg.image_path || 'https://picsum.photos/seed/ae-fallback/1600/900'}
          alt={pkg.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-black/20" />
        <div className="container-x absolute inset-x-0 bottom-0 pb-12">
          <Link href="/packages" className="text-sm text-cream/70 hover:text-amber-light">
            ← All packages
          </Link>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow !text-amber-light">{pkg.type === 'scholarship' ? 'Scholarship Program' : 'Tour Package'}</p>
              <h1 className="mt-2 font-display text-4xl font-semibold text-cream md:text-5xl">{pkg.name}</h1>
              <p className="mt-2 capitalize text-cream/75">
                {pkg.location || 'Afghanistan'}
              </p>
            </div>
            <div className="rounded-2xl bg-amber px-6 py-4 text-forest-deep shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">From</p>
              <p className="font-display text-3xl font-bold">{utils.money(pkg.price)}</p>
              <p className="text-xs font-medium opacity-70">per person</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-ink/75">{pkg.description}</p>
            {pkg.content && (
              <div
                className="prose-article mt-6"
                dangerouslySetInnerHTML={{ __html: pkg.content }}
              />
            )}
            {related.length > 0 && (
              <>
                <h2 className="mt-14 mb-6 font-display text-2xl font-semibold text-forest">
                  You may also like
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                    <Link key={p.id} href={`/packages/${p.id}`} className="card group block">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={p.image_path}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-dark">
                          {p.location}
                        </p>
                        <h3 className="mt-1 font-display font-semibold text-forest group-hover:text-forest-soft">
                          {p.name}
                        </h3>
                        <p className="text-sm font-bold text-forest">{utils.money(p.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="lg:sticky lg:top-24">
            <BookingForm pkg={pkg} />
          </div>
        </div>
      </section>
    </>
  );
}
