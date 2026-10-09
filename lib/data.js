import { getSupabase } from './supabase';
import * as seed from './seed';

// Data access layer: reads from Supabase when configured,
// falls back to seed content so the site always renders.

async function fromTable(table, fallback) {
  const sb = getSupabase();
  if (!sb) return fallback;
  try {
    const { data, error } = await sb
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return fallback;
    return data && data.length ? data : fallback;
  } catch {
    return fallback;
  }
}

export async function getSite() {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data } = await sb.from('site_settings').select('*').eq('id', 1).single();
      if (data) return data;
    } catch { /* fallback */ }
  }
  return seed.SITE;
}

export const getPackages = () => fromTable('packages', seed.PACKAGES);
export const getDestinations = () => fromTable('destinations', seed.DESTINATIONS);
export const getServices = () => fromTable('services', seed.SERVICES);
export const getTeam = () => fromTable('team', seed.TEAM);
export const getNews = () => fromTable('news', seed.NEWS);
export const getBlogPosts = () => fromTable('blog_posts', seed.BLOG_POSTS);
export const getGallery = () => fromTable('gallery', seed.GALLERY);

export async function getPackage(id) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data } = await sb.from('packages').select('*').eq('id', id).single();
      if (data) return data;
    } catch { /* fallback */ }
  }
  return seed.PACKAGES.find((p) => String(p.id) === String(id)) || null;
}

export async function getPost(table, id, fallback) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data } = await sb.from(table).select('*').eq('id', id).single();
      if (data) return data;
    } catch { /* fallback */ }
  }
  return fallback.find((p) => String(p.id) === String(id)) || null;
}

export const utils = {
  money: (n) =>
    '$' +
    Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  date: (d) =>
    d
      ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '',
  strip: (html) => (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
  excerpt: (html, len = 160) => {
    const t = utils.strip(html);
    return t.length > len ? t.slice(0, len).trim() + '…' : t;
  },
  ytThumb: (url) => {
    const m = (url || '').match(/(?:youtube\.com\/shorts\/|youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
  }
};
