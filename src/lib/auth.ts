import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './server-utils';
import { authSchema } from './validations';

const config = {
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login attempt

        // validation
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        // extract values
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);

        if (!user) {
          console.log('No user found');
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordsMatch) {
          console.log('Invalid password');
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware

      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');

       // not logged but try to access App
      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      // not logged and not try to access App (public part)
      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      // logged and try to access App and has paid
      if (isLoggedIn && isTryingToAccessApp && auth?.user.lifetimeAccess) {
        return true;
      }

      // logged and try to access App but not paid
      if (isLoggedIn && isTryingToAccessApp && !auth?.user.lifetimeAccess) {
        return Response.redirect(new URL('/payment', request.nextUrl));
      }

      // logged and not try to access App but has lifetime access
      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes('/login') ||
          request.nextUrl.pathname.includes('/signup')) &&
        auth?.user.lifetimeAccess
      ) {
        return Response.redirect(new URL('app/dashboard', request.nextUrl));
      }

      // logged and not try to access App
      if (isLoggedIn && !isTryingToAccessApp && !auth?.user.lifetimeAccess) {
        if (
          request.nextUrl.pathname.includes('/login') ||
          request.nextUrl.pathname.includes('/signup')
        ) {
          return Response.redirect(new URL('/payment', request.nextUrl));
        }
        return true;
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign in
        token.userId = user.id;
        token.email = user.email!;
        token.lifetimeAccess = user.lifetimeAccess;
      }
      if (trigger === 'update') {
        // on every request
        const userFomDb = await getUserByEmail(token.email);
        if (userFomDb) {
          token.lifetimeAccess = userFomDb.lifetimeAccess;
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
        session.user.lifetimeAccess = token.lifetimeAccess;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
