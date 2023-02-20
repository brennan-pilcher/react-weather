import { FAHRENHEIT, CELSIUS } from "./contants";

export const formatDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1) + ".";
}

export const formatTemp = (temp, scale) => {
    if (scale == FAHRENHEIT) {
        return (temp * 1.8 - 459.67).toFixed() + " °F";
    }
    else if (scale == CELSIUS) {
        return (temp - 273.15).toFixed() + " °C";
    }
    else {
        return temp.toFixed() + " °K";
    }
}