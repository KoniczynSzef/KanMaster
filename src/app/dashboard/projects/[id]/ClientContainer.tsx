'use client';

import KanbanBoard from '@/components/Board/KanbanBoard';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjectStore } from '@/context/project-store';
import { useTaskStore } from '@/context/tasks-store';
import { useUserStore } from '@/context/user-store';
import { Project, Task, User } from '@prisma/client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
// import Delete from './Delete';
import { getTasks } from '@/controllers/task-actions';
// import { Button } from '@/components/ui/button';
// import { ArrowDown, ArrowUp } from 'lucide-react';
import Sidebar from '@/components/Dashboard/Sidebar';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
}

const ClientContainer: FC<Props> = (props) => {
    const { user, setUser } = useUserStore();
    // const [asc, setAsc] = React.useState<boolean>(true);

    if (!user) {
        setUser(props.user);
    }

    const { setSingleProject, project: storedProject } = useProjectStore();
    useQuery({
        queryKey: ['project'],
        queryFn: () => {
            setSingleProject(props.project);
        },
    });

    const { setTasks, tasks } = useTaskStore();
    const { isLoading, refetch: fetchTasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const t = await getTasks(props.project.id);
            setTasks(t);
        },
    });

    if (isLoading) {
        return (
            <Skeleton className="w-full h-44 rounded flex justify-center items-center">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </Skeleton>
        );
    }

    if (!storedProject || !tasks || !user) {
        return <div>Data was not found!</div>;
    }

    // const handleSortByPriority = () => {
    //     const newTasks = sortByPriority(asc);
    //     setTasks(newTasks);

    //     setAsc((prev) => !prev);
    // };

    return (
        <div className="flex border border-muted rounded p-4 gap-4">
            <Sidebar project={storedProject} />

            <KanbanBoard
                project={storedProject}
                tasks={tasks}
                user={props.user}
                refetch={fetchTasks}
            />

            {/* <Delete
                project={storedProject}
                user={user}
                fetchTasks={fetchTasks}
            /> */}
        </div>
    );
};

export default ClientContainer;
