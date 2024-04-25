import Typography from '@mui/material/Typography';

import SongForm from '../../_components/SongForm';
import BasicContainer from '../../_components/BasicContainer';
import { createSong } from '../../../lib/action';

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
