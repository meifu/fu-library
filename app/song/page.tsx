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
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { SongInterface, SongInterfaceDb } from '../../lib/definitions';
import ArtistListSkeleton from '../_components/ArtistListSkeleton';
import Title from '../_components/Title';
import BasicContainer from '../_components/BasicContainer';
import { deleteSong, fetchSongs } from '../../lib/action';
import { modalInnerStyle } from '../_utils';

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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
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
    setIsSnackbarOpen(false);
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
                <SongItem
                  key={s.id}
                  song={s}
                  setIsDeleteOk={setIsDeleteOk}
                  setIsOpen={setIsSnackbarOpen}
                  isLogin={isLogin}
                  refresh={getSongs}
                />
              );
            })}
        </List>
      )}
      <Fab
        color="primary"
        aria-label="add"
        href="/song/add"
        sx={{ marginTop: '100px', float: 'right' }}
      >
        Add
      </Fab>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isSnackbarOpen}
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

interface SongItemProps {
  song: SongInterface;
  isLogin: boolean;
  setIsOpen: (open: boolean) => any;
  setIsDeleteOk: (ok: boolean) => any;
  refresh: () => any;
}

const SongItem = ({
  song,
  isLogin,
  setIsOpen,
  setIsDeleteOk,
  refresh,
}: SongItemProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const deleteSongHandler = async () => {
    const data = await deleteSong(song.id as string);
    setIsOpen(true);
    if (data.isSuccess) {
      setIsDeleteOk(true);
      refresh();
    } else {
      setIsDeleteOk(false);
    }
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemText sx={{ marginBottom: '10px' }}>
          <ListItemButton href={`/song/${song.id}`}>
            {song.name} -&nbsp;
            <Typography variant="body2">{song.artists}</Typography>
          </ListItemButton>
        </ListItemText>
        <Button
          size="small"
          onClick={async () => {
            setModalOpen(true);
          }}
          disabled={!isLogin}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      </ListItem>
      <Modal
        open={modalOpen}
        aria-labelledby="confirm-delete-modal"
        aria-describedby="confirm-delete-modal"
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box sx={modalInnerStyle}>
          <Typography>
            Are you sure to delete this song: &quot;{song.name}&quot;?
          </Typography>
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button variant="contained" onClick={deleteSongHandler}>
              Yes
            </Button>
            <Button
              variant="outlined"
              onClick={() => setModalOpen(false)}
              sx={{ marginLeft: '1rem' }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
