'use server';

import { db } from '@/db';
import { signInSchema } from '@/types/form-schema';
import { hash } from 'bcryptjs';

export async function resetPassword(data: signInSchema) {
    signInSchema.parse(data);

    const user = await db.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const newPassword = await hash(data.password, 10);
    const updatedUser = await db.user.update({
        where: {
            email: data.email,
        },
        data: {
            hashedPassword: newPassword,
        },
    });

    return updatedUser;
}
