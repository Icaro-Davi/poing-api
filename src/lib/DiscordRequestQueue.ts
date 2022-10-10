import { randomUUID } from 'node:crypto';
import env from '../configs/env.config';

class Queue {
    private delay = 1000;
    private poolSize = 1;
    private waitersAvailable = this.poolSize;
    private waitersQueue: string[] = [];
    private waiters = new Map();
    private waiterCanDelivery = true;
    private resetReference: NodeJS.Timeout | undefined;

    constructor(options: { delay: number, poolSize: number }) {
        this.delay = options.delay;
        this.poolSize = options.poolSize;
        this.waitersAvailable = options.poolSize;
    }

    private prepareNextWaiter() {
        clearTimeout(this.resetReference);
        if (this.waitersAvailable) {
            this.resetReference = setTimeout(() => {
                this.waitersAvailable = this.poolSize;
            }, this.delay);
        } else {
            this.waiterCanDelivery = false;
            setTimeout(() => {
                this.waitersAvailable = this.poolSize;
                if (this.waitersQueue.length) {
                    this.verifyAndDeliveryWaiter();
                } else {
                    this.waiterCanDelivery = true;
                }
            }, this.delay);
        }
    }

    private verifyAndDeliveryWaiter() {
        const poolOfWaiters = this.waitersQueue.splice(0, this.waitersAvailable);
        this.waitersAvailable = this.waitersAvailable - poolOfWaiters.length;
        poolOfWaiters.forEach(waiterId => {
            const waiter = this.waiters.get(waiterId);
            waiter();
        });
        this.prepareNextWaiter();
    }

    private queueWaiter(waiterId: string) {
        this.waitersQueue.push(waiterId);
        this.waiterCanDelivery && this.verifyAndDeliveryWaiter();
    }

    private createWaiter(waiterId: string, callback: () => Promise<any>) {
        return new Promise(async (resolve, reject) => {
            this.waiters.set(waiterId, () => {
                callback().then(resolve).catch(reject);
                this.waiters.delete(waiterId);
            });
            this.queueWaiter(waiterId);
        });
    }

    public async wait<R = any>(callback: () => Promise<R>) {
        const waiterId = randomUUID();
        const data = await this.createWaiter(waiterId, callback);
        return data as R;
    }

}

export default new Queue(env.discord.queueRequest);