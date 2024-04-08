import { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Container from '@mui/material/Container';

export const metadata: Metadata = {
  title: {
    template: '%s | Fu Library',
    default: `Fu's Library`,
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
        <Container maxWidth="md">
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </Container>
      </body>
    </html>
  );
}
