import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

interface Props {
    text: string;
    onClick: () => void;
}

const SortingButton: FC<Props> = ({ onClick, text }) => {
    return (
        <Button variant={'outline'} onClick={onClick}>
            Sort projects by <span className="font-bold ml-1">{text}</span>
        </Button>
    );
};

export default SortingButton;
