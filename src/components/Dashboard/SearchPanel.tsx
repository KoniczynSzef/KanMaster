'use client';

import React, { FC, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { Project } from '@prisma/client';
import { filterProjects, useProjectStore } from '@/context/project-store';

interface Props {
    projects: Project[];
}

const SearchPanel: FC<Props> = ({ projects }) => {
    const { setProjects } = useProjectStore();
    const [search, setSearch] = useState('');

    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        setProjects(filterProjects(projects, e.target.value));
    };

    return (
        <div className="flex gap-4">
            <Input
                placeholder="Search projects..."
                value={search}
                onChange={handleType}
            />

            <Button size={'icon'}>
                <Menu />
            </Button>
        </div>
    );
};

export default SearchPanel;
