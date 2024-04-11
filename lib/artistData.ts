import { unstable_noStore as noStore } from 'next/cache';

import prismadb from '@/lib/db';

export async function fetchArtist(artistId: string) {
  try {
    const data = await prismadb.artist.findUnique({
      where: {
        id: artistId,
      },
    });
    return data;
  } catch (error) {
    console.log('==fetch artist==', error);
    throw new Error(`Failed to fetch artist ${artistId}`);
  } finally {
    await prismadb.$disconnect();
  }
}