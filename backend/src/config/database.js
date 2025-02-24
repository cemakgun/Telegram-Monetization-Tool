/**
 * Database configuration and connection management
 * This module provides database connectivity using Prisma Client
 * and includes functions to test and manage database connections
 */

const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client instance for database operations
const prisma = new PrismaClient();

/**
 * Tests the database connection
 * Attempts to connect to the database and verifies connectivity
 * 
 * @returns {Promise<boolean>} Returns true if connection is successful, false otherwise
 */
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to PostgreSQL database');
    return true;
  } catch (error) {
    console.error('Failed to connect to PostgreSQL database:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  prisma,
  testConnection
};
