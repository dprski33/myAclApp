import { Get, Path, Route, Tags } from 'tsoa';
import UserService from '../services/user.service';
import RedisService from '../services/redis.service'

@Route("users")
@Tags("User")
export default class UserController {

    @Get("/")
    public async getUsers() {
        console.log("in user.controller/getUsers");
        return await RedisService.checkCache('users')
            .then( async function(cachedUsers) {

                //return the redis cache if found
                if(!!cachedUsers) {
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
                        console.log(`users found: ${users[0].name}`);
                        let cacheSuccessful = RedisService.cacheInRedis('users', users);
                        if(!!cacheSuccessful) {
                            console.log(`users cached successfully: ${cacheSuccessful}`);
                        }
                        return users;
                    });
            });
        };

        

    @Get("/:id")
    public async getUser(@Path() id: string) {
        console.log(`in user.controller/getUser(id=${id})`);
        return UserService.readById(Number(id));
    }
}