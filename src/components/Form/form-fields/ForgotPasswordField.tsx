'use client';

import React, { FC } from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { UseFormReturn } from 'react-hook-form';
import { forgotPasswordSchemaType } from '@/types/form-schema';

interface Props {
    form: UseFormReturn<forgotPasswordSchemaType>;
    prop: keyof forgotPasswordSchemaType;
    type: React.HTMLInputTypeAttribute;
    customLabel?: string;
}

const ForgotPasswordField: FC<Props> = ({ form, prop, type, customLabel }) => {
    return (
        <FormField
            control={form.control}
            name={prop}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-base">
                        {customLabel
                            ? customLabel
                            : prop.slice(0, 1).toUpperCase() + prop.slice(1)}
                    </FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={`${
                                prop === 'confirmPassword'
                                    ? 'Confirm your password'
                                    : 'Type your ' + prop
                            }..`}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ForgotPasswordField;
