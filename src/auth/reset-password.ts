'use server';

import { db } from '@/db';
import { signInSchema } from '@/types/form-schema';
import { hash } from 'bcryptjs';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function resetPassword(data: signInSchema) {
    if (signInSchema.parse(data)) {
        throw new Error('Invalid data');
    }

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

export const sendResetPasswordEmail = async (email: string) => {
    try {
        const data = await resend.emails.send({
            from: 'doniakon@wp.pl',
            to: 'piotr12konczyk27@gmail.com',
            subject: 'Reset password',
            text: 'Click here to reset your password',
        });

        console.log(data);

        return data;
    } catch (error) {
        throw new Error('Error while sending email!');
    }
};
