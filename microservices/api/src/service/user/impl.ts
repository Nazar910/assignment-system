import IUserService from './interface';
import { injectable, inject } from 'inversify';
import TYPES from '../../types';
import IConfig from '../../config/interface';
import IRpcClient from '../../rpc/client/interface';
import * as jwt from 'jsonwebtoken';

@injectable()
export default class UserService implements IUserService {
    private _USER_QUEUES;
    constructor(
        @inject(TYPES.RpcClient) private rpcClient: IRpcClient,
        @inject(TYPES.Config) config: IConfig
    ) {
        this._USER_QUEUES = config.get('USER_QUEUES')
    }

    get USER_QUEUES() {
        return this._USER_QUEUES;
    }

    async profile(id: string) {
        return this.rpcClient.call(this.USER_QUEUES['get-by-id'], id);
    }

    async login(email: string, password: string) {
        return this.rpcClient.call(this.USER_QUEUES['login'], email, password);
    }

    async register(data: object) {
        return this.rpcClient.call(this.USER_QUEUES['create'], data);
    }
}
