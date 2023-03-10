import moment from "moment";
import { fullDayName, fullMonthName, dateOrdinal } from "../../dateHelpers";
import { formatTemp, formatDescription } from "../../utils";
import { DATE_FORMAT } from "../../contants";
import { WeatherDataState } from "../../hooks/useWeatherData";

interface CurrentWeatherProps {
    weather: WeatherDataState;
}

const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
    const currentDate = new Date( moment.utc(weather.weatherData.currentTime).local().format(DATE_FORMAT) );
    const today = {
        dateString: currentDate.toString(),
        day: currentDate.getDay(),
        month: currentDate.getMonth(),
        date: currentDate.getDate()
    };

    const title = <span className="card-title">{weather.weatherData.city.name}</span>;

    const currentTemp = (
        <div className="descWrapper">
            <h1>{formatTemp(weather.weatherData.currentMain.temp, 'F')}</h1>
        </div>
    );

    const description = <h5>{formatDescription(weather.weatherData.currentWeather[0].description)}</h5>;

    const formattedDate = <p>{`${fullDayName(today.day)}, ${fullMonthName(today.month)} ${today.date}${dateOrdinal(today.date)}`}</p>

    const highAndLowTemps = (
        <div className="card-action">
            <b>{formatTemp(weather.weatherData.currentMain.temp_max, 'F')} / {formatTemp(weather.weatherData.currentMain.temp_min, 'F')}</b>
        </div>
    )

    return (
        <div className="row">
            <div className="col s12 m8 l6 xl6 offset-m2 offset-l3 offset-xl3">
                <div className="card cyan darken-3">
                    <div className="card-content white-text">
                        {title}
                        {currentTemp}
                        {description}
                        {formattedDate}
                    </div>
                    {highAndLowTemps}
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;