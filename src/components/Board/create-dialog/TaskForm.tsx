import { OmittedTask, TaskSchemaType } from '@/types/tasks';
import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import TaskFormField from './TaskFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { AnimatePresence, motion } from 'framer-motion';
import MembersAndDeadline from './second-step-components/MembersAndDeadline';
import TaskPreview from './third-step-components/TaskPreview';
import { Loader2 } from 'lucide-react';
import { BadgeColor } from '@/types/badge';

interface Props {
    form: UseFormReturn<TaskSchemaType>;
    handleSubmit: (data: TaskSchemaType) => void;
    step: number;
    deadline: Date | undefined;
    setDeadline: React.Dispatch<React.SetStateAction<Date | undefined>>;
    assignedUsers: string[];
    setAssignedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    Task: OmittedTask;
    submitting: boolean;

    setColor: React.Dispatch<React.SetStateAction<BadgeColor>>;
    priority: 1 | 2 | 3;
    setPriority: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

const TaskForm: FC<Props> = (props) => {
    return (
        <AnimatePresence>
            <Form {...props.form}>
                <motion.form
                    className="flex flex-col gap-2"
                    onSubmit={props.form.handleSubmit(props.handleSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {props.step === 1 ? (
                        <>
                            <TaskFormField form={props.form} prop="title" />
                            <TaskFormField
                                form={props.form}
                                prop="description"
                            />
                        </>
                    ) : null}

                    {props.step === 2 ? (
                        <MembersAndDeadline
                            date={props.deadline}
                            setDate={props.setDeadline}
                            assignedUsers={props.assignedUsers}
                            setAssignedUsers={props.setAssignedUsers}
                        />
                    ) : null}

                    {props.step === 3 ? (
                        <TaskPreview
                            Task={props.Task}
                            setColor={props.setColor}
                            setPriority={props.setPriority}
                            priority={props.priority}
                        />
                    ) : null}

                    <Button className={'self-end'} disabled={props.submitting}>
                        {props.step === 3 && !props.submitting ? (
                            'Create task'
                        ) : props.step === 3 && !props.submitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            'Continue'
                        )}
                    </Button>
                </motion.form>
            </Form>
        </AnimatePresence>
    );
};

export default TaskForm;
