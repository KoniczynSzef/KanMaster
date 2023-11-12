import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { signInSchema } from '@/types/form-schema';
import Field from './Field';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from '@/auth/reset-password';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

interface Props {}

const ForgotPassword: FC<Props> = () => {
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
                    <Field form={form} prop={'email'} type="email" />

                    <Field
                        form={form}
                        prop={'password'}
                        type="password"
                        customLabel="New Password"
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
