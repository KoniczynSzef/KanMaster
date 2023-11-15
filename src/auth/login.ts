import { signIn } from 'next-auth/react';
import { provider } from '.';
import { signInSchema } from '@/types/form-schema';
import { User } from '@prisma/client';

type res = User & { error: string };

export async function login(data: signInSchema) {
    const res = await fetch(`/api/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const body: res = await res.json();

    if (body?.error) {
        throw new Error(body.error);
    }

    await signIn('credentials', {
        ...data,
        callbackUrl: '/dashboard',
    });
}

export const handleLogInWithProvider = async (provider: provider) => {
    await signIn(provider, { callbackUrl: '/dashboard' });
};
