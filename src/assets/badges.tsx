import React from 'react';
import { Book, Calendar, Heart, Laptop, Users, Wrench } from 'lucide-react';

export const colorsArray: { value: string }[] = [
    {
        value: 'bg-paletteBlue',
    },
    {
        value: 'bg-paletteLighterRed',
    },
    {
        value: 'bg-paletteGreen',
    },
    {
        value: 'bg-paletteGrey',
    },
    {
        value: 'bg-paletteDarkerIndigo',
    },
    {
        value: 'bg-paletteAmber',
    },
];

export const iconsArray: { value: React.JSX.Element }[] = [
    {
        value: <Calendar />,
    },
    {
        value: <Wrench />,
    },
    {
        value: <Laptop />,
    },
    {
        value: <Users />,
    },
    {
        value: <Heart />,
    },
    {
        value: <Book />,
    },
];
