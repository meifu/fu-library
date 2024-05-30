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

import { ArtistInterface } from '../../lib/definitions';
import ArtistListSkeleton from '../_components/ArtistListSkeleton';
import BasicContainer from '../_components/BasicContainer';
import Title from '../_components/Title';
import { deleteArtist, fetchArtists } from '../../lib/action';
import { modalInnerStyle } from '../_utils';

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
              <ArtistItem
                key={ar.id}
                ar={ar}
                setIsSnackBarOpen={setIsSnackBarOpen}
                setIsDeleteOk={setIsDeleteOk}
                isLogin={isLogin}
                refresh={getArtists}
              />
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

interface ArtistItemProps {
  ar: ArtistInterface;
  setIsSnackBarOpen: (open: boolean) => any;
  setIsDeleteOk: (ok: boolean) => any;
  isLogin: boolean;
  refresh: () => any;
}

const ArtistItem = ({
  ar,
  setIsSnackBarOpen,
  setIsDeleteOk,
  isLogin,
  refresh,
}: ArtistItemProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const deleteArtistHandler = async () => {
    const data = await deleteArtist(ar.id || '');

    setIsSnackBarOpen(true);
    if (data.isSuccess) {
      setIsDeleteOk(true);
      refresh();
    } else {
      setIsDeleteOk(false);
    }
    setModalOpen(false);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemText sx={{ marginBottom: '10px' }}>
          <ListItemButton href={`/artist/${ar.id}`}>{ar.name}</ListItemButton>
        </ListItemText>
        <Button
          size="small"
          onClick={() => {
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
            Are you sure to delete this artist: &quot;{ar.name}&quot;?
          </Typography>
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button variant="contained" onClick={deleteArtistHandler}>
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
