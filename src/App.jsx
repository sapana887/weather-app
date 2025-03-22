import React, { useState } from "react";
import './App.css'
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock weather data
  const mockWeatherData = {
    name: "London",
    sys: { country: "GB", sunrise: 1742364321, sunset: 1742407869 },
    weather: [{ description: "Few clouds", icon: "02d" }],
    main: {
      temp: 11.83,
      feels_like: 10.61,
      temp_min: 9.98,
      temp_max: 12.88,
      humidity: 59,
    },
    wind: { speed: 1.34 },
    clouds: { all: 13 },
    visibility: 10000,
  };

  const fetchWeatherData = async () => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      setWeatherData(mockWeatherData); // Use mock data
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Weather App</h1>

      {/* Input and Button in Center */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-4 py-2 rounded-lg w-60"
        />
        <button
          onClick={fetchWeatherData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weatherData && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-2xl font-semibold">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="text-gray-600">{weatherData.weather[0].description}</p>
          <p className="text-lg font-medium">🌡 Temperature: {weatherData.main.temp}°C</p>
          <p>Feels Like: {weatherData.main.feels_like}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Cloud Coverage: {weatherData.clouds.all}%</p>
          <p>Visibility: {weatherData.visibility / 1000} km</p>
          <p className="text-sm text-gray-500">
            🌅 Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} | 
            🌇 Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
