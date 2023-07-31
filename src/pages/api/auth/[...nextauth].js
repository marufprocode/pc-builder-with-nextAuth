import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await connectDB();
        const user = await UserModel.findOne({ email });
        if (!user) throw Error("User Not found with this email");
        const passwordMacthed = await user.comparePassword(password);
        if (!passwordMacthed) throw Error("Password is not correct");
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login#",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user._id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user._id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
