import { Suspense } from 'react';
import { PageHero } from '@/components/cards';
import PackageBrowser from '@/components/PackageBrowser';
import { getPackages } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Tour Packages' };

// Fallback shown while the browser filter hydrates
function PackagesFallback({ packages }) {
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

export default async function PackagesPage() {
  const packages = await getPackages();
  return (
    <>
      <PageHero
        eyebrow="Curated Journeys"
        title="Tour Packages"
        sub="Explore curated trips and scholarship programs across Afghanistan and beyond."
      />
      <section className="py-16">
        <div className="container-x">
          <Suspense fallback={<PackagesFallback packages={packages} />}>
            <PackageBrowser packages={packages} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
