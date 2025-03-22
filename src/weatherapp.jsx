import React, { useState } from "react";
import 'weather-icons/css/weather-icons.min.css'; // Import weather icons CSS

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  // Mock data for different cities, including weather icons
  const mockData = {
    "new york": {
      name: "New York",
      sys: { country: "US" },
      weather: [{ description: "Clear sky", icon: "wi-day-sunny" }],
      main: { temp: 25, humidity: 60 },
      wind: { speed: 5 },
    },
    "los angeles": {
      name: "Los Angeles",
      sys: { country: "US" },
      weather: [{ description: "Sunny", icon: "wi-day-sunny" }],
      main: { temp: 28, humidity: 55 },
      wind: { speed: 3 },
    },
    "london": {
      name: "London",
      sys: { country: "GB" },
      weather: [{ description: "Overcast clouds", icon: "wi-cloud" }],
      main: { temp: 15, humidity: 70 },
      wind: { speed: 7 },
    },
    "paris": {
      name: "Paris",
      sys: { country: "FR" },
      weather: [{ description: "Light rain", icon: "wi-day-rain" }],
      main: { temp: 18, humidity: 80 },
      wind: { speed: 6 },
    },
    "tokyo": {
      name: "Tokyo",
      sys: { country: "JP" },
      weather: [{ description: "Clear sky", icon: "wi-day-sunny" }],
      main: { temp: 22, humidity: 65 },
      wind: { speed: 4 },
    },
    "sydney": {
      name: "Sydney",
      sys: { country: "AU" },
      weather: [{ description: "Cloudy", icon: "wi-cloudy" }],
      main: { temp: 20, humidity: 75 },
      wind: { speed: 8 },
    },
    "mumbai": {
      name: "Mumbai",
      sys: { country: "IN" },
      weather: [{ description: "Haze", icon: "wi-fog" }],
      main: { temp: 30, humidity: 85 },
      wind: { speed: 3 },
    },
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);

    // Clear weather data if the city input is empty
    if (!newCity) {
      setWeatherData(null); // Clear the weather data when input is empty
    }
  };

  const handleSearch = () => {
    if (!city) return;

    const lowerCaseCity = city.toLowerCase();

    // Check if the entered city exists in the mock data
    if (mockData[lowerCaseCity]) {
      setWeatherData(mockData[lowerCaseCity]);
      setError("");
    } else {
      setError("City not found, please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app flex flex-col items-center p-6">
      <h1 className="text-center text-2xl mb-6">Weather App</h1>
      <div className="flex justify-center gap-2">
        {/* Search Input */}
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Trigger search when Enter is pressed
            }
          }}
          style={{
            width: "400px", // Explicit width for clarity
            padding: "15px", // Match the padding with the button
            borderRadius: "9999px", // Fully rounded corners
            border: "1px solid #ccc", // Light border
            fontSize: "16px", // Font size
            outline: "none",
            boxShadow: "0 0 5px rgba(0, 0, 255, 0.3)", // Blue focus shadow
          }}
          placeholder="Enter city"
        />
        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            padding: "15px 30px", // Match input padding
            backgroundColor: "#3498db", // Blue background
            color: "white",
            borderRadius: "9999px", // Fully rounded corners
            fontSize: "16px", // Font size
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
        >
          Search
        </button>
      </div>

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {weatherData && (
        <div className="weather-info mt-4 text-center">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="flex justify-center items-center gap-2">
            {/* Weather icon */}
            <i className={`wi ${weatherData.weather[0].icon} text-4xl`}></i>
            <p>{weatherData.weather[0].description}</p>
          </div>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
