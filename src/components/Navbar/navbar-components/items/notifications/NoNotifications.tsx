'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Bell } from 'lucide-react';
import React, { FC } from 'react';

interface Props {}

const NoNotifications: FC<Props> = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Bell className="text-black md:text-white dark:text-white" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>You don&apos;t have any notifications yet</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default NoNotifications;
