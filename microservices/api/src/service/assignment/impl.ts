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
}
