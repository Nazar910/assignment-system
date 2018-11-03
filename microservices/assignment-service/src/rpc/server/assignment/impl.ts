import IRpcServer from './interface';
import { inject, injectable } from 'inversify';
import IConfig from '../../../config/interface';
import TYPES from '../../../types';;

@injectable()
export default class RpcServer implements IRpcServer {
    private rpcServer;
    private _ASSIGNENT_QUEUES;
    constructor(
        @inject(TYPES.Config) config: IConfig,
        @inject(TYPES.RpcModule) rpcModule
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
    }

    addCreateHandler(handler: Function) {
        this.rpcServer.addHandler(this.ASSIGNMENT_QUEUES['create'], handler);
    }
    addUpdateByIdHandler(handler: Function) {
        this.rpcServer.addHandler(this.ASSIGNMENT_QUEUES['update-by-id'], handler);
    }
    addGetAllHandler(handler: Function) {
        this.rpcServer.addHandler(this.ASSIGNMENT_QUEUES['get-all'], handler);
    }
    addGetByIdHandler(handler: Function) {
        this.rpcServer.addHandler(this.ASSIGNMENT_QUEUES['get-by-id'], handler);
    }
    addDeleteByIdHandler(handler: Function) {
        this.rpcServer.addHandler(this.ASSIGNMENT_QUEUES['delete-by-id'], handler);
    }
}
