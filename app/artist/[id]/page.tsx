import NextLink from 'next/link';

import Image from 'next/image';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { fetchArtist } from '@/lib/artistData';

interface ArtistParamsType {
  id: string;
}

export default async function Page(
  { params }: { params: ArtistParamsType } = { params: { id: '' } }
) {
  const artistData = await fetchArtist(params.id);

  return (
    <Box width="100%">
      {artistData ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h3"
            marginTop="15px"
            marginBottom="30px"
            fontWeight="bold"
          >
            {artistData.name}
          </Typography>
          <Box
            sx={{ position: 'relative', overflow: 'hidden' }}
            width="100%"
            height="500px"
          >
            <Image
              src={artistData.image}
              alt={`${artistData.name}-image`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Box width={600}>
            <p>Genre: {artistData.genre}</p>
            <p>Description: {artistData.description}</p>
            {!!artistData.tags && <Chip label={artistData.tags} />}

            <Box width="100%" marginTop="60px">
              <Link
                href={`/artist/${artistData.id}/edit`}
                variant="button"
                component={NextLink}
              >
                Update Artist Data
              </Link>
            </Box>
          </Box>
        </Box>
      ) : (
        <p>No data</p>
      )}
    </Box>
  );
}
