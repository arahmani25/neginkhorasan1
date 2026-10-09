import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostDetail from '@/components/PostDetail';
import { getNews, getPost } from '@/lib/data';
import { NEWS } from '@/lib/seed';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const post = await getPost('news', params.id, NEWS);
  return { title: post ? post.title : 'News' };
}

export default async function NewsDetail({ params }) {
  const [post, all] = await Promise.all([getPost('news', params.id, NEWS), getNews()]);
  if (!post) notFound();

  const sorted = [...all].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const i = sorted.findIndex((n) => String(n.id) === String(post.id));
  const prev = sorted[i - 1];
  const next = sorted[i + 1];

  return (
    <>
      <PostDetail post={post} kind="News" backHref="/news" backLabel="Back to News" />
      <div className="container-x flex items-center justify-between gap-4 pb-16">
        <div>
          {prev && (
            <Link href={`/news/${prev.id}`} className="btn-outline !px-4 text-sm">
              ← {prev.title.slice(0, 34)}{prev.title.length > 34 ? '…' : ''}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link href={`/news/${next.id}`} className="btn-outline !px-4 text-sm">
              {next.title.slice(0, 34)}{next.title.length > 34 ? '…' : ''} →
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
