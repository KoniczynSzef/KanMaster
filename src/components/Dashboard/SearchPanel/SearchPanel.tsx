'use client';

import React, { FC, useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Menu } from 'lucide-react';
import { Project } from '@prisma/client';
import {
    sortByDeadline,
    filterProjects,
    sortByName,
    useProjectStore,
} from '@/context/project-store';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import Link from 'next/link';

interface Props {
    projects: Project[];
}

const SearchPanel: FC<Props> = ({ projects }) => {
    const { setProjects, sortingDirection, setSortingDirection } =
        useProjectStore();
    const [search, setSearch] = useState('');

    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        setSortingDirection('asc');
        setProjects(filterProjects(projects, e.target.value));
    };

    const handleSortByDeadline = () => {
        const newProjects = sortByDeadline(projects);
        setProjects(newProjects);
    };

    const handleSortInOrder = () => {
        setProjects(sortByName(projects, sortingDirection === 'asc'));
        setSortingDirection(sortingDirection === 'asc' ? 'desc' : 'asc');
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
                    <Link href={'/dashboard/create'} className="self-start">
                        <Button className="self-start">New Project</Button>
                    </Link>

                    <Button variant={'outline'} onClick={handleSortByDeadline}>
                        Sort projects by{' '}
                        <span className="font-bold ml-1">deadline</span>
                    </Button>

                    <Button variant={'outline'}>
                        Sort projects by{' '}
                        <span className="font-bold ml-1">completed tasks</span>
                    </Button>
                    <Button variant={'outline'} onClick={handleSortInOrder}>
                        Sort projects in{' '}
                        <span className="font-bold ml-1">
                            {sortingDirection === 'asc'
                                ? 'ascending'
                                : 'descending'}{' '}
                            order
                        </span>
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SearchPanel;
