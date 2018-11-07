import IRpcClient from './interface';
import { inject, injectable } from 'inversify';
import IConfig from '../../config/interface';
import TYPES from '../../types';
@injectable()
export default class RpcClient implements IRpcClient {
    private rpcClient;
    constructor(
        @inject(TYPES.Config) config: IConfig,
        @inject(TYPES.RpcModule) rpcModule
    ) {
        const { AMQPRPCClient } = rpcModule.getDriver('amqp');
        this.rpcClient = AMQPRPCClient.create(config.get('RABBITMQ_URI'));
    }

    async call(command: string, ...args: any[]) {
        return this.rpcClient.call(command, ...args);
    }
}
