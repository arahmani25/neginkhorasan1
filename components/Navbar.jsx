'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Arrow, WhatsAppIcon } from './Icons';
import { whatsappLink } from '@/lib/contact';
const LINKS = [['Home', '/'], ['Journeys', '/packages'], ['Experiences', '/services'], ['Gallery', '/gallery'], ['Our story', '/about'], ['Journal', '/blog'], ['News', '/news']];
export default function Navbar({ site }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  if (pathname.startsWith('/admin')) return null;
  return <header className="site-header"><div className="nav-inner">
    <Link href="/" className="brand" aria-label="Negin Khorasan home"><img src="/brand/logo.png" width="1265" height="620" alt="Negin Khorasan — Afghanistan DMC & Tourism" /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{LINKS.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}</nav>
    <a className="nav-cta" href={whatsappLink(site?.whatsapp_number)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> <span>WhatsApp</span></a>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(v => !v)}>{open ? '✕' : <><span /><span /></>}</button>
  </div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[...LINKS, ['Contact', '/contact']].map(([label, href], i) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? 'page' : undefined}><small>0{i + 1}</small>{label}<Arrow /></Link>)}</nav>}</header>;
}
