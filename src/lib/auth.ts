import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

// Build the providers list — Google is only included when env vars are set
const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password are required");
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (!user || !user.hashedPassword) {
        throw new Error("Invalid credentials");
      }

      const isValid = await bcrypt.compare(
        credentials.password,
        user.hashedPassword
      );

      if (!isValid) {
        throw new Error("Invalid credentials");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    },
  }),
];

// Only add Google OAuth if both keys are present
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    })
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      // Auto-create user record for Google OAuth sign-ins
      if (account?.provider === "google" && user.email) {
        try {
          await prisma.user.upsert({
            where: { email: user.email },
            update: { name: user.name ?? undefined, image: user.image ?? undefined },
            create: {
              email: user.email,
              name: user.name ?? null,
              image: user.image ?? null,
            },
          });
        } catch {
          // User may already exist — silently continue
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // For Google OAuth, look up the DB user id by email
        if (!user.id && user.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          token.id = dbUser?.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};

// Export a flag so client pages can check if Google OAuth is available
export const googleOAuthEnabled = !!(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);
