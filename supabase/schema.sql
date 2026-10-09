-- ============================================================
-- Afghan Echoes / Negin Khorasan — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ---------- Tables ----------
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'tour' check (type in ('tour','scholarship')),
  price numeric(10,2) default 0,
  location text,
  description text,
  content text,
  image_path text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text default 'Admin',
  image_path text,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text default 'Admin',
  image_path text,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  media_type text not null default 'image' check (media_type in ('image','video')),
  image_path text,
  video_url text,
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text,
  content text,
  image_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  photo_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  caption text,
  image_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  package_id text,
  package_name text,
  destination text,
  price_unit numeric(10,2),
  price_total numeric(10,2),
  dates text,
  people int not null default 1,
  full_name text not null,
  email text not null,
  phone text,
  notes text,
  status text not null default 'new' check (status in ('new','confirmed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  site_name text default 'Negin Khorasan',
  tagline text default 'Explore the soul of the land',
  email text default 'info@neginkhorasan.com',
  phone text default '+93786452758',
  address text default 'Shahr-e-Naw, Haji Yaqoob Square, Kabul, Afghanistan',
  about text,
  updated_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
-- Public can READ content tables and INSERT form data.
-- Only authenticated users (your admin login) can write content.

alter table public.packages enable row level security;
alter table public.blog_posts enable row level security;
alter table public.news enable row level security;
alter table public.gallery enable row level security;
alter table public.services enable row level security;
alter table public.team enable row level security;
alter table public.destinations enable row level security;
alter table public.site_settings enable row level security;
alter table public.bookings enable row level security;
alter table public.messages enable row level security;
alter table public.subscribers enable row level security;

-- public read for content
create policy "public read packages"     on public.packages     for select using (true);
create policy "public read blog"         on public.blog_posts   for select using (true);
create policy "public read news"         on public.news         for select using (true);
create policy "public read gallery"      on public.gallery      for select using (true);
create policy "public read services"     on public.services     for select using (true);
create policy "public read team"         on public.team         for select using (true);
create policy "public read destinations" on public.destinations for select using (true);
create policy "public read settings"     on public.site_settings for select using (true);

-- public insert for forms
create policy "public insert bookings"    on public.bookings    for insert with check (true);
create policy "public insert messages"    on public.messages    for insert with check (true);
create policy "public insert subscribers" on public.subscribers for insert with check (true);

-- full access for authenticated admin
create policy "admin all packages"     on public.packages      for all to authenticated using (true) with check (true);
create policy "admin all blog"         on public.blog_posts    for all to authenticated using (true) with check (true);
create policy "admin all news"         on public.news          for all to authenticated using (true) with check (true);
create policy "admin all gallery"      on public.gallery       for all to authenticated using (true) with check (true);
create policy "admin all services"     on public.services      for all to authenticated using (true) with check (true);
create policy "admin all team"         on public.team          for all to authenticated using (true) with check (true);
create policy "admin all destinations" on public.destinations  for all to authenticated using (true) with check (true);
create policy "admin all settings"     on public.site_settings for all to authenticated using (true) with check (true);
create policy "admin all bookings"     on public.bookings      for all to authenticated using (true) with check (true);
create policy "admin all messages"     on public.messages      for all to authenticated using (true) with check (true);
create policy "admin all subscribers"  on public.subscribers   for all to authenticated using (true) with check (true);

-- ---------- Storage bucket for admin uploads ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
create policy "admin write media" on storage.objects
  for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');

-- ---------- Seed data (from your original travel_agency.sql) ----------
insert into public.site_settings (id, site_name, tagline, email, phone, address, about) values (1,
  'Negin Khorasan',
  'Explore the soul of the land',
  'info@neginkhorasan.com',
  '+93786452758',
  'Shahr-e-Naw, Haji Yaqoob Square, Kabul, Afghanistan',
  'Afghan Echoes was founded to help travelers experience the real Afghanistan with care, respect, and curiosity. Our journeys are designed by people who grew up here — local experts who know the rhythms of daily life and love sharing the country''s landscapes, traditions, and stories.'
) on conflict (id) do nothing;

insert into public.packages (name, type, price, location, description, content, image_path, featured) values
('Kabul Adventure', 'tour', 500, 'kabul',
 'Explore the capital''s bazaars, history, and surrounding mountains on a guided multi-day adventure.',
 '<p>Discover Kabul with expert local guides. Visit the historic Babur Gardens, the Bird Market, and panoramic viewpoints over the city, then head into the surrounding mountains for fresh air and dramatic scenery.</p>',
 'https://picsum.photos/seed/ae-kabul-pkg/900/700', true),
('Bamyan Adventure', 'tour', 500, 'bamyan',
 'Discover the serene valleys of Bamyan and the crystal-clear lakes of Band-e-Amir.',
 '<p>Bamyan, with its serene valleys and the famous Band-e-Amir lakes, is often called the Switzerland of Afghanistan. In spring, wildflowers blanket the meadows.</p>',
 'https://picsum.photos/seed/ae-bamyan-pkg/900/700', true),
('Russia Open Doors', 'scholarship', 3300, 'russia',
 'The Open Doors Russian Scholarship — a partially funded scholarship covering tuition for Master''s and PhD programs.',
 '<p>The Open Doors Russian Scholarship is a Russian government initiative that offers international students the opportunity to study at top Russian universities for free, awarded through an Olympiad-style competition.</p>',
 'https://picsum.photos/seed/ae-russia-pkg/900/700', true);

insert into public.destinations (title, subtitle, caption, image_path) values
('Kabul', 'Afghanistan', 'Gardens, bazaars & mountain views', 'https://picsum.photos/seed/ae-dest-kabul/700/900'),
('Mazar', 'Afghanistan', 'The Blue Mosque & ancient Balkh', 'https://picsum.photos/seed/ae-dest-mazar/700/900'),
('Herat', 'Afghanistan', 'Citadel, minarets & poetry', 'https://picsum.photos/seed/ae-dest-herat/700/900');

insert into public.team (name, role, photo_path) values
('Elyas Faisal', 'Founder & Lead Guide', 'https://picsum.photos/seed/ae-team-1/400/400'),
('Ahmad Nasir Kohistani', 'Moderator', 'https://picsum.photos/seed/ae-team-2/400/400'),
('Zahra Noori', 'Operations & Guest Experience Manager', 'https://picsum.photos/seed/ae-team-3/400/400');

insert into public.news (title, author, image_path, content) values
('Afghan Echoes Launches New Summer Tour Packages', 'Admin', 'https://picsum.photos/seed/ae-news-1/900/560',
 '<p>We are excited to announce our brand-new summer tour packages across Afghanistan. From the lakes of Band-e-Amir to the ancient streets of Herat, this season''s itineraries have been designed with comfort, safety, and authenticity in mind.</p><p>Each package includes professional local guides, trusted transport, and flexible booking. Spots are limited — book early to secure your dates.</p>');

insert into public.blog_posts (title, author, image_path, content) values
('Discovering Afghanistan''s Hidden Gems: A Journey Beyond the Headlines', 'Afghan Echoes Team',
 'https://picsum.photos/seed/ae-blog-1/1200/700',
 '<p>When most travelers think of Afghanistan, their minds often jump to history books, news reports, or rugged mountains. But beyond the headlines lies a land filled with breathtaking landscapes, rich traditions, and the warm hospitality of its people.</p><h3>The Beauty of Bamyan</h3><p>Bamyan, with its serene valleys and the famous Band-e-Amir lakes, is often called the Switzerland of Afghanistan. Crystal-clear waters surrounded by dramatic cliffs make it one of the country''s most picturesque destinations.</p><h3>A Tapestry of Cultures</h3><p>From the bustling bazaars of Kabul to the quiet villages in the north, Afghanistan offers a mosaic of cultures. Each region has its own dialects, foods, and traditions — yet all share unmatched hospitality.</p>');
