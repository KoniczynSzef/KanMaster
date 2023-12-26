'use client';

import KanbanBoard from '@/components/Board/KanbanBoard';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjectStore } from '@/context/project-store';
import { useTaskStore } from '@/context/tasks-store';
import { useUserStore } from '@/context/user-store';
import { Project, Task, User } from '@prisma/client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
}

const ClientContainer: FC<Props> = (props) => {
    const { user, setUser } = useUserStore();

    if (!user) {
        setUser(props.user);
    }

    const { setSingleProject, project: storedProject } = useProjectStore();
    const { refetch } = useQuery({
        queryKey: ['project'],
        queryFn: () => {
            setSingleProject(props.project);
        },
    });

    const { setTasks, tasks } = useTaskStore();
    const { isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => {
            setTasks(props.tasks);
        },
    });

    if (isLoading) {
        return (
            <Skeleton className="w-full h-44 rounded flex justify-center items-center">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </Skeleton>
        );
    }

    if (!storedProject || !tasks) {
        return <div>Data was not found!</div>;
    }

    return (
        <div>
            <KanbanBoard
                project={storedProject}
                tasks={tasks}
                user={props.user}
                refetch={refetch}
            />
        </div>
    );
};

export default ClientContainer;
