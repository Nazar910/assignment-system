import container from './inversify.config';
import TYPES from './types';
import IAssignmentRpcServer from './rpc/server/assignment/interface';
import IAssignmentService from './services/assignment/interface';
import ILogger from './logger/i-logger';
import * as mongoose from 'mongoose';
import IConfig from './config/interface';

const config: IConfig = container.get<IConfig>(TYPES.Config);
export default async function initConsumers() {
    await mongoose.connect(config.get('MONGO_URI'), { useNewUrlParser: true });
    const rpcServer: IAssignmentRpcServer = container.get<IAssignmentRpcServer>(TYPES.AssignmentRpcServer);
    await rpcServer.start();

    const assignmentService: IAssignmentService = container.get<IAssignmentService>(TYPES.AssignmentService);
    rpcServer.addGetAllHandler(assignmentService.findAll.bind(assignmentService));
    const logger: ILogger = container.get<ILogger>(TYPES.Logger);
    logger.info('Inited consumers');
}
