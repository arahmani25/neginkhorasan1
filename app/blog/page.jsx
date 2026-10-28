import { PageHero, PostCard } from '@/components/cards';
import { getBlogPosts } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Blog' };

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <>
      <PageHero eyebrow="Stories" title="Field notes." sub="Stories, perspectives, and inspiration from the road less travelled." />
      <section className="py-16">
        <div className="container-x">
          {posts.length ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((b) => <PostCard key={b.id} item={b} base="/blog" />)}
            </div>
          ) : (
            <p className="rounded-3xl bg-sand/60 py-16 text-center text-ink/60">No blog posts yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
