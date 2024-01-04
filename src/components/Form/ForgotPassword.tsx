'use client';

import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import {
    forgotPasswordSchema,
    forgotPasswordSchemaType,
} from '@/types/form-schema';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from '@/auth/reset-password';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ForgotPasswordField from './form-fields/ForgotPasswordField';
import FormDescription from './FormDescription';

interface Props {
    secret: string | null;
}

const ForgotPassword: FC<Props> = ({ secret }) => {
    const router = useRouter();
    const form = useForm<forgotPasswordSchemaType>({
        mode: 'all',
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: forgotPasswordSchemaType) => {
        try {
            if (!secret) {
                throw new Error('You are not allowed to change your password!');
            }

            await resetPassword(data, secret);

            toast.success('Successfully reset password!');

            router.push('/sign-in');
        } catch (error) {
            toast.error('Failed to reset password!');
            form.reset();
        }
    };

    return (
        <section className="max-w-2xl w-full flex flex-col gap-4 border border-muted-background p-8 rounded">
            <FormDescription title="Forgot Password?" href="/register" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col mt-4"
                >
                    <ForgotPasswordField
                        form={form}
                        prop={'password'}
                        type="password"
                    />

                    <ForgotPasswordField
                        form={form}
                        prop={'confirmPassword'}
                        type="password"
                        customLabel="Confirm Password"
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
