'use client';

import { useFormState } from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

import { putArtist, type State } from '@/lib/action';
import { useEffect, useState } from 'react';

interface ArtistParamsType {
  id: string;
}

interface BasicArtistInterface {
  id: string;
  name: string;
  genre: string;
  image: string;
  tags?: string;
  description: string;
}

const ErrorMsg = styled('p')({
  color: 'red',
  fontSize: '12px',
  margin: '0',
});

export default function Page({ params }: { params: ArtistParamsType }) {
  console.log('tttt', params.id);
  const initialState: State = { message: '', errors: {} };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [data, setData] = useState<BasicArtistInterface | null>(null);
  const [state, dispatch] = useFormState(putArtist, initialState);

  const { errors, message } = state;

  useEffect(() => {
    setIsLoading(true);
    fetch(`/artist/api?id=${params.id}`)
      .then((res) => res.json())
      .then((data: { data: BasicArtistInterface }) => {
        console.log('test res data', data);
        console.log('test res data2', data.data);
        const { name, genre, image, description, tags, id } = data.data;
        setData({ name, genre, image, description, tags, id });
        setIsLoading(false);
      });
  }, [params.id]);

  if (isLoading) return <p>Loading data...</p>;

  return (
    <div>
      <h4>Edit Artist {params.id}</h4>
      <form action={dispatch}>
        <Box width={500}>
          <Stack spacing={2}>
            <TextField
              label="ID"
              name="id"
              defaultValue={params.id}
              sx={{ visibility: 'hidden', height: '0px', overflow: 'hidden' }}
            />
            <TextField
              label="NAME"
              name="name"
              defaultValue={data?.name}
              helperText={errors?.name && <ErrorMsg>{errors.name}</ErrorMsg>}
            />
            <TextField
              label="GENRE"
              name="genre"
              defaultValue={data?.genre}
              helperText={errors?.genre && <ErrorMsg>{errors.genre}</ErrorMsg>}
            />
            <TextField
              label="IMAGE LINK"
              name="image"
              defaultValue={data?.image}
              helperText={errors?.image && <ErrorMsg>{errors.image}</ErrorMsg>}
            />

            <TextField
              label="TAGS"
              name="tags"
              defaultValue={data?.tags}
              helperText={errors?.tags && <ErrorMsg>{errors.tags}</ErrorMsg>}
            />

            <TextField
              label="DESCRIPTION"
              name="description"
              defaultValue={data?.description}
              helperText={
                errors?.description && <ErrorMsg>{errors.description}</ErrorMsg>
              }
              multiline
              minRows={5}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitLoading}
            >
              Update Artist
            </Button>

            {!!message && <p>{message}</p>}
          </Stack>
        </Box>
      </form>
    </div>
  );
}
