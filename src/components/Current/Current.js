import React, { Component } from 'react';
import axios from 'axios';
import './Current.css';

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

    /* 
        It's not best practice to have your API key in the URL -- I'm fully aware!
        This is just for testing during development. There will be a RESTful NodeJS backend handling requests
        to OpenWeatherAPI (with a new API key, of course!) coming soon and this API key will be deactivated.
    */


    componentDidMount() {
        /*
        axios.get(this.state.urlBase + this.props.location + this.state.urlAfter)
            .then(response => {
                this.setState({ currentWeather: response.data.list[0].weather });
                this.setState({ currentMain: response.data.list[0].main });
                this.setState({ currentTime: response.data.list[0].dt_txt });
                this.setState({ city: response.data.city });
                this.setState({ ready: true });
                console.log(this.state);
            });\
            */
        fetch('/weather/zip/' + this.props.location)
            .then(res => res.json())
            .then(response => {
                console.log(response);
                this.setState({weatherData: response, ready: true});
            });
    }

    render() { 

        const shortDayName = (dayNumber) => {
            switch (dayNumber){
                case 0:
                    return "Sun";
                    break;
                case 1:
                    return "Mon";
                    break;
                case 2:
                    return "Tue";
                    break;
                case 3:
                    return "Wed";
                    break;
                case 4:
                    return "Thu";
                    break;
                case 5:
                    return "Fri";
                    break;
                case 6:
                    return "Sat";
                    break;
                default:
                    return "Huh?";
                    break;
            }
        }

        const fullDayName = (dayNumber) => {
            switch (dayNumber){
                case 0:
                    return "Sunday";
                    break;
                case 1:
                    return "Monday";
                    break;
                case 2:
                    return "Tuesday";
                    break;
                case 3:
                    return "Wednesday";
                    break;
                case 4:
                    return "Thursday";
                    break;
                case 5:
                    return "Friday";
                    break;
                case 6:
                    return "Saturday";
                    break;
            }
        }

        const today = {
            "date" : new Date(this.state.weatherData.currentTime + " UTC").toString(),
            "day" : new Date(this.state.weatherData.currentTime + " UTC").getDay()
        }

        if (this.state.ready) {
            return (
                <div>
                    <div className="Container">
                    <div className="Block">
                        <div className="Temp">
                            {this.state.weatherData.currentMain.temp} F
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
                    <div className="Date">
                        {fullDayName(today.day)}
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
