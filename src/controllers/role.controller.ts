import { Get, Route } from 'tsoa';
import RoleService from '../services/role.service';
import RedisService from '../services/redis.service';

const ONE_DAY_MS = 60 * 60 * 24; //1 day in milliseconds

@Route('roles')
export default class RoleController {

    @Get()
    public async getRoles() {

        /* check cache first */
        return await RedisService.checkCache('roles')
            .then( async function(cachedRoles) {
                if(cachedRoles) {
                    console.log(`cachedRoles: ${JSON.stringify(cachedRoles)}`);
                    return cachedRoles;
                }

                /* go to the DB if not cached */
                return RoleService.list()
                    .then( function(resp) {
                        return resp;
                    })
                    .then( function(roles) {
                        if(!roles || roles.length === 0) {
                            return roles;   
                        }

                        /* cache the resp now since it wasn't */
                        return RedisService.cacheInRedis('roles', roles, ONE_DAY_MS)
                            .then( async function(cacheSuccessful) {
                                if(cacheSuccessful?.length === 0) {
                                    console.log(`Did not cache roles successfully, boo`);
                                    return roles;
                                }
                                return roles;
                            })
                    })
                   
            });
    }
}