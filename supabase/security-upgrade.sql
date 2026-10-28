-- Existing projects: run this script once in the Supabase SQL Editor.
-- Grant your staff account app_metadata.role = admin before testing the dashboard.
begin;
drop policy if exists "public insert bookings" on public.bookings;
create policy "public insert bookings" on public.bookings for insert with check (status = 'new' and people between 1 and 100 and length(trim(full_name)) between 1 and 150 and length(email) between 3 and 254 and position('@' in email) > 1 and length(coalesce(notes,'')) <= 3000 and length(coalesce(phone,'')) <= 50 and length(coalesce(dates,'')) <= 150);

drop policy if exists "public insert messages" on public.messages;
create policy "public insert messages" on public.messages for insert with check (length(trim(name)) between 1 and 150 and length(email) between 3 and 254 and position('@' in email) > 1 and length(trim(message)) between 1 and 5000 and length(coalesce(subject,'')) <= 200);

drop policy if exists "public insert subscribers" on public.subscribers;
create policy "public insert subscribers" on public.subscribers for insert with check (length(email) between 3 and 254 and position('@' in email) > 1);

drop policy if exists "admin all packages" on public.packages;
create policy "admin all packages"     on public.packages      for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all blog" on public.blog_posts;
create policy "admin all blog"         on public.blog_posts    for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all news" on public.news;
create policy "admin all news"         on public.news          for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all gallery" on public.gallery;
create policy "admin all gallery"      on public.gallery       for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all services" on public.services;
create policy "admin all services"     on public.services      for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all team" on public.team;
create policy "admin all team"         on public.team          for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all destinations" on public.destinations;
create policy "admin all destinations" on public.destinations  for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all settings" on public.site_settings;
create policy "admin all settings"     on public.site_settings for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all bookings" on public.bookings;
create policy "admin all bookings"     on public.bookings      for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all messages" on public.messages;
create policy "admin all messages"     on public.messages      for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin all subscribers" on public.subscribers;
create policy "admin all subscribers"  on public.subscribers   for all to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admin write media" on storage.objects;
create policy "admin write media" on storage.objects
  for all to authenticated using (bucket_id = 'media' and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin') with check (bucket_id = 'media' and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

commit;
