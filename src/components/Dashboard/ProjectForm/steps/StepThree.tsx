'use client';

import React, { FC } from 'react';
import DatePicker from '../DatePicker';
import IconButtons from './IconButtons';
import { colorsArray, iconsArray } from '@/assets/badges';
import { useProjectFormStore } from '@/context/project-form-store';
import { z } from 'zod';
import Badge from '../../Projects/Badge';

interface Props {}

export const dateValidation = z.date().min(new Date());

const StepThree: FC<Props> = () => {
    const { setBadge, badge } = useProjectFormStore();

    return (
        <div className="flex flex-col gap-8">
            <div>
                <DatePicker />
            </div>
            <div className="flex justify-between">
                <IconButtons
                    isColors
                    array={colorsArray}
                    setBadge={setBadge}
                    badge={badge}
                />

                <IconButtons
                    isColors={false}
                    array={iconsArray}
                    setBadge={setBadge}
                    badge={badge}
                />
            </div>
            <div className="flex gap-4 items-center mt-6">
                <h4 className="text-xl font-semibold">Project badge: </h4>
                <Badge withId={false} badge={badge} />
            </div>
        </div>
    );
};

export default StepThree;
