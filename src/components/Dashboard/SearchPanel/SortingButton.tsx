import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

interface Props {
    text: string;
    onClick: () => void;
}

const SortingButton: FC<Props> = ({ onClick, text }) => {
    return (
        <Button variant={'outline'} onClick={onClick} size={'lg'}>
            {text}
        </Button>
    );
};

export default SortingButton;
