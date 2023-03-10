import React from 'react';

interface ForecastDayProps {
    day: string;
    month: string;
    date: string;
    desc: string;
    max: string;
    min: string;
}

const ForecastDay = ({ day, month, date, desc, max, min }: ForecastDayProps) => {
    return (
        <div className="forecast-day">
            <b>{`${day} - ${month}/${date}`}</b>{` - ${desc} - ${max} / ${min}`}
        </div>
    );
};

export default ForecastDay;