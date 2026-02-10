import ForecastCard from "./ForecastCard";

function WeatherCard({ weather, location }) {
  const {
    time,
    temperature_2m_max,
    temperature_2m_min,
    weather_code,
  } = weather.daily;

  return (
    <div className="mt-6">
      {/* Current City */}
      {location && (
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          📍 {location.name}, {location.country}
        </h2>
      )}

      {/* Current Weather */}
      <div className="text-center mb-6">
        <p className="text-4xl font-bold">
          🌡 {weather.current.temperature_2m}
          {weather.current_units.temperature_2m}
        </p>
        <p className="text-gray-600 mt-1">
          💨 {weather.current.wind_speed_10m} km/h · 💧{" "}
          {weather.current.relative_humidity_2m}%
        </p>
      </div>

      {/* 7 Day Forecast */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {time.slice(0, 7).map((date, index) => (
          <ForecastCard
            key={date}
            date={date}
            max={temperature_2m_max[index]}
            min={temperature_2m_min[index]}
            code={weather_code[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;