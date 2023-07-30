import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const hashPassword = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  try {
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  } catch {
    throw new Error("cannot encrypt");
  }
};

export const AuthOptions = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connect();
        const user = await User.findOne({ username: credentials.username });

        if (!user) throw new Error("no user");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("wrong password");

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connect();

      const hashedPassword = await hashPassword(user.id, 10);

      const existingUser = await User.findOne({ email: user.email });

      console.log(user);

      if (!existingUser) {
        const res = await User.create({
          username: user.name,
          email: user.email,
          password: hashedPassword,
          profileImage: user.image,
          authId: user.id,
        });
        console.log("User created");
      }

      return user;
    },
    async jwt({ user, token }) {
      await connect();

      if (user) {
        if (user.id) {
          const newUser = await User.findOne({ authId: user.id });

          token.user = user._id || newUser._id;
        } else {
          const newUser = await User.findOne({ email: user.email });
          token.user = user._id || newUser._id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
