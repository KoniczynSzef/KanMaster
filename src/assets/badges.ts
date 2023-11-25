import { BadgeIcon } from '@/types/badge';

export type tailwindColors =
    | 'bg-paletteBlue'
    | 'bg-paletteLighterRed'
    | 'bg-paletteGreen'
    | 'bg-paletteGrey'
    | 'bg-paletteDarkerIndigo'
    | 'bg-paletteAmber';

export const colorsArray: { value: tailwindColors }[] = [
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

export const iconsArray: { value: BadgeIcon }[] = [
    {
        value: 'calendar',
    },
    {
        value: 'tools',
    },
    {
        value: 'laptop',
    },
    {
        value: 'people',
    },
    {
        value: 'heart',
    },
    {
        value: 'book',
    },
];
