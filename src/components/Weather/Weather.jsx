import { useWeatherData } from "../../hooks/useWeatherData";
import ProgressBar from '../ProgressBar/ProgressBar';
import Forecast from "../Forecast/Forecast";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

const Weather = ({ location }) => {
    const weather = useWeatherData(location);
    
    if (weather.ready) {
        return (
            <div>
                <div className="container">
                    <CurrentWeather weather={weather} />
                    <Forecast forecast={weather.forecast} />
                </div>
            </div>
        );
    } else {
        return <ProgressBar />;
    }
}
        
export default Weather;