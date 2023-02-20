import ForecastDay from "../Forecast/ForecastDay/ForecastDay";
import { FAHRENHEIT } from "../../contants";
import { formatTemp } from "../../utils";
import dateHelper from '../../dateHelper'

const Forecast = ({ forecast }) => {
    const forecastDays = forecast.map((day) => {
        return (
            <li key={day.date.date} className="collection-item">
                <ForecastDay
                    day={dateHelper.fullDayName(day.date.day)}
                    month={day.date.month + 1} // JS Date months begin at 0
                    date={day.date.date}
                    min={formatTemp(day.temp_min, FAHRENHEIT)}
                    max={formatTemp(day.temp_max, FAHRENHEIT)}
                    desc={day.short_description}
                />
            </li>
        )
    });

    return (
        <div className="row">
            <div className="col s12 m8 l6 xl6 offset-m2 offset-l3 offset-xl3">
                <ul className="collection with-header">
                    <li className="collection-header"><h5>Forecast</h5></li>
                    {forecastDays}
                </ul>
            </div>
        </div>
    );
}

export default Forecast;