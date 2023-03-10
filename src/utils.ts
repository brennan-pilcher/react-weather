import { TemperatureScale } from "./contants";

export const formatDescription = (description: string) => {
    return description.charAt(0).toUpperCase() + description.slice(1) + ".";
}

export const formatTemp = (tempInKelvin: number, scale: TemperatureScale ) => {
    if (scale === 'F') {
        return (tempInKelvin * 1.8 - 459.67).toFixed() + " °F";
    }
    else if (scale === 'C') {
        return (tempInKelvin - 273.15).toFixed() + " °C";
    }
    else {
        return tempInKelvin.toFixed() + " °K";
    }
}