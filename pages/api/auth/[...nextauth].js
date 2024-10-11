import NextAuth from 'next-auth';  // This should be the default import
import GoogleProvider from 'next-auth/providers/google';  // Correctly import GoogleProvider

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth',  // Points to the correct sign-in page
  },
});