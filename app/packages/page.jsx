import { PageHero, PackageCard } from '@/components/cards';
import PackageBrowser from '@/components/PackageBrowser';
import { getPackages } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Tour Packages' };

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
          <PackageBrowser packages={packages} />
        </div>
      </section>
    </>
  );
}
