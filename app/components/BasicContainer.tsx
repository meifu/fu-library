'use client';

import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  children: ReactNode;
}

export default function BasicContainer({ children }: Props) {
  const matchSmall = useMediaQuery('(max-width:600px)', { noSsr: true });
  return (
    <Box
      width={matchSmall ? '100%' : '600px'}
      sx={{ margin: '0 auto' }}
      padding={2}
    >
      {children}
    </Box>
  );
}
