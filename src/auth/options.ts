import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';
// import Google from 'next-auth/providers/google';
// import Credentials from 'next-auth/providers/credentials';

export const options: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],

    secret: process.env.SECRET,
};
