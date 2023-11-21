'use client';

import React, { FC } from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { register } from '@/auth/register';
import { toast } from 'sonner';
import { schema, schemaType } from '@/types/form-schema';
import { Separator } from '../ui/separator';

interface Props {}

const Register: FC<Props> = () => {
    const form = useForm<schemaType>({
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-2xl w-full flex flex-col space-y-8 border border-muted-background p-8 rounded mx-8"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Type your username..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This will be your public display name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                            <FormDescription>
                                Team Leaders will use this email to invite you
                            </FormDescription>
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
                            <FormDescription>
                                This will be your private password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator className="my-8" />

                <Button type="submit" className="ml-auto" size={'lg'}>
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default Register;
