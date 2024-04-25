import Typography from '@mui/material/Typography';

import SongForm from '@/components/SongForm';
import { createSong } from '@/lib/action';
import BasicContainer from '@/components/BasicContainer';

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
