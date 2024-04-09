import { useState, useEffect } from 'react';

import './WeatherInfo.css';

function WeatherInfo() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = (lat, lon) => {
      const apiKey = '';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          setWeather(data);
        })
        .catch(error => console.error('Failed to fetch weather data:', error));
    };

    const getPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    getPosition()
      .then(position => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch(error => {
        console.error('Failed to get user position:', error);
      });
  }, []);

  if (!weather) return <div className='loading'>Loading...</div>;

  return (
    <div className='weather'>
      {weather && (
        <>
          <p>{weather.name}</p>
          <div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='Weather icon' />
            <p>{Math.round(weather.main.temp)}°C</p>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherInfo;
