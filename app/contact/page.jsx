import ContactForm from '@/components/ContactForm';
import { PageHero } from '@/components/cards';
import { getSite } from '@/lib/data';
import { whatsappLink, displayWhatsApp } from '@/lib/contact';
import { WhatsAppIcon, Arrow } from '@/components/Icons';

export const revalidate = 60;
export const metadata = { title: 'Contact' };

export default async function ContactPage() {
  const site = await getSite();
  return (
    <>
      <PageHero eyebrow="Get in touch" title="Let’s make it happen." sub="A thought, a destination, a whole adventure. Tell us what you have in mind." />
      <section className="py-16">
        <div className="container-x grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl bg-white p-7 shadow-[0_10px_30px_rgba(12,43,41,0.08)] ring-1 ring-forest/5 md:p-9">
            <ContactForm defaultSubject="" email={site.email} />
          </div>
          <aside className="order-first space-y-6 lg:order-none">
            <div className="contact-whatsapp">
              <span className="contact-whatsapp-icon"><WhatsAppIcon /></span>
              <p className="eyebrow">A conversation starts here</p>
              <h2>Let’s plan it<br/>on WhatsApp.</h2>
              <p>Questions, ideas, or ready to go? Message our local team and let’s make the journey yours.</p>
              <a className="btn-forest" href={whatsappLink(site.whatsapp_number)} target="_blank" rel="noopener noreferrer">Message us on WhatsApp <Arrow /></a>
              <span className="contact-whatsapp-number">{displayWhatsApp(site.whatsapp_number)}</span>
            </div>
            <div className="rounded-3xl bg-forest p-7 text-cream">
              <h3 className="font-display text-xl font-semibold">Office</h3>
              <ul className="mt-4 space-y-3 text-sm text-cream/85">
                <li>📍 {site?.address}</li>
                <li>
                  ✉️{' '}
                  <a href={`mailto:${site?.email}`} className="hover:text-amber-light">
                    {site?.email}
                  </a>
                </li>
                <li>
                  📞{' '}
                  <a href={`tel:${(site?.phone || '').replace(/\s/g, '')}`} className="hover:text-amber-light">
                    {site?.phone}
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl bg-sand/70 p-7 ring-1 ring-forest/10">
              <h3 className="font-display text-lg font-semibold text-forest">Prefer email?</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                For package questions, include the package name and your preferred dates — we reply
                within one business day.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
