'use server';

import { db } from '@/db';
import { schemaType } from '@/types/form-schema';
import { hash } from 'bcryptjs';

export async function register(userProps: schemaType) {
    const { username, email, password } = userProps;

    const exists = await db.user.findUnique({
        where: { email },
    });

    if (exists) {
        return null;
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
