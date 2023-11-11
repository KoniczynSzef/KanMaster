'use server';

import { schemaType } from '@/components/Form/Register';
import { db } from '@/db';
import { hash } from 'bcrypt';

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
