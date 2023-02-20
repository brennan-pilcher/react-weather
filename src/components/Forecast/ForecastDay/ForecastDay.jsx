import React from 'react';

const ForecastDay = (props) => {
    return (
        <div className="forecast-day">
            <b>{props.day} - {props.month}/{props.date}</b> - {props.desc} - {props.max} / {props.min}
        </div>
    );
};

export default ForecastDay;