'use client';

import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
  },
  typography: {
    h2: {
      fontSize: '3.75rem',
      '@media (max-width:600px)': {
        fontSize: '2.75rem',
      },
    },
    h3: {
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '2.2rem',
      },
    },
  },
});

interface Props {
  children: ReactNode;
}

export default function MyThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
