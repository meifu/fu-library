import { Suspense } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SongForm from '@/app/components/SongForm';
import { fetchSong, putSong } from '@/lib/action';
import BasicContainer from '@/app/components/BasicContainer';

interface SongEditProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: SongEditProps) {
  const songData = await fetchSong(params.id);

  return (
    <Suspense fallback={<p>Is Loading...</p>}>
      <BasicContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="30px"
        >
          <Typography variant="h5">Edit Song</Typography>
          <IconButton aria-label="back" href={`/song/${params.id}`}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <SongForm onSubmit={putSong} data={songData} isEdit />
      </BasicContainer>
    </Suspense>
  );
}
