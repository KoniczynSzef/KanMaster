'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useProjectFormStore } from '@/context/project-form-store';
import {
    ProjectFormSchema,
    ProjectFormSchema as Schema,
} from '@/types/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import FormHeader from './FormHeader';
import StepThree, { dateValidation } from './steps/StepThree';
import { redirect, useRouter } from 'next/navigation';

interface Props {}

const ProjectForm: FC<Props> = () => {
    const router = useRouter();
    const [date, setDate] = useState<Date>();
    const {
        formDescription,
        step,
        setStep,
        changeFormDescription,
        setTitle,
        setDescription,
        deadline,
    } = useProjectFormStore();

    const form = useForm<ProjectFormSchema>({
        mode: 'all',
        resolver: zodResolver(Schema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onSubmit = () => {
        if (step === 3) {
            router.push('/dashboard/summary');
        }
    };

    const handleGoToNextStep = () => {
        setStep();
        if (step === 3) {
            form.handleSubmit(onSubmit);
            return redirect('/dashboard/summary');
        } else {
            if (Schema.safeParse(form.getValues()).success) {
                switch (step) {
                    case 1:
                        setTitle(form.getValues('title'));
                        setDescription(form.getValues('description'));
                        changeFormDescription(
                            "Now it's time to build your team. Add your first team members who will help you achieve success."
                        );
                        break;
                    case 2:
                        changeFormDescription(
                            "Share your project's deadline and add a badge. Your project deserves recognition!"
                        );
                        break;
                    case 3:
                        if (!dateValidation.safeParse(deadline).success) {
                            toast.error('Please select a valid date');
                            return;
                        }
                        changeFormDescription(
                            'Last step! Share your project with the world. You can always edit it later.'
                        );
                        break;
                    default:
                        break;
                }
            } else {
                toast.error('Please fill in all the fields');
            }
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
                    {step === 2 && <StepTwo />}
                    {step === 3 && <StepThree date={date} setDate={setDate} />}

                    {step !== 3 && (
                        <Button
                            type="button"
                            className="ml-auto"
                            onClick={handleGoToNextStep}
                        >
                            Continue
                        </Button>
                    )}

                    {step === 3 && (
                        <Button type="button" onClick={() => onSubmit()}>
                            Finish
                        </Button>
                    )}
                </form>
            </Form>
        </>
    );
};

export default ProjectForm;
