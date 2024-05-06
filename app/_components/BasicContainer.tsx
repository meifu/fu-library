'use client';

import { ReactNode } from 'react';

import Box from '@mui/material/Box';
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
  return (
    <MyBox position="relative" sx={{ margin: '0 auto' }} padding={2}>
      {children}
    </MyBox>
  );
}
