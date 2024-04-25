'use client';

import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';

const MyBox = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 600,
  },
}));

interface Props {
  children: ReactNode;
}

export default function BasicContainer({ children }: Props) {
  // const matchSmall = useMediaQuery('(max-width:600px)', { noSsr: true });
  // console.log('matchSmall', matchSmall);
  return (
    <MyBox
      position="relative"
      // width={matchSmall ? '100%' : '600px'}
      sx={{ margin: '0 auto' }}
      padding={2}
    >
      {children}
    </MyBox>
  );
}
