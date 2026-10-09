'use client';

import { useState } from 'react';
import { utils } from '@/lib/data';

const PER_PAGE = 9;

export default function GalleryClient({ gallery }) {
  const images = gallery.filter((g) => g.media_type === 'image' || (!g.video_url && g.image_path));
  const videos = gallery.filter((g) => g.media_type === 'video' || g.video_url);
  const [page, setPage] = useState(1);
  const [lightbox, setLightbox] = useState(null);

  const pages = Math.max(1, Math.ceil(images.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = images.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      {/* Images */}
      <section className="py-16">
        <div className="container-x">
          <h2 className="mb-8 font-display text-2xl font-semibold text-forest">Explore the moments</h2>
          {slice.length ? (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {slice.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setLightbox(g)}
                  className="group relative block w-full overflow-hidden rounded-2xl break-inside-avoid shadow-md"
                >
                  <img
                    src={g.image_path}
                    alt={g.caption || 'Gallery image'}
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {g.caption && (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/80 to-transparent px-4 pb-3 pt-10 text-left text-sm font-medium text-cream">
                      {g.caption}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-sand/60 py-12 text-center text-ink/60">No images yet.</p>
          )}

          {pages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-10 w-10 rounded-xl text-sm font-semibold ${p === current ? 'bg-forest text-cream' : 'bg-white text-forest ring-1 ring-forest/15 hover:bg-forest-mist'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Videos */}
      <section className="bg-forest-mist/50 py-16" id="videos">
        <div className="container-x">
          <h2 className="mb-8 font-display text-2xl font-semibold text-forest">Videos</h2>
          {videos.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <a
                  key={v.id}
                  href={v.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-video overflow-hidden rounded-2xl bg-forest-deep shadow-md"
                >
                  <img
                    src={v.image_path || utils.ytThumb(v.video_url) || `https://picsum.photos/seed/ae-vid-${v.id}/640/360`}
                    alt={v.caption || 'Video'}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-black/50 text-lg text-cream backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-amber group-hover:text-forest-deep">
                      ▶
                    </span>
                  </span>
                  {v.caption && (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/85 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-cream">
                      {v.caption}
                    </span>
                  )}
                </a>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-white py-12 text-center text-ink/60">No videos yet.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-forest-deep/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <figure className="max-h-[88vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.image_path}
              alt={lightbox.caption || ''}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            {lightbox.caption && (
              <figcaption className="mt-3 text-center text-sm text-cream/80">{lightbox.caption}</figcaption>
            )}
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-xl text-cream hover:bg-cream/20"
              aria-label="Close"
            >
              ×
            </button>
          </figure>
        </div>
      )}
    </>
  );
}
