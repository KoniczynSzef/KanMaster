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
    getProjectsWhereLeader,
    getSortedPerson,
} from '@/context/project-store';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import Link from 'next/link';
import SortingButton from './SortingButton';
import { useUserStore } from '@/context/user-store';

interface Props {
    projects: Project[];
}

const SearchPanel: FC<Props> = ({ projects }) => {
    const { user } = useUserStore();
    const [search, setSearch] = useState('');
    const {
        setProjects,
        sortingDirection,
        setSortingDirection,
        sortedPerson,
        setSortedPerson,
    } = useProjectStore();

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

    const handleSortWhereLeader = () => {
        const person = getSortedPerson(sortedPerson);
        setSortedPerson(person);

        setProjects(
            getProjectsWhereLeader(projects, user?.id as string, person)
        );
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
                    <Button
                        size={'icon'}
                        className="h-10 aspect-square"
                        variant={'outline'}
                    >
                        <Menu />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 mr-8 lg:mr-8 2xl:mr-2">
                    <SortingButton
                        onClick={handleSortByDeadline}
                        text="Sort projects by deadline"
                    />
                    <SortingButton
                        onClick={handleSortInOrder}
                        text={`Sort projects in ${
                            sortingDirection === 'asc' ? 'desc' : 'asc'
                        } order`}
                    />
                    <SortingButton
                        onClick={handleSortWhereLeader}
                        text={`${
                            sortedPerson === 'all'
                                ? 'Show projects as leader'
                                : sortedPerson === 'leader'
                                ? 'Show projects as member'
                                : 'Show all projects'
                        }`}
                    />
                    {/* <Button variant={'outline'} onClick={handleSortByDeadline}>
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
                    </Button> */}
                </PopoverContent>
            </Popover>

            <Link href={'/dashboard/create'} className="self-start">
                <Button className="self-start">Create</Button>
            </Link>
        </div>
    );
};

export default SearchPanel;
