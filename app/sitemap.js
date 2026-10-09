export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://neginkhorasan.com';
  const routes = ['', '/packages', '/services', '/gallery', '/about', '/blog', '/news', '/contact'];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: 'weekly', priority: r === '' ? 1 : 0.7 }));
}
