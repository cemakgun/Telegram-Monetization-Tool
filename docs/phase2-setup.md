# Phase 2: Infrastructure & Debug Setup Documentation

## Docker Configuration

All services are configured in `docker-compose.yml` and running properly:
- **PostgreSQL** (telegram_db): Running on port 5433
- **Redis** (telegram_redis): Running on port 6379
- **Backend** (telegram_backend): Running on port 3001
- **Frontend** (telegram_frontend): Running on port 3000

## Debug & Development Environment

### VS Code Tasks Configuration
Located in `.vscode/tasks.json`, providing:
- Start Development (npm run dev)
- Start Frontend (npm run dev:frontend)
- Start Backend (npm run dev:backend)
- Install Dependencies (npm run install:all)
- Docker Compose controls (up, down, logs)

### Terminal Integration
- **Consolidated Terminal Setup**: All tasks are grouped and organized in the VS Code terminal
- **Command Aliases**: Available through npm scripts in package.json
- **Logging Configuration**: Integrated with Docker and Redis logging

### Available NPM Scripts
```json
{
  "dev": "Runs both frontend and backend in development mode",
  "dev:frontend": "Runs Next.js frontend in development mode",
  "dev:backend": "Runs Node.js backend in development mode",
  "install:all": "Installs dependencies for all packages"
}
```

## Redis Setup

### Cache Configuration
```javascript
// Usage example:
const { cache } = require('./config/redis');

// Set cache
await cache.set('key', data, 3600); // expires in 1 hour

// Get cache
const data = await cache.get('key');

// Delete cache
await cache.del('key');
```

### Session Store
```javascript
// Usage example:
const { sessionStore } = require('./config/redis');

// Save session
await sessionStore.saveSession(sessionId, data, 86400); // expires in 24 hours

// Get session
const session = await sessionStore.getSession(sessionId);

// Delete session
await sessionStore.deleteSession(sessionId);
```

### Queue System
```javascript
// Usage example:
const { queue } = require('./config/redis');

// Add to queue
await queue.addToQueue('notifications', data);

// Process queue
const item = await queue.processQueue('notifications');

// Get queue length
const length = await queue.getQueueLength('notifications');
```

### Monitoring
```javascript
// Usage example:
const { getRedisStats } = require('./config/redis');

// Get Redis statistics
const stats = await getRedisStats();
// Returns:
// {
//   connectedClients: number,
//   usedMemory: string,
//   totalKeys: number,
//   lastSave: string (ISO date)
// }
```

### Logging
The enhanced Redis configuration includes detailed logging for all operations:
```javascript
// Example log output:
[Redis Cache Set] {"key": "user:123", "expireTime": 3600, "success": true}
[Redis Session Get] {"sessionId": "sess:456", "found": true}
[Redis Queue Add] {"queueName": "notifications", "newLength": 5}
```

## Error Handling
Redis connection errors are automatically logged:
```javascript
redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});
```

## Best Practices
1. Always use the provided Redis utilities (cache, sessionStore, queue) instead of direct Redis commands
2. Monitor Redis stats periodically to ensure optimal performance
3. Check logs for any operation failures or connection issues
4. Use appropriate expiration times for cached data and sessions
5. Process queues regularly to prevent backlog

## Development Workflow
1. Start the infrastructure:
   ```bash
   # Using VS Code task or
   docker-compose up -d
   ```

2. Start development servers:
   ```bash
   # Using VS Code task or
   npm run dev
   ```

3. Monitor logs:
   ```bash
   # Using VS Code task or
   docker-compose logs -f
   ```

## Troubleshooting
1. If Redis connection fails:
   - Check if Redis container is running
   - Verify Redis connection settings in .env
   - Check Redis logs for errors

2. If sessions are not persisting:
   - Verify session expiration times
   - Check Redis connection
   - Monitor Redis memory usage

3. If queues are not processing:
   - Check queue length using getQueueLength
   - Verify queue consumer is running
   - Check for processing errors in logs
