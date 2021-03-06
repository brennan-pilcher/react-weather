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
        ready : false,
        prefs: {
            scale : "F"
        }
    }


    componentDidMount() {
        // Query the Node/Express backend for the requested data

        if (this.props.location.type == "zip") {
            fetch('https://react-weather-backend.herokuapp.com/weather/zip/' + this.props.location.location)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    this.parseWeatherDataResponse(response);
                });
        }
        
        if (this.props.location.type == "latlong") {
            fetch('https://react-weather-backend.herokuapp.com/weather/latlong/' + this.props.location.location)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    this.parseWeatherDataResponse(response);
                });
        }
    }

    parseWeatherDataResponse = (response) => {
        let wD = this.state.weatherData;

        // current weather data
        wD.city = response.city;
        wD.currentTime = response.list[0].dt_txt;
        wD.currentMain = response.list[0].main;
        wD.currentWeather = response.list[0].weather;

        let days = {};

        // list of all available weather data returned from the API (3 hour intervals)
        for (let elem of response.list) {
            let now = new Date( moment.utc(elem.dt_txt).local().format("YYYY/MM/DD HH:mm:ss") );

            if (days[now.getDate()] === undefined) {
                days[now.getDate()] = {};
            }

            days[now.getDate()][now.getHours()] = elem;
        }

        let fc = [];


        // loop through all available days and construct a day object for each one with info relevant to the day's forecast
        for (let date in days) {
            let day = {};

            for(let hour in days[date]) {

                // set the date object within the current day
                if (day.date === undefined) {
                    let dateObj = new Date( moment.utc(days[date][hour].dt_txt).local().format("YYYY/MM/DD HH:mm:ss") );
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
                // TODO add priority list for escalating conditions, e.g. snow trumps rain, rain trumps clouds, etc
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
    }

    render() {

        const todayDate = new Date( moment.utc(this.state.weatherData.currentTime).local().format("YYYY/MM/DD HH:mm:ss") );

        // convenience object containing parsed sections of the date string
        const today = {
            "dateString" : todayDate.toString(),
            "day" : todayDate.getDay(),
            "month" : todayDate.getMonth(),
            "date" : todayDate.getDate()
        }
        
        const formatDescription = (desc) => {
            return desc.charAt(0).toUpperCase() + desc.slice(1) + ".";
        }

        const formatTemp = (temp) => {
            if (this.state.prefs.scale == "F") {
                return (temp * 1.8 - 459.67).toFixed() + " °F";
            }
            else if (this.state.prefs.scale == "C") {
                return (temp - 273.15).toFixed() + " °C";
            }
            else {
                return temp.toFixed() + " °K";
            }
        }

        // array of ForecastDay components for each upcoming day
        const forecast = this.state.forecast.map( (day) => {
            return (
                <li key={day.date.date} className="collection-item">
                    <ForecastDay
                        day={dateHelper.fullDayName(day.date.day)}
                        month={day.date.month + 1}
                        date={day.date.date}
                        min={formatTemp(day.temp_min)}
                        max={formatTemp(day.temp_max)}
                        desc={day.short_description}
                    />
                </li>
            )
        });

        

        if (this.state.ready) {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m8 l6 xl6 offset-m2 offset-l3 offset-xl3">
                                <div className="card cyan darken-3">
                                    <div className="card-content white-text">
                                        <span className="card-title">{this.state.weatherData.city.name}</span>
                                        <div className="descWrapper">
                                            <h1>{formatTemp(this.state.weatherData.currentMain.temp)}</h1>
                                        </div>

                                        <h5>{formatDescription(this.state.weatherData.currentWeather[0].description)}</h5>
                                        <p>{dateHelper.fullDayName(today.day)}, {dateHelper.fullMonthName(today.month)} {today.date}{dateHelper.dateOrdinal(today.date)}</p>
                                    </div>
                                    <div className="card-action">
                                        <b>{formatTemp(this.state.weatherData.currentMain.temp_max)} / {formatTemp(this.state.weatherData.currentMain.temp_min)}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m8 l6 xl6 offset-m2 offset-l3 offset-xl3">
                                <ul className="collection with-header">
                                    <li className="collection-header"><h5>Forecast</h5></li>
                                    {forecast}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="container">
                        <div className="progress cyan lighten-1">
                            <div className="indeterminate cyan darken-3"></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Weather;
