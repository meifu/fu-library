'use client';

import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import { SongInterface, SongInterfaceDb } from '@/lib/definitions';
import ListPageWrap from '../components/ListPageWrap';
import ArtistListSkeleton from '../components/ArtistListSkeleton';
import { deleteSong, fetchSongs } from '@/lib/action';

const transFormDbdata = (d: SongInterfaceDb): SongInterface => {
  const displayedArtist = d.artists ? d.artists[0] : '';
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
    <ListPageWrap>
      <Typography variant="h4" marginBottom="15px">
        All songs list:
      </Typography>
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
    </ListPageWrap>
  );
}
