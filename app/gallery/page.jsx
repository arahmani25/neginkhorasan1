import { PageHero } from '@/components/cards';
import GalleryClient from '@/components/GalleryClient';
import { getGallery } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Gallery' };

export default async function GalleryPage() {
  const gallery = await getGallery();
  return (
    <>
      <PageHero
        eyebrow="Moments from the road"
        title="A thousand little stories."
        sub="Photos and films from our journeys across Afghanistan."
      />
      <GalleryClient gallery={gallery} />
    </>
  );
}
