import React, { Component } from 'react';
import axios from 'axios';
import './Current.css';

class Current extends Component {
    state = {
        cityName: '',
        countryName: '',
        sampleData : {
            "dt": 1517108400,
            "main": {
                "temp": 283.9,
                "temp_min": 283.344,
                "temp_max": 283.9,
                "pressure": 1035.84,
                "sea_level": 1039.34,
                "grnd_level": 1035.84,
                "humidity": 70,
                "temp_kf": 0.56
            },
            "weather": [
                {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04n"
                }
            ],
            "clouds": {
                "all": 88
            },
            "wind": {
                "speed": 5.4,
                "deg": 215.503
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-01-28 03:00:00"
            },
        city : {},

        currentWeather : {},
        currentMain : {},
        //currentTime : "",
        ready : false,
        urlBase : 'http://api.openweathermap.org/data/2.5/forecast?zip=',
        urlAfter: ',us&units=imperial&APPID=b52ab967cdcf61785395d382806bc07c'
    }


    componentDidMount() {
        axios.get(this.state.urlBase + this.props.location + this.state.urlAfter)
            .then(response => {
                this.setState({ currentWeather: response.data.list[0].weather });
                this.setState({ currentMain: response.data.list[0].main });
                this.setState({ currentTime: response.data.list[0].dt_txt });
                this.setState({ city: response.data.city });
                this.setState({ ready: true });
                console.log(this.state);
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
            "date" : new Date(this.state.currentTime + " UTC").toString(),
            "day" : new Date(this.state.currentTime + " UTC").getDay()
        }

        if (this.state.ready) {
            return (
                <div>
                    <div className="Container">
                    <div className="Block">
                        <div className="Temp">
                            {this.state.currentMain.temp} F
                        </div>
                        <div className="ShortDescription">
                            {this.state.currentWeather[0].main}
                        </div>
                    </div>
                    <div className="Block">
                        <div className="City">
                            {this.state.city.name}
                        </div>
                        <div className="Country">
                            {this.state.city.country}
                        </div>
                    </div>
                    </div>
                    <div className="LongDescription">
                        {this.state.currentWeather[0].description}
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