import { getRoles } from '../repositories/role.repository';

class RoleService {

    async list() {
        return getRoles()
    }
}

export default new RoleService();