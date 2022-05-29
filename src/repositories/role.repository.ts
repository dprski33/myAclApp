import { appDataSource } from '../index';
import { Role } from '../models/role.model';

const roleRepository = appDataSource.manager.getRepository(Role);

export interface IRolePayload {
    id: number,
    name: string
}

export const getRoles = async (): Promise<Array<Role> | null > => {
    const roles = roleRepository.find();
    return roles;
}