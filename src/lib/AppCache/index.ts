import redisClient from "../../configs/database/redis.database";
import { AppKeys } from "./keys";

class AppCache {
    private static appKey = "API_POING:";
    private static EXPIRATION_TIME = 120;

    private static createReference(cacheId: string) {
        return `${this.appKey}${cacheId}`;
    }

    public static createKey(key: keyof typeof AppKeys, appendInfo?: string) {
        if (appendInfo)
            return `${AppKeys[key]}${appendInfo}`;
        else
            return AppKeys[key];
    }

    static async get(cacheId: string) {
        const reference = this.createReference(cacheId);
        const data = await redisClient.get(reference);
        if (data)
            return JSON.parse(data);
    }

    static save(cacheId: string, data: Object) {
        const reference = this.createReference(cacheId);
        redisClient.setEx(reference, this.EXPIRATION_TIME, JSON.stringify(data));
    }

    static async saveAndGetData<R = any>(cacheId: string, callback: () => Promise<R>, options?: { expirationTime?: number }): Promise<R> {
        try {
            const reference = this.createReference(cacheId);
            const cachedData = await redisClient.get(reference);
            if (cachedData) {
                return JSON.parse(cachedData);
            } else {
                const data = await callback();
                redisClient.setEx(reference, options?.expirationTime ?? this.EXPIRATION_TIME, JSON.stringify(data));
                return data;
            }
        } catch (error) {
            throw error;
        }
    }

    static async updateData<R extends { [key: string]: any }>(cachedId: string, data: R) {
        try {
            const reference = this.createReference(cachedId);
            this.save(reference, data);
        } catch (error) {
            throw error;
        }
    }
}

export default AppCache;