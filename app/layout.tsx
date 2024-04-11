import { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from './components/Header';

export const metadata: Metadata = {
  title: {
    template: '%s | Library',
    default: `Library`,
  },
  description: 'Meifu practices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Container maxWidth="xl" sx={{ height: '100vh' }} disableGutters>
          <Header />
          <Box sx={{ padding: '15px' }}>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </Box>
        </Container>
      </body>
    </html>
  );
}
