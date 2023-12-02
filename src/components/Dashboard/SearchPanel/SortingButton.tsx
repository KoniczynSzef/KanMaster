import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

interface Props {
    usingIn: boolean;
    text: string;
    onClick: () => void;
}

const SortingButton: FC<Props> = ({ onClick, text, usingIn }) => {
    return (
        <Button variant={'outline'} onClick={onClick}>
            Sort projects {usingIn ? 'in' : 'by'}{' '}
            <span className="font-bold ml-1">{text}</span>
        </Button>
    );
};

export default SortingButton;
