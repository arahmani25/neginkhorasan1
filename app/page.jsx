import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import { Arrow, Icon } from '@/components/Icons';
import { PackageCard, DestinationCard, PostCard } from '@/components/cards';
import { getPackages, getDestinations, getServices, getBlogPosts, getGallery } from '@/lib/data';
import { SLIDES } from '@/lib/seed';
export const revalidate = 60;
const FAQ = [
  ['Can you help me plan a private trip?', 'Absolutely. Tell us your interests, dates, and group size. Our local team will work with you on an itinerary, accommodation, and transport before you confirm your journey.'],
  ['How do booking requests work?', 'Choose a journey and send a request with your preferred dates. Our team confirms availability and discusses every detail with you directly. No online payment is required.'],
  ['What about travel documents and local conditions?', 'Entry requirements and conditions can change. Contact our team before booking flights to discuss local arrangements. Check the travel advice issued by your government and arrange suitable insurance.'],
  ['Can I travel at my own pace?', 'Yes. Photography stops, cultural visits, and time in nature can all be part of the conversation. We plan around your interests and the conditions along the route.'],
];
export default async function Home() {
  const [packages, destinations, services, posts, gallery] = await Promise.all([getPackages(), getDestinations(), getServices(), getBlogPosts(), getGallery()]);
  const featured = [...packages.filter(p => p.featured), ...packages.filter(p => !p.featured)].slice(0, 3);
  const images = gallery.filter(g => g.media_type === 'image').slice(0, 4);
  return <>
    <Hero slides={SLIDES} destinations={[...new Set(packages.map(p => p.location).filter(Boolean))]} />
    <div className="trust-strip container-x"><span>LESS ORDINARY. MORE MEANINGFUL.</span><p><Icon name="people" /> Locally led journeys</p><p><Icon name="compass" /> Thoughtfully planned</p><p><Icon name="mountain" /> A different perspective</p></div>
    <section id="discover" className="section-space"><div className="container-x">
      <Reveal className="section-heading"><div><p className="eyebrow">01 / THE PLACES</p><h2>Far from ordinary.<br /><em>Close to unforgettable.</em></h2></div><div><p>Turquoise lakes. Ancient cities. Stories that have travelled the Silk Road. There is a whole other Afghanistan waiting to be discovered.</p><Link className="text-link" href="/packages">Explore all destinations <Arrow /></Link></div></Reveal>
      {destinations.length > 0 ? <div className="destination-grid">{destinations.slice(0, 3).map((d, i) => <Reveal key={d.id} delay={i * 100}><DestinationCard d={d} index={i} /></Reveal>)}</div> : <p className="empty-note">Our next destinations are being planned. <Link href="/contact">Ask us about a private journey.</Link></p>}
    </div></section>
    <section className="story-section section-space"><div className="container-x story-grid">
      <Reveal className="story-images"><img className="story-main" src="/images/about.jpg" alt="A landscape from Afghanistan" loading="lazy" /><img className="story-inset" src="/images/hero-mazar.jpg" alt="Turquoise architecture in Mazar-e-Sharif" loading="lazy" /><div className="story-stamp"><Icon name="sun" /><span>ROOTED HERE.<br />SHARED WITH YOU.</span></div></Reveal>
      <Reveal className="story-copy"><p className="eyebrow">02 / THE PEOPLE</p><h2>Not just a place.<br /><em>A connection.</em></h2><p>We are Negin Khorasan. A local team with a simple belief: the best way to experience a country is with the people who know it by heart.</p><p>From a cup of tea in Kabul to the quiet of the Bamyan valleys, we take you beyond the itinerary and into the moments that make a journey yours.</p><div className="story-values"><span><Icon name="people" /> Local knowledge</span><span><Icon name="compass" /> Personal itineraries</span></div><Link href="/about" className="btn-forest">Meet your local team <Arrow /></Link></Reveal>
    </div></section>
    <section className="section-space"><div className="container-x">
      <Reveal className="section-heading"><div><p className="eyebrow">03 / THE JOURNEYS</p><h2>Find your kind<br />of <em>extraordinary.</em></h2></div><div><p>For the curious, the culture seekers, and the ones who take the scenic route. Start with a journey. Make it your own.</p><Link href="/packages" className="text-link">All journeys <Arrow /></Link></div></Reveal>
      <div className="grid gap-7 md:grid-cols-3">{featured.map((p, i) => <Reveal key={p.id} delay={i * 100}><PackageCard p={p} /></Reveal>)}</div>
      {!featured.length && <p className="empty-note">New journeys are on the way. <Link href="/contact">Plan a custom trip with us.</Link></p>}
    </div></section>
    <section className="experience-section section-space"><div className="container-x experience-grid">
      <Reveal><p className="eyebrow !text-amber-light">04 / YOUR WAY TO TRAVEL</p><h2>A little adventure.<br />A lot of <em>possibility.</em></h2><p>Follow your curiosity. We will take care of the details.</p><Link href="/services" className="btn-ghost mt-8">Discover our experiences <Arrow /></Link><div className="experience-image"><img src="/images/hero-herat.jpg" alt="Herat Citadel in warm afternoon light" loading="lazy" /><span>HERAT / A DIFFERENT POINT OF VIEW</span></div></Reveal>
      <Reveal className="experience-list">{services.slice(0, 4).map((s, i) => <details key={s.id} name="experiences" open={i === 0}><summary><span className="experience-number">0{i + 1}</span><h3>{s.title}</h3><span className="accordion-plus" aria-hidden="true">+</span></summary><div className="experience-detail"><p>{s.text}</p><Link href="/contact" className="text-link">Plan this experience <Arrow /></Link></div></details>)}</Reveal>
    </div></section>
    <section className="section-space"><div className="container-x">
      <Reveal className="section-heading"><div><p className="eyebrow">05 / LITTLE WINDOWS INTO OUR WORLD</p><h2>Less scrolling.<br /><em>More feeling.</em></h2></div><div><p>A few moments from the places we love. Imagine being here.</p><Link href="/gallery" className="text-link">Step into the gallery <Arrow /></Link></div></Reveal>
      <div className="home-gallery">{images.map((g, i) => <Reveal key={g.id} delay={i * 70}><Link href="/gallery" className="gallery-tile"><img src={g.image_path} alt={g.caption || 'Afghanistan travel photograph'} loading="lazy" /><span>{g.caption}<Arrow /></span></Link></Reveal>)}</div>
    </div></section>
    {posts.length > 0 && <section className="journal-section section-space"><div className="container-x"><Reveal className="section-heading"><div><p className="eyebrow">06 / FIELD NOTES</p><h2>Stories from<br /><em>the road less travelled.</em></h2></div><Link href="/blog" className="text-link">Read the journal <Arrow /></Link></Reveal><div className={posts.length === 1 ? 'journal-single' : 'grid gap-8 md:grid-cols-3'}>{posts.slice(0, 3).map(p => <PostCard key={p.id} item={p} base="/blog" />)}</div></div></section>}
    <section className="section-space"><div className="container-x faq-grid"><Reveal><p className="eyebrow">A FEW THINGS TO KNOW</p><h2>Curious?<br /><em>You are in good company.</em></h2><Link href="/contact" className="text-link mt-6">Ask us anything <Arrow /></Link></Reveal><Reveal className="faq-list">{FAQ.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</Reveal></div></section>
    <section className="closing-wrap"><div className="closing-cta"><img src="/images/hero-lake.jpg" alt="The lakes of Band-e-Amir" loading="lazy" /><div className="closing-shade" /><Reveal><p className="eyebrow !text-cream">YOUR NEXT CHAPTER</p><h2>Go somewhere<br />that stays <em>with you.</em></h2><Link className="btn-amber" href="/contact">Let's make it happen <Arrow /></Link><p>No ready-made dreams. Let's create yours.</p></Reveal></div></section>
  </>;
}
