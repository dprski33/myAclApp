import { redisClientAvailable, redisClient } from "../index";

class RedisService {
    async checkCache(key: string) {
        if(!redisClientAvailable) {
            console.log(`cannot check ${key} cache because redisClientAvailable=${redisClientAvailable}`);
            return null;
        }
        if(redisClientAvailable && redisClient) {
            console.log(`Looking for redis key: ${key}`);
            const redisObj = await redisClient.get(key);
            console.log(`redisObj: ${redisObj}`);
            if(redisObj?.length == 0)  {
                console.log(`Did not find redis cache key ${key}`);
                return null;
            }
            console.log(`Found redis cached ${key}: ${redisObj}`);
            return redisObj;
        }
    }

    async cacheInRedis(type: string, thing: any) {
        if(!redisClientAvailable) {
            console.log(`cannot cache '${type}' because redisClientAvailable=${redisClientAvailable}`);
            return null;
        }
        if(redisClientAvailable && redisClient) {
            console.log(`attempting to cache response since redisClientAvailable: ${redisClientAvailable}`);
            if(!!thing) {
                //cache the response in redis
                console.log(`Caching '${type}' data: ${thing.toString()}`);
                await redisClient.set(type, JSON.stringify(thing));
                return await redisClient.get(type);
            }
        }
    }
    async deleteRedisKey(key:string) {
        if(!redisClientAvailable) {
            console.log(`cannot delete key '${key}' because redisClientAvailable=${redisClientAvailable}`);
            return null;
        }
        console.log(`attempting to cache response since redisClientAvailable: ${redisClientAvailable}`);
        await redisClient.del(key);
    }
}

export default new RedisService();