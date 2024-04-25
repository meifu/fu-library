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

import { SongInterface, SongInterfaceDb } from '../../lib/definitions';
import ArtistListSkeleton from '../_components/ArtistListSkeleton';
import Title from '../_components/Title';
import BasicContainer from '../_components/BasicContainer';
import { deleteSong, fetchSongs } from '../../lib/action';

const transFormDbdata = (d: SongInterfaceDb): SongInterface => {
  const displayedArtist = d.artists ? d.artists[0].name : '';
  return {
    ...d,
    artists: displayedArtist,
    lyrics: d.lyrics || '',
  };
};

export default function Page() {
  const [songs, setSongs] = useState<SongInterface[] | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOk, setIsDeleteOk] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const data = useSession();
  let isLogin = data?.status === 'authenticated' ? true : false;

  const getSongs = async () => {
    setIsLoading(true);
    const songs: SongInterfaceDb[] | undefined = await fetchSongs();

    if (songs) {
      setSongs(songs.map(transFormDbdata));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSongs();
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  return (
    <BasicContainer>
      <Title text="All songs list:" variant="h3" />
      {isLoading ? (
        <ArtistListSkeleton />
      ) : (
        <List>
          {songs &&
            songs.map((s) => {
              return (
                <ListItem key={s.id} disablePadding>
                  <ListItemText
                    sx={{ borderLeft: 'solid', marginBottom: '10px' }}
                  >
                    <ListItemButton href={`/song/${s.id}`}>
                      {s.name}
                    </ListItemButton>
                  </ListItemText>
                  <Button
                    size="small"
                    onClick={async () => {
                      const data = await deleteSong(s.id as string);
                      console.log('test delete', data);
                      setIsOpen(true);
                      if (data.isSuccess) {
                        setIsDeleteOk(true);
                        getSongs();
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
        href="/song/add"
        sx={{ marginTop: '30px', float: 'right' }}
        disabled={!isLogin}
      >
        Add
      </Fab>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isOpen}
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
