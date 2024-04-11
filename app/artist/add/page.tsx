import Box from '@mui/material/Box';

import { createArtist } from '@/lib/action';
import ArtistForm from '@/app/components/artistForm';

export default function Page() {
  return (
    <Box width={600} sx={{ margin: '0 auto' }}>
      <p>Add artist</p>
      <ArtistForm onSubmit={createArtist} />
    </Box>
  );
}
