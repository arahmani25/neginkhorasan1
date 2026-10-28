'use client';
import { usePathname } from 'next/navigation';
import { whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from './Icons';

export default function WhatsApp({ number }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return null;
  return <a className="whatsapp-float" href={whatsappLink(number)} target="_blank" rel="noopener noreferrer" aria-label="Chat with Negin Khorasan on WhatsApp">
    <WhatsAppIcon /><span>Let’s talk travel<small>Chat on WhatsApp</small></span>
  </a>;
}
