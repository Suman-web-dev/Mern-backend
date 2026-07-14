// • Middleware handles all application errors
// • Catches errors from controllers, sends consistent error response
const errorHandler = (err, req, res, next) => {
  // • Create copy of error object
  let error = { ...err };
  error.message = err.message;

  // • Log error to console for debugging
  console.error(err);

  // • Handle Mongoose ObjectId errors (invalid ID)
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // • Handle Mongoose duplicate key errors (duplicate entry)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // • Handle Mongoose validation errors (missing/invalid fields)
  if (err.name === 'ValidationError') {
    // • Join all validation error messages into one string
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // • Send error response to client
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
