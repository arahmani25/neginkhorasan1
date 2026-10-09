import './globals.css';
import { Fraunces, Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSite } from '@/lib/data';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display' });
const sans = Outfit({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: {
    default: 'Negin Khorasan — Tours & Travel in Afghanistan',
    template: '%s | Negin Khorasan'
  },
  description:
    'Responsible, immersive tours and scholarship programs across Afghanistan. Explore the soul of the land.'
};

export default async function RootLayout({ children }) {
  const site = await getSite();
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Navbar site={site} />
        <main>{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
