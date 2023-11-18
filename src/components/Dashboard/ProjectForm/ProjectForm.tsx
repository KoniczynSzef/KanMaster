'use client';

import FormField from '@/components/Dashboard/ProjectForm/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
    ProjectFormSchema,
    ProjectFormSchemaStepOne,
    ProjectFormSchema as Schema,
} from '@/types/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {}

const ProjectForm: FC<Props> = () => {
    const [step, setStep] = useState(1);
    const [members, setMembers] = useState<string[]>([]);

    const form = useForm<ProjectFormSchema>({
        mode: 'onChange',
        resolver: zodResolver(Schema),
        defaultValues: {
            title: '',
            description: '',
            members: '',
            badgeColor: '',
            badgeIcon: '',
        },
    });

    const onSubmit = (data: ProjectFormSchema) => {
        console.log(data);
    };

    const handleGoToNextStep = () => {
        if (ProjectFormSchemaStepOne.safeParse(form.getValues()).success) {
            setStep((prev) => (prev += 1));
        } else {
            toast.error('Please fill in all the fields');
        }
    };

    return (
        <Form {...form}>
            <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex flex-col mt-4"
            >
                {step === 1 && (
                    <>
                        <FormField form={form} prop="title" type="text" />
                        <FormField form={form} prop="description" type="text" />
                    </>
                )}

                {step === 2 && (
                    <>
                        <div>
                            <FormField
                                form={form}
                                prop="members"
                                type="text"
                                withButton
                                setMembers={setMembers}
                            />
                        </div>
                        <ol className="list-decimal ml-4">
                            {members.map((member) => (
                                <li key={member}>{member}</li>
                            ))}
                        </ol>
                    </>
                )}
            </form>
            {step <= 3 && (
                <Button
                    type={`${step === 3 ? 'submit' : 'button'}`}
                    className="ml-auto"
                    onClick={handleGoToNextStep}
                >
                    {step < 3 ? 'Continue' : 'Finish'}
                </Button>
            )}
        </Form>
    );
};

export default ProjectForm;
