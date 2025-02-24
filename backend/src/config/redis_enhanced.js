/**
 * Enhanced Redis configuration and connection management
 * This module provides Redis connectivity for caching, session store, and queue system
 * with improved logging and monitoring capabilities
 */

const Redis = require('ioredis');
const { promisify } = require('util');

// Redis client configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
};

// Create Redis client instance
const redis = new Redis(redisConfig);

// Enhanced logging function
const log = (operation, details) => {
  console.log(`[Redis ${operation}]`, JSON.stringify(details));
};

// Cache configuration
const cache = {
  async set(key, value, expireTime = 3600) {
    const result = await redis.set(key, JSON.stringify(value), 'EX', expireTime);
    log('Cache Set', { key, expireTime, success: result === 'OK' });
    return result;
  },
  async get(key) {
    const value = await redis.get(key);
    log('Cache Get', { key, found: value !== null });
    return value ? JSON.parse(value) : null;
  },
  async del(key) {
    const result = await redis.del(key);
    log('Cache Delete', { key, deletedCount: result });
    return result;
  }
};

// Session store configuration
const sessionStore = {
  async saveSession(sessionId, data, expireTime = 86400) {
    const result = await redis.set(`session:${sessionId}`, JSON.stringify(data), 'EX', expireTime);
    log('Session Save', { sessionId, expireTime, success: result === 'OK' });
    return result;
  },
  async getSession(sessionId) {
    const session = await redis.get(`session:${sessionId}`);
    log('Session Get', { sessionId, found: session !== null });
    return session ? JSON.parse(session) : null;
  },
  async deleteSession(sessionId) {
    const result = await redis.del(`session:${sessionId}`);
    log('Session Delete', { sessionId, success: result === 1 });
    return result;
  }
};

// Queue system configuration
const queue = {
  async addToQueue(queueName, data) {
    const result = await redis.rpush(`queue:${queueName}`, JSON.stringify(data));
    log('Queue Add', { queueName, newLength: result });
    return result;
  },
  async processQueue(queueName) {
    const item = await redis.lpop(`queue:${queueName}`);
    log('Queue Process', { queueName, itemProcessed: item !== null });
    return item ? JSON.parse(item) : null;
  },
  async getQueueLength(queueName) {
    const length = await redis.llen(`queue:${queueName}`);
    log('Queue Length', { queueName, length });
    return length;
  }
};

// Monitoring function
const getRedisStats = async () => {
  const info = await redis.info();
  const stats = {
    connectedClients: info.connected_clients,
    usedMemory: info.used_memory_human,
    totalKeys: info.total_keys,
    lastSave: new Date(info.last_save_time * 1000).toISOString()
  };
  log('Stats', stats);
  return stats;
};

// Event handlers
redis.on('connect', () => {
  console.log('Successfully connected to Redis');
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});

module.exports = {
  redis,
  cache,
  sessionStore,
  queue,
  getRedisStats
};
