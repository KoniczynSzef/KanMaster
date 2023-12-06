import React, { FC } from 'react';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '../../ui/input';

interface Props {
    form: UseFormReturn<
        {
            username: string;
            email: string;
            password: string;
        },
        undefined
    >;
    prop: 'username' | 'email' | 'password';
    type: React.HTMLInputTypeAttribute;
    customLabel: string;
}

const RegisterField: FC<Props> = ({ form, prop, type, customLabel }) => {
    return (
        <FormField
            control={form.control}
            name={prop}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-base">
                        {prop.slice(0, 1).toUpperCase() + prop.slice(1)}
                    </FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder="Type your username..."
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>{customLabel}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default RegisterField;
