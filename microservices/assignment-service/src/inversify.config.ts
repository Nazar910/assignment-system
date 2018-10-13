import { Container, ContainerModule } from 'inversify';
import TYPES from './types';
import IConfig from './config/interface';
import ILogger from './logger/i-logger';

const thirdPartyDependencies = new ContainerModule((bind) => {

});

const container = new Container();

export default container;
