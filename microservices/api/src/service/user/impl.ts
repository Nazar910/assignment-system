import IUserService from './interface';
import { injectable } from 'inversify';

@injectable()
class UserService implements IUserService {
    constructor(

    ) {

    }

    async login(email: string, password: string) {
        //do rpc call to user service
        return {};
    }

    async register(userData) {
        //do rpc call to user service
        return {};
    }

    async profile() {
        //do rpc call to user service
        return {};
    }
}

export default UserService;
