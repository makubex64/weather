import { WeatherLocation } from "../model/Weather";
import { Weather } from "../model/Weather";
import axios from 'axios';

//const key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;
const key: string = "4f06fa7a22d3e454f15cbf4a0587e5f6";
if (key === undefined) {
  throw new Error('No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY')
}

const keyQuery = `appid=${key}`
const server = 'https://api.openweathermap.org/data/2.5';

export async function searchLocation(term: string): Promise<WeatherLocation | undefined> {
  const result = await axios.get(`${server}/weather?q=${term}&${keyQuery}`);

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error('Failed to read location data');

  return result.data;
}

export async function readWeather(locationId: number): Promise<Weather> {
    const current = await axios.get(`${server}/weather?id=${locationId}&${keyQuery}&units=metric`);

    if (current.status !== 200) throw new Error('Failed to read location data');

    return current.data;
}

export function getIconUrl(code: string): string {
  return `https://openweathermap.org/img/wn/${code}.png`;
}

export async function readForecast(locationId: number): Promise<Weather[]> {
  const forecast = await axios.get(`${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`);
  
  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return forecast.data;
}
