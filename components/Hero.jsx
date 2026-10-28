import { Arrow, Icon, WhatsAppIcon } from './Icons';
import { whatsappLink } from '@/lib/contact';
import styles from './Hero.module.css';

export default function Hero({ destinations = [], whatsappNumber }) {
  return <section className={styles.hero} aria-label="Discover Afghanistan">
    <div className={styles.content}>
      <p className={styles.kicker}><span aria-hidden="true" /> THIS IS AFGHANISTAN</p>
      <h1 className={styles.title}><span>Go beyond</span>{' '}<em>the ordinary.</em></h1>
      <p className={styles.description}><span className={styles.desktopDescription}>Extraordinary landscapes. Real local connections. Private journeys planned around you.</span><span className={styles.mobileDescription}>Locally led journeys. Unforgettable places.</span></p>
      <div className={styles.actions}>
        <a href="#journey-search" className={styles.primary}><span className={styles.desktopLabel}>Plan your journey</span><span className={styles.mobileLabel}>Plan a trip</span><Arrow /></a>
        <a href={whatsappLink(whatsappNumber)} className={styles.secondary} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span className={styles.desktopLabel}>Talk to a local</span><span className={styles.mobileLabel}>WhatsApp</span></a>
      </div>
      <p className={styles.note}><Icon name="people" /> Local guides. Your pace. Your kind of adventure.</p>
    </div>

    <figure className={styles.landscape}>
      <img src="/images/hero-lake.jpg" alt="Turquoise Band-e-Amir lakes beneath the cliffs of Bamyan, Afghanistan" fetchPriority="high" />
      <div className={styles.photoShade} />
      <span className={styles.mobileLocation}><Icon name="pin" /> Band-e-Amir · Bamyan</span>
      <span className={styles.photoTag}>A DIFFERENT POINT OF VIEW</span>
      <figcaption className={styles.caption}><Icon name="pin" /><span><small>BAMYAN, AFGHANISTAN</small>Band-e-Amir</span></figcaption>
    </figure>

    <form id="journey-search" action="/packages" className={styles.search} role="search" aria-label="Find your journey">
      <div className={styles.searchIntro}><span>YOUR NEXT CHAPTER</span><h2>Find your journey.</h2></div>
      <div className={styles.field}>
        <label htmlFor="journey-destination">Destination</label>
        <select id="journey-destination" name="destination" defaultValue=""><option value="">Anywhere</option>{destinations.map(destination => <option value={destination.toLowerCase()} key={destination}>{destination}</option>)}</select>
      </div>
      <div className={styles.field}>
        <label htmlFor="journey-interest">Your interests</label>
        <input id="journey-interest" name="q" placeholder="e.g. Culture" />
      </div>
      <button className={styles.searchButton} type="submit">Explore journeys <Arrow /></button>
    </form>
  </section>;
}
