import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';

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
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={1200}
      margin="0 auto"
    >
      {songData && (
        <>
          <Title text={name} />
          <Box width="100%" pl={1} pr={1}>
            <iframe
              width="100%"
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
            <Title
              text={artists || ''}
              variant="h6"
              mb={2}
              textAlign="left"
              pd="0"
            />

            {lyrics && (
              <>
                <Chip label="Lyrics" />
                <Typography
                  variant="body2"
                  mt={1}
                  sx={{ whiteSpace: 'pre-line' }}
                >
                  {lyrics}
                </Typography>
              </>
            )}
            {songData.description && (
              <Box mt={3}>
                <p>{description}</p>
              </Box>
            )}

            <Fab
              color="primary"
              aria-label="edit"
              href={`/song/${id}/edit`}
              sx={{ marginTop: '30px', float: 'right' }}
            >
              Edit
            </Fab>
          </BasicContainer>
        </>
      )}
    </Box>
  );
}
