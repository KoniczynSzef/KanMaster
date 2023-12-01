'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useProjectStore } from '@/context/project-store';
import { useUserStore } from '@/context/user-store';
import {
    deleteNotification,
    joinProject,
} from '@/controllers/notification-functions';
import { getProjects } from '@/controllers/project-functions';
import { Notification } from '@prisma/client';
import React, { FC } from 'react';
import { toast } from 'sonner';

interface Props {
    notification: Notification;
}

const NotificationMenuItem: FC<Props> = ({ notification }) => {
    const { user } = useUserStore();
    const { setProjects } = useProjectStore();

    const handleJoinProject = async () => {
        try {
            await joinProject(notification, user?.email);
            const newProjects = await getProjects(user?.email, 1);

            await deleteNotification(notification.id);

            setProjects(newProjects);
            toast.success('Successfully joined project');
        } catch (error) {
            throw new Error('Error joining project');
        }
    };
    return (
        <DropdownMenuItem
            key={notification.id}
            className="flex gap-4 items-center"
        >
            {notification.title}
            <Button onClick={handleJoinProject}>Join project!</Button>
        </DropdownMenuItem>
    );
};

export default NotificationMenuItem;
