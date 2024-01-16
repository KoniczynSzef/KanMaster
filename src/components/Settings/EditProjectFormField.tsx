import React, { FC, HTMLInputTypeAttribute } from 'react';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '../ui/input';
import { EditProjectFormSchemaType } from '@/types/edit-project';
import EditDatePicker from './EditDatePicker';

type Props = {
    form: UseFormReturn<EditProjectFormSchemaType>;
    name: keyof EditProjectFormSchemaType;
    inputType: HTMLInputTypeAttribute;
} & (WithDeadline | WithoutDeadline);

type WithDeadline = {
    name: 'deadline';
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    date: Date | undefined;
};

type WithoutDeadline = {
    label: string;
    description?: string;
    name: Exclude<keyof EditProjectFormSchemaType, 'deadline'>;
};

const EditProjectFormField: FC<Props> = (props) => {
    if (props.name === 'deadline' && props.inputType === 'text') return 'Error';

    if (props.name === 'deadline') {
        return <EditDatePicker form={props.form} />;
    }

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            placeholder={props.name}
                            className="w-full"
                        />
                    </FormControl>

                    {props.description && (
                        <FormDescription>{props.description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default EditProjectFormField;
