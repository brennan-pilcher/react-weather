import React, { Component } from 'react';
import axios from 'axios';
import './Current.css';
import dateHelper from '../DateHelper';

class Current extends Component {
    state = {
        cityName: '',
        countryName: '',
        weatherData: {
            city : {},
            currentWeather : {},
            currentMain : {},
            currentTime : ""
        },
        ready : false
    }


    componentDidMount() {
        // Query the Node/Express backend for the requested data
        fetch('https://react-weather-backend.herokuapp.com/weather/zip/' + this.props.location)
            .then(res => res.json())
            .then(response => {
                console.log(response);
                this.setState({weatherData: response, ready: true});
            });
    }

    render() { 


        const today = {
            "date" : new Date(this.state.weatherData.currentTime + " UTC").toString(),
            "day" : new Date(this.state.weatherData.currentTime + " UTC").getDay(),
            "month" : new Date(this.state.weatherData.currentTime + " UTC").getMonth(),
            "date" : new Date(this.state.weatherData.currentTime + " UTC").getDate()
        }

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
 
export default Current;
