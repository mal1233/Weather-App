function ForecastCard({ date, max, min, code }) {
  const getEmoji = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 99) return "⛈️";
    return "🌈";
  };

  return (
    <div className="bg-blue-50 rounded-lg p-3 text-center shadow-sm">
      <p className="text-sm font-medium">
        {new Date(date).toLocaleDateString(undefined, {
          weekday: "short",
        })}
      </p>

      <div className="text-2xl my-1">{getEmoji(code)}</div>

      <p className="text-sm text-gray-700">
        {Math.round(max)}° / {Math.round(min)}°
      </p>
    </div>
  );
}

export default ForecastCard;