import { PageHero } from '@/components/cards';
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
        title="Your next chapter."
        sub="Locally led journeys for the curious. Find your inspiration, then make it your own."
      />
      <section className="py-16">
        <div className="container-x">
          <PackageBrowser packages={packages} />
        </div>
      </section>
    </>
  );
}
