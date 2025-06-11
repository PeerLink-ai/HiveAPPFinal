import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        return {
          id: credentials.email,
          name: credentials.email.split("@")[0],
          email: credentials.email,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID!,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.SESSION_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
