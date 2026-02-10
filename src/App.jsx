import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const data = await response.json();

    if (data.results?.length) {
      setLocation(data.results[0]);
      localStorage.setItem("lastCity", data.results[0].name);
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  useEffect(() => {
    if (!location) return;

    async function fetchWeather() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}
&current=temperature_2m,wind_speed_10m,relative_humidity_2m
&daily=temperature_2m_max,temperature_2m_min,weather_code
&timezone=auto`);

        if (!response.ok) throw new Error("Failed to fetch weather");

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Weather App
        </h1>

        <SearchForm
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
        />

        {isLoading && <LoadingSpinner />}
        <ErrorMessage message={error} />

        {weather && !isLoading && !error && (
          <WeatherCard weather={weather} location={location} />
        )}
      </div>
    </div>
  );
}

export default App;