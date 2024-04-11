'use client';

import { FormikProvider, useField, useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useState } from 'react';

interface InputFieldType {
  label: string;
  name: string;
  multiline?: boolean;
  minRow?: number;
}

interface InputFieldProps extends InputFieldType {
  isLoading: boolean;
}

function MyTextField(props: InputFieldProps) {
  const { label, name, minRow, multiline, isLoading } = props;
  const [field, meta, helpers] = useField(name);

  return (
    <TextField
      label={label}
      name={name}
      value={field.value}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      onChange={field.onChange}
      onBlur={field.onBlur}
      disabled={isLoading}
      multiline={multiline}
      minRows={minRow}
    />
  );
}

const inputFields: InputFieldType[] = [
  {
    label: 'NAME',
    name: 'name',
  },
  {
    label: 'GENRE',
    name: 'genre',
  },
  {
    label: 'IMAGE LINK',
    name: 'image',
  },
  {
    label: 'TAGS',
    name: 'tags',
  },
  {
    label: 'DESCRIPTION',
    name: 'description',
    multiline: true,
    minRow: 5,
  },
];

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
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Stack spacing={2}>
            {inputFields.map((field) => (
              <MyTextField key={field.name} isLoading={isLoading} {...field} />
            ))}

            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid}
            >
              Add Artist
            </Button>
          </Stack>
        </Box>
      </form>
    </FormikProvider>
  );
}
