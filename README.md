# Negin Khorasan / Afghan Echoes — Dynamic Travel Website

A modern, dynamic travel agency website built with **Next.js 14** + **Supabase** (database, auth, storage, image uploads). Deploys natively on **Vercel**.

## Features

**Public site**
- Full-screen Ken Burns hero slideshow with **real photos of Afghanistan** (bundled locally in `/public/images` — Band-e-Amir, Bamyan, Herat Citadel, the Blue Mosque of Mazar, Kabul)
- Scrolling destination ticker, stats band, and an award-style modern layout
- Packages with live search, destination filter and pagination — **no prices**, guests simply request a booking
- Booking requests are saved to the database **and** open the visitor's email app pre-addressed to **afghanechoes@gmail.com** with all details filled in
- Gallery with masonry layout, lightbox, videos, pagination
- Blog & News with article pages, reading time, prev/next navigation
- About, Services, Contact (form saves to DB), newsletter signup
- Modern natural design: deep forest green, warm sand, amber accents

**Admin panel** — `/admin` (like a mini cPanel)
- Dashboard with content counts
- Full CRUD (add / edit / delete) for: Packages, Blog posts, News, Gallery, Services, Team, Destinations
- **Image uploads** straight to Supabase Storage (no external hosting needed)
- Inbox: view bookings (with status: new / confirmed / cancelled), messages, subscribers
- Site settings: name, contact info, about text — all editable

## Setup (about 10 minutes)

### 1. Create a Supabase project
1. Go to [supabase.com](https://supabase.com) → **New project** (free tier is fine)
2. Open **SQL Editor** → paste the entire contents of `supabase/schema.sql` → **Run**
   (creates all tables, security policies, storage bucket, and seeds your content)

### 2. Create your admin user
Supabase Dashboard → **Authentication → Users → Add user → Create new user**
Enter your email + password. This is what you use at `/login` or `/admin`.

### 3. Add environment variables
In **Vercel** (Project → Settings → Environment Variables), add:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Both values are in Supabase → **Project Settings → API**.

### 4. Deploy to Vercel
Push this folder to GitHub and import the repo in Vercel — it auto-detects Next.js, no extra config needed. Done.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase values
npm run dev
```

## How it works without Supabase

The site runs in **demo mode** out of the box: it shows seed content from your original database dump, and forms simulate success. As soon as you add the two env vars, everything reads/writes live Supabase data — no code changes needed.

## Notes

- Pages revalidate every 60 seconds (`export const revalidate = 60`), so admin edits appear on the site automatically.
- Security: anyone can read content and submit forms, but only your authenticated admin account can edit content (enforced by Row Level Security in the database).
- Replace the placeholder picsum.photos images with real photos via the admin panel's upload button.
