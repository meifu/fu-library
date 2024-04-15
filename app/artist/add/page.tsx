import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { createArtist } from '@/lib/action';
import ArtistForm from '@/app/components/ArtistForm';

export default function Page() {
  return (
    <Box width={600} sx={{ margin: '0 auto' }}>
      <Typography variant="h5" marginBottom="30px">
        Add artist
      </Typography>
      <ArtistForm onSubmit={createArtist} />
    </Box>
  );
}
