import { appDataSource } from '../index';
import { User } from '../models/user.model';

export interface IUserPayload {
    id: number,
    name: string,
    email: string
}


export const getUsers = async (): Promise<Array<User>> => {
    console.log("in user repository looking for users");
    const userRepository = appDataSource.manager.getRepository(User);
    return userRepository.find();
};

export const getUser = async (id: number): Promise<User | null> => {
    console.log("in user repository looking for user id="+id);
    const userRepository = appDataSource.manager.getRepository(User);
    const user = await userRepository.findOne({ 
        where: { id: id } 
    });
    if(!user) return null;
    return user;
};