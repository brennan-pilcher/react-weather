import React from 'react';

const forecastDay = (props) => {
    return (
        <div>
            <b>{props.day} - {props.month}/{props.date}</b> - {props.desc} - {props.max}°F / {props.min}°F
        </div>
    );
};

export default forecastDay;