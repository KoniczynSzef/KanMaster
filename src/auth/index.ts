import { signIn, signOut } from 'next-auth/react';

export type provider = 'google' | 'github' | 'credentials';

const link = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
console.log(link);

export async function logIn(provider: provider) {
    try {
        await signIn(provider, {
            callbackUrl: `${link}/dashboard`,
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
    await signOut({ callbackUrl: link });
}
