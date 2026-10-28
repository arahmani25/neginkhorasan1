import Link from 'next/link';
import { utils } from '@/lib/utils';
import { Arrow, Icon } from './Icons';
export function SectionHead({eyebrow,title,sub,center=true}) {
 return <div className={`mb-12 max-w-2xl ${center?'mx-auto text-center':''}`}>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h2 className="mt-4 text-3xl font-normal tracking-tight text-forest md:text-5xl">{title}</h2>{sub&&<p className="mt-4 text-sm leading-relaxed text-ink/60">{sub}</p>}</div>;
}
export function PackageCard({p}) {
 return <Link href={`/packages/${p.id}`} className="package-card"><div className="package-image"><img src={p.image_path||'/images/gal-1.jpg'} alt={p.name} loading="lazy"/><span className="chip">{p.location||'Afghanistan'}</span></div><div className="package-copy"><h3>{p.name}</h3><p>{p.description}</p><div className="package-bottom"><span>LOCALLY LED · PERSONALLY PLANNED</span><strong>Discover <Arrow/></strong></div></div></Link>;
}
export function DestinationCard({d,index=0}) {
 return <Link href={`/packages?destination=${encodeURIComponent(d.title.toLowerCase())}`} className="destination-card"><img src={d.image_path||'/images/gal-1.jpg'} alt={d.title} loading="lazy"/><span className="destination-index">0{index+1} / EXPLORE</span><div className="destination-info"><small>{d.subtitle||'AFGHANISTAN'}</small><h3>{d.title}</h3><p>{d.caption}</p><span className="destination-arrow"><Arrow/></span></div></Link>;
}
export function PostCard({item,base}) {
 return <Link href={`${base}/${item.id}`} className="card group block h-full"><div className="h-56 overflow-hidden"><img src={item.image_path||'/images/gal-1.jpg'} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/></div><div className="p-6"><p className="text-[12px] uppercase tracking-widest text-ink/55">{utils.date(item.created_at)} · {item.author||'Our team'}</p><h3 className="mt-3 text-xl font-normal leading-snug tracking-tight text-forest">{item.title}</h3><p className="mt-3 text-base leading-relaxed text-ink/60">{utils.excerpt(item.content,125)}</p><span className="text-link">Read the story <Arrow/></span></div></Link>;
}
export function ServiceCard({s}) {
 return <div className="card group h-full"><div className="h-56 overflow-hidden"><img src={s.image_path||'/images/gal-1.jpg'} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/></div><div className="p-6"><h3 className="text-xl tracking-tight text-forest">{s.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/60">{s.text}</p><Link href="/contact" className="text-link">Make it your experience <Arrow/></Link></div></div>;
}
export function PageHero({eyebrow,title,sub,children}) {
 return <section className="page-hero"><div className="container-x relative"><div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><span>{title}</span></div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{sub&&<p className="mt-5">{sub}</p>}{children}</div></section>;
}
