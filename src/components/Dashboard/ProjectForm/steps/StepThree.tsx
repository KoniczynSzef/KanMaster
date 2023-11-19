import React, { FC } from 'react';
import DatePicker from '../DatePicker';

interface Props {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const StepThree: FC<Props> = ({ date, setDate }) => {
    return (
        <>
            <DatePicker date={date} setDate={setDate} />
        </>
    );
};

export default StepThree;
