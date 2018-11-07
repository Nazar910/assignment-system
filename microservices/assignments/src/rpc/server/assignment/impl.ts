import IRpcServer from '../interface';
import { inject, injectable } from 'inversify';
import IConfig from '../../../config/interface';
import TYPES from '../../../types';import IAssignmentService from '../../../services/assignment/interface';

@injectable()
export default class RpcServer implements IRpcServer {
    private rpcServer;
    private _ASSIGNENT_QUEUES;
    constructor(
        @inject(TYPES.Config) config: IConfig,
        @inject(TYPES.RpcModule) rpcModule,
        @inject(TYPES.AssignmentService) private assignmentService: IAssignmentService
    ) {
        const { AMQPRPCServer } = rpcModule.getDriver('amqp');
        this.rpcServer = AMQPRPCServer.create(config.get('RABBITMQ_URI'));
        this._ASSIGNENT_QUEUES = config.get('ASSIGNMENT_QUEUES')
    }

    get ASSIGNMENT_QUEUES() {
        return this._ASSIGNENT_QUEUES;
    }

    async start() {
        await this.rpcServer.start();
        this.rpcServer.addHandler(
            this.ASSIGNMENT_QUEUES['create'],
            (data) => this.assignmentService.create(data)
        );
        this.rpcServer.addHandler(
            this.ASSIGNMENT_QUEUES['update-by-id'],
            (id, data) => this.assignmentService.updateById(id, data)
        );
        this.rpcServer.addHandler(
            this.ASSIGNMENT_QUEUES['get-all'],
            () => this.assignmentService.findAll()
        );
        this.rpcServer.addHandler(
            this.ASSIGNMENT_QUEUES['get-by-id'],
            (id) => this.assignmentService.findById(id)
        );
        this.rpcServer.addHandler(
            this.ASSIGNMENT_QUEUES['delete-by-id'],
            (id) => this.assignmentService.deleteById(id)
        );
    }
}
