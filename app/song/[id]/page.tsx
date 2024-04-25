import NextLink from 'next/link';
import { Suspense } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { fetchSong } from '../../../lib/action';
import { defaultSongValues } from '../../_components/SongForm';
import BasicContainer from '../../_components/BasicContainer';
import Title from '../../_components/Title';

interface SongPageProps {
  params?: {
    id: string;
  };
}

export default async function Page({ params }: SongPageProps) {
  let songData;
  if (params?.id) {
    songData = await fetchSong(params.id);
  }
  const { name, link, lyrics, description, artists, id } =
    songData || defaultSongValues;

  return (
    <Suspense fallback={<span>loading...</span>}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {songData && (
          <>
            <Title text={name} />
            <Box width="100%" pl={1} pr={1}>
              <iframe
                width="100%"
                // height="320"
                src={link}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ aspectRatio: 16 / 9 }}
              ></iframe>
            </Box>

            <BasicContainer>
              <Typography variant="h6" gutterBottom mt={1}>
                {artists}
              </Typography>
              {lyrics && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Lyrics
                  </Typography>
                  <p>{lyrics}</p>
                </>
              )}
              {songData.description && (
                <Box mt={3}>
                  <p>{description}</p>
                </Box>
              )}

              <Box width="100%" marginTop="60px">
                <Link
                  href={`/song/${id}/edit`}
                  variant="button"
                  component={NextLink}
                >
                  Update Song Data
                </Link>
              </Box>
            </BasicContainer>
          </>
        )}
      </Box>
    </Suspense>
  );
}
