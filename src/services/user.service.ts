import {
    getUsers,
    getUser,
    createUser,
    getUserByEmail,
    updateUser,
    IUserCreatePayload,
    IUserUpdatePayload
} from "../repositories/user.repository";

class UserService {
    
    async list(limit: number, offset: number) {
        console.log(`in user.service looking for users with limit=${limit} and offset=${offset}`);
        return getUsers(limit, offset);
    }

    async readById(id: number) {
        console.log(`in user.service looking for user id=${id}`);
        return getUser(id);
    }

    async create(body: IUserCreatePayload) {
        console.log(`in user.service creating user email=${body.email}`);
        return createUser(body);
    }

    async readByEmail(email: string) {
        console.log(`looking for email=${email}`);
        return getUserByEmail(email);
    }

    async putById(id: number, body: IUserUpdatePayload) {
        console.log(`in user.service updating user id=${body.id}`);
        try {
            return updateUser(id, body);
        }
        catch(err) {
            console.log(`Error updating user id=${id}`, err)
            return err;
        }
    }

}

export default new UserService();