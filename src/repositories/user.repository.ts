import { appDataSource } from '../index';
import { User } from '../models/user.model';

export interface IUserPayload {
    id: number,
    name: string,
    email: string
}

const userRepository = appDataSource.manager.getRepository(User);

export const getUsers = async (): Promise<Array<User> | null> => {
    console.log("in user repository looking for users");
    
    const users = userRepository.find();
    if(!users) return null;
    return users;
};

export const getUser = async (id: number): Promise<User | null> => {
    console.log("in user repository looking for user id="+id);
    const user = await userRepository.findOne({ 
        where: { id: id } 
    });
    if(!user) return null;
    return user;
};

export const createUser = async (payload: IUserPayload): Promise<User | null> => {
    console.log(`in user repository creating user email=${payload.email}`);
    const user = new User();
    return userRepository.save({
      ...user,
      ...payload,
    });

}

export const getUserByEmail = async(email: string): Promise<User | null> => {
    console.log(`in user repository finding user email=${email}`);
    const user = await userRepository.findOne({ 
        where: { email: email } 
    });
    if(!user) return null;
    return user;
}