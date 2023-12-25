'use client';

import Image, { StaticImageData } from 'next/image';
import React, { FC } from 'react';

interface Props {
    title: string;
    description: string;
    imageSrc: StaticImageData;
    alt: string;

    isReversed?: boolean;
}

const ImageCard: FC<Props> = ({
    title,
    description,
    imageSrc,
    alt,
    isReversed,
}) => {
    return (
        <article
            className={`flex justify-between flex-col items-center lg:items-start lg:flex-row text-center lg:text-left ${
                isReversed && 'lg:flex-row-reverse'
            }`}
        >
            <div className="lg:p-6 lg:py-12 mx-10">
                <h3 className="text-2xl font-bold text-center lg:text-left">
                    {title}
                </h3>
                <p className="text-muted-foreground max-w-lg mt-2 text-center lg:text-left">
                    {description}
                </p>
            </div>

            <Image
                src={imageSrc}
                alt={alt}
                width={600}
                height={400}
                className="rounded"
            />
        </article>
    );
};

export default ImageCard;
