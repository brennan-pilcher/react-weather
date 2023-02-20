import { useEffect, useState } from "react";
import moment from "moment";
import { API_URL, DATE_FORMAT } from "../contants";

const parseWeatherDataResponse = (data) => {
    let weatherData = {
        city: data.city,
        currentTime: data.list[0].dt_txt,
        currentMain: data.list[0].main,
        currentWeather: data.list[0].weather
    };
    
    let days = {};
    let forecast = [];
    
    // list of all available weather data returned from the API (3 hour intervals)
    for (let weatherDataItem of data.list) {
        let dateTime = new Date( moment.utc(weatherDataItem.dt_txt).local().format(DATE_FORMAT) );
        
        if (days[dateTime.getDate()] === undefined) days[dateTime.getDate()] = {};
        
        days[dateTime.getDate()][dateTime.getHours()] = weatherDataItem;
    }
    
    for (let date in days) {
        let day = {};
        
        for (let hour in days[date]) {
            if (day.date === undefined) {
                let dateObj = new Date( moment.utc(days[date][hour].dt_txt).local().format(DATE_FORMAT) );
                day["date"] = {
                    day: dateObj.getDay(),
                    date: dateObj.getDate(),
                    month: dateObj.getMonth()
                };
            }

            const minTempNotSet = day.temp_min === undefined;
            const maxTempNotSet = day.temp_max === undefined;
            const descriptionNotSet = day.short_description === undefined;

            const minimumTempForCurrentHour = days[date][hour].main.temp_min;
            const maximumTempForCurrentHour = days[date][hour].main.temp_max;

            const currentHourHasLowerTempThanMin = day.temp_min > minimumTempForCurrentHour;
            const currentHourHasHigherTempThanMax = day.temp_max < maximumTempForCurrentHour;

            if (minTempNotSet || currentHourHasLowerTempThanMin) day["temp_min"] = minimumTempForCurrentHour;
            if (maxTempNotSet || currentHourHasHigherTempThanMax) day["temp_max"] = maximumTempForCurrentHour;
            // TODO add priority list for escalating conditions, e.g. snow trumps rain, rain trumps clouds, etc
            if (descriptionNotSet) day["short_description"] = days[date][hour].weather[0].main;
        }
        
        forecast.push(day);
    }
    
    return {
        weatherData,
        forecast,
        ready: true
    };
}

export const useWeatherData = (location) => {
    const [data, setData] = useState({
        weatherData: {
            city : {},
            currentWeather : {},
            currentMain : {},
            currentTime : ''
        },
        forecast: [],
        ready : false
    });
    
    useEffect(() => {
        const fetchBody = {
            type: location.type,
            [location.type]: location.location
        };
        
        const fetchWeatherData = async () => {
            const response = await fetch(
                API_URL,
                {
                    method: 'POST',
                    body: JSON.stringify(fetchBody)
                }
            );
                
            const jsonResponse = await response.json();
            const weatherData = parseWeatherDataResponse(jsonResponse.data);
            
            setData(weatherData);
        }
            
        fetchWeatherData();
    }, [location.type, location.location]);
        
        return data;
    }