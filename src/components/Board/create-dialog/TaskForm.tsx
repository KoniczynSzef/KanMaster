import { OmittedTask, TaskSchemaType } from '@/types/tasks';
import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import TaskFormField from './TaskFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { AnimatePresence, motion } from 'framer-motion';
import MembersAndDeadline from './second-step-components/MembersAndDeadline';
import TaskPreview from './third-step-components/TaskPreview';

interface Props {
    form: UseFormReturn<TaskSchemaType>;
    handleSubmit: (data: TaskSchemaType) => void;
    step: number;
    deadline: Date | undefined;
    setDeadline: React.Dispatch<React.SetStateAction<Date | undefined>>;
    assignedUsers: string[];
    setAssignedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    Task: OmittedTask;
}

const TaskForm: FC<Props> = ({
    form,
    handleSubmit,
    step,
    deadline,
    setDeadline,
    setAssignedUsers,
    assignedUsers,
    Task,
}) => {
    return (
        <AnimatePresence>
            <Form {...form}>
                <motion.form
                    className="flex flex-col gap-2"
                    onSubmit={form.handleSubmit(handleSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {step === 1 ? (
                        <>
                            <TaskFormField form={form} prop="title" />
                            <TaskFormField form={form} prop="description" />
                        </>
                    ) : null}

                    {step === 2 ? (
                        <MembersAndDeadline
                            date={deadline}
                            setDate={setDeadline}
                            assignedUsers={assignedUsers}
                            setAssignedUsers={setAssignedUsers}
                        />
                    ) : null}

                    {step === 3 ? <TaskPreview Task={Task} /> : null}

                    <Button className="self-end">Continue</Button>
                </motion.form>
            </Form>
        </AnimatePresence>
    );
};

export default TaskForm;
