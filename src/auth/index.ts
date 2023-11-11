import { signIn, signOut } from 'next-auth/react';

export type provider = 'google' | 'github' | 'credentials';

export async function logIn(provider: provider) {
    try {
        await signIn(provider, {
            callbackUrl: `/dashboard`,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.name, error.message);
        }
    }
}

export async function logOut() {
    await signOut({ callbackUrl: '/' });
}
