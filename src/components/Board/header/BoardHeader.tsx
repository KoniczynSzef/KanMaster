import { Column } from '@/types/columns';
import React, { FC } from 'react';

interface Props {
    columns: Column[];
}

const BoardHeader: FC<Props> = ({ columns }) => {
    return (
        <header className="flex items-center border-b border-b-muted text-center">
            {columns.map((column, i) => (
                <div key={i} className="todo w-1/3 py-3 bg-slate-950">
                    <h4 className="text-2xl font-bold text-left px-14">
                        {column.title}
                    </h4>
                </div>
            ))}
        </header>
    );
};

export default BoardHeader;
