import ForecastDay from "./ForecastDay/ForecastDay";
import { formatTemp } from "../../utils";
import { fullDayName } from '../../dateHelpers'

interface ForecastProps {
    forecast: any; //todo fix
}

const Forecast = ({ forecast }: ForecastProps) => {
    const forecastDays = forecast.map((day: any) => { // todo fix
        return (
            <li key={day.date.date} className="collection-item">
                <ForecastDay
                    day={fullDayName(day.date.day)}
                    month={day.date.month + 1} // JS Date months begin at 0
                    date={day.date.date}
                    min={formatTemp(day.temp_min, 'F')}
                    max={formatTemp(day.temp_max, 'F')}
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