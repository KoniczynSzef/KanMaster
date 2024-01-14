'use client';

// import * as Accordion from '@/components/ui/accordion';
// import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import { Input } from '../ui/input';
import { searchTasks, useTaskStore } from '@/context/tasks-store';
import { Dialog, DialogContent } from '../ui/dialog';
import { Loader2 } from 'lucide-react';
import { Task } from '@prisma/client';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from 'react-query';

interface Props {
    tasks: Task[];
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
}

type Action = {
    label: string;
    onClick: () => void;
};

// const actions: Action[] = [
//     {
//         label: 'Sort tasks by priority',
//         onClick: () => {},
//     },
// ];

const KanbanMenu: FC<Props> = (props) => {
    const prev = React.useRef<string>('');

    const [isOpen, setIsOpen] = React.useState(false);
    const { setTasks } = useTaskStore();

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= prev.current.length) {
            await props.refetch();
            console.log(props.tasks);
        }

        setTasks(searchTasks(props.tasks, e.target.value));
        prev.current = e.target.value;
    };

    return (
        // <Accordion.Accordion type="single" collapsible className="border-none">
        //     <Accordion.AccordionItem value="actions" className="border-none">
        //         <Accordion.AccordionTrigger className="no-underline hover:no-underline hover:bg-secondary transition-300 px-2 rounded">
        //             Manage Kanban Board
        //         </Accordion.AccordionTrigger>
        //         <Accordion.AccordionContent className="mt-2">
        //             {actions.map((action, idx) => (
        //                 <Button key={idx} onClick={action.onClick}>
        //                     {action.label}
        //                 </Button>
        //             ))}
        //         </Accordion.AccordionContent>
        //     </Accordion.AccordionItem>
        // </Accordion.Accordion>

        <form action="">
            <Input placeholder="Search tasks..." onChange={handleSearch} />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <Loader2 className="animate-spin" />
                </DialogContent>
            </Dialog>
        </form>
    );
};

export default KanbanMenu;
