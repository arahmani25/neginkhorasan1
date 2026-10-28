'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from './Icons';

export default function WhatsApp({ number }) {
  const pathname = usePathname();
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    if (pathname !== '/') return;
    const hero = document.querySelector('section[aria-label="Discover Afghanistan"]');
    if (!hero) { setHeroVisible(false); return; }
    setHeroVisible(hero.getBoundingClientRect().bottom > 100);
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { rootMargin: '-100px 0px 0px 0px' });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return null;
  return <a className="whatsapp-float" hidden={pathname === '/' && heroVisible} href={whatsappLink(number)} target="_blank" rel="noopener noreferrer" aria-label="Chat with Negin Khorasan on WhatsApp">
    <WhatsAppIcon /><span>Let’s talk travel<small>Chat on WhatsApp</small></span>
  </a>;
}
