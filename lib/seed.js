// Demo content — mirrors your original travel_agency.sql data.
// Real photos of Afghanistan are bundled in /public/images.

export const SITE = {
  site_name: 'Negin Khorasan',
  tagline: 'Explore the soul of the land',
  email: 'afghanechoes@gmail.com',
  phone: '+93786452758',
  address: 'Shahr-e-Naw, Haji Yaqoob Square, Kabul, Afghanistan',
  booking_email: 'afghanechoes@gmail.com',
  about:
    'Afghan Echoes was founded to help travelers experience the real Afghanistan with care, respect, and curiosity. Our journeys are designed by people who grew up here — local experts who know the rhythms of daily life and love sharing the country’s landscapes, traditions, and stories.\n\nSafety and responsibility are at the heart of everything we do. We plan each itinerary with up-to-date local knowledge, professional risk assessments, and flexible routes so that you can explore with confidence.\n\nWe believe travel should benefit the communities that welcome you. That is why we partner with local guides and family-run guesthouses, so your visit sustains jobs, preserves culture, and opens conversations across borders.'
};

export const SLIDES = [
  {
    img: '/images/hero-lake.jpg',
    eyebrow: 'Band-e-Amir · Bamyan',
    title: 'Lakes of impossible blue',
    sub: 'Crystal-clear travertine lakes ringed by towering cliffs — the natural wonder of central Afghanistan.'
  },
  {
    img: '/images/hero-bamyan.jpg',
    eyebrow: 'Bamyan Valley · UNESCO World Heritage',
    title: 'Where history breathes',
    sub: 'Walk the serene valley of the Buddhas, where Silk Road memory lives in every cliff and cave.'
  },
  {
    img: '/images/hero-mazar.jpg',
    eyebrow: 'Mazar-e-Sharif · The North',
    title: 'Cities of living colour',
    sub: 'From the turquoise tiles of the Blue Mosque to the ancient plains of Balkh — the cradle of civilization.'
  },
  {
    img: '/images/hero-herat.jpg',
    eyebrow: 'Herat · The Pearl of Khorasan',
    title: 'Citadels, minarets & poetry',
    sub: 'Two thousand five hundred years of art and architecture in Afghanistan’s most elegant city.'
  }
];

export const PACKAGES = [
  {
    id: 'seed-p1',
    name: 'Kabul Adventure',
    location: 'kabul',
    featured: true,
    description:
      "Explore the capital's bazaars, historic gardens and surrounding mountains on a guided multi-day adventure.",
    content:
      '<p>Discover Kabul with expert local guides. Visit the historic Babur Gardens, the Bird Market, and panoramic viewpoints over the city, then head into the surrounding mountains for fresh air and dramatic scenery.</p><h3>Highlights</h3><ul><li>Old city bazaar walk</li><li>Babur Gardens & Darul Aman Palace</li><li>Day trip to the Paghman valley</li></ul>',
    image_path: '/images/kabul.jpg',
    created_at: '2025-08-17T21:39:46Z'
  },
  {
    id: 'seed-p2',
    name: 'Bamyan & Band-e-Amir',
    location: 'bamyan',
    featured: true,
    description:
      'Discover the serene valleys of Bamyan and the crystal-clear lakes of Band-e-Amir — the Switzerland of Afghanistan.',
    content:
      '<p>Bamyan, with its serene valleys and the famous Band-e-Amir lakes, is often called the Switzerland of Afghanistan. Crystal-clear waters surrounded by dramatic cliffs make it one of the country’s most picturesque destinations. In spring, wildflowers blanket the meadows.</p><h3>Highlights</h3><ul><li>Band-e-Amir national park</li><li>The cliff of the Buddhas & Shahr-e Gholghola</li><li>Hilltop sunsets over the valley</li></ul>',
    image_path: '/images/bamyan.jpg',
    created_at: '2025-08-17T21:40:20Z'
  },
  {
    id: 'seed-p3',
    name: 'Herat Heritage Tour',
    location: 'herat',
    featured: true,
    description:
      "Two and a half millennia of history — the citadel of Alexander, Timurid minarets, and Afghanistan's capital of poetry.",
    content:
      '<p>Herat is the pearl of Khorasan. Explore the Citadel (Qala Iktyaruddin), the stunning Friday Mosque, the Musalla minarets, and the tomb of Queen Gawhar Shad — with guides who bring every era to life.</p><h3>Highlights</h3><ul><li>Herat Citadel at golden hour</li><li>Great Friday Mosque tilework</li><li>Sufi poetry & calligraphy heritage</li></ul>',
    image_path: '/images/herat.jpg',
    created_at: '2025-08-21T00:02:39Z'
  },
  {
    id: 'seed-p4',
    name: 'Mazar & Ancient Balkh',
    location: 'mazar',
    featured: false,
    description:
      'The dazzling Blue Mosque, the ancient city of Balkh, and the spiritual heart of northern Afghanistan.',
    content:
      '<p>Mazar-e-Sharif means "noble shrine" — and the shrine of Hazrat Ali, covered in turquoise tiles, is one of the most beautiful buildings in Central Asia. Add a day in Balkh, the "Mother of Cities", and you have a journey through three thousand years.</p><h3>Highlights</h3><ul><li>Shrine of Hazrat Ali (the Blue Mosque)</li><li>Ancient Balkh & Takht-e Rostam</li><li>Nawruz celebrations (seasonal)</li></ul>',
    image_path: '/images/mazar.jpg',
    created_at: '2025-09-01T10:00:00Z'
  }
];

export const DESTINATIONS = [
  { id: 'seed-d1', title: 'Kabul', subtitle: 'Afghanistan', caption: 'Gardens, bazaars & mountain views', image_path: '/images/kabul.jpg' },
  { id: 'seed-d2', title: 'Bamyan', subtitle: 'Afghanistan', caption: 'Lakes, valleys & Silk Road history', image_path: '/images/bamyan.jpg' },
  { id: 'seed-d3', title: 'Herat', subtitle: 'Afghanistan', caption: 'Citadel, minarets & poetry', image_path: '/images/herat.jpg' }
];

export const SERVICES = [
  {
    id: 'seed-s1',
    title: 'Nature Expeditions',
    text: 'Valleys, lakes and high mountains — guided journeys through the country’s most breathtaking landscapes.',
    content: '<p>Our nature tours take you through the stunning valleys of Bamyan, the lakes of Band-e-Amir, and the high mountains of the Hindu Kush — always with experienced local guides who know every trail.</p>',
    image_path: '/images/bamyan.jpg',
    created_at: '2025-09-08T09:53:15Z'
  },
  {
    id: 'seed-s2',
    title: 'Cultural City Tours',
    text: 'Bazaars, mosques, citadels and museums — history you can walk through, told by the people who live it.',
    content: '<p>From the old city of Kabul to the Timurid heart of Herat, we design every itinerary around your pace, interests, and comfort.</p>',
    image_path: '/images/hero-herat.jpg',
    created_at: '2025-09-08T12:30:36Z'
  },
  {
    id: 'seed-s3',
    title: 'Photography Journeys',
    text: 'Golden hours, dramatic light and unrivalled scenery — trips planned around your camera, not the clock.',
    content: '<p>We schedule around the light: sunrise over Band-e-Amir, dusk at the Herat Citadel, market mornings in Kabul. Bring any camera — our guides know every viewpoint.</p>',
    image_path: '/images/hero-lake.jpg',
    created_at: '2025-09-08T12:31:30Z'
  },
  {
    id: 'seed-s4',
    title: 'Complete Journey Planning',
    text: 'Visas, flights, hotels, transport — we handle the logistics so you can focus on the experience.',
    content: '<p>Visas, flights, hotels, transport — we handle the logistics so you can focus on the experience.</p>',
    image_path: '/images/hero-mazar.jpg',
    created_at: '2025-09-08T12:32:09Z'
  }
];

export const TEAM = [
  { id: 'seed-t1', name: 'Elyas Faisal', role: 'Founder & Lead Guide', photo_path: '' },
  { id: 'seed-t2', name: 'Ahmad Nasir Kohistani', role: 'Moderator', photo_path: '' },
  { id: 'seed-t3', name: 'Zahra Noori', role: 'Operations & Guest Experience Manager', photo_path: '' }
];

export const NEWS = [
  {
    id: 'seed-n1',
    title: 'Afghan Echoes Launches New Summer Tour Packages',
    author: 'Admin',
    image_path: '/images/news.jpg',
    content:
      '<p>We are excited to announce our brand-new summer tour packages across Afghanistan. From the lakes of Band-e-Amir to the ancient streets of Herat, this season\'s itineraries have been designed with comfort, safety, and authenticity in mind.</p><p>Each package includes professional local guides, trusted transport, and flexible booking. Spots are limited — book early to secure your dates.</p><p>Contact our team today to plan your journey.</p>',
    created_at: '2025-08-18T03:17:14Z'
  }
];

export const BLOG_POSTS = [
  {
    id: 'seed-b1',
    title: "Discovering Afghanistan's Hidden Gems: A Journey Beyond the Headlines",
    author: 'Afghan Echoes Team',
    image_path: '/images/blog.jpg',
    content: `<p>When most travelers think of Afghanistan, their minds often jump to history books, news reports, or rugged mountains. But beyond the headlines lies a land filled with breathtaking landscapes, rich traditions, and the warm hospitality of its people.</p>
<h3>The Beauty of Bamyan</h3>
<p>Bamyan, with its serene valleys and the famous Band-e-Amir lakes, is often called the "Switzerland of Afghanistan." Crystal-clear waters surrounded by dramatic cliffs make it one of the country's most picturesque destinations. In spring, wildflowers blanket the meadows, turning Bamyan into a colorful paradise.</p>
<h3>A Tapestry of Cultures</h3>
<p>From the bustling bazaars of Kabul to the quiet villages in the north, Afghanistan offers a mosaic of cultures. Each region has its own dialects, foods, and traditions — yet all share a common thread: unmatched hospitality. Visitors are often surprised by the warmth of locals who invite strangers for tea or a homemade meal.</p>
<h3>Flavors You'll Never Forget</h3>
<p>No Afghan journey is complete without indulging in its cuisine. Think steaming plates of Kabuli Pulao, sizzling kebabs, and sweet jalebi fresh from the market. Afghan food is not just about taste — it's about sharing, community, and tradition passed down through generations.</p>
<h3>Why Now?</h3>
<p>In recent years, adventure travelers and cultural explorers have begun rediscovering Afghanistan, seeking authentic experiences away from tourist crowds. While challenges remain, guided tours and local travel companies are working hard to create safe, memorable journeys for those eager to see the country's beauty firsthand.</p>`,
    created_at: '2025-08-17T22:30:16Z'
  }
];

export const GALLERY = [
  { id: 'seed-g1', media_type: 'image', image_path: '/images/gal-1.jpg', video_url: '', caption: 'Village beneath the Hindu Kush', created_at: '2025-08-17T21:40:38Z' },
  { id: 'seed-g2', media_type: 'image', image_path: '/images/gal-2.jpg', video_url: '', caption: 'Bamyan valley', created_at: '2025-08-17T21:40:45Z' },
  { id: 'seed-g3', media_type: 'image', image_path: '/images/gal-3.jpg', video_url: '', caption: 'Herat Citadel', created_at: '2025-08-17T21:40:50Z' },
  { id: 'seed-g4', media_type: 'image', image_path: '/images/gal-4.jpg', video_url: '', caption: 'The cliff of the Buddhas', created_at: '2025-08-17T21:40:57Z' },
  { id: 'seed-g5', media_type: 'image', image_path: '/images/gal-5.jpg', video_url: '', caption: 'Mazar-e-Sharif minaret', created_at: '2025-09-09T15:53:12Z' },
  { id: 'seed-g6', media_type: 'image', image_path: '/images/gal-6.jpg', video_url: '', caption: 'Herat at dusk', created_at: '2025-09-09T15:53:12Z' },
  { id: 'seed-g7', media_type: 'video', image_path: '', video_url: 'https://www.youtube.com/shorts/tv5njtUNews', caption: 'Afghanistan travel film', created_at: '2025-09-09T16:17:07Z' },
  { id: 'seed-g8', media_type: 'video', image_path: '', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'Kunduz — Silk Road', created_at: '2025-09-11T12:53:48Z' }
];

export const ICON_STRIP = [
  { icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', title: 'Excellence in Travel', text: 'Carefully crafted itineraries with professional local guides.' },
  { icon: 'M7 7h10v10H7z M7 3v4 M17 3v4 M7 17v4 M17 17v4', title: 'Discover Best', text: 'Hand-picked destinations and authentic experiences.' },
  { icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0', title: 'Personal Journeys', text: 'Every trip tailored to your pace and interests.' },
  { icon: 'M12 3L2 9l10 6 10-6-10-6zm0 12v6', title: 'Joy To Your Journey', text: 'From first enquiry to safe return — we handle it all.' }
];
