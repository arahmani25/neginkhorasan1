import { PageHero, PostCard } from '@/components/cards';
import { getNews } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'News' };

export default async function NewsPage() {
  const news = await getNews();
  return (
    <>
      <PageHero eyebrow="Updates" title="The latest chapter." sub="Updates and announcements from Afghan Echoes." />
      <section className="py-16">
        <div className="container-x">
          {news.length ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => <PostCard key={n.id} item={n} base="/news" />)}
            </div>
          ) : (
            <p className="rounded-3xl bg-sand/60 py-16 text-center text-ink/60">No news yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
