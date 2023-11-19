'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useProjectFormStore } from '@/context/project-form-store';
import {
    ProjectFormSchema,
    ProjectFormSchemaStepOne,
    ProjectFormSchema as Schema,
} from '@/types/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import FormHeader from './FormHeader';

interface Props {}

const ProjectForm: FC<Props> = () => {
    const { formDescription, step, setStep, changeFormDescription } =
        useProjectFormStore();

    const form = useForm<ProjectFormSchema>({
        mode: 'all',
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
            setStep();
            changeFormDescription(formDescription);
        } else {
            toast.error('Please fill in all the fields');
        }
    };

    return (
        <>
            <p className="max-w-sm">{formDescription}</p>
            <Form {...form}>
                <form
                    action=""
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col mt-8 border border-muted-background p-8 rounded"
                >
                    <FormHeader />
                    {step === 1 && <StepOne form={form} />}

                    {step === 2 && <StepTwo form={form} />}
                    {step <= 3 && (
                        <Button
                            type={`${step === 3 ? 'submit' : 'button'}`}
                            className="ml-auto"
                            onClick={handleGoToNextStep}
                        >
                            {step < 3 ? 'Continue' : 'Finish'}
                        </Button>
                    )}
                </form>
            </Form>
        </>
    );
};

export default ProjectForm;
