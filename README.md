# Negin Khorasan — Afghanistan DMC & Tourism

A responsive Next.js travel website with an animated landing page, destination search, journeys, gallery, journal, news, contact forms, and staff content management.

The mobile update adds WhatsApp enquiries, larger text, warm orange surfaces, and local travel films. See `MOBILE-UPDATE.md` for the editable contact number, video assets, and database update.

## Run locally
```powershell
npm ci
npm run dev
```
Open http://localhost:3000. Production: `npm run build`, then `npm start`.

The site previews with sample content when Supabase is not configured. Booking and contact forms explicitly prepare an email draft in this mode; the visitor must send it. Newsletter signup does not pretend to save.

The exact root `logo.png` is served from `public/brand/logo.png`. Keep that file when deploying.

## Connect Supabase
1. Create a Supabase project.
2. For a **new database**, run `supabase/schema.sql` in the SQL Editor.
3. For an **existing installation**, run `supabase/security-upgrade.sql` instead. It replaces overly broad authenticated-user policies and adds basic form validation.
4. Create your staff user in Authentication → Users.
5. Grant admin access by running the following in the SQL Editor, replacing the example email with your staff email:
```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'your-staff-email@example.com';
```
Only use trusted app metadata for authorization. Sign out and sign back in after changing roles so the access token refreshes. Other signed-in users cannot edit content or access customer records.
6. Copy `.env.example` to `.env.local` and set:
```text
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_SITE_URL=https://your-real-domain.example
```
Never put a service role key into a public environment variable.
7. Restart the development server, or rebuild your deployment after adding variables.
8. Open /admin and test a booking, message, subscription, content edit, image upload, and booking status change.

Public bookings use insert-only queries so private customer records remain unreadable to visitors. Requests are stored in the staff inbox; automatic notification emails are not configured. The public pages refresh at most every 60 seconds after content edits.

## Verification
```powershell
npm run build
npm test
npm run test:e2e
```
Browser checks use Playwright, Microsoft Edge (already installed on this Windows machine), and an isolated local production server. Set PLAYWRIGHT_CHANNEL=chrome to use installed Google Chrome instead. Live database checks require your own Supabase configuration and a staff account. Local browser tests do not submit to a live database.

## Design
Cinematic local photography, deep teal, saturated orange, readable text, staggered scroll reveals, and accessible native accordions. A large landscape fills the entire hero on every screen, with the heading and actions over a dark gradient. A bright orange journey search follows underneath. Text, cards, and section spacing use smaller phone proportions, while form fields stay at least 16px to avoid focus zoom. The hero grows with its content. Reduced-motion preferences disable decorative motion.

No deployment or live database changes are performed by editing these files.
