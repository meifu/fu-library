'use client';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ArtistForm from '../../../_components/ArtistForm';
import EditSkeleton from '../../../_components/EditSkeleton';
import BasicContainer from '../../../_components/BasicContainer';
import Title from '../../../_components/Title';
import { ArtistInterface } from '../../../../lib/definitions';
import { fetchArtist, putArtist } from '../../../../lib/action';

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
    fetchArtist(params.id).then((data) => {
      if (!data) {
        throw new Error('Error when getting artist data.');
      }
      const { name, genre, image, description, tags, id } = data;
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
        <Title variant="h5" text="Edit Artist" />
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
