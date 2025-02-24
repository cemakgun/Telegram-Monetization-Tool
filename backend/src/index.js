/**
 * Main server entry point
 * This file initializes the Express server, sets up middleware,
 * and configures routes for the application
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');

// Initialize Express application
const app = express();
const port = process.env.PORT || 3001;

// Middleware Configuration
// Enable CORS for cross-origin requests
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

/**
 * Health Check Endpoint
 * Used to verify that the server is running and responsive
 * Returns: { status: 'ok', timestamp: <current_time> }
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Server Startup Function
 * Performs necessary checks and initializations before starting the server:
 * 1. Tests database connectivity
 * 2. Starts the HTTP server if all checks pass
 */
async function startServer() {
  try {
    // Verify database connection before starting server
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Failed to connect to database. Server will not start.');
      process.exit(1);
    }

    // Start HTTP server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Initialize server
startServer();
