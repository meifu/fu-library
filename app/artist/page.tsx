import Link from 'next/link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { fetchAllArtsits } from '@/lib/artistData';

export default async function Page() {
  const artists = await fetchAllArtsits();

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
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
