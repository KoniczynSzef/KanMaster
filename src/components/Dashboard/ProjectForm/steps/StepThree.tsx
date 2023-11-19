import React, { FC, useEffect, useState } from 'react';
import DatePicker from '../DatePicker';
import IconButtons from './IconButtons';
import { colorsArray, iconsArray } from '@/assets/badges';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge, useProjectFormStore } from '@/context/project-form-store';
import { z } from 'zod';

interface Props {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const dateValidation = z.date().min(new Date());

const StepThree: FC<Props> = ({ date, setDate }) => {
    const [badge, setBadge] = useState<Badge>({
        color: 'bg-paletteLighterRed',
        icon: <Calendar />,
    });

    const { setBadge: setBadgeStore, setDeadline } = useProjectFormStore();

    useEffect(() => {
        setBadgeStore(badge);
    }, [badge]);

    useEffect(() => {
        if (date) {
            setDeadline(date);
        }
    }, [date]);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="flex justify-between">
                <IconButtons array={colorsArray} setBadge={setBadge} />
                <IconButtons array={iconsArray} setBadge={setBadge} />
            </div>
            <div className="flex gap-4 items-center mt-6">
                <h4 className="text-xl font-semibold">Project badge: </h4>
                <Button
                    size={'icon'}
                    className={`${badge.color} hover:${badge.color} hover:opacity-70 transition-all duration-300`}
                >
                    {badge.icon}
                </Button>
            </div>
        </div>
    );
};

export default StepThree;
