import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { compare } from 'bcryptjs';
import { Adapter } from 'next-auth/adapters';

export const options: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                },
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    return null;
                }

                const valid = await compare(
                    credentials.password,
                    user.hashedPassword ?? ''
                );

                if (!valid) {
                    return null;
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },

    secret: process.env.SECRET,
};
