'use client';

import React, { FC } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Star } from '@/types/homepage';

interface Props {
    star: Star;
    idx: number;
}

import { motion } from 'framer-motion';

const StarCard: FC<Props> = ({ star, idx }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.25 }}
        >
            <Card className="w-min">
                <CardHeader>
                    <CardTitle className={`${star.color} text-center`}>
                        {star.content}
                    </CardTitle>
                </CardHeader>
            </Card>
        </motion.div>
    );
};

export default StarCard;
