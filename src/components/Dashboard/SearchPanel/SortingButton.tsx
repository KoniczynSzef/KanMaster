import { Button } from '@/components/ui/button';
import { SortingButtonProps } from '@/types/component-props';
import React, { FC } from 'react';

const SortingButton: FC<SortingButtonProps> = ({ onClick, text }) => {
    return (
        <Button variant={'outline'} onClick={onClick} size={'lg'}>
            {text}
        </Button>
    );
};

export default SortingButton;
