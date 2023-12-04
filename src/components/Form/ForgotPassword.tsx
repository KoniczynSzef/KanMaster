'use client';

import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { forgotPasswordSchemaType, signInSchema } from '@/types/form-schema';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from '@/auth/reset-password';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import ForgotPasswordField from './form-fields/ForgotPasswordField';

interface Props {}

const ForgotPassword: FC<Props> = () => {
    const form = useForm<forgotPasswordSchemaType>({
        mode: 'all',
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: signInSchema) => {
        try {
            await resetPassword(data);
            toast.success('Successfully reset password!');

            setTimeout(() => {
                redirect('/sign-in');
            }, 150);
        } catch (error) {
            toast.error('Failed to reset password!');
            window.location.reload();
        }
    };

    return (
        <section className="max-w-2xl w-full flex flex-col gap-4 border border-muted-background p-8 rounded">
            <h3 className="text-3xl font-bold">Forgot password?</h3>
            <p className="text-muted-foreground">
                Enter your email address for checking if you have an account
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col mt-6"
                >
                    <ForgotPasswordField
                        form={form}
                        prop={'email'}
                        type="email"
                    />
                    <ForgotPasswordField
                        form={form}
                        prop={'password'}
                        type="password"
                    />
                    <ForgotPasswordField
                        form={form}
                        prop={'confirmPassword'}
                        type="password"
                    />

                    <div className="flex justify-between items-center">
                        <Button type={'submit'} className="ml-auto">
                            {'Reset Password'}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default ForgotPassword;
