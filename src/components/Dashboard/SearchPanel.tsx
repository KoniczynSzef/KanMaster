'use client';

import React, { FC, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { Project } from '@prisma/client';
import { filterProjects, useProjectStore } from '@/context/project-store';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

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
        <div className="space-x-4 flex">
            <Input
                placeholder="Search projects..."
                value={search}
                onChange={handleType}
                className="w-full self-stretch"
            />

            <Popover>
                <PopoverTrigger asChild>
                    <Button size={'icon'} className="h-10 aspect-square">
                        <Menu />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 mr-8 lg:mr-8 2xl:mr-2">
                    <Button className="self-start">New Project</Button>

                    <Button variant={'outline'}>
                        Filter by{' '}
                        <span className="font-bold ml-1">deadline</span>
                    </Button>

                    <Button variant={'outline'}>
                        Filter by{' '}
                        <span className="font-bold ml-1">completed tasks</span>
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SearchPanel;
