import { redisClientAvailable, redisClient } from "../index";

class RedisService {

    DEFAULT_TTL_VALUE = 60 * 60 * 2; //2 hours

    async checkCache(key: string) {
        if(!redisClientAvailable) {
            console.log(`cannot check ${key} cache because redisClientAvailable=${redisClientAvailable}`);
            return null;
        }
        if(redisClientAvailable && redisClient) {
            console.log(`Looking for redis key: ${key}`);
            const redisObj = await redisClient.get(key);
            console.log(`redisObj: ${redisObj}`);
            if(redisObj?.length === 0)  {
                console.log(`Did not find redis cache key ${key}`);
                return null;
            }
            console.log(`Found redis cached ${key}: ${redisObj}`);
            return redisObj;
        }
    }

    /*
        sets a cache key for `ttl` number of seconds
    */
    async cacheInRedis(key: string, thing: any, ttl?: number) {
        if(!redisClientAvailable) {
            console.log(`will not cache '${key}' because redisClientAvailable=${redisClientAvailable}`);
            return null;
        }
        if(redisClientAvailable && redisClient) {
            console.log(`attempting to cache ${key} response since redisClientAvailable: ${redisClientAvailable}`);
            if(!!thing) {

                const ttlToSet = ttl || this.DEFAULT_TTL_VALUE;
                
                //cache the response in redis
                console.log(`Caching '${key}' data: ${thing.toString()}`);
                
                await redisClient.set(key, JSON.stringify(thing), { 
                    EX: ttlToSet
                });

                const redisObj = await redisClient.get(key);
                if(redisObj?.length == 0)  {
                    console.log(`Did not proparly cache key ${key}`);
                    return null;
                }
                console.log(`Successfully cached ${key}: ${redisObj}`);
                return redisObj;
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