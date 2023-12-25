import { columns } from '@/assets/columns';
import { Project, User } from '@prisma/client';
import React, { FC } from 'react';
import BoardHeader from './header/BoardHeader';

interface Props {
    project: Project;
    user: User;
}

const KanbanBoard: FC<Props> = () => {
    return (
        <section className="board border border-muted rounded max-w-7xl w-full">
            <BoardHeader columns={columns} />
            <div className="wrapper flex items-center">
                <div className="e w-1/3 border-x border-x-muted py-8 px-2 items-center">
                    <h4>test</h4>
                </div>
                <div className="e w-1/3 border-x border-x-muted py-8 px-2 items-center">
                    <h4>test</h4>
                </div>
                <div className="e w-1/3 border-x border-x-muted py-8 px-2 items-center">
                    <h4>test</h4>
                </div>
            </div>
        </section>
    );
};

export default KanbanBoard;
