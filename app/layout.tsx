import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/Header';
import MyThemeProvider from './theme-provider';
import AuthProvider from './authWrap';

export const metadata: Metadata = {
  title: {
    template: '%s | Library',
    default: `Library`,
  },
  description: 'Meifu practices',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  /* sign in google session:
  user: {
    name: '',
    email: '',
    image: '',
  }
  */
  return (
    <html lang="en">
      <CssBaseline />
      <body>
        <Container maxWidth="xl" sx={{ height: '100vh' }} disableGutters>
          <MyThemeProvider>
            <AuthProvider>
              <Header />
              <Box sx={{ padding: '15px' }}>
                <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
              </Box>
            </AuthProvider>
          </MyThemeProvider>
        </Container>
      </body>
    </html>
  );
}
