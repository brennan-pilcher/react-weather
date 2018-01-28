import React from 'react';
import './InputBox.css';

const InputBox = (props) => {
    return (
        <div>
            <input placeholder="ZIP Code" onChange={props.changed}></input>
            <button onClick={props.click}>View Weather</button>
        </div>
    )
};

export default InputBox;