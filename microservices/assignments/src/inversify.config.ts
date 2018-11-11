import { Container } from 'inversify';
import TYPES from './types';
import IConfig from './config/interface';
import ILogger from './logger/i-logger';
import Nconf from './config/nconf/impl';
import * as nconf from 'nconf';
import * as rpcModule from '@nazar910/rpc-module';
import * as mongoose from 'mongoose';
import * as Ajv from 'ajv';
import { NconfModule, RpcModule, Mongoose, AjvType } from './modules/interfaces';
import ConsoleLogger from './logger/console-logger';
import IAssignmentRepo from './repos/assignment/interface';
import AssignmentRepo from './repos/assignment/impl';
import IAssignmentService from './services/assignment/interface';
import AssignmentService from './services/assignment/impl';
import IRpcServer from './rpc/server/interface';
import AssignmentRpcServer from './rpc/server/assignment/impl';
import { IAssignmentValidator } from './validation/ajv/interfaces';
import { AssignmentValidator } from './validation/ajv/implementations';

const container = new Container();
container.bind<AjvType>(TYPES.Ajv).toConstantValue(new Ajv({
    removeAdditional: true,
    coerceTypes: true,
    useDefaults: true
}));
container.bind<NconfModule>(TYPES.NconfModule).toConstantValue(nconf);
container.bind<RpcModule>(TYPES.RpcModule).toConstantValue(rpcModule);
container.bind<Mongoose>(TYPES.Mongoose).toConstantValue(mongoose);
container.bind<IConfig>(TYPES.Config).to(Nconf);
container.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);
container.bind<IRpcServer>(TYPES.RpcServer).to(AssignmentRpcServer);
container.bind<IAssignmentRepo>(TYPES.AssignmentRepo).to(AssignmentRepo);
container.bind<IAssignmentValidator>(TYPES.AssignmentValidator).to(AssignmentValidator);
container.bind<IAssignmentService>(TYPES.AssignmentService).to(AssignmentService);

export default container;
