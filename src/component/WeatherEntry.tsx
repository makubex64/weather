import { FC } from "react";
import { Weather } from "../model/Weather";
import { getIconUrl } from "../services/WeatherService";

interface WeatherEntryProps {
  weather: Weather;
}

function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const WeatherEntry: FC<WeatherEntryProps> = ({ weather }) => {
  
  return (
    <div>
      <div>{convertUnixTimeToDate(weather.dt).toLocaleTimeString()}</div>
      <div>
        <strong>{weather.main.temp}°C</strong>
        <div>({weather.main.temp_min}°C / {weather.main.temp_max}°C)</div>
      </div>
      <div>Humidity: {weather.main.humidity}%</div>
      {weather.weather.map(condition =>
        <div className="bg-info" key={condition.id}>
          <img 
          src={getIconUrl(condition.icon)} alt={condition.main} 
          /> 
          {condition.main}
          {" "}
         {"("} {condition.description} {")"}
          
        </div>)
      }
    </div>
  )
}

  ; 