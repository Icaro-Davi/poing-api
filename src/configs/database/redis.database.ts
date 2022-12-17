import { createClient } from 'redis';
import env from '../env.config';

const redisClient = createClient({ url: env.db.REDIS_URI });

let reconnectCount = 0;

redisClient.on('error', (err) => {
    console.error('[APP] Error on redis');
    console.error(err);
    if(reconnectCount > 29)
        process.exit(1);
    reconnectCount++;
});

redisClient.on('ready', () => {
    console.log('[APP] Connected to redis');
});

export default redisClient;