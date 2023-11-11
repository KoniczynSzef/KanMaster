'use server';

import { db } from '@/db';
import { hash } from 'bcrypt';

type userProps = {
    username: string;
    email: string;
    password: string;
};

export async function register(userProps: userProps) {
    const { username, email, password } = userProps;

    const exists = await db.user.findUnique({
        where: { email },
    });

    if (exists) {
        throw new Error('User already exists');
    }

    const user = await db.user.create({
        data: {
            name: username,
            email,
            hashedPassword: await hash(password, 10),
        },
    });

    return user;
}
