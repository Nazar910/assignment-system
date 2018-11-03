import { InversifyRestifyServer } from 'inversify-restify-utils';
import ILogger from './logger/i-logger';
import IConfig from './config/interface';
import TYPES from './types';
import container from './inversify.config';

const server = new InversifyRestifyServer(container);

const config: IConfig = container.get<IConfig>(TYPES.Config);
const API_PORT = config.get('API_PORT');

const logger: ILogger = container.get<ILogger>(TYPES.Logger);

const app = server.build();
app.listen(API_PORT, () => logger.info(`Server started on *:${API_PORT}`));
