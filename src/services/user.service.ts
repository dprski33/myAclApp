import { response } from "express";
import {
    getUsers,
    IUserPayload,
    getUser
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
}

export default new UserService();