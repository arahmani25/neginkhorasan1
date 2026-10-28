import { PageHero } from '@/components/cards';
import { getSite, getTeam } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'About Us' };

const VALUES = ['Local Guides', 'Authentic Routes', 'Safety First', 'Cultural Immersion'];

export default async function AboutPage() {
  const [site, team] = await Promise.all([getSite(), getTeam()]);
  const paragraphs = (site?.about || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="Local roots. Open horizons."
        sub="We craft responsible, immersive journeys across Afghanistan — led by local experts."
      />

      <section className="py-20">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(12,43,41,0.12)] ring-1 ring-forest/5 lg:grid-cols-2">
            <div
              className="min-h-[340px] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/about.jpg')" }}
            />
            <div className="p-8 md:p-12">
              <p className="eyebrow">Our Story</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-forest">
                {site?.site_name || 'Afghan Echoes'}
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-ink/75">
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {VALUES.map((v, i) => (
                  <span
                    key={v}
                    className={`chip ${i === 0 ? 'bg-forest text-cream' : 'bg-sand text-forest ring-1 ring-forest/10'}`}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-mist/50 py-20">
        <div className="container-x">
          <div className="mb-12 text-center">
            <p className="eyebrow justify-center">Team</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-forest md:text-4xl">
              Meet the Team
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.id} className="card p-7 text-center">
                <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-forest font-display text-2xl font-bold text-amber ring-4 ring-white shadow-md">
                  {m.photo_path ? (
                    <img src={m.photo_path} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    m.name?.split(' ').map((w) => w[0]).slice(0, 2).join('')
                  )}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest">{m.name}</h3>
                <p className="mt-1 text-sm text-ink/60">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
