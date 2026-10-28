import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostDetail from '@/components/PostDetail';
import { getBlogPosts, getPost, utils } from '@/lib/data';
import { BLOG_POSTS } from '@/lib/seed';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const {id} = await params;
  const post = await getPost('blog_posts', id, BLOG_POSTS);
  return { title: post ? post.title : 'Blog' };
}

export default async function BlogDetail({ params }) {
  const {id} = await params;
  const [post, all] = await Promise.all([
    getPost('blog_posts', id, BLOG_POSTS),
    getBlogPosts()
  ]);
  if (!post) notFound();

  const sorted = [...all].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const i = sorted.findIndex((b) => String(b.id) === String(post.id));
  const prev = sorted[i - 1];
  const next = sorted[i + 1];
  const recent = all.filter((b) => String(b.id) !== String(post.id)).slice(0, 3);

  return (
    <>
      <PostDetail post={post} kind="Blog" backHref="/blog" backLabel="← Back to Blog" />

      <section className="border-t border-forest/10 bg-forest-mist/40 py-16">
        <div className="container-x">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-forest">Recent posts</h2>
            <div className="flex gap-2">
              {prev && (
                <Link href={`/blog/${prev.id}`} className="btn-outline !px-4 text-sm">← Prev</Link>
              )}
              {next && (
                <Link href={`/blog/${next.id}`} className="btn-outline !px-4 text-sm">Next →</Link>
              )}
            </div>
          </div>
          {recent.length ? (
            <div className="grid gap-7 md:grid-cols-3">
              {recent.map((b) => (
                <Link key={b.id} href={`/blog/${b.id}`} className="card group block">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={b.image_path}
                      alt={b.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-ink/50">{utils.date(b.created_at)}</p>
                    <h3 className="mt-1 font-display font-semibold leading-snug text-forest group-hover:text-forest-soft">
                      {b.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-ink/60">No other posts yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
