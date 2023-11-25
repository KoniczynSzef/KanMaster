'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useProjectFormStore } from '@/context/project-form-store';
import {
    ProjectFormSchema,
    ProjectFormSchema as Schema,
} from '@/types/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import FormHeader from './FormHeader';
import StepThree, { dateValidation } from './steps/StepThree';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/context/project-store';
import { getBadgeColor } from '@/helpers/badge-helpers';
import { Loader2 } from 'lucide-react';

interface Props {}

const ProjectForm: FC<Props> = () => {
    const router = useRouter();
    const {
        formDescription,
        step,
        setStep,
        changeFormDescription,
        setTitle,
        setDescription,
        deadline,
        badge,
        decrementStep,
    } = useProjectFormStore();

    const { badges, setBadges } = useProjectStore();

    const form = useForm<ProjectFormSchema>({
        mode: 'all',
        resolver: zodResolver(Schema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onSubmit = () => {
        router.push('/dashboard/summary');
    };

    const handleGoToNextStep = () => {
        // Checking for step 3 because it's the last step

        if (step === 3) {
            if (!dateValidation.safeParse(deadline).success) {
                toast.error('Please select a valid date');
                decrementStep();
            } else {
                // Add a placeholder badge to the badges array but with proper color and icon

                setBadges([
                    ...badges,
                    {
                        id: 'placeholder',
                        projectId: 'placeholder',
                        color: getBadgeColor(badge.color),
                        icon: badge.icon,
                    },
                ]);

                form.handleSubmit(onSubmit);
            }
        } else {
            // Checking for step 1 because it's the first step

            if (Schema.safeParse(form.getValues()).success && step !== 2) {
                setTitle(form.getValues('title'));
                setDescription(form.getValues('description'));
                changeFormDescription(
                    "Now it's time to build your team. Add your first team members who will help you achieve success."
                );
            } else if (
                Schema.safeParse(form.getValues()).success &&
                step === 2
            ) {
                changeFormDescription(
                    "Share your project's deadline and add a badge. Your project deserves recognition!"
                );
            } else {
                toast.error('Please fill in all the fields');
            }
        }

        setStep();
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
                    {step === 3 && <StepThree />}

                    {step === 4 && (
                        <>
                            <Loader2 className="self-center h-12 w-12 animate-spin" />
                        </>
                    )}

                    <Button
                        type={step === 4 ? 'submit' : 'button'}
                        className={`${step !== 3 && 'ml-auto'}`}
                        onClick={handleGoToNextStep}
                    >
                        {step === 3 ? 'Finish' : 'Next'}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ProjectForm;
