'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ProjectFormSchema } from '@/types/project-form-schema';
import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    form: UseFormReturn<ProjectFormSchema, undefined>;
    prop: 'title' | 'description';
    type: React.HTMLInputTypeAttribute;
    customLabel?: string;
}

const ProjectFormField: FC<Props> = ({ form, prop, type, customLabel }) => {
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
                        {prop === 'description' ? (
                            <Textarea
                                placeholder="Project's description..."
                                {...field}
                            />
                        ) : (
                            <Input
                                type={type}
                                placeholder={`Project's ${prop}...`}
                                {...field}
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ProjectFormField;
