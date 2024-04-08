'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/db';
import { ArtistInterface } from '@/app/components/artistForm';

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
  console.log('in action createArtist', formData)
  const validatedFields = CreateArtistObj.safeParse({
    name: formData.name,
    genre: formData.genre,
    image: formData.image,
    tags: formData.tags,
    description: formData.description,
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

export async function putArtist(prevState: State, formData: FormData) {
  console.log('putArtist', formData)
  const validatedFields = putArtistObj.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    genre: formData.get('genre'),
    image: formData.get('image'),
    tags: formData.get('tags'),
    description: formData.get('description'),
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

  revalidatePath(`/artist/${formData.get('id')}`);
  redirect(`/artist/${formData.get('id')}`);
}