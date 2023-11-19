import React, { FC } from 'react';
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

const StepThree: FC<Props> = ({ form }) => {
    return (
        <div>
            <p></p>
        </div>
    );
};

export default StepThree;
