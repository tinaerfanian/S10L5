import React, { useState } from 'react';
import './WeatherComp.css'; // Importa il file CSS

import sunny_day from './../foto/clear.png';
import cloudy_day from './../foto/cloud.png';
import drizzle_day from './../foto/drizzle.png';
import rainy_day from './../foto/rain.png';
import snowy_day from './../foto/snow.png';
import earth_icon from './../foto/earth2.png'; // Icona della Terra (immagine iniziale)

const WeatherComp = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(earth_icon); // Stato per l'icona (inizialmente la Terra)

  const allIcons = {
    "01d": sunny_day,
    "01n": sunny_day,
    "02d": cloudy_day,
    "02n": cloudy_day,
    "03d": cloudy_day,
    "03n": cloudy_day,
    "04d": drizzle_day,
    "04n": drizzle_day,
    "09d": rainy_day,
    "09n": rainy_day,
    "10d": rainy_day,
    "10n": rainy_day,
    "13d": snowy_day,
    "13n": snowy_day,
  };

  const searchPressed = async () => {
    if (!search) return;
    const API_KEY = '877bb5daed980adf8c9b973569478745';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        const weatherIcon = allIcons[data.weather[0].icon] || earth_icon;
        setWeather({
          location: data.name,
          temperature: Math.floor(data.main.temp),
          description: data.weather[0].description,
        });
        setIcon(weatherIcon); // Aggiorna l'icona con quella del meteo
      } else {
        alert('City not found');
      }
    } catch (error) {
      alert('An error occurred while fetching the weather');
    }
  };

  return (
    <div className="weatherComp-container">
      {/* Icona del meteo o immagine iniziale */}
      <img className="weather-icon" src={icon} alt="Weather Icon" />

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city/town..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button onClick={searchPressed}>Search</button>
      </div>

      {/* Weather Display */}
      {weather ? (
        <div className="weather-info">
          <h2 className="weather-location">{weather.location}</h2>
          <p className="weather-temperature">{weather.temperature}°C</p>
          <p className="weather-description">{weather.description}</p>
        </div>
      ) : (
        <p className="enter">Enter a city to see the weather!</p>
      )}
    </div>
  );
};

export default WeatherComp;
