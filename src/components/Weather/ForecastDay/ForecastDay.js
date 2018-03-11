import React from 'react';

const ForecastDay = (props) => {
    return (
        <div className="forecast-day">
            <b>{props.day} - {props.month}/{props.date}</b> - {props.desc} - {props.max}°F / {props.min}°F
        </div>
    );
};

export default ForecastDay;