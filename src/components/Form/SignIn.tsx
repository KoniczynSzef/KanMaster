'use client';

import React, { FC } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { schema, schemaType } from './Register';
import { handleLogInWithProvider, login } from '@/auth/login';
import { Separator } from '../ui/separator';
import { provider } from '@/auth';

interface Props {}

const Register: FC<Props> = () => {
    const form = useForm<schemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    });

    const onSubmit = async (data: schemaType) => {
        try {
            login(data);

            toast.success('You have been logged in successfully', {
                description: 'You can benefit from all the features now',
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Something went wrong', {
                    description: error.message,
                });
            } else {
                toast.error('Something went wrong');
            }

            throw new Error('Something went wrong');
        }
    };

    const handleLogIn = async (provider: provider) => {
        try {
            await handleLogInWithProvider(provider);
            toast.success('You have been logged in successfully', {
                description: 'You can benefit from all the features now',
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Something went wrong', {
                    description: error.message,
                });
            } else {
                toast.error('Something went wrong');
            }

            throw new Error('Something went wrong');
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-2xl w-full flex flex-col gap-4 border border-muted-background p-8 rounded"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Type your email..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Type your password..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator className="my-4" />

                <Button onClick={() => handleLogIn('google')} type="button">
                    Sign in with Google
                </Button>
                <Button onClick={() => handleLogIn('github')} type="button">
                    Sign in with GitHub
                </Button>

                <Button
                    type="submit"
                    className="ml-auto text-lg mt-6"
                    size={'lg'}
                    onClick={() => onSubmit(form.getValues())}
                >
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default Register;
