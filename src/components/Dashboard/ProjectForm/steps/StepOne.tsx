import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import ProjectFormField from '../FormField';

interface Props {
    form: UseFormReturn<
        {
            title: string;
            description: string;
        },
        undefined
    >;
}

const StepOne: FC<Props> = ({ form }) => {
    return (
        <>
            <ProjectFormField form={form} prop="title" type="text" />
            <ProjectFormField form={form} prop="description" type="text" />
        </>
    );
};

export default StepOne;
