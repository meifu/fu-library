'use client';

import { useFormState } from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

import { createArtist, type State } from '@/lib/action';

const ErrorMsg = styled('p')({
  color: 'red',
  fontSize: '12px',
  margin: '0',
});

export default function Page() {
  const initialState: State = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createArtist, initialState);

  const { errors, message } = state;
  return (
    <div>
      <p>Add artist</p>
      <form action={dispatch}>
        <Box width={600}>
          <Stack spacing={2}>
            <TextField
              label="NAME"
              name="name"
              helperText={errors?.name && <ErrorMsg>{errors.name}</ErrorMsg>}
            />
            <TextField
              label="GENRE"
              name="genre"
              helperText={errors?.genre && <ErrorMsg>{errors.genre}</ErrorMsg>}
            />
            <TextField
              label="IMAGE LINK"
              name="image"
              helperText={errors?.image && <ErrorMsg>{errors.image}</ErrorMsg>}
            />

            <TextField
              label="TAGS"
              name="tags"
              helperText={errors?.tags && <ErrorMsg>{errors.tags}</ErrorMsg>}
            />

            <TextField
              label="DESCRIPTION"
              name="description"
              helperText={
                errors?.description && <ErrorMsg>{errors.description}</ErrorMsg>
              }
              multiline
              minRows={5}
            />

            <Button type="submit" variant="contained">
              Add Artist
            </Button>

            {!!message && <p>{message}</p>}
          </Stack>
        </Box>
      </form>
    </div>
  );
}
