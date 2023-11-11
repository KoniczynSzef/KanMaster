import { signIn } from 'next-auth/react';
import { provider } from '.';
import { signInSchema } from '@/types/form-schema';

export async function login(data: signInSchema) {
    await signIn('credentials', {
        ...data,
        callbackUrl: '/dashboard',
    });
}

export const handleLogInWithProvider = async (provider: provider) => {
    await signIn(provider, { callbackUrl: '/dashboard' });
};
