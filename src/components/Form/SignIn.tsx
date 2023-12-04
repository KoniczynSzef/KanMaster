'use client';

import React, { FC } from 'react';
import { Form } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { handleLogInWithProvider, login } from '@/auth/login';
import { Separator } from '../ui/separator';
import { provider } from '@/auth';
import Field from './form-fields/Field';
import { signInSchema } from '@/types/form-schema';
import Link from 'next/link';
import { handleError } from '@/auth/error-handlers';

interface Props {}

const SignIn: FC<Props> = () => {
    const form = useForm<signInSchema>({
        mode: 'all',
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: signInSchema) => {
        try {
            await login(data);

            toast.success('You have been logged in successfully', {
                description: 'You can benefit from all the features now',
            });
        } catch (error) {
            const message = await handleError(error);
            toast.error(message);
        }
    };

    const handleLogIn = async (provider: provider) => {
        try {
            await handleLogInWithProvider(provider);

            toast.success('You have been logged in successfully', {
                description: 'You can benefit from all the features now',
            });
        } catch (error) {
            const message = await handleError(error);
            toast.error(message);
        }
    };

    return (
        <section className="max-w-3xl w-full flex flex-col gap-4 border border-muted-background p-8 rounded mx-8">
            <article>
                <h3 className="text-3xl font-bold">Sign In</h3>
                <p className="text-muted-foreground mt-2">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/register"
                        className="text-purple-600 hover:text-purple-700 dark:hover:text-purple-500 transition duration-150"
                    >
                        Sign up
                    </Link>
                </p>
            </article>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col mt-4"
                >
                    <Field form={form} prop={'email'} type="email" />
                    <Field form={form} prop={'password'} type="password" />

                    <div className="flex justify-between items-center">
                        <Link
                            href="/forgot-password"
                            className="text-muted-foreground hover:text-foreground transition"
                        >
                            Forgot password?
                        </Link>
                        <Button type="submit" className="ml-auto">
                            Sign in
                        </Button>
                    </div>
                </form>
            </Form>

            <Separator className="my-8" />

            <Button
                onClick={() => handleLogIn('github')}
                type="button"
                variant={'outline'}
            >
                Sign in with GitHub
            </Button>
            <Button onClick={() => handleLogIn('google')} type="button">
                Sign in with Google
            </Button>
        </section>
    );
};

export default SignIn;
