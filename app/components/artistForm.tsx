'use client';

import { useFormik } from 'formik';
import { useFormState, useFormStatus } from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useState } from 'react';

export interface ArtistInterface {
  id?: string;
  name: string;
  genre: string;
  image: string;
  tags?: string;
  description: string;
}

interface ArtistFormProps {
  onSubmit: (formData: ArtistInterface) => any;
}

const defaultValues: ArtistInterface = {
  id: '',
  name: '',
  genre: '',
  image: '',
  tags: '',
  description: '',
};

const validationSchema = z.object({
  name: z.string(),
  genre: z.string(),
  image: z.string().url(),
  description: z.string(),
  tags: z.optional(z.string()),
});

export default function ArtistForm(props: ArtistFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => {
      console.log('onSubmit', values);
      props.onSubmit(values);
      setIsLoading(true);
    },
    validateOnChange: true,
    validate: (values) => {
      console.log('validate', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box width={500}>
        <Stack spacing={2}>
          <TextField
            label="NAME"
            name="name"
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
            disabled={isLoading}
          />
          <TextField
            label="GENRE"
            name="genre"
            value={formik.values.genre}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
            onChange={formik.handleChange}
            disabled={isLoading}
          />
          <TextField
            label="IMAGE LINK"
            name="image"
            value={formik.values.image}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
            onChange={formik.handleChange}
            disabled={isLoading}
          />

          <TextField
            label="TAGS"
            name="tags"
            value={formik.values.tags}
            error={formik.touched.tags && Boolean(formik.errors.tags)}
            helperText={formik.touched?.tags && formik.errors.tags}
            onChange={formik.handleChange}
            disabled={isLoading}
          />

          <TextField
            label="DESCRIPTION"
            name="description"
            value={formik.values.description}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            multiline
            minRows={5}
            onChange={formik.handleChange}
            disabled={isLoading}
          />

          <Button type="submit" variant="contained" disabled={!formik.isValid}>
            Add Artist
          </Button>
        </Stack>
      </Box>
    </form>
  );
}
