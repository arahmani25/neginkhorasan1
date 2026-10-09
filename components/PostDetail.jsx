import Link from 'next/link';
import { utils } from '@/lib/data';

export default function PostDetail({ post, kind, backHref, backLabel }) {
  const words = utils.strip(post.content).split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  const dateF = utils.date(post.created_at);

  return (
    <>
      <section className="bg-forest pb-14 pt-40 text-cream">
        <div className="container-x">
          <span className="chip bg-amber font-bold text-forest-deep">{kind}</span>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-cream/70">
            {post.author || 'Admin'} {dateF && <>· {dateF}</>} · {mins} min read
          </p>
        </div>
      </section>

      <article className="py-14">
        <div className="container-x max-w-3xl">
          {post.image_path && (
            <div className="mb-10 -mt-24 overflow-hidden rounded-3xl shadow-2xl">
              <img src={post.image_path} alt={post.title} className="w-full object-cover" />
            </div>
          )}
          <div
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-12 text-center">
            <Link href={backHref} className="btn-forest">{backLabel}</Link>
          </div>
        </div>
      </article>
    </>
  );
}
