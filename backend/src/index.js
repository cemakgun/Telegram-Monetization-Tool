/**
 * Main server entry point
 * This file initializes the Express server, sets up middleware,
 * and configures routes for the application
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const userRoutes = require('./routes/user');
const telegramRoutes = require('./routes/telegram');
const requireAuth = require('./middleware/auth');

// Initialize Express application
const app = express();
const port = process.env.PORT || 3001;

// Middleware Configuration
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/telegram', telegramRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Protected route example
app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.auth });
});

async function startServer() {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Failed to connect to database. Server will not start.');
      process.exit(1);
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
