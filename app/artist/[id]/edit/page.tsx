'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { putArtist } from '@/lib/action';
import { useEffect, useState } from 'react';
import ArtistForm from '@/app/components/ArtistForm';
import EditSkeleton from '@/app/components/EditSkeleton';
import { ArtistInterface } from '@/lib/definitions';
import BasicContainer from '@/app/components/BasicContainer';

interface ArtistEditProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: ArtistEditProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ArtistInterface | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/artist/api?id=${params.id}`)
      .then((res) => res.json())
      .then((data: { data: ArtistInterface }) => {
        const { name, genre, image, description, tags, id } = data.data;
        setData({ name, genre, image, description, tags, id });
        setIsLoading(false);
      });
  }, [params.id]);

  return (
    <BasicContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="30px"
      >
        <Typography variant="h5">Edit Artist</Typography>
        <IconButton aria-label="back" href={`/artist/${params.id}`}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      {isLoading ? (
        <EditSkeleton />
      ) : (
        <ArtistForm onSubmit={putArtist} data={data} isEdit={true} />
      )}
    </BasicContainer>
  );
}
