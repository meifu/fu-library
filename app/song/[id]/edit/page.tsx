import { Suspense } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SongForm from '../../../_components/SongForm';
import BasicContainer from '../../../_components/BasicContainer';
import Title from '../../../_components/Title';
import { fetchSong, putSong } from '../../../../lib/action';

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
          <Title text="Edit Song" variant="h5" />
          <IconButton aria-label="back" href={`/song/${params.id}`}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <SongForm onSubmit={putSong} data={songData} isEdit />
      </BasicContainer>
    </Suspense>
  );
}
