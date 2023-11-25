'use client';

import React, { FC } from 'react';
import DatePicker from '../DatePicker';
import IconButtons from './IconButtons';
import { colorsArray, iconsArray } from '@/assets/badges';
import { Button } from '@/components/ui/button';
import { useProjectFormStore } from '@/context/project-form-store';
import { z } from 'zod';
import { getBadgeIconComponent } from '@/helpers/badge-helpers';

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
                <Button
                    size={'icon'}
                    className={`${badge.color} hover:${badge.color} hover:opacity-70 transition-all duration-300`}
                >
                    {getBadgeIconComponent(badge.icon)}
                </Button>
            </div>
        </div>
    );
};

export default StepThree;
