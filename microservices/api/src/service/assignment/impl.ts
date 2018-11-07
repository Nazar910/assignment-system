import IAssignmentService from './interface';
import { injectable, inject } from 'inversify';
import TYPES from '../../types';
import IConfig from '../../config/interface';
import IRpcClient from '../../rpc/client/interface';

@injectable()
export default class AssignmentService implements IAssignmentService {
    private _ASSIGNMENT_QUEUES;
    constructor(
        @inject(TYPES.RpcClient) private rpcClient: IRpcClient,
        @inject(TYPES.Config) config: IConfig
    ) {
        this._ASSIGNMENT_QUEUES = config.get('ASSIGNMENT_QUEUES')
    }

    get ASSIGNMENT_QUEUES() {
        return this._ASSIGNMENT_QUEUES;
    }

    async getAll() {
        return this.rpcClient.call(this.ASSIGNMENT_QUEUES['get-all']);
    }

    async getById(id: string) {
        return this.rpcClient.call(this.ASSIGNMENT_QUEUES['get-by-id'], id);
    }

    async create(data: object) {
        return this.rpcClient.call(this.ASSIGNMENT_QUEUES['create'], data);
    }

    async updateById(id: string, data: object) {
        return this.rpcClient.call(this.ASSIGNMENT_QUEUES['update-by-id'], id, data);
    }

    async deleteById(id: string) {
        return this.rpcClient.call(this.ASSIGNMENT_QUEUES['delete-by-id'], id);
    }
}
