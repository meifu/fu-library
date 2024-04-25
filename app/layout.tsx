import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

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
  let userData;
  console.log('=======server session-=======', session);

  if (session) {
    userData = {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
    };
  }

  return (
    <html lang="en">
      <CssBaseline />
      <body>
        <Container maxWidth={false} sx={{ height: '100vh' }} disableGutters>
          <MyThemeProvider>
            <AuthProvider>
              <Header data={userData} />
              <Box minHeight="100vh" pt={3} pb={3}>
                <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
              </Box>
            </AuthProvider>
          </MyThemeProvider>
        </Container>
      </body>
    </html>
  );
}
