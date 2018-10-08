import { Container } from 'inversify';
import TYPES from './types';
import IServer from './server/i-server';
import RestifyServer from './server/restify-server';
import IConfig from './config/i-config';
import NconfConfig from './config/nconf';
import ILogger from './logger/i-logger';
import ConsoleLogger from './logger/console-logger';

const container = new Container();
container.bind<IServer>(TYPES.Server).to(RestifyServer);
container.bind<IConfig>(TYPES.Config).to(NconfConfig);
container.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);

export default container;
