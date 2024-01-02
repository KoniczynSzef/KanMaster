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
import { handleError } from '@/auth/error-handlers';
import { useRouter } from 'next/navigation';
import FormDescription from './FormDescription';
import { z } from 'zod';
import { getUser } from '@/controllers/user-functions';
import { Loader2 } from 'lucide-react';

import { hash } from 'bcryptjs';

interface Props {}

const EmailSchema = z.object({
    email: z.string().email(),
});

const SignIn: FC<Props> = () => {
    const router = useRouter();
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

    const handleForgotPassword = async () => {
        try {
            if (!EmailSchema.parse(form.getValues())) {
                return;
            }

            const { email } = form.getValues();

            const user = await getUser(email);

            if (!user) {
                toast.error('No user with that email found');
                return;
            }

            if (!user.secret) {
                toast.error('You are not allowed to reset your password');
                return;
            }

            const randomLink = await hash(user.secret, 10);

            localStorage.setItem('secret', randomLink);

            router.push(
                `/forgot-password/${user.secret}?hashedSecret=${randomLink}`
            );
        } catch (error) {
            toast.error('Please enter a valid email!');
        }
    };

    return (
        <section className="max-w-3xl w-full flex flex-col gap-4 border border-muted-background p-8 rounded mx-8">
            <FormDescription
                title="Sign In"
                quickDescription={"Don't have an account?"}
                link="Sign up"
                href="/register"
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col mt-4"
                >
                    <Field form={form} prop={'email'} type="email" />
                    <Field form={form} prop={'password'} type="password" />

                    <div className="flex justify-between items-center">
                        <Button
                            type="button"
                            onClick={handleForgotPassword}
                            role="link"
                            aria-label="Forgot password?"
                            variant={'link'}
                            className="text-purple-600 hover:text-purple-700 dark:hover:text-purple-500 transition duration-150 px-0"
                        >
                            Forgot password?
                        </Button>

                        <Button
                            type="submit"
                            className="ml-auto"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                'Sign in'
                            )}
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
