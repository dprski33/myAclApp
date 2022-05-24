import { FindManyOptions } from "typeorm";
import { appDataSource } from '../index';
import { User } from '../models/user.model';

export interface IUserCreatePayload {
    name: string,
    email: string
}

export interface IUserUpdatePayload {
    id: number,
    name: string,
    email: string
}

export interface IUserPayload {
    id: number,
    name: string,
    email: string,
    dateCreated: Date,
    lastUpdated: Date
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
    const user = await userRepository.findOne({ 
        where: { id: id } 
    });
    if(!user) return null;
    return user;
};

export const createUser = async (payload: IUserCreatePayload): Promise<User | null> => {
    console.log(`in user repository creating user email=${payload.email}`);
    const user = new User();
    return userRepository.save({
      ...user,
      ...payload,
    });
}
export const updateUser = async(id: number, payload: IUserUpdatePayload): Promise<User | null> => {
    const user = getUser(id);
    if(!user) return null;
    userRepository.update(id, payload);
    return getUser(id);
}

export const getUserByEmail = async(email: string): Promise<User | null> => {
    console.log(`in user repository finding user email=${email}`);
    const user = await userRepository.findOne({ 
        where: { email: email } 
    });
    if(!user) return null;
    return user;
}