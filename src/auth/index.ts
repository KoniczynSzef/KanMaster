import { signIn, signOut } from 'next-auth/react';

export type provider = 'google' | 'github' | 'credentials';

export async function logIn(provider: provider) {
    try {
        await signIn(provider, {
            callbackUrl: `${process.env.NEXTAUTH_URL}/dashboard`,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.name, error.message);
        } else {
            console.log('XDD');
        }
    }
}

export async function logOut() {
    await signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` });
}
