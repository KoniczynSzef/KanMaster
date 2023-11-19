import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import { Badge } from './StepThree';

interface Props {
    array: {
        value: string | React.JSX.Element;
    }[];
    setBadge: React.Dispatch<React.SetStateAction<Badge>>;
}

const IconButtons: FC<Props> = ({ array, setBadge }) => {
    const handleClick = (value: string | React.JSX.Element) => {
        if (typeof value === 'string') {
            setBadge((prev) => ({ ...prev, color: value }));
        } else {
            setBadge((prev) => ({ ...prev, icon: value }));
        }
    };
    return (
        <div className="grid grid-cols-3 gap-4 self-start">
            {array.map((icon, idx) => (
                <Button
                    variant={
                        typeof icon.value === 'string' ? 'default' : 'outline'
                    }
                    key={idx}
                    size={'icon'}
                    className={`${
                        typeof icon.value === 'string' && icon.value
                    } hover:opacity-70 hover:${
                        icon.value
                    } transition-all duration-300`}
                    onClick={() => handleClick(icon.value)}
                >
                    {typeof icon.value !== 'string' && icon.value}
                </Button>
            ))}
        </div>
    );
};

export default IconButtons;
