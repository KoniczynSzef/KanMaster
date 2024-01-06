import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TaskEditionSchemaType } from '@/types/tasks';
import { Task } from '@prisma/client';
import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
    form: UseFormReturn<TaskEditionSchemaType>;
    prop: keyof Omit<TaskEditionSchemaType, 'deadline'>;
    setTASK: React.Dispatch<React.SetStateAction<Task>>;
}

const EditFormField: FC<Props> = (props) => {
    return (
        <FormField
            control={props.form.control}
            name={props.prop}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        Task{' '}
                        {props.prop.slice(0, 1).toLocaleUpperCase() +
                            props.prop.slice(1)}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={`Task ${props.prop}...`}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default EditFormField;
