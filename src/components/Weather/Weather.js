import React, { Component } from 'react';
import moment from 'moment';
import './Weather.css';
import ForecastDay from './ForecastDay/ForecastDay';
import dateHelper from '../DateHelper';

class Weather extends Component {
    state = {
        cityName: '',
        countryName: '',
        weatherData: {
            city : {},
            currentWeather : {},
            currentMain : {},
            currentTime : ""
        },
        forecast: [],
        ready : false
    }


    componentDidMount() {
        // Query the Node/Express backend for the requested data
        fetch('https://react-weather-backend.herokuapp.com/weather/zip/' + this.props.location)
            .then(res => res.json())
            .then(response => {
                //console.log(response);

                let wD = this.state.weatherData;

                // current weather data
                wD.city = response.city;
                wD.currentTime = response.list[0].dt_txt;
                wD.currentMain = response.list[0].main;
                wD.currentWeather = response.list[0].weather;

                let days = {};

                // list of all available weather data returned from the API (3 hour intervals)
                for (let elem of response.list) {
                    let now = new Date( moment.utc(elem.dt_txt).local().format("YYYY-MM-DD HH:mm:ss") );

                    if (days[now.getDate()] == undefined) {
                        days[now.getDate()] = {};
                    }

                    days[now.getDate()][now.getHours()] = elem;
                }

                let fc = [];


                // loop through all available days and construct a day object for each one with info relevant to the day's forecast
                for(let date in days) {
                    let day = {};

                    for(let hour in days[date]) {

                        // set the date object within the current day
                        if (day.date === undefined) {
                            let dateObj = new Date( moment.utc(days[date][hour].dt_txt).local().format("YYYY-MM-DD HH:mm:ss") );
                            day["date"] = {
                                day: dateObj.getDay(),
                                date: dateObj.getDate(),
                                month: dateObj.getMonth()
                            };
                        }
                        // set the day's minimum temperature
                        if (day.temp_min === undefined || day.temp_min > days[date][hour].main.temp_min) {
                            day["temp_min"] = days[date][hour].main.temp_min;
                        }
                        //set the day's maximum temperature
                        if (day.temp_max === undefined || day.temp_max < days[date][hour].main.temp_max) {
                            day["temp_max"] = days[date][hour].main.temp_max;
                        }
                        // set the day's weather description
                        // note: add priority list for escalating conditions, e.g. snow trumps rain, rain trumps clouds, etc
                        if(day.short_description === undefined) {
                            day["short_description"] = days[date][hour].weather[0].main;
                        }
                    }

                    fc.push(day);

                }

                this.setState({
                    weatherData: wD,
                    forecast: fc,
                    ready: true
                });
            });
    }

    render() {

        const todayDate = new Date( moment.utc(this.state.weatherData.currentTime).local().format("YYYY-MM-DD HH:mm:ss") );

        // convenience object containing parsed sections of the date string
        const today = {
            "date" : todayDate.toString(),
            "day" : todayDate.getDay(),
            "month" : todayDate.getMonth(),
            "date" : todayDate.getDate()
        }

        // array of ForecastDay components for each upcoming day
        const forecast = this.state.forecast.map( (day) => {
            return (
                <li className="collection-item">
                    <ForecastDay
                        key={day.date.date}
                        day={dateHelper.shortDayName(day.date.day)}
                        min={day.temp_min.toFixed()}
                        max={day.temp_max.toFixed()}
                        desc={day.short_description}
                    />
                </li>
            )
        });

        const formatDescription = (desc) => {
            return desc.charAt(0).toUpperCase() + desc.slice(1) + ".";
        }

        if (this.state.ready) {
            return (
                <div>
                    <div className="container">
                    <div className="row">
                        <div className="col s12 m12">
                        <div className="card cyan darken-3">
                            <div className="card-content white-text">
                            <span className="card-title">{this.state.weatherData.city.name}</span>
                            <div className="descWrapper">
                                <h1>{this.state.weatherData.currentMain.temp.toFixed()}°F</h1>
                            </div>

                            <h5>{formatDescription(this.state.weatherData.currentWeather[0].description)}</h5>
                            <p>{dateHelper.fullDayName(today.day)}, {dateHelper.fullMonthName(today.month)} {today.date}{dateHelper.dateOrdinal(today.date)}</p>
                            </div>
                            <div className="card-action">
                                {this.state.weatherData.currentMain.temp_max.toFixed()}°F / {this.state.weatherData.currentMain.temp_min.toFixed()}°F
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col s12 m6 offset-m3">
                        <ul className="collection with-header">
                            <li className="collection-header"><h5>Forecast</h5></li>
                            {forecast}
                        </ul>
                    </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p> Loading... </p>
                </div>
            );
        }
    }
}

export default Weather;