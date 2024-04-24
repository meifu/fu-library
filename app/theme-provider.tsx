'use client';

import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    // mode: 'dark',
  },
});

interface Props {
  children: ReactNode;
}

export default function MyThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
