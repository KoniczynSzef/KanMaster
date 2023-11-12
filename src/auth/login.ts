import { signIn } from 'next-auth/react';
import { provider } from '.';
import { signInSchema } from '@/types/form-schema';
import { redirect } from 'next/navigation';

export async function login(data: signInSchema) {
    const res = await fetch(`/api/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    console.log(res);

    if (res.ok) {
        await signIn('credentials', {
            ...data,
            callbackUrl: '/dashboard',
        });
    } else {
        redirect('/sign-in');
    }
}

export const handleLogInWithProvider = async (provider: provider) => {
    await signIn(provider, { callbackUrl: '/dashboard' });
};
