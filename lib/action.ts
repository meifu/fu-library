'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import prismadb from './db';
import { ArtistInterface, SongInterface } from './definitions';

const CreateArtistFormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Please enter the name of the artist.',
  }),
  genre: z.string({
    invalid_type_error: 'Please enter some genre',
  }),
  image: z.string(),
  tags: z.optional(z.string()),
  description: z.string({
    required_error: 'Please enter the description.',
  }),
});

export type ArtistState = {
  errors?: {
    name?: string[];
    genre?: string[];
    image?: string[];
    tags?: string[];
    description?: string[];
  };
  message?: string | null;
}

const CreateArtistObj = CreateArtistFormSchema.omit({ id: true });

export async function createArtist(formData: ArtistInterface) {
  const {
    name,
    genre,
    image,
    tags,
    description,
  } = formData;
  const validatedFields = CreateArtistObj.safeParse({
    name,
    genre,
    image,
    tags,
    description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Artist',
    };
  }

  try {
    await prismadb.artist.create({
      data: {
        ...validatedFields.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

  } catch (error) {
    console.log({ error });
    return {
      message: 'Database Error: Failed to Create Artist.',
    };
  } finally {
    prismadb.$disconnect();
  }

  revalidatePath('/artist');
  redirect('/artist');
  
}

export async function putArtist(formData: ArtistInterface) {
  const validatedFields = CreateArtistFormSchema.safeParse({
    id: formData.id,
    name: formData.name,
    genre: formData.genre,
    image: formData.image,
    tags: formData.tags,
    description: formData.description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Put Artist',
    };
  }

  const {
    data: {
      id,
      name,
      image,
      tags,
      description,
    },
  } = validatedFields;

  try {
    await prismadb.artist.update({
      where: {
        id,
      },
      data: {
        name,
        image,
        tags,
        description,
      },
    });
  } catch (error) {
    console.log({ error });
    return {
      error,
      message: `Database Error: Failed to Put Artist ${name}.`,
    };
  } finally {
    prismadb.$disconnect();
  }

  revalidatePath(`/artist/${formData.id}`);
  redirect(`/artist/${formData.id}`);
}

export async function deleteArtist(artistId: string) {
  try {
    const deleteArtist = await prismadb.artist.delete({ where: { id: artistId }});
    return { isSuccess: true, data: deleteArtist };
  } catch (error) {
    console.log(`Database Error: Failed to delete song ${artistId}`);
    return ({ isSuccess: false, data: error });
  } finally {
    prismadb.$disconnect();
  }
}

export async function fetchArtists() {
  try {
    const data = await prismadb.artist.findMany({});
    return data;
  } catch (error) {
    console.log('fetch artist error', error);
  } finally {
    prismadb.$disconnect();
  }
}

export async function fetchArtist(artistId: string) {
  console.log('!!!!!!!!!!', typeof artistId);
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

const createSongSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Please enter the name of the artist.',
  }),
  link: z.string().url(),
  lyrics: z.optional(z.string()),
  description: z.string(),
  artists: z.string(),
  artistId: z.string(),
});

export type SongState = {
  errors?: {
    name?: string[];
    link?: string[];
    lyrics?: string[];
    description?: string[];
    artists?: string[];
  };
  message?: string | null;
}

const createSongSchemaObj = createSongSchema.omit({ id: true });

export async function createSong(formData: SongInterface) { 
  const { name, link, lyrics, description, artists, artistId } = formData;
  const validatedFields = createSongSchemaObj.safeParse({
    name, link, lyrics, description, artists, artistId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Song',
    };
  }

  const theArtist: ArtistInterface | null = await fetchArtist(validatedFields.data.artistId);
  if (!theArtist) {
    throw new Error('Database error: No artist found.');
  }

  try {
    await prismadb.song.create({
      data: {
        ...validatedFields.data,
        artists: {
          connect: [{ id: validatedFields.data.artistId }],
        },
        artistId: [validatedFields.data.artistId],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        artists: true,
      }
    });

  } catch (error) {
    console.log({ error });
    return {
      isSuccess: false,
      message: 'Database Error: Failed to Create Song.',
      error,
    };
  } finally {
    prismadb.$disconnect();
  }

  revalidatePath('/song');
  redirect('/song');
}

export async function fetchSongs() {
  try {
    const data = await prismadb.song.findMany({});
    return data;
  } catch (error) {
    console.log('Database error: Failed to fetch songs', error);
  } finally {
    prismadb.$disconnect();
  }
}

export async function fetchSong(songId: string): Promise<SongInterface> {
  try {
    const data = await prismadb.song.findUnique({
      where: {
        id: songId,
      },
    });

    if (!data) {
      throw new Error(`Database error: failed to fetch song ${songId}`);
    }

    let artistObj: ArtistInterface | null = null;
    if (data?.artistId[0]) {
      artistObj = await fetchArtist(data?.artistId[0]);
    }

    return {
      ...data,
      name: data.name || '',
      link: data.link || '',
      artistId: artistObj?.id || '',
      artists: artistObj?.name || '',
    };
  } catch (error) {
    console.log('failed to fetch a song', error);
    throw new Error('Database error: failed to fetch song');
  } finally {
    prismadb.$disconnect();
  }
}

export async function putSong(formData: SongInterface) {
  const validatedFields = createSongSchema.safeParse({
    id: formData.id,
    name: formData.name,
    link: formData.link,
    lyric: formData.lyrics,
    description: formData.description,
    artists: formData.artists,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Put Song',
    };
  }

  try {
    // find artist id
    
    return {
      isSuccess: true,
    }
  } catch (error) {
    throw new Error(`Database error: failed to put song ${formData.name}`)
  } finally {
    prismadb.$disconnect();
  }
}

export async function deleteSong(songId: string) {
  try {
    const deleteSong = await prismadb.song.delete({ where: { id: songId }});
    return { isSuccess: true, data: deleteSong };
  } catch (error) {
    console.log(`Database Error: Failed to delete song ${songId}`);
    return ({ isSuccess: false, data: error });
  } finally {
    prismadb.$disconnect();
  }
}
