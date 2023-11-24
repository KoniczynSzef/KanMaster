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
import { useProjectStore } from '@/context/project-store';
import { getBadgeColor } from '@/helpers/badge-helpers';

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
        console.log('Step: ', step);

        router.push('/dashboard/summary');
    };

    const handleGoToNextStep = () => {
        setStep();
        console.log('Here: ', step);

        if (step === 3) {
            if (!dateValidation.safeParse(deadline).success) {
                toast.error('Please select a valid date');
                decrementStep();

                return;
            } else {
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
                return redirect('/dashboard/summary');
            }
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

                    <Button
                        type={step === 3 ? 'submit' : 'button'}
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
