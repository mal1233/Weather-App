function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p className="text-center text-red-500 mt-4">
      {message}
    </p>
  );
}

export default ErrorMessage;