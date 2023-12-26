import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TaskSchemaType } from '@/types/tasks';
import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
    form: UseFormReturn<TaskSchemaType>;
    prop: keyof Omit<TaskSchemaType, 'deadline'>;
}

const TaskFormField: FC<Props> = (props) => {
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

export default TaskFormField;
