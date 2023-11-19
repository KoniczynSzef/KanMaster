import React, { FC } from 'react';
import ProjectFormField from '../FormField';
import { useProjectFormStore } from '@/context/project-form-store';
import { UseFormReturn } from 'react-hook-form';

interface Props {
    form: UseFormReturn<
        {
            title: string;
            description: string;
            members: string;
            badgeColor: string;
            badgeIcon: string;
        },
        undefined
    >;
}

const StepTwo: FC<Props> = ({ form }) => {
    const { members } = useProjectFormStore();
    return (
        <>
            <div>
                <ProjectFormField
                    form={form}
                    prop="members"
                    type="text"
                    withButton
                />
            </div>
            <ol className="list-decimal ml-4">
                {members.map((member) => (
                    <li key={member}>{member}</li>
                ))}
            </ol>
        </>
    );
};

export default StepTwo;
