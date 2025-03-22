import React, { useState } from "react";
import axios from "axios";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    if (!city) return;
    
    const API_KEY = "your_api_key_here"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found, please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <h1 className="text-center text-2xl my-4">Weather App</h1>
      <div className="flex justify-center gap-2">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          className="border px-4 py-2"
          placeholder="Enter city"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {weatherData && (
        <div className="weather-info mt-4 text-center">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
