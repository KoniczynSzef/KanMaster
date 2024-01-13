'use client';

import * as Accordion from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

interface Props {
    actions?: unknown;
}

type Action = {
    label: string;
    onClick: () => void;
};

const actions: Action[] = [
    {
        label: 'Sort tasks by priority',
        onClick: () => {},
    },
];

const SidebarMenu: FC<Props> = () => {
    return (
        <Accordion.Accordion
            type="single"
            collapsible
            className="border-none ml-2 mt-12"
        >
            <Accordion.AccordionItem value="actions" className="border-none">
                <Accordion.AccordionTrigger className="no-underline hover:no-underline hover:bg-secondary transition-300 px-2 rounded">
                    Manage Kanban Board
                </Accordion.AccordionTrigger>
                <Accordion.AccordionContent className="mt-2">
                    {actions.map((action, idx) => (
                        <Button key={idx} onClick={action.onClick}>
                            {action.label}
                        </Button>
                    ))}
                </Accordion.AccordionContent>
            </Accordion.AccordionItem>
        </Accordion.Accordion>
    );
};

export default SidebarMenu;
