'use server';

import { db } from '@/db';
import {
    forgotPasswordSchema,
    forgotPasswordSchemaType,
} from '@/types/form-schema';
import { hash } from 'bcryptjs';

export async function resetPassword(
    data: forgotPasswordSchemaType,
    secret: string
) {
    if (!forgotPasswordSchema.parse(data)) {
        throw new Error('Invalid data');
    }

    const user = await db.user.findUnique({
        where: {
            secret,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.resetPasswordAttempts && user.resetPasswordAttempts >= 3) {
        throw new Error('Too many attempts');
    }

    const newPassword = await hash(data.password, 10);
    const updatedUser = await db.user.update({
        where: {
            secret,
        },

        data: {
            hashedPassword: newPassword,
            resetPasswordAttempts:
                user.resetPasswordAttempts && user.resetPasswordAttempts + 1,
        },
    });

    return updatedUser;
}
