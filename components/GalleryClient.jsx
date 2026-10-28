'use client';

import { useEffect, useRef, useState } from 'react';
import { videoSource } from '@/lib/media';
import { Arrow } from './Icons';

const PER_PAGE = 9;
const FALLBACK_POSTER = '/images/hero-lake.jpg';

function FilmCard({ film, onPlay }) {
  const [posterFailed, setPosterFailed] = useState(false);
  const video = videoSource(film.video_url);
  const poster = posterFailed ? FALLBACK_POSTER : film.image_path || video?.thumbnail || FALLBACK_POSTER;
  const content = <>
    <div className="film-poster"><img src={poster} alt="" loading="lazy" onError={posterFailed ? undefined : () => setPosterFailed(true)} /><span className="film-play" aria-hidden="true">▶</span><span className="film-badge">{video?.kind === 'external' ? 'WATCH FILM' : 'PLAY FILM'}</span></div>
    <div className="film-copy"><span>THROUGH OUR LENS</span><h3>{film.caption || 'A moment from the road'}</h3><p>{video?.kind === 'external' ? 'Open the film on its video site' : 'A little closer to being here'} <Arrow /></p></div>
  </>;
  if (video?.kind === 'external') return <a className="film-card" href={video.src} target="_blank" rel="noopener noreferrer">{content}</a>;
  return <button className="film-card" onClick={() => onPlay(film)} aria-label={`Play ${film.caption || 'travel film'}`}>{content}</button>;
}

export default function GalleryClient({ gallery }) {
  const images = gallery.filter(item => item.media_type !== 'video' && !item.video_url && item.image_path);
  const videos = gallery.filter(item => item.video_url && videoSource(item.video_url));
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState(null);
  const [playbackError, setPlaybackError] = useState(false);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!preview) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const keydown = event => {
      if (event.key === 'Escape') setPreview(null);
      if (event.key !== 'Tab') return;
      const focusable = [...dialogRef.current.querySelectorAll('button,a[href],video[controls],iframe')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [preview]);

  const pages = Math.max(1, Math.ceil(images.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = images.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const video = preview?.media_type === 'video' ? videoSource(preview.video_url) : null;

  return <>
    <section className="py-16"><div className="container-x">
      <p className="eyebrow">The places. The people. The feeling.</p>
      <h2 className="gallery-section-title">Explore the moments.</h2>
      {slice.length ? <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">{slice.map(item => <button key={item.id} onClick={() => setPreview(item)} className="group relative block w-full overflow-hidden rounded-2xl break-inside-avoid shadow-md" aria-label={item.caption || 'Open gallery image'}>
        <img src={item.image_path} alt={item.caption || 'Afghanistan travel photograph'} className="w-full transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        {item.caption && <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/90 to-transparent px-5 pb-5 pt-14 text-left text-base font-medium text-cream">{item.caption}</span>}
      </button>)}</div> : <p className="empty-note">New photographs are on the way.</p>}
      {pages > 1 && <nav className="mt-10 flex flex-wrap justify-center gap-3" aria-label="Gallery pages">{Array.from({ length: pages }, (_, index) => index + 1).map(number => <button key={number} onClick={() => setPage(number)} aria-current={number === current ? 'page' : undefined} aria-label={`Gallery page ${number}`} className={`h-12 w-12 rounded-xl font-semibold ${number === current ? 'bg-forest text-cream' : 'bg-amber-light text-forest'}`}>{number}</button>)}</nav>}
    </div></section>

    <section className="films-section section-space" id="videos"><div className="container-x">
      <div className="section-heading"><div><p className="eyebrow">Afghanistan, in motion</p><h2>Press play.<br/><em>Feel a little closer.</em></h2></div><div><p>A glimpse of the landscapes, open roads, and everyday moments that make the journey.</p></div></div>
      {videos.length ? <div className="film-grid">{videos.map(film => <FilmCard key={film.id} film={film} onPlay={item => { setPlaybackError(false); setPreview({ ...item, media_type: 'video' }); }} />)}</div> : <p className="empty-note">Our next travel films are on the way.</p>}
    </div></section>

    {preview && <div role="dialog" aria-modal="true" aria-label={preview.caption || (video ? 'Travel film' : 'Photo preview')} className="gallery-overlay" onClick={() => setPreview(null)}>
      <figure className={`gallery-dialog ${video ? 'is-film' : ''}`} ref={dialogRef} onClick={event => event.stopPropagation()}>
        <button className="gallery-close" aria-label="Close" ref={closeRef} onClick={() => setPreview(null)}>×</button>
        {video?.kind === 'file' ? <video controls playsInline preload="metadata" poster={preview.image_path || FALLBACK_POSTER} src={video.src} tabIndex={0} onError={() => setPlaybackError(true)} /> : video?.kind === 'youtube' ? <iframe src={video.src} title={preview.caption || 'Travel film'} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : <img src={preview.image_path} alt={preview.caption || ''} />}
        {preview.caption && <figcaption>{preview.caption}</figcaption>}
        {playbackError && <p className="film-error">This film could not load. <a href={video.src} target="_blank" rel="noopener noreferrer">Open the video directly</a> or try again.</p>}
      </figure>
    </div>}
  </>;
}
