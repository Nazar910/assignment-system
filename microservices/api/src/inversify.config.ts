import { Container } from 'inversify';
import TYPES from './types';
import IConfig from './config/interface';
import NconfImpl from './config/nconf/impl';
import ILogger from './logger/i-logger';
import ConsoleLogger from './logger/console-logger';
import IAssignmentService from './service/assignment/interface';
import AssignmentService from './service/assignment/impl';
import { interfaces, TYPE } from 'inversify-restify-utils';
import { AssignmentController } from './controller/assignment';
import { RpcModule, NconfModule } from './interfaces';
import * as rpcModule from '@nazar910/rpc-module';
import * as nconf from 'nconf';
import IRpcClient from './rpc/client/interface';
import RpcClient from './rpc/client/impl';

const container = new Container();
container.bind<NconfModule>(TYPES.NconfModule).toConstantValue(nconf);
container.bind<IConfig>(TYPES.Config).to(NconfImpl).inSingletonScope();
container.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);
container.bind<RpcModule>(TYPES.RpcModule).toConstantValue(rpcModule);
container.bind<IRpcClient>(TYPES.RpcClient).to(RpcClient);
container.bind<interfaces.Controller>(TYPE.Controller).to(AssignmentController).whenTargetNamed('AssignmentController');
container.bind<IAssignmentService>(TYPES.AssignmentService).to(AssignmentService);

export default container;
