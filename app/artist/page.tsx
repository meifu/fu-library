'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';

import { ArtistInterface } from '../../lib/definitions';
import ArtistListSkeleton from '../_components/ArtistListSkeleton';
import BasicContainer from '../_components/BasicContainer';
import Title from '../_components/Title';
import { deleteArtist, fetchArtists } from '../../lib/action';

export default function Page() {
  const [artists, setArtists] = useState<ArtistInterface[]>([]);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [isDeleteOk, setIsDeleteOk] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const data = useSession();
  let isLogin = data?.status === 'authenticated' ? true : false;

  const getArtists = async () => {
    setIsLoading(true);
    const artists: ArtistInterface[] | undefined = await fetchArtists();

    if (artists) {
      setArtists(artists);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getArtists();
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(reason);
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackBarOpen(false);
  };

  return (
    <BasicContainer>
      <Title variant="h3" text="Artists that I noticed:" />

      {isLoading ? (
        <ArtistListSkeleton />
      ) : (
        <List>
          {artists.map((ar) => {
            return (
              <ListItem key={ar.id} disablePadding>
                <ListItemText
                  sx={{ borderLeft: 'solid', marginBottom: '10px' }}
                >
                  <ListItemButton href={`/artist/${ar.id}`}>
                    {ar.name}
                  </ListItemButton>
                </ListItemText>
                <Button
                  size="small"
                  onClick={async () => {
                    if (!ar.id) return;
                    const data = await deleteArtist(ar.id);

                    setIsSnackBarOpen(true);
                    if (data.isSuccess) {
                      setIsDeleteOk(true);
                      getArtists();
                    } else {
                      setIsDeleteOk(false);
                    }
                  }}
                  disabled={!isLogin}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </ListItem>
            );
          })}
        </List>
      )}
      <Fab
        color="primary"
        aria-label="add"
        href="/artist/add"
        sx={{ marginTop: '30px', float: 'right' }}
      >
        Add
      </Fab>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          severity={isDeleteOk ? 'success' : 'error'}
          variant="filled"
          sx={{
            width: '100%',
          }}
          onClose={handleClose}
        >
          Delete artist {isDeleteOk ? 'success' : 'failed'}!
        </Alert>
      </Snackbar>
    </BasicContainer>
  );
}
