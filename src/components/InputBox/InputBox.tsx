import React from 'react';
import { Geolocation } from '../../types';
import './InputBox.css';

interface InputBoxProps {
    geoButtonDisabled: boolean;
    zipButtonDisabled: boolean;
    geolocation: Geolocation;
    geoClick: React.MouseEventHandler<HTMLButtonElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    showWeather: () => void;
}

const InputBox = ({ geoButtonDisabled, zipButtonDisabled, geolocation, geoClick, onChange, showWeather }: InputBoxProps) => {
    return (
        <div>
            <div className="row">
                <div className="input-field col s8 m4 offset-m4 offset-s2">
                    <button disabled={geoButtonDisabled} className="waves-effect waves-light btn-large" onClick={geoClick}>{geolocation.buttonText}</button>
                    <div className="or"><h5>or</h5></div>
                    <input placeholder="ZIP Code (US)" onChange={onChange}></input>
                    <button disabled={zipButtonDisabled} className="waves-effect waves-light btn-large" onClick={showWeather}>View Weather</button>
                </div>
            </div>
        </div>
    )
};

export default InputBox;