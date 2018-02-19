import React, { Component } from 'react';
import axios from 'axios';
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
                    let now = new Date(elem.dt_txt + " UTC");

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

                        if (day.date === undefined) {
                            let dateObj = new Date(days[date][hour].dt_txt + " UTC");
                            day["date"] = {
                                day: dateObj.getDay(),
                                date: dateObj.getDate(),
                                month: dateObj.getMonth()
                            };
                        }
                        if (day.temp_min === undefined || day.temp_min > days[date][hour].main.temp_min) {
                            day["temp_min"] = days[date][hour].main.temp_min;
                        }
                        if (day.temp_max === undefined || day.temp_max < days[date][hour].main.temp_max) {
                            day["temp_max"] = days[date][hour].main.temp_max;
                        }
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

        const today = {
            "date" : new Date(this.state.weatherData.currentTime + " UTC").toString(),
            "day" : new Date(this.state.weatherData.currentTime + " UTC").getDay(),
            "month" : new Date(this.state.weatherData.currentTime + " UTC").getMonth(),
            "date" : new Date(this.state.weatherData.currentTime + " UTC").getDate()
        }

        const forecast = this.state.forecast.map( (day) => {
            return (
                <ForecastDay
                    key={day.date.date}
                    day={dateHelper.shortDayName(day.date.day)}
                    min={day.temp_min.toFixed()}
                    max={day.temp_max.toFixed()}
                    desc={day.short_description}
                />
            )
        });

        if (this.state.ready) {
            return (
                <div>
                    <div className="Container">
                    <div className="Block">
                        <div className="Temp">
                            {this.state.weatherData.currentMain.temp.toFixed()}°F
                        </div>
                        <div className="ShortDescription">
                            {this.state.weatherData.currentWeather[0].main}
                        </div>
                    </div>
                    <div className="Block">
                        <div className="City">
                            {this.state.weatherData.city.name}
                        </div>
                        <div className="Country">
                            {this.state.weatherData.city.country}
                        </div>
                    </div>
                    </div>
                    <div className="LongDescription">
                        {this.state.weatherData.currentWeather[0].description}
                    </div>
                    <div>
                        High: {this.state.weatherData.currentMain.temp_max.toFixed()}   Low: {this.state.weatherData.currentMain.temp_min.toFixed()}
                    </div>
                    <div className="Date">
                        {dateHelper.fullDayName(today.day)}, {dateHelper.fullMonthName(today.month)} {today.date}{dateHelper.dateOrdinal(today.date)}
                    </div>
                    
                    <div className="Date">
                        {forecast}
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
