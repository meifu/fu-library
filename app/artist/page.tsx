'use client';

import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { ArtistInterface } from '@/lib/definitions';
import ArtistListSkeleton from '../components/ArtistListSkeleton';

export default function Page() {
  const [artists, setArtists] = useState<ArtistInterface[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOk, setIsDeleteOk] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/artists')
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.data);
        setIsLoading(false);
      });
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

  const refreshPage = () => {
    setIsLoading(true);
    fetch('/artists')
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.data);
        setIsLoading(false);
      });
  };

  return (
    <Box width={600} sx={{ margin: '30px auto 0' }}>
      <Typography variant="h4" marginBottom="15px">
        Artists that I payed attention:
      </Typography>

      {isLoading ? (
        <ArtistListSkeleton />
      ) : (
        <Paper elevation={3}>
          <List>
            {artists.map((ar) => {
              return (
                <ListItem key={ar.id}>
                  <ListItemText>
                    <ListItemButton href={`/artist/${ar.id}`}>
                      {ar.name}
                    </ListItemButton>
                  </ListItemText>
                  <Button
                    size="small"
                    onClick={async () => {
                      const res = await fetch('/artist/api', {
                        method: 'DELETE',
                        body: JSON.stringify({
                          id: ar.id,
                        }),
                      });
                      const data = await res.json();
                      setIsOpen(true);
                      if (data.isSuccess) {
                        setIsDeleteOk(true);
                        refreshPage();
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
        </Paper>
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
    </Box>
  );
}
