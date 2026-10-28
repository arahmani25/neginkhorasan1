export function videoSource(value) {
  if (!value) return null;
  const raw = String(value).trim();
  const local = /^\/(?!\/)/.test(raw);
  let url;
  try { url = new URL(raw, local ? 'https://local.invalid' : undefined); } catch { return null; }
  if (!['http:', 'https:'].includes(url.protocol)) return null;
  if (/\.(mp4|webm|ogg)$/i.test(url.pathname)) return { kind: 'file', src: local ? url.pathname + url.search : url.href };
  if (local) return null;
  const host = url.hostname.toLowerCase();
  let id;
  if (host === 'youtu.be') id = url.pathname.split('/')[1];
  if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'].includes(host)) {
    id = url.searchParams.get('v') || url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1];
  }
  if (/^[\w-]{11}$/.test(id || '')) return { kind: 'youtube', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`, thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg` };
  return { kind: 'external', src: url.href };
}
