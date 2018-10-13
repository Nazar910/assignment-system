import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import IConfig from '../../config/interface';
import IConfigFactory from '../../config/factory/interface';
import TYPES from '../../types';
import IRpcServerFactory from './interface';
import { RpcModule } from '../../modules/interfaces';
import IRpcServer from '../server/interface';

@injectable()
class AmqpRpcServerFactory implements IRpcServerFactory {
    private _config: IConfig;
    private _rpcModule: RpcModule;
    constructor(
        @inject(TYPES.Config) configFactory: IConfigFactory,
        @inject(TYPES.RpcModule) rpcModule
    ) {
        this._config = configFactory.getConfig();
        this._rpcModule = rpcModule;
    }

    getRpcServer() {
        const { AMQPRPCServer } = this._rpcModule.getDriver('amqp');
        const rpcServer = AMQPRPCServer.create(this._config.get('RABBITMQ_URI'));
        return new class AmqpRpcServer implements IRpcServer {
            async start() {
                await rpcServer.start();
            }
            registerCommand(command: string, job: Function) {
                rpcServer.addHandler(command, job);
            }
        }
    }
}

export default AmqpRpcServerFactory;
