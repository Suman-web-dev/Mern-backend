const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// • Load environment variables from .env file
dotenv.config();

// • Connect to MongoDB database
connectDB();

// • Create Express application
const app = express();

// • Middleware to parse incoming JSON data
// • Allows reading JSON from request bodies
app.use(express.json());

// • Middleware to parse URL-encoded data
// • Handles traditional form data
app.use(express.urlencoded({ extended: true }));

// • Enable CORS (Cross-Origin Resource Sharing)
// • Allows frontend to make requests to backend
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// • Serve static files from uploads directory
// • Allows accessing uploaded files via URL
app.use('/uploads', express.static('uploads'));

// • API routes
// • All submission routes under /api/submission
app.use('/api/submission', require('./routes/submission'));

// • Health check endpoint
// • Useful for monitoring server status
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// • Error handling middleware
// • Catches all errors, sends consistent response
app.use(errorHandler);

// • Get port from env or use 5000 default
const PORT = process.env.PORT || 5000;

// • Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// • Handle unhandled promise rejections
// • Prevents server crash on uncaught errors
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // • Close server gracefully and exit
  server.close(() => process.exit(1));
});
