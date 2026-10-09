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
        eyebrow="Book your tour packages now"
        title="Gallery"
        sub="Photos and films from our journeys across Afghanistan."
      />
      <GalleryClient gallery={gallery} />
    </>
  );
}
