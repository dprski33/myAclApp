import { FindManyOptions, FindOptionsWhere } from "typeorm";
import { appDataSource } from '../index';
import { UserRole } from "../models/userRole.model";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { IRolePayload } from './role.repository';

const userRoleRepository = appDataSource.manager.getRepository(UserRole);
const userRepository = appDataSource.manager.getRepository(User);

export interface IUserRolePayload {
    roles: [IRolePayload]
}

export const getUserRoles = async (id: number): Promise<Array<UserRole> | null> => {
    console.log(`in userRole repository looking up roles for user id=${id}`);
    
    /* looks like this cannot take relations? */
    // const user = await userRepository.findOneBy({ id: id });

    const user = await userRepository.findOne({
        where: {id: id},
        relations: {
            roles: true
        }
    });

    /* why the fuck can I not do this */
    // const roles = userRoleRepository.findBy({ user: user });

    if(!user) return null; /* should probably throw an exception here since we should not get this far without a valid user */
    if(!user.roles) return null;

    /* this didn't work to gather the role names, boo */
    // var returnRoles = new Array();
    // user.roles.forEach(function(it) {
    //     console.log(`Adding role ${it.role.name} to the return array`);
    //     returnRoles.push(it.role.name);
    // })
    // console.log(`Got userRoles=${returnRoles}`);

    return user?.roles || null;

};