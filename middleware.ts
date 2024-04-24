export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/artist/:path/edit', '/artist/add', '/song/:path/edit', '/song/add',
  ],
};