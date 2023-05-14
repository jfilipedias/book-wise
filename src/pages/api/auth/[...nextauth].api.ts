import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      GoogleProvider({
        clientId: process.env['GOOGLE_CLIENT_ID'] ?? '',
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'] ?? '',
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
      GithubProvider({
        clientId: process.env['GITHUB_CLIENT_ID'] ?? '',
        clientSecret: process.env['GITHUB_CLIENT_SECRET'] ?? '',
        profile(profile: GithubProfile) {
          return {
            id: profile.id,
            name: profile.name!,
            email: profile.email!,
            avatar_url: profile.avatar_url,
          }
        },
      }),
    ],
    callbacks: {
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
