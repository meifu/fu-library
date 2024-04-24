import NextAuth, { NextAuthOptions } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from '@/lib/definitions';

import prismadb from '@/lib/db';

const availableGoogleEmail = process.env.GOOGLE_EMAIL;

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prismadb.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      // console.log('==== cb user===', user);
      // console.log('account', account);
      // console.log('profile', profile);
      // console.log('credentials', credentials);
      if (account?.provider === 'google' && user.email !== availableGoogleEmail) {
        return false;
      }
      return true;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
