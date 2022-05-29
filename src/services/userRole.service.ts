import { MobilePhoneLocale } from 'express-validator/src/options';
import { User } from '../models';
import { IUserPayload } from '../repositories/user.repository';
import {
    getUserRoles
} from '../repositories/userRole.repository';
import UserService from './user.service';

class UserRoleService {
    async readByUserId(id: number) {
        console.log(`in userRole.service looking up user id=${id}`);
        return UserService.readById(Number(id))
            .then(function(user) { //: User | null {
                console.log(`Back in userRole.service`);
                console.log(`Found this user: ${JSON.stringify(user)}`);
                if(!user) return null;
                

                return getUserRoles(user.id)
                    .then((roles) => {
                        // console.log(`roles in userRole.repository:readByUserId: ${JSON.stringify(roles)}`)
                        // //do stuff
                        // roles?.forEach(function(it) {
                        //     console.log(it.role.name)
                        // });
                        return roles;

                    });
            });

    }

    // async readByUser(user: User) {
    //     return this.readByUserId(user.id)
    // }
}

export default new UserRoleService();