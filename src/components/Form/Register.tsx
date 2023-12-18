'use client';

import React, { FC } from 'react';
import { Form } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { register } from '@/auth/register';
import { toast } from 'sonner';
import { schema, schemaType } from '@/types/form-schema';
import { Separator } from '../ui/separator';
import RegisterField from './form-fields/RegisterField';
import FormDescription from './FormDescription';

interface Props {}

const Register: FC<Props> = () => {
    const form = useForm<schemaType>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: schemaType) => {
        try {
            await register(data);

            toast.success(
                'You have been registered and logged in successfully',
                {
                    description: 'You can benefit from all the features now',
                }
            );
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('There was an error while registering');
            }
        }
    };

    return (
        <section className="max-w-3xl w-full flex flex-col gap-4 border border-muted-background p-8 rounded mx-8">
            <FormDescription
                title="Sign Up"
                quickDescription="Already have an account?"
                link="Sign in"
                href="/sign-in"
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col mt-4"
                >
                    <RegisterField
                        form={form}
                        prop="username"
                        type="text"
                        customLabel="This will be your public display name"
                    />
                    <RegisterField
                        form={form}
                        prop="email"
                        type="email"
                        customLabel="Team Leaders will use this email to invite you"
                    />
                    <RegisterField
                        form={form}
                        prop="password"
                        type="password"
                        customLabel="This will be your private password"
                    />

                    <Separator className="my-8" />

                    <Button type="submit" className="ml-auto">
                        Register
                    </Button>
                </form>
            </Form>
        </section>
    );
};

export default Register;
