import { Get, Path, Post, Route, Tags, Body } from 'tsoa';
import UserService from '../services/user.service';
import RedisService from '../services/redis.service';

@Route("users")
@Tags("User")
export default class UserController {

    @Get("/")
    public async getUsers() {
        console.log("in user.controller/getUsers");
        return await RedisService.checkCache('users')
            .then( async function(cachedUsers) {

                //return the redis cache if found
                if(cachedUsers) {
                    console.log(`cachedUsers: ${JSON.stringify(cachedUsers)}`);
                    return cachedUsers;
                }

                //call the service if not found
                console.log(`did not find users in redis Cache`);
                return UserService.list()
                    .then( function(resp) { 
                        console.log(`got back to user.controller/getUsers`);
                        return resp;
                    })

                    //cache the resp since it wasn't already in redis
                    .then(function(users) {
                        //on the off chance we have no users (yet)
                        if(!users) return null;

                        console.log(`users found: ${users[0]?.email}`);
                        return RedisService.cacheInRedis('users', users)
                            .then( async function(cacheSuccessful) {
                                if(!!cacheSuccessful) return users;

                                console.log(`users cached successfully: ${cacheSuccessful}`);
                                return users;
                            });
                    });
            });
    }
        

    @Get("/:id")
    public async getUser(@Path() id: string) {
        console.log(`in user.controller/getUser(id=${id})`);
        return await RedisService.checkCache(`user:${id}`)
            .then( async function(cachedUser) {

                //return the redis cache if found
                if(!!cachedUser) {
                    console.log(`cachedUser: ${JSON.stringify(cachedUser)}`);
                    return cachedUser;
                }
                //call the service if not found
                console.log(`did not find user id=${id} in redis Cache`);
                return UserService.readById(Number(id))
                    .then( function(resp) { 
                        console.log(`got back to user.controller/getUser`);
                        return resp;
                    })
                    //cache the resp since it wasn't already in redis
                    .then(function(user) {
                        //in case the user id was not found
                        if(!user) return null;

                        console.log(`user found: ${user.id}`);
                        return RedisService.cacheInRedis(`user:${user.id}`, user)
                            .then( async function(cacheSuccessful) {
                                if(!!cacheSuccessful) return user;

                                console.log(`user id=${user.id} cached successfully: ${cacheSuccessful}`);
                                return user;
                            });
                    });
                })
    }

    @Post("/")
    public async createUser(@Body() body: any) {
        console.log(`in user.controller/post with body=${body}`);
        return UserService.create(body)
            .then(function(user) {
                if(user) {
                    console.log(`Clearing cache since we added a new user id=${user.id}`);
                    RedisService.deleteRedisKey('users');
                }
                return user;
            });
    }
}