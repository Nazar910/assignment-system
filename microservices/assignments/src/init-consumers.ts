import container from './inversify.config';
import TYPES from './types';
import IRpcServer from './rpc/server/interface';
import ILogger from './logger/i-logger';
import * as mongoose from 'mongoose';
import IConfig from './config/interface';

export default async function initConsumers() {
    const config: IConfig = container.get<IConfig>(TYPES.Config);
    await mongoose.connect(config.get('MONGO_URI'), { useNewUrlParser: true });
    const rpcServer: IRpcServer = container.get<IRpcServer>(TYPES.RpcServer);
    await rpcServer.start();
    const logger: ILogger = container.get<ILogger>(TYPES.Logger);
    logger.info('Inited consumers');
}
