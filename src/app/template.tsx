'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode;
}

const template: FC<Props> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ y: 0, opacity: 1 }}
        >
            {children}
        </motion.div>
    );
};

export default template;
