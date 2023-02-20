import { useEffect, useState } from "react";
import './App.css';
import InputBox from './components/InputBox/InputBox';
import Weather from "./components/Weather/Weather";

const App = () => {
    const [showWeather, setShowWeather] = useState(false);
    const [location, setLocation] = useState({
        type: "",
        location: "",
        valid: false
    });
    const [geolocation, setGeolocation] = useState({
        capable: false,
        allowed: false,
        buttonText: "ALLOW GEOLOCATION?"
    });
    
    const getInputValue = (event) => {
        const input = event.target.value;
        const isValidZipCode = input.length == 5 && !isNaN(parseInt(input));

        if (isValidZipCode) {
            setLocation({
                type: "zip",
                location: input,
                valid: true
            });
        }
        else {
            if (location.valid) {
                setLocation({
                    ...location,
                    valid: false
                });
            }
        }
    };
    
    const geolocate = () => {
        if (geolocation.capable) {
            // attempting to geolocate
            setGeolocation({
                capable: true,
                allowed: geolocation.allowed,
                buttonText: "GEOLOCATING..."
            });

            const geolocationSuccessCallback = (pos) => {
                setGeolocation({
                    capable : true,
                    allowed : true,
                    buttonText : "GEOLOCATED!"
                });
                
                setLocation({
                    type: "latlong",
                    location: "lat=" + pos.coords.latitude.toFixed(2).toString() + "&lon=" + pos.coords.longitude.toFixed(2).toString(),
                    valid: true
                });
                
                setShowWeather(true);
            }

            const geolocationErrorCallback = (err) => {
                if (err.code == err.PERMISSION_DENIED) {
                    setGeolocation({
                        capable: true,
                        allowed: false,
                        buttonText: "GEOLOCATION BLOCKED"
                    });
                }
                if (err.code == err.TIMEOUT) {
                    setGeolocation({
                        capable: true,
                        allowed: false,
                        buttonText: "TIMEOUT GETTING LOCATION"
                    });
                }
                else {
                    setGeolocation({
                        capable: true,
                        allowed: false,
                        buttonText: "GEOLOCATION ERROR"
                    });
                }
            }
            
            navigator.geolocation.getCurrentPosition(
                geolocationSuccessCallback,
                geolocationErrorCallback,
                {enableHighAccuracy: false, timeout:10000, maximumAge: 0}
            );
        }
    }
        
    useEffect(() => {
        if ("geolocation" in navigator) {
            setGeolocation({
                ...geolocation,
                capable: true
            });
        } else {
            setGeolocation({
                ...geolocation,
                capable: false,
                buttonText: "GEOLOCATION DISABLED"
            });
        }
    }, []);
        
    const currentWeather = <Weather location={location} />;

    const inputBox = <InputBox
        geoButtonDisabled={geolocation.capable ? '' : 'disabled'}
        geolocation={geolocation}
        zipButtonDisabled={location.valid ? '' : 'disabled'}
        geoClick={geolocate} click={() => setShowWeather(true)}
        changed={getInputValue}
    />
        
    return (
        <div className="App">
            {showWeather ? currentWeather : inputBox}
        </div>
    )
};
        
export default App;