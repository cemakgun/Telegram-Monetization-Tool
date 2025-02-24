/**
 * Redis Configuration Bridge
 * This file imports the enhanced Redis configuration and exports it.
 * It allows for easy switching between configurations and maintains backwards compatibility.
 */

const enhancedRedisConfig = require('./redis_enhanced');

module.exports = enhancedRedisConfig;
