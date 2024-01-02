'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import React, { FC } from 'react';

interface Props {
    secret: string;
}

const ClientComponent: FC<Props> = ({ secret }) => {
    const { storedValue } = useLocalStorage<string>('secret');

    if (secret !== storedValue) {
        return (
            <div className="text-xl font-bold">
                You are not authorized to reset your password!
            </div>
        );
    }

    return (
        <div>
            <p></p>
        </div>
    );
};

export default ClientComponent;
