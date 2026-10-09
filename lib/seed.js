// Demo content — mirrors your original travel_agency.sql data.
// Used as fallback when Supabase isn't configured yet, and as seed reference.

export const SITE = {
  site_name: 'Negin Khorasan',
  tagline: 'Explore the soul of the land',
  email: 'info@neginkhorasan.com',
  phone: '+93786452758',
  address: 'Shahr-e-Naw, Haji Yaqoob Square, Kabul, Afghanistan',
  about:
    'Afghan Echoes was founded to help travelers experience the real Afghanistan with care, respect, and curiosity. Our journeys are designed by people who grew up here — local experts who know the rhythms of daily life and love sharing the country’s landscapes, traditions, and stories.\n\nSafety and responsibility are at the heart of everything we do. We plan each itinerary with up-to-date local knowledge, professional risk assessments, and flexible routes so that you can explore with confidence.\n\nWe believe travel should benefit the communities that welcome you. That is why we partner with local guides and family-run guesthouses, so your visit sustains jobs, preserves culture, and opens conversations across borders.'
};

export const SLIDES = [
  {
    img: 'https://picsum.photos/seed/afghan-hero-1/1920/1080',
    eyebrow: 'Tours · Scholarships · Expeditions',
    title: 'Explore the Soul of Afghanistan',
    sub: 'Responsible, immersive journeys led by local experts — from ancient citadels to high mountain lakes.'
  },
  {
    img: 'https://picsum.photos/seed/afghan-hero-2/1920/1080',
    eyebrow: 'Nature & Landscapes',
    title: 'Bamyan & Band-e-Amir',
    sub: 'Crystal-clear lakes framed by dramatic cliffs — the Switzerland of Afghanistan.'
  },
  {
    img: 'https://picsum.photos/seed/afghan-hero-3/1920/1080',
    eyebrow: 'Culture & History',
    title: 'Ancient Cities, Living Stories',
    sub: 'Walk through Kabul, Herat and Mazar with guides who bring every chapter to life.'
  },
  {
    img: 'https://picsum.photos/seed/afghan-hero-4/1920/1080',
    eyebrow: 'Study Abroad',
    title: 'Russia Open Doors Scholarships',
    sub: 'Fully-funded Master’s and PhD opportunities at top Russian universities.'
  }
];

export const PACKAGES = [
  {
    id: 'seed-p1',
    name: 'Kabul Adventure',
    type: 'tour',
    price: 500,
    location: 'kabul',
    featured: true,
    description:
      "Explore the capital's bazaars, history, and surrounding mountains on a guided multi-day adventure.",
    content:
      '<p>Discover Kabul with expert local guides. Visit the historic Babur Gardens, the Bird Market, and panoramic viewpoints over the city, then head into the surrounding mountains for fresh air and dramatic scenery.</p><h3>Highlights</h3><ul><li>Old city bazaar walk</li><li>Babur Gardens & Darul Aman Palace</li><li>Day trip to the Paghman valley</li></ul>',
    image_path: 'https://picsum.photos/seed/ae-kabul-pkg/900/700',
    created_at: '2025-08-17T21:39:46Z'
  },
  {
    id: 'seed-p2',
    name: 'Bamyan Adventure',
    type: 'tour',
    price: 500,
    location: 'bamyan',
    featured: true,
    description: 'Discover the serene valleys of Bamyan and the crystal-clear lakes of Band-e-Amir.',
    content:
      '<p>Bamyan, with its serene valleys and the famous Band-e-Amir lakes, is often called the Switzerland of Afghanistan. In spring, wildflowers blanket the meadows.</p>',
    image_path: 'https://picsum.photos/seed/ae-bamyan-pkg/900/700',
    created_at: '2025-08-17T21:40:20Z'
  },
  {
    id: 'seed-p3',
    name: 'Russia Open Doors',
    type: 'scholarship',
    price: 3300,
    location: 'russia',
    featured: true,
    description:
      "The Open Doors Russian Scholarship — a partially funded scholarship covering tuition for Master's and PhD programs.",
    content:
      '<p>The Open Doors Russian Scholarship is a Russian government initiative that offers international students the opportunity to study at top Russian universities for free. It is a partially funded scholarship covering tuition fees, open to applicants for Master\'s and PhD programs, awarded through an Olympiad-style competition organized by the Association of Global Universities and the Russian Ministry of Science and Higher Education.</p>',
    image_path: 'https://picsum.photos/seed/ae-russia-pkg/900/700',
    created_at: '2025-08-21T00:02:39Z'
  },
  {
    id: 'seed-p4',
    name: 'Russia Scholarships',
    type: 'scholarship',
    price: 5000,
    location: 'russia',
    featured: false,
    description: 'Russia open-door scholarship — study at top Russian universities.',
    content:
      '<p>Full application support for Russian government scholarships: document preparation, university selection, and interview coaching.</p>',
    image_path: 'https://picsum.photos/seed/ae-russia2-pkg/900/700',
    created_at: '2025-08-17T21:37:33Z'
  }
];

export const DESTINATIONS = [
  { id: 'seed-d1', title: 'Kabul', subtitle: 'Afghanistan', caption: 'Gardens, bazaars & mountain views', image_path: 'https://picsum.photos/seed/ae-dest-kabul/700/900' },
  { id: 'seed-d2', title: 'Mazar', subtitle: 'Afghanistan', caption: 'The Blue Mosque & ancient Balkh', image_path: 'https://picsum.photos/seed/ae-dest-mazar/700/900' },
  { id: 'seed-d3', title: 'Herat', subtitle: 'Afghanistan', caption: 'Citadel, minarets & poetry', image_path: 'https://picsum.photos/seed/ae-dest-herat/700/900' }
];

export const SERVICES = [
  {
    id: 'seed-s1',
    title: 'Discover the Nature of Afghanistan',
    text: 'Valleys, lakes and high mountains — guided treks through the country’s most breathtaking landscapes.',
    content: '<p>Our nature tours take you through the stunning valleys of Bamyan, the lakes of Band-e-Amir, and the high mountains of the Hindu Kush — always with experienced local guides who know every trail.</p>',
    image_path: 'https://picsum.photos/seed/ae-svc-nature/900/600',
    created_at: '2025-09-08T09:53:15Z'
  },
  {
    id: 'seed-s2',
    title: 'Tours in Afghanistan',
    text: 'Cultural city tours and multi-day expeditions, designed around your pace and interests.',
    content: '<p>From cultural city tours to multi-day expeditions, we design every itinerary around your pace, interests, and comfort.</p>',
    image_path: 'https://picsum.photos/seed/ae-svc-tours/900/600',
    created_at: '2025-09-08T12:30:36Z'
  },
  {
    id: 'seed-s3',
    title: 'Russia Open Doors',
    text: 'Scholarship & study programs in Russia — application support from start to finish.',
    content: '<p>The Open Doors Russian Scholarship offers international students the opportunity to study at top Russian universities for free. We help you prepare documents, choose universities, and get ready for the Olympiad.</p>',
    image_path: 'https://picsum.photos/seed/ae-svc-russia/900/600',
    created_at: '2025-09-08T12:31:30Z'
  },
  {
    id: 'seed-s4',
    title: 'Complete Your Journey With Us',
    text: 'Visas, flights, hotels, transport — we handle the logistics so you can focus on the experience.',
    content: '<p>Visas, flights, hotels, transport — we handle the logistics so you can focus on the experience.</p>',
    image_path: 'https://picsum.photos/seed/ae-svc-journey/900/600',
    created_at: '2025-09-08T12:32:09Z'
  }
];

export const TEAM = [
  { id: 'seed-t1', name: 'Elyas Faisal', role: 'Founder & Lead Guide', photo_path: 'https://picsum.photos/seed/ae-team-1/400/400' },
  { id: 'seed-t2', name: 'Ahmad Nasir Kohistani', role: 'Moderator', photo_path: 'https://picsum.photos/seed/ae-team-2/400/400' },
  { id: 'seed-t3', name: 'Zahra Noori', role: 'Operations & Guest Experience Manager', photo_path: 'https://picsum.photos/seed/ae-team-3/400/400' }
];

export const NEWS = [
  {
    id: 'seed-n1',
    title: 'Afghan Echoes Launches New Summer Tour Packages',
    author: 'Admin',
    image_path: 'https://picsum.photos/seed/ae-news-1/900/560',
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
    image_path: 'https://picsum.photos/seed/ae-blog-1/1200/700',
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
  { id: 'seed-g1', media_type: 'image', image_path: 'https://picsum.photos/seed/ae-gal-1/700/900', video_url: '', caption: '', created_at: '2025-08-17T21:40:38Z' },
  { id: 'seed-g2', media_type: 'image', image_path: 'https://picsum.photos/seed/ae-gal-2/700/520', video_url: '', caption: '', created_at: '2025-08-17T21:40:45Z' },
  { id: 'seed-g3', media_type: 'image', image_path: 'https://picsum.photos/seed/ae-gal-3/700/700', video_url: '', caption: '', created_at: '2025-08-17T21:40:50Z' },
  { id: 'seed-g4', media_type: 'image', image_path: 'https://picsum.photos/seed/ae-gal-4/700/880', video_url: '', caption: '', created_at: '2025-08-17T21:40:57Z' },
  { id: 'seed-g5', media_type: 'image', image_path: 'https://picsum.photos/seed/ae-gal-5/700/560', video_url: '', caption: 'Band-e-Amir', created_at: '2025-09-09T15:53:12Z' },
  { id: 'seed-g6', media_type: 'image', image_path: 'https://picsum.photos/seed/ae-gal-6/700/760', video_url: '', caption: '', created_at: '2025-09-09T15:53:12Z' },
  { id: 'seed-g7', media_type: 'video', image_path: '', video_url: 'https://www.youtube.com/shorts/tv5njtUNews', caption: 'Afghanistan travel film', created_at: '2025-09-09T16:17:07Z' },
  { id: 'seed-g8', media_type: 'video', image_path: '', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'Kunduz — Silk Road', created_at: '2025-09-11T12:53:48Z' }
];

export const ICON_STRIP = [
  { icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', title: 'Excellence in Travel', text: 'Carefully crafted itineraries with professional local guides.' },
  { icon: 'M7 7h10v10H7z M7 3v4 M17 3v4 M7 17v4 M17 17v4', title: 'Discover Best', text: 'Hand-picked destinations and authentic experiences.' },
  { icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0', title: 'A New Moments of Life', text: 'Journeys that turn into stories you will tell forever.' },
  { icon: 'M12 3L2 9l10 6 10-6-10-6zm0 12v6', title: 'Joy To Your Journey', text: 'From tours to scholarships — we open doors for you.' }
];
