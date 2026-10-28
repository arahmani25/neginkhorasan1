import './globals.css';
import { Fraunces, Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';
import { getSite } from '@/lib/data';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display' });
const sans = Outfit({ subsets: ['latin'], variable: '--font-sans' });

export const revalidate = 60;

export const metadata = {
  title: {
    default: 'Negin Khorasan — Tours & Travel in Afghanistan',
    template: '%s | Negin Khorasan'
  },
  description:
    'Locally led journeys through Afghanistan. Discover turquoise lakes, ancient cities, and the stories of the Silk Road with Negin Khorasan.'
};

export default async function RootLayout({ children }) {
  const site = await getSite();
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar site={site} />
        <main id="main-content">{children}</main>
        <Footer site={site} />
        <WhatsApp number={site.whatsapp_number} />
      </body>
    </html>
  );
}
