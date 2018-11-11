import IUserService from './interface';
import { injectable, inject } from 'inversify';
import TYPES from '../../types';
import IConfig from '../../config/interface';
import IRpcClient from '../../rpc/client/interface';
import * as jwt from 'jsonwebtoken';

@injectable()
export default class UserService implements IUserService {
    private _USER_QUEUES;
    private JWT_SECRET;
    constructor(
        @inject(TYPES.RpcClient) private rpcClient: IRpcClient,
        @inject(TYPES.Config) config: IConfig
    ) {
        this._USER_QUEUES = config.get('USER_QUEUES');
        this.JWT_SECRET = config.get('JWT_SECRET');
    }

    get USER_QUEUES() {
        return this._USER_QUEUES;
    }

    async profile(id: string) {
        return this.rpcClient.call(this.USER_QUEUES['get-by-id'], id);
    }

    async login(email: string, password: string) {
        const user = await this.rpcClient.call(this.USER_QUEUES['login'], email, password);
        return {
            success: true,
            token: jwt.sign(user, this.JWT_SECRET, {
                expiresIn: '2 days'
            })
        }
    }

    async register(data: object) {
        return this.rpcClient.call(this.USER_QUEUES['create'], data);
    }
}
