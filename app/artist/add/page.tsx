import Typography from '@mui/material/Typography';

import { createArtist } from '../../../lib/action';
import ArtistForm from '../../_components/ArtistForm';
import BasicContainer from '../../_components/BasicContainer';

export default function Page() {
  return (
    <BasicContainer>
      <Typography variant="h5" marginBottom="30px">
        Add artist
      </Typography>
      <ArtistForm onSubmit={createArtist} />
    </BasicContainer>
  );
}
