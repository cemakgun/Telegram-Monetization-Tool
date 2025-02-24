/**
 * Redis Configuration Test Script
 * This script tests the Redis configuration and all its features
 */

const { redis, cache, sessionStore, queue, getRedisStats } = require('../config/redis_config');

async function testRedisConfiguration() {
    try {
        // Test basic connection
        await redis.ping();
        console.log('✓ Redis connection successful');

        // Test cache operations
        await cache.set('test-key', { message: 'test value' });
        const cachedValue = await cache.get('test-key');
        console.log('✓ Cache operations working:', cachedValue);

        // Test session store
        await sessionStore.saveSession('test-session', { userId: '123' });
        const session = await sessionStore.getSession('test-session');
        console.log('✓ Session store working:', session);

        // Test queue system
        await queue.addToQueue('test-queue', { task: 'test task' });
        const queueLength = await queue.getQueueLength('test-queue');
        const queueItem = await queue.processQueue('test-queue');
        console.log('✓ Queue system working:', { queueLength, processedItem: queueItem });

        // Test monitoring
        const stats = await getRedisStats();
        console.log('✓ Redis monitoring working:', stats);

        console.log('\nAll Redis features are working correctly!');
    } catch (error) {
        console.error('Redis test failed:', error);
    } finally {
        // Clean up test data
        await redis.del('test-key');
        await redis.del('session:test-session');
        await redis.del('queue:test-queue');
        
        // Close Redis connection
        redis.disconnect();
    }
}

// Run the tests
console.log('Starting Redis configuration test...\n');
testRedisConfiguration();
