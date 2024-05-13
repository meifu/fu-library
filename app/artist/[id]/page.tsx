import Image from 'next/image';
import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';

import { fetchArtist } from '../../../lib/action';
import BasicContainer from '../../_components/BasicContainer';
import Title from '../../_components/Title';

interface ArtistPageProps {
  params?: {
    id: string;
  };
}

export default async function Page({ params }: ArtistPageProps) {
  let artistData;
  if (params?.id) {
    artistData = await fetchArtist(params?.id);
  }

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={1200}
      margin="0 auto"
    >
      {artistData ? (
        <>
          <Title text={artistData.name} />
          <Box
            position="relative"
            width="100%"
            overflow="hidden"
            sx={{ aspectRatio: 16 / 9 }}
          >
            <Image
              src={artistData.image}
              alt={`${artistData.name}-image`}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
          <BasicContainer>
            <Box display="flex" alignItems="center" mb={3}>
              <Title variant="body1" text="Genre:" mb={0} />
              <Typography variant="body2" ml={2}>
                {artistData.genre}
              </Typography>
            </Box>

            <Typography variant="body1" mb={3}>
              {artistData.description}
            </Typography>
            {!!artistData.tags && <Chip label={artistData.tags} />}

            {artistData.songs.length > 0 && (
              <Title variant="h6" text="SONGS" mt={5} />
            )}
            {artistData.songs.map((s) => (
              <Link key={s.id} href={`/song/${s.id}`} component={NextLink}>
                {s.name}
              </Link>
            ))}

            <Fab
              color="primary"
              aria-label="edit"
              href={`/artist/${artistData.id}/edit`}
              sx={{ marginTop: '30px', float: 'right' }}
            >
              Edit
            </Fab>
          </BasicContainer>
        </>
      ) : (
        <p>No data</p>
      )}
    </Box>
  );
}
