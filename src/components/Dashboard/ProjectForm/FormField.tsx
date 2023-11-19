'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    ProjectFormSchema,
    ProjectFormSchemaStepTwo,
} from '@/types/project-form-schema';
import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import DatePicker from './DatePicker';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
    form: UseFormReturn<ProjectFormSchema, undefined>;
    prop: 'title' | 'description' | 'members' | 'badgeColor' | 'badgeIcon';
    type: React.HTMLInputTypeAttribute;
    customLabel?: string;
    withButton?: boolean;
    addMember?: (member: string) => void;
}

const ProjectFormField: FC<Props> = ({
    form,
    prop,
    type,
    customLabel,
    withButton,
    addMember,
}) => {
    const handleAddMember = () => {
        if (
            addMember &&
            ProjectFormSchemaStepTwo.safeParse(form.getValues()).success
        ) {
            addMember(form.getValues('members'));
        } else {
            toast.error('Please pass correct email!');
        }

        form.resetField('members');
    };
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
                        ) : type !== 'date' ? (
                            withButton ? (
                                <div className="flex gap-4">
                                    <Input
                                        type={type}
                                        placeholder={`Project's ${prop}...`}
                                        {...field}
                                    />
                                    <Button onClick={handleAddMember}>
                                        Invite
                                    </Button>
                                </div>
                            ) : (
                                <Input
                                    type={type}
                                    placeholder={`Project's ${prop}...`}
                                    {...field}
                                />
                            )
                        ) : (
                            <DatePicker />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ProjectFormField;
