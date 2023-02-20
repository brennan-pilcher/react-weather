import moment from "moment";
import dateHelper from "../../dateHelper";
import { formatTemp, formatDescription } from "../../utils";
import { FAHRENHEIT, DATE_FORMAT } from "../../contants";

const CurrentWeather = ({ weather }) => {
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
            <h1>{formatTemp(weather.weatherData.currentMain.temp, FAHRENHEIT)}</h1>
        </div>
    );

    const description = <h5>{formatDescription(weather.weatherData.currentWeather[0].description)}</h5>;

    const formattedDate = <p>{`${dateHelper.fullDayName(today.day)}, ${dateHelper.fullMonthName(today.month)} ${today.date}${dateHelper.dateOrdinal(today.date)}`}</p>

    const highAndLowTemps = (
        <div className="card-action">
            <b>{formatTemp(weather.weatherData.currentMain.temp_max, FAHRENHEIT)} / {formatTemp(weather.weatherData.currentMain.temp_min, FAHRENHEIT)}</b>
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