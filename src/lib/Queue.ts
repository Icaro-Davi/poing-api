import Queue from 'bull';
import configs from '../configs/env.config';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, { redis: configs.db.REDIS }),
    name: job.key,
    handle: job.handle
}));

export default {
    queues,
    add(name: string, data: any) {
        const queue = this.queues.find(queue => queue.name === name);
        return queue?.bull.add(data);
    },
    process(){
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);
        });
    }
}