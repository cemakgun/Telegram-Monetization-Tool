/**
 * Redis configuration and connection management
 * This module provides Redis connectivity for caching, session store, and queue system
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

// Cache configuration
const cache = {
  async set(key, value, expireTime = 3600) {
    return await redis.set(key, JSON.stringify(value), 'EX', expireTime);
  },
  async get(key) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },
  async del(key) {
    return await redis.del(key);
  }
};

// Session store configuration
const sessionStore = {
  async saveSession(sessionId, data, expireTime = 86400) {
    return await redis.set(`session:${sessionId}`, JSON.stringify(data), 'EX', expireTime);
  },
  async getSession(sessionId) {
    const session = await redis.get(`session:${sessionId}`);
    return session ? JSON.parse(session) : null;
  },
  async deleteSession(sessionId) {
    return await redis.del(`session:${sessionId}`);
  }
};

// Queue system configuration
const queue = {
  async addToQueue(queueName, data) {
    return await redis.rpush(`queue:${queueName}`, JSON.stringify(data));
  },
  async processQueue(queueName) {
    const item = await redis.lpop(`queue:${queueName}`);
    return item ? JSON.parse(item) : null;
  },
  async getQueueLength(queueName) {
    return await redis.llen(`queue:${queueName}`);
  }
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
  queue
};
