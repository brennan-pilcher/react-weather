import React from 'react';

const forecastDay = (props) => {
    console.log(props);
    return (
        <div>
            {props.day} - {props.desc} - {props.max} / {props.min}
        </div>
    );
};

export default forecastDay;