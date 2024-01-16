'use client';

import React, { FC } from 'react';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@prisma/client';
import EditProjectFormField from './EditProjectFormField';
import { Button } from '../ui/button';
import {
    EditProjectFormSchema,
    EditProjectFormSchemaType,
} from '@/types/edit-project';

interface Props extends React.HTMLAttributes<HTMLFormElement> {
    project: Project;
    className?: string;
}

const EditProjectForm: FC<Props> = ({ project, className }) => {
    const [deadline, setDeadline] = React.useState<Date>();

    const form = useForm<EditProjectFormSchemaType>({
        mode: 'all',
        resolver: zodResolver(EditProjectFormSchema),
        defaultValues: {
            name: project.name,
            description: project.description ?? '',
        },
    });

    const onSubmit = async (data: EditProjectFormSchemaType) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className={`flex flex-col gap-6 ${className}`}
            >
                <EditProjectFormField
                    form={form}
                    name="name"
                    label="Project Title"
                    description="Project titles should be descriptive and short."
                    inputType="text"
                />

                <EditProjectFormField
                    form={form}
                    name="description"
                    label="Project Description"
                    description="Project descriptions are optional, but they can be helpful for your team to understand the purpose of the project."
                    inputType="text"
                />

                <EditProjectFormField
                    form={form}
                    name="deadline"
                    inputType="date"
                    date={deadline}
                    setDate={setDeadline}
                />

                <Button type="submit" className="self-end mt-8">
                    Save changes
                </Button>
            </form>
        </Form>
    );
};

export default EditProjectForm;
