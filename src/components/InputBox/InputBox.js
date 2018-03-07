import React from 'react';
import './InputBox.css';

const InputBox = (props) => {
    return (
        <div>
            <div className="row">
                <div className="input-field col s6 m4 offset-m4 offset-s3">
                    <input placeholder="ZIP Code (US)" onChange={props.changed}></input>
                    <button disabled={props.buttonDisabled} className="waves-effect waves-light btn-large" onClick={props.click}>View Weather</button>
                </div>
            </div>
            
            
        </div>
    )
};

export default InputBox;