import { getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { options } from './options';
import { redirect } from 'next/navigation';

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

export async function getSession() {
    const session = await getServerSession(options);

    if (session) {
        return redirect('/dashboard');
    }
}
