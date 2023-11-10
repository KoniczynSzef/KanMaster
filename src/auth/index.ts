import { signIn, signOut } from 'next-auth/react';

export type provider = 'google' | 'github' | 'credentials';

const link =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_NEXTAUTH_URL
        : process.env.NEXTAUTH_URL;

export async function logIn(provider: provider) {
    try {
        await signIn(provider, {
            callbackUrl: `${link}/dashboard`,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.name, error.message);
        }
    }
}

export async function logOut() {
    await signOut({ callbackUrl: link });
}
