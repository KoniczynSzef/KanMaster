'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useNotificationStore } from '@/context/notification-store';
import { useProjectStore } from '@/context/project-store';
import { useUserStore } from '@/context/user-store';
import { getBadges } from '@/controllers/badge-functions';
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
    const { setProjects, setBadges } = useProjectStore();
    const { dismissNotification } = useNotificationStore();

    const handleJoinProject = async () => {
        try {
            await joinProject(notification, user?.email);
            const newProjects = await getProjects(user?.email, 1);

            dismissNotification(notification.id);

            setProjects(newProjects);

            const badges = await getBadges(user?.email, newProjects);
            setBadges(badges);

            toast.success('Successfully joined project');
            await deleteNotification(notification.id);
        } catch (error) {
            throw new Error('Error joining project');
        }
    };
    return (
        <DropdownMenuItem
            key={notification.id}
            className="flex gap-4 items-center flex-col"
        >
            {notification.title}
            <Button onClick={handleJoinProject}>Join project!</Button>
        </DropdownMenuItem>
    );
};

export default NotificationMenuItem;
