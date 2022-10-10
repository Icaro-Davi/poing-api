import { createClient } from 'redis';
import env from '../env.config';

const redisClient = createClient({ url: env.db.REDIS_URI });

redisClient.on('error', (err) => {
    console.error('[APP] Error on redis');
    console.error(err);
    process.exit(1);
});

redisClient.on('ready', () => {
    console.log('[APP] Connected to redis');
});

export default redisClient;