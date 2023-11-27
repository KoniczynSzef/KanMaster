import { tailwindColors } from '@/assets/badges';
import { Button } from '@/components/ui/button';
import { Badge } from '@/context/project-form-store';
import { getBadgeIconComponent } from '@/helpers/badge-helpers';
import { BadgeIcon } from '@/types/badge';
import React, { FC } from 'react';

type Props = {
    badge: Badge;
    setBadge: (badge: Badge) => void;
} & (
    | {
          isColors: true;
          array: {
              value: tailwindColors;
          }[];
      }
    | {
          isColors: false;
          array: {
              value: BadgeIcon;
          }[];
      }
);

const IconButtons: FC<Props> = ({ isColors, array, setBadge, badge }) => {
    const handleClick = (value: tailwindColors | BadgeIcon) => {
        if (isColors) {
            setBadge({
                ...badge,
                color: value as tailwindColors,
            });
        } else {
            setBadge({
                ...badge,
                icon: value as BadgeIcon,
            });
        }
    };
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 self-start">
            {isColors
                ? array.map((icon, idx) => (
                      <Button
                          type="button"
                          key={idx}
                          size={'icon'}
                          className={`hover:opacity-70 ${icon.value} hover:${icon.value} transition-all duration-300`}
                          onClick={() => handleClick(icon.value)}
                      />
                  ))
                : array.map((icon, idx) => (
                      <Button
                          type="button"
                          variant={'outline'}
                          key={idx}
                          size={'icon'}
                          onClick={() => handleClick(icon.value)}
                      >
                          {getBadgeIconComponent(icon.value)}
                      </Button>
                  ))}
        </div>
    );
};

export default IconButtons;
