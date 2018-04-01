import React from 'react';
import './InputBox.css';

const InputBox = (props) => {
    return (
        <div>
            <div className="row">
                <div className="input-field col s6 m4 offset-m4 offset-s3">
                    <button disabled={props.geoButtonDisabled} className="waves-effect waves-light btn-large" onClick={props.geoClick}>{props.geolocation.buttonText}</button>
                    <div className="or"><h5>or</h5></div>
                    <input placeholder="ZIP Code (US)" onChange={props.changed}></input>
                    <button disabled={props.zipButtonDisabled} className="waves-effect waves-light btn-large" onClick={props.click}>View Weather</button>
                </div>
            </div>
        </div>
    )
};

export default InputBox;