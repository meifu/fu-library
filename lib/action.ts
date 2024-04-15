'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/db';
import { ArtistInterface } from '@/app/components/ArtistForm';
import { signIn } from '@/app/auth';

const CreateFormSchema = z.object({
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
  createdAt: z.optional(z.string()),
  updatedAt: z.optional(z.string()),
});

export type State = {
  errors?: {
    name?: string[];
    genre?: string[];
    image?: string[];
    tags?: string[];
    description?: string[];
  };
  message?: string | null;
}

const CreateArtistObj = CreateFormSchema.omit({ id: true, createdAt: true, updatedAt: true });

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

  console.log('create artist validated ', validatedFields);
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

const putArtistObj = CreateFormSchema.omit({ createdAt: true, updatedAt: true });

export async function putArtist(formData: ArtistInterface) {
  console.log('putArtist', formData)
  // const { id, name, genre, image, tags, description } = formData;
  const validatedFields = putArtistObj.safeParse({
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

export interface LoginField {
  email: string;
  password: string;
}

export async function authenticate(formData: LoginField) {
  try {
    
  } catch (error) {
    console.log('test', error);
    throw error;
  }
}