'use client';

import FormField from '@/components/Dashboard/ProjectForm/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
    type ProjectFormSchema,
    ProjectFormSchema as Schema,
} from '@/types/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

interface Props {}

const ProjectForm: FC<Props> = () => {
    const form = useForm<ProjectFormSchema>({
        mode: 'onChange',
        resolver: zodResolver(Schema),
    });
    const onSubmit = (data: ProjectFormSchema) => {};

    return (
        <Form {...form}>
            <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex flex-col mt-4"
            >
                <FormField form={form} prop="title" type="text" />
                <FormField form={form} prop="description" type="text" />
            </form>

            <Button type="button" className="ml-auto">
                Continue
            </Button>
        </Form>
    );
};

export default ProjectForm;
