'use client';

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
    return (
        <Form {...form}>
            <form action=""></form>
        </Form>
    );
};

export default ProjectForm;
