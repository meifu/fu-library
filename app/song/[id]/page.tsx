import NextLink from 'next/link';
import { Suspense } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { fetchSong } from '@/lib/action';
import { defaultSongValues } from '@/app/components/SongForm';
import BasicContainer from '@/app/components/BasicContainer';
import Title from '@/app/components/Title';

interface SongPageProps {
  params: {
    id: string;
  };
}

export default async function Page(
  { params }: SongPageProps = { params: { id: '' } }
) {
  const songData = (await fetchSong(params.id)) || defaultSongValues;
  const { name, link, lyrics, description, artists, id } = songData;

  return (
    <Suspense fallback={<span>loading...</span>}>
      <BasicContainer>
        {songData && (
          <Box>
            <Title text={name} />
            <iframe
              width="600"
              height="320"
              src={link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <Box width={600}>
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
            </Box>

            <Box width="100%" marginTop="60px">
              <Link
                href={`/song/${id}/edit`}
                variant="button"
                component={NextLink}
              >
                Update Song Data
              </Link>
            </Box>
          </Box>
        )}
      </BasicContainer>
    </Suspense>
  );
}
