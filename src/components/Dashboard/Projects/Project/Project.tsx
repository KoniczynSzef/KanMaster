import { projectType, useProjectStore } from '@/context/project-store';
import React, { FC } from 'react';
import Badge from '../Badge';

import { motion } from 'framer-motion';

interface Props {
    project: projectType;
    idx: number;
}

const Project: FC<Props> = ({ project, idx }) => {
    const { badges } = useProjectStore();
    const badge = badges.find((badge) => badge.projectId === project.id);

    return (
        <motion.div
            className="md:max-w-sm lg:max-w-md p-8 rounded border border-slate-800 relative h-32 w-full origin-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 * idx }}
        >
            <Badge withId badge={badge} withoutAnimation />
            <h3 className="text-3xl font-bold">{project.name}</h3>
            <p className="text-sm mt-4 text-muted-foreground">
                {project.description}
            </p>
        </motion.div>
    );
};

export default Project;
