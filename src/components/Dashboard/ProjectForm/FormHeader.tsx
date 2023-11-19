import { useProjectFormStore } from '@/context/project-form-store';
import React, { FC } from 'react';

interface Props {}

const FormHeader: FC<Props> = () => {
    const { step } = useProjectFormStore();
    return (
        <article>
            <h3 className="text-3xl font-bold">
                {step === 1
                    ? 'Provide Title and Description'
                    : step === 2
                    ? 'Add Project Team Members'
                    : 'Set Deadline and Add Badge'}
            </h3>
            <p className="text-sm text-secondary-foreground max-w-md mt-2">
                {step === 1
                    ? 'Start by providing the project title and a brief description. This is the beginning of your project journey.'
                    : step === 2
                    ? 'Add team members by entering their email addresses and clicking Invite button. Teamwork starts here!'
                    : "Specify the project's deadline and add a badge to give your project a unique identity. The final touches for your project."}
            </p>
        </article>
    );
};

export default FormHeader;
