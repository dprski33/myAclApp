import { response } from "express";
import {
    getUsers,
    IUserPayload,
    getUser,
    createUser,
    getUserByEmail
} from "../repositories/user.repository";

class UserService {
    
    async list() {
        console.log(`in user.service looking for users`);
        return getUsers();       
    }

    async readById(id: number) {
        console.log("in user.service looking for user id="+id);
        return getUser(id);
    }

    async create(body: IUserPayload) {
        console.log("in user.service creating user");
        return createUser(body);
    }

    async readByEmail(email: string) {
        return getUserByEmail(email);
    }
}

export default new UserService();