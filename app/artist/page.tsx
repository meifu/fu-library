'use client';

import Link from 'next/link';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Snackbar from '@mui/material/Snackbar';

import { useEffect, useState } from 'react';
import { ArtistInterface } from '../components/artistForm';

export default function Page() {
  const [artists, setArtists] = useState<ArtistInterface[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/artists')
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.data);
      });
  }, []);

  return (
    <>
      <h4>Artists in my list</h4>
      <List>
        {artists.map((ar) => {
          return (
            <ListItem key={ar.id} disablePadding>
              <ListItemButton>
                <ListItemText>
                  <Link
                    href={`/artist/${ar.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {ar.name}
                  </Link>
                </ListItemText>
                <Button
                  onClick={async () => {
                    const res = await fetch('/artist/api', {
                      method: 'DELETE',
                      body: JSON.stringify({
                        id: ar.id,
                      }),
                    });
                    console.log('delete res', res.json());
                  }}
                >
                  Delete
                </Button>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Snackbar open={isOpen} autoHideDuration={6000} message={'success'} />
    </>
  );
}
