import { FindManyOptions } from "typeorm";
import { appDataSource } from '../index';
import { User } from '../models/user.model';

export interface IUserCreatePayload {
    name: string,
    email: string
}

export interface IUserUpdatePayload {
    name: string,
    email: string
}

export interface IUserPayload {
    id: number,
    name: string,
    email: string,
    dateCreated: Date,
    lastUpdated: Date,
}

const userRepository = appDataSource.manager.getRepository(User);

export const getUsers = async (limit?: number, offset?: number): Promise<Array<User> | null> => {
    console.log(`in user repository looking for users with limit=${limit} and offset=${offset}`);

    const where: FindManyOptions<User>[] | FindManyOptions<User> = {};

    if(limit) where.take = limit;
    if(offset) where.skip = offset;

    const users = userRepository.find(where);

    if(!users) return null;
    return users;
};

export const getUser = async (id: number): Promise<User | null> => {
    console.log(`in user repository looking for user id=${id}`);
    return await userRepository.findOne({ 
        where: { id: id }, 
    });
    
};

export const createUser = async (payload: IUserCreatePayload): Promise<User | null> => {
    console.log(`in user repository creating user email=${payload.email}`);
    const user = new User();
    return await userRepository.save({
      ...user,
      ...payload,
    });
}

export const updateUser = async(id: number, payload: IUserUpdatePayload): Promise<User | null> => {
    console.log(`in user repository updating user email=${payload.email}`);
    const user = getUser(id);
    if(!user) return null;
    await userRepository.update(id, {
        ...user,
        ...payload
    });
    return await getUser(id) as User;
}

export const getUserByEmail = async(email: string): Promise<User | null> => {
    console.log(`in user repository finding user email=${email}`);
    return await userRepository.findOne({ 
        where: { email: email } 
    });
    // if(!user) return null;
    // return user as User;
}