import {useEffect, useState, FC} from 'react' 
import { WeatherLocation } from '../model/Weather';
import { Weather } from '../model/Weather';
import { readWeather } from '../services/WeatherService';
import { WeatherEntry } from './WeatherEntry';

interface WeatherSummaryProps {
    location: WeatherLocation | null;
  }
  
  export const WeatherSummary: FC<WeatherSummaryProps> = ({location}) => {
    console.log(location)
    const [weather, setWeather] = useState<Weather | null>(null); 
    console.log(weather)    
  
    useEffect(() => {
      if (location) {
        readWeather(location.id).then(weather => setWeather(weather));
      }
    }, [location]);

    if (!location || !weather) return null;

    return (
        <div>
          <hr/>
          <h2>{location.name}</h2>
          <WeatherEntry weather={weather}/>
        </div>
      );
    
  };

   