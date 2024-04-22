'use client';

import { useEffect, useState } from 'react';
import { FormikProvider, useField, useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { ArtistInterface, SongInterface } from '@/lib/definitions';
import { fetchArtists } from '@/lib/action';

interface InputFieldType {
  label: string;
  name: string;
  multiline?: boolean;
  minRow?: number;
  notDisplay?: boolean;
  type?: 'text' | 'select';
}

interface TextInputFieldProps extends InputFieldType {
  isLoading: boolean;
}

function MyTextField(props: TextInputFieldProps) {
  const { label, name, minRow, multiline, isLoading, notDisplay, data } = props;
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
      sx={{
        visibility: notDisplay ? 'hidden' : 'inherit',
      }}
    />
  );
}

interface SelectInputFieldProps extends InputFieldType {
  isLoading: boolean;
  isArtistsLoading: boolean;
  artists: ArtistInterface[];
}

function MySelectField(props: SelectInputFieldProps) {
  const { label, name, isLoading, artists, isArtistsLoading } = props;
  const [field, meta, helpers] = useField(name);
  const isNotAvailable = isLoading || isArtistsLoading;

  return (
    <>
      <TextField
        select
        label={label}
        name={name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={isNotAvailable}
        error={meta.touched && Boolean(meta.error)}
      >
        {artists.map((ar) => (
          <MenuItem key={ar.id} value={ar.id} disabled={isNotAvailable}>
            {ar.name}
          </MenuItem>
        ))}
      </TextField>
      {meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
    </>
  );
}

const inputFields: InputFieldType[] = [
  {
    label: 'SONG NAME',
    name: 'name',
  },
  {
    label: 'LINK',
    name: 'link',
  },
  {
    label: 'LYRICS',
    name: 'lyrics',
    multiline: true,
    minRow: 6,
  },
  {
    label: 'DESCRIPTION',
    name: 'description',
    multiline: true,
    minRow: 3,
  },
  {
    label: 'ARTIST',
    name: 'artistId',
    type: 'select',
  },
];

const editSpecificField: InputFieldType[] = [
  {
    label: 'ID',
    name: 'id',
    notDisplay: true,
  },
];

interface SongFormProps {
  onSubmit: (formData: SongInterface) => any;
  data?: SongInterface;
  isEdit?: boolean;
}

export const defaultSongValues: SongInterface = {
  id: '',
  name: '',
  link: '',
  lyrics: '',
  description: '',
  artists: '',
  artistId: '',
};

const validationSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  lyrics: z.optional(z.string()),
});

export default function SongForm({
  onSubmit,
  data = defaultSongValues,
  isEdit,
}: SongFormProps) {
  const [artists, setArtists] = useState<ArtistInterface[]>([]);
  const [isArtistsLoading, setIsArtistsLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsArtistsLoading(true);
    fetchArtists().then((res) => {
      setArtists(res as any);
      setIsArtistsLoading(false);
    });
  }, []);

  const formik = useFormik({
    initialValues: data,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => {
      onSubmit(values);
      setIsLoading(true);
    },
    validateOnChange: true,
  });

  const displayFields = isEdit
    ? inputFields.concat(editSpecificField)
    : inputFields;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Stack spacing={2}>
            {displayFields.map((field) => {
              return field.type === 'select' ? (
                <MySelectField
                  key={field.name}
                  isLoading={isLoading}
                  isArtistsLoading={isArtistsLoading}
                  artists={artists}
                  {...field}
                />
              ) : (
                <MyTextField
                  key={field.name}
                  isLoading={isLoading}
                  {...field}
                />
              );
            })}
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || isLoading}
            >
              Add Song
            </Button>
          </Stack>
        </Box>
      </form>
    </FormikProvider>
  );
}
