import { useEffect, useState } from "react";
import moment from "moment";
import { API_URL, DATE_FORMAT } from "../contants";
import { Location } from "../types";

interface WeatherDataResponseItemWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface WeatherDataResponseItemMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

interface WeatherDataResponseItem {
    dt: number;
    dt_txt: string;
    main: WeatherDataResponseItemMain;
    weather: WeatherDataResponseItemWeather[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    rain: {
        ['3h']: number;
    };
    snow: {
        ['3h']: number;
    };
    sys: {
        pod: string;
    };
}

interface WeatherDataResponseCity {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    }
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

interface WeatherDataResponse {
    city: WeatherDataResponseCity;
    list: WeatherDataResponseItem[];
}



interface WeatherByHour { // keyed by day
    [key: string]: WeatherDataResponseItem; // keyed by hour
}

interface WeatherByDay {
    [key: string]: WeatherByHour;
}

interface WeatherForecastDay {
    date: {
        day: number;
        date: number;
        month: number;
    }
    temp_min: number;
    temp_max: number;
    short_description: string;
}

interface WeatherData {
    city: WeatherDataResponseCity;
    currentTime: string;
    currentMain: WeatherDataResponseItemMain;
    currentWeather: WeatherDataResponseItemWeather[];
}

const isValidWeatherForecastDay = (day: Partial<WeatherForecastDay>): boolean => {
    return !!(
        day.date
        && day.date.date
        && day.date.day
        && day.date.month
        && day.temp_min
        && day.temp_max
        && day.short_description
    );
}


const parseWeatherDataResponse = (data: WeatherDataResponse): WeatherDataState => {
    let weatherData: WeatherData = {
        city: data.city,
        currentTime: data.list[0].dt_txt,
        currentMain: data.list[0].main,
        currentWeather: data.list[0].weather
    };
    
    let days: WeatherByDay = {};
    let forecast: WeatherForecastDay[] = [];
    
    // list of all available weather data returned from the API (3 hour intervals)
    for (let weatherDataItem of data.list) {
        let dateTime = new Date(moment.utc(weatherDataItem.dt_txt).local().format(DATE_FORMAT));
        
        if (days[dateTime.getDate()] === undefined) days[dateTime.getDate()] = {};
        
        days[dateTime.getDate()][dateTime.getHours()] = weatherDataItem;
    }
    
    for (let date in days) {
        let day: Partial<WeatherForecastDay> = {};
        
        for (let hour in days[date]) {
            if (day.date === undefined) {
                let dateObj = new Date( moment.utc(days[date][hour].dt_txt).local().format(DATE_FORMAT) );
                
                day.date = {
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

            const currentHourHasLowerTempThanMin = day.temp_min && day.temp_min > minimumTempForCurrentHour;
            const currentHourHasHigherTempThanMax = day.temp_max && day.temp_max < maximumTempForCurrentHour;

            if (minTempNotSet || currentHourHasLowerTempThanMin) day.temp_min = minimumTempForCurrentHour;
            if (maxTempNotSet || currentHourHasHigherTempThanMax) day.temp_max = maximumTempForCurrentHour;
            // TODO add priority list for escalating conditions, e.g. snow trumps rain, rain trumps clouds, etc
            if (descriptionNotSet) day["short_description"] = days[date][hour].weather[0].main;
        }

        if (isValidWeatherForecastDay(day)) forecast.push(day as WeatherForecastDay);
    }
    
    return {
        weatherData,
        forecast,
        ready: true
    };
}

export interface WeatherDataState {
    weatherData: WeatherData;
    forecast: WeatherForecastDay[];
    ready: boolean;
}

export const useWeatherData = (location: Location) => {
    const [data, setData] = useState<WeatherDataState>({
        weatherData: {
            city: {
                id: 0,
                name: '',
                coord: {
                    lat: 0,
                    lon: 0,
                },
                country: '',
                population: 0,
                timezone: 0,
                sunrise: 0,
                sunset: 0
            },
            currentWeather: [],
            currentMain: {
                temp: 0,
                feels_like: 0,
                temp_min: 0,
                temp_max: 0,
                pressure: 0,
                sea_level: 0,
                grnd_level: 0,
                humidity: 0,
                temp_kf: 0
            },
            currentTime: ''
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
            const data = parseWeatherDataResponse(jsonResponse.data);
            
            setData(data);
        }
            
        fetchWeatherData();
    }, [location.type, location.location]);
        
    return data;
}