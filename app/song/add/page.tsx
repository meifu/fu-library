import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import SongForm from '@/app/components/SongForm';
import { createSong } from '@/lib/action';
import BasicContainer from '@/app/components/BasicContainer';

export default function Page() {
  return (
    <BasicContainer>
      <Typography variant="h5" marginBottom="30px">
        Add song
      </Typography>
      <SongForm onSubmit={createSong} />
    </BasicContainer>
  );
}
