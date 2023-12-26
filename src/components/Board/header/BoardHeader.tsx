import { Column } from '@/types/columns';
import React, { FC } from 'react';

interface Props {
    columns: Column[];
}

const BoardHeader: FC<Props> = ({ columns }) => {
    return (
        <div>
            <header className="flex items-center border-b border-b-muted text-center">
                {columns.map((column, i) => (
                    <div
                        key={i}
                        className="todo w-1/3 border-x border-x-muted py-3 odd:bg-secondary"
                    >
                        <h4 className="text-2xl font-bold">{column.title}</h4>
                    </div>
                ))}
            </header>
        </div>
    );
};

export default BoardHeader;
