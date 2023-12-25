import { Project, User } from '@prisma/client';
import React, { FC } from 'react';
import { Table, TableHead, TableHeader, TableRow } from '../ui/table';

interface Props {
    project: Project;
    user: User;
}

const KanbanBoard: FC<Props> = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Hello</TableHead>
                    <TableHead>World</TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    );
};

export default KanbanBoard;
