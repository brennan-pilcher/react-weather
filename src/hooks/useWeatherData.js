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

  // list of all available weather data returned from the API (3 hour intervals)
  for (let elem of data.list) {
      let now = new Date( moment.utc(elem.dt_txt).local().format(DATE_FORMAT) );

      if (days[now.getDate()] === undefined) {
          days[now.getDate()] = {};
      }

      days[now.getDate()][now.getHours()] = elem;
  }

  let forecast = [];


  // loop through all available days and construct a day object for each one with info relevant to the day's forecast
  for (let date in days) {
      let day = {};

      for(let hour in days[date]) {

          // set the date object within the current day
          if (day.date === undefined) {
              let dateObj = new Date( moment.utc(days[date][hour].dt_txt).local().format(DATE_FORMAT) );
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

      forecast.push(day);

  }

  return {
    weatherData,
    forecast,
    ready: true
  };
}

export const useWeatherData = (location) => {
  console.log("(hook) location: ", location)
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
      console.log("weather data!", weatherData)

      setData(weatherData);
    }

    fetchWeatherData();
  }, [location.type, location.location]);

  return data;
}