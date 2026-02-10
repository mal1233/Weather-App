function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-3 text-gray-500 text-sm">Loading weather...</p>
    </div>
  );
}

export default LoadingSpinner;