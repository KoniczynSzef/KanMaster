import { Button } from '@/components/ui/button';
import { getBadgeColorClass } from '@/helpers/badge-helpers';
import { OmittedTask } from '@/types/tasks';
import { BadgeColors } from '@prisma/client';
import React, { FC } from 'react';

interface Props {
    setColor: React.Dispatch<React.SetStateAction<BadgeColors>>;

    Task: OmittedTask;
}

const array: BadgeColors[] = [
    'blue',
    'green',
    'red',
    'indigo',
    'grey',
    'orange',
];

const Colors: FC<Props> = ({ Task, setColor }) => {
    const handleClick = (value: BadgeColors) => {
        Task.markColor = value;
        setColor(value);
    };

    return (
        <div className="flex flex-wrap justify-between my-4 mt-8">
            {array.map((color, idx) => (
                <Button
                    type="button"
                    key={idx}
                    size={'icon'}
                    className={`hover:opacity-70 ${getBadgeColorClass(
                        color
                    )} hover:${getBadgeColorClass(
                        color
                    )} transition-all duration-300`}
                    onClick={() => handleClick(color)}
                />
            ))}
        </div>
    );
};

export default Colors;
