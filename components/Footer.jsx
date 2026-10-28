'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getBrowserSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { Arrow, WhatsAppIcon } from './Icons';
import { whatsappLink, displayWhatsApp } from '@/lib/contact';
export default function Footer({ site }) {
  const pathname=usePathname();
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [busy,setBusy] = useState(false);
  async function subscribe(e) {
    e.preventDefault();
    if (!isSupabaseConfigured) { setMessage('Online subscriptions are not available yet. Please contact us by email.'); return; }
    setBusy(true);
    try {
      const {error} = await getBrowserSupabase().from('subscribers').insert({ email:email.trim().toLowerCase() });
      if(error && error.code !== '23505') throw error;
      setMessage('You are on the list. Thank you for joining us!'); setEmail('');
    } catch { setMessage('We could not subscribe you. Please try again.'); }
    finally { setBusy(false); }
  }
  if(pathname.startsWith('/admin')) return null;
  return <footer className="site-footer"><div className="container-x"><div className="footer-top">
    <div><Link href="/" className="footer-brand"><img src="/brand/logo.png" width="1265" height="620" alt="Negin Khorasan — Afghanistan DMC & Tourism" /></Link><p className="footer-copy">Local roots. Open horizons.<br />Thoughtful journeys through the landscapes, cultures, and stories of Afghanistan.</p></div>
    <div><h2 className="footer-title">TAKE A LOOK AROUND</h2><div className="footer-links">{[['Journeys','/packages'],['Experiences','/services'],['Our story','/about'],['Gallery','/gallery'],['Journal','/blog'],['News','/news']].map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</div></div>
    <div><h2 className="footer-title">COME SAY HELLO</h2><ul className="footer-contact"><li>{site?.address}</li><li><a href={`mailto:${site?.email}`}>{site?.email}</a></li><li><a href={`tel:${(site?.phone||'').replace(/\s/g,'')}`}>{site?.phone}</a></li><li><a className="footer-whatsapp" href={whatsappLink(site?.whatsapp_number)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span>WhatsApp<br/>{displayWhatsApp(site?.whatsapp_number)}</span></a></li><li><Link href="/contact" className="text-link !mt-2">Get in touch <Arrow /></Link></li></ul></div>
    <div><h2 className="footer-title">A LITTLE WANDERLUST, IN YOUR INBOX.</h2><p className="footer-copy">Field notes, new journeys, and a different point of view. Every now and then.</p><form className="newsletter" onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required maxLength={254} placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} /><button aria-label="Subscribe to newsletter" disabled={busy}><Arrow /></button></form><p aria-live="polite" className="mt-3 text-xs leading-relaxed text-forest/80">{message}</p></div>
    </div><div className="footer-bottom"><p>© {new Date().getFullYear()} {site?.site_name || 'Negin Khorasan'}. All rights reserved.</p><p>Made for the curious. &nbsp; · &nbsp; <Link href="/login" className="hover:underline">Staff login</Link></p></div><div className="footer-wordmark" aria-hidden="true">Beyond the familiar.</div></div></footer>;
}
