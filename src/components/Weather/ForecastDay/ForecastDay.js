import React from 'react';

const forecastDay = (props) => {
    return (
        <div>
            {props.day} - {props.desc} - {props.max}°F / {props.min}°F
        </div>
    );
};

export default forecastDay;