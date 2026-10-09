import Link from 'next/link';
import { PageHero, SectionHead, ServiceCard } from '@/components/cards';
import { getServices } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Our Services' };

const MORE = [
  { icon: '🏔️', title: 'Beautiful Stays', text: 'Hand-picked guesthouses and hotels with character and comfort.' },
  { icon: '🛡️', title: 'Safety First', text: 'Up-to-date local knowledge, risk assessment and flexible routes.' },
  { icon: '🍽️', title: 'Food & Culture', text: 'Family-run restaurants, bazaars and artisan workshops.' },
  { icon: '📞', title: '24/7 Support', text: 'Our team is with you on the ground, around the clock.' }
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Our Services"
        sub="From nature expeditions to study-abroad programs — we handle every detail of your journey."
      />

      <section className="py-16">
        <div className="container-x">
          {services.length ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => <ServiceCard key={s.id} s={s} />)}
            </div>
          ) : (
            <p className="rounded-3xl bg-sand/60 py-16 text-center text-ink/60">Add services from the admin panel.</p>
          )}
        </div>
      </section>

      <section className="bg-forest-mist/50 py-20">
        <div className="container-x">
          <SectionHead eyebrow="Why Choose Us" title="More Reasons to Travel With Us" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MORE.map((m) => (
              <div key={m.title} className="rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-forest/5 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-forest-mist text-2xl">
                  {m.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 20%, #EAC06B 0, transparent 45%)' }}
        />
        <div className="container-x relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-cream md:text-4xl">
            Lets you Explore the Best. Contact Us Now
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/75">
            Tell us where you want to go — we will craft the journey around your pace and interests.
          </p>
          <Link href="/contact" className="btn-amber mt-8">Get in Touch</Link>
        </div>
      </section>
    </>
  );
}
