import { useTaskStore } from '@/context/tasks-store';
import { Column } from '@/types/columns';
import React, { FC } from 'react';

interface Props {
    columns: Column[];
}

const BoardHeader: FC<Props> = ({ columns }) => {
    const { getPartialTaskCount } = useTaskStore();

    return (
        <header className="flex items-center border-b border-b-muted text-center">
            {columns.map((column, i) => (
                <div
                    key={i}
                    className={`todo w-1/3 py-3 bg-slate-950 flex items-center ${
                        i === columns.length - 1 ? '' : 'border-r'
                    } border-r-secondary`}
                >
                    <h4 className="text-2xl font-bold text-left px-14">
                        {column.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Tasks: {getPartialTaskCount(column.category)}
                    </p>
                </div>
            ))}
        </header>
    );
};

export default BoardHeader;
