import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';

export const options: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [],

    secret: process.env.SECRET,
};
