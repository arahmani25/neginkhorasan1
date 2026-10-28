# Mobile, WhatsApp, and gallery update

WhatsApp is available in the header, floating chat button, contact page, footer, and journey enquiries. Links open a conversation with **+93 781 608 702** and prepare a message; visitors choose when to send it. Journey links include the package name, and the booking confirmation can include the entered enquiry details.

The WhatsApp number is stored separately from the office phone as `site_settings.whatsapp_number`. Staff can edit it under Settings in the admin panel. The existing office number and email are preserved.

The design uses larger text, comfortable inputs, orange and apricot surfaces, and the existing teal. The phone layout prioritizes WhatsApp on the contact page, uses a single column for films, and keeps the chat button clear of slideshow controls.

The two placeholder YouTube films were replaced with real clips already bundled in the original project. Their posters are frames extracted from those clips. Keep `public/videos/` and the two `public/images/film-*.jpg` assets when deploying. Posters load with the page; video data loads only after opening a film. Native controls support mobile playback, including portrait films. Staff can also use YouTube, MP4, or WebM links.

For an existing database, `supabase/mobile-contact-upgrade.sql` records this update. It has already been applied to project `euvdnnppetjzyrtvgwnt`. For a new database, `supabase/schema.sql` includes the new setting and corrected films.
