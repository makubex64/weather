import { useState } from 'react'
import { LocationSearch } from './component/LocationSearch'
import { LocationTable } from './component/LocationTable';
import { WeatherLocation } from './model/Weather'
import { searchLocation } from './services/WeatherService';
import { WeatherSummary } from './component/WeatherSummary';

import './App.css'

const App: React.FC = () => {
  //const [locations, setLocations] = useState<string[]>([]);

  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const resetAlerts = () => {
    setError('');
    setWarning('');
  }

  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`No location found called '${term}'`);
    } else if (locations.find(item => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Weather App</h1>

        <LocationSearch onSearch={addLocation} />
        {
          error
            ? <div className={`alert alert-danger`}>{error}</div>
            : null
        }
        {
          warning
            ? <div className={`alert alert-warning`}>{warning}</div>
            : null
        }
        <LocationTable
          onSelect={location => setCurrentLocation(location)}
          current={currentLocation}
          locations={locations}
        />

        <WeatherSummary location={currentLocation} />

      </div>

    </>
  )
}

export default App
