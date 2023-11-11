import { schemaType } from '@/components/Form/Register';

import { signIn } from 'next-auth/react';
import { provider } from '.';

export async function login(data: schemaType) {
    console.log(data);

    setTimeout(async () => {
        await signIn('credentials', {
            ...data,
            callbackUrl: '/dashboard',
        });
    }, 1000);
}

export const handleLogInWithProvider = async (provider: provider) => {
    await signIn(provider, { callbackUrl: '/dashboard' });
};
