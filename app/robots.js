export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/login'] },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neginkhorasan.com'}/sitemap.xml`
  };
}
