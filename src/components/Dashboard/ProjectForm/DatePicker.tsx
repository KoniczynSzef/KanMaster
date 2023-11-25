'use client';

import React, { FC } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useProjectFormStore } from '@/context/project-form-store';

interface Props {}

const DatePicker: FC<Props> = () => {
    const { setDeadline, deadline } = useProjectFormStore();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'outline'}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? (
                        format(deadline, 'PPP')
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={(date) =>
                        setDeadline(
                            date ?? new Date(new Date().getTime() + 86400000)
                        )
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
