import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "next-auth";
import { AdapterUser } from "@auth/core/adapters";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;
        try {
          const q = query(
            collection(db, "users"),
            where("username", "==", username)
          );
          const snapshot = await getDocs(q);
          const userDoc = snapshot.docs[0];
          const user = { id: userDoc.id, ...userDoc.data() };
          console.log("query;", user);
          return user;
        } catch (error) {
          console.error(error);
          throw new Error(String(error));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as AdapterUser & User;
      return session;
    },
  },
});
