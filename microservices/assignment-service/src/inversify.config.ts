import { Container, ContainerModule } from 'inversify';
import TYPES from './types';
import IConfig from './config/interface';
import NconfConfig from './config/nconf';
import ILogger from './logger/i-logger';
import ConsoleLogger from './logger/console-logger';

const thirdPartyDependencies = new ContainerModule((bind) => {

});

const container = new Container();
container.bind<IConfig>(TYPES.Config).to(NconfConfig);
container.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);

export default container;
