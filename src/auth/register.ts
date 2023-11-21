import { schemaType } from '@/types/form-schema';
import { signIn } from 'next-auth/react';
import { res } from './login';

export async function register(userProps: schemaType) {
    const res = await fetch(`/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProps),
    });

    const user: res = await res.json();

    if (user?.error) {
        throw new Error(user.error);
    }

    await signIn('credentials', {
        ...userProps,
        callbackUrl: '/dashboard',
    });
}
