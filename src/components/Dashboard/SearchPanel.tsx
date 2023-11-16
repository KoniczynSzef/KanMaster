'use client';

import React, { FC, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { Project } from '@prisma/client';

interface Props {
    projects: Project[];
}

const SearchPanel: FC<Props> = ({ projects }) => {
    projects;
    const [search, setSearch] = useState('');

    return (
        <div className="flex gap-4">
            <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Button size={'icon'}>
                <Menu />
            </Button>
        </div>
    );
};

export default SearchPanel;
