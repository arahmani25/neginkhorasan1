-- Applied to neginkhorasan in this session; kept for future installations.
alter table public.site_settings add column if not exists whatsapp_number text default '+93781608702';
update public.site_settings set whatsapp_number = '+93781608702', updated_at = now() where id = 1;

-- Replace only the two original demo film links; preserve staff-authored films.
update public.gallery
set video_url = '/videos/afghanistan-journey.mp4', image_path = '/images/film-road.jpg', caption = 'Afghanistan, from the open road'
where media_type = 'video' and video_url = 'https://www.youtube.com/shorts/tv5njtUNews';
update public.gallery
set video_url = '/videos/moments-from-the-road.mp4', image_path = '/images/film-badakhshan.jpg', caption = 'A glimpse of Badakhshan'
where media_type = 'video' and video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
