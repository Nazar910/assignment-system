import * as bodyParser from 'body-parser';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import ILogger from './logger/i-logger';
import IConfig from './config/interface';
import TYPES from './types';
import container from './inversify.config';
const logger: ILogger = container.get<ILogger>(TYPES.Logger);

const config: IConfig = container.get<IConfig>(TYPES.Config);
const API_PORT = config.get('API_PORT');
const server = new InversifyRestifyServer(container);
server.setConfig((app) => {
    app.use(require('morgan')('dev'));
    app.use(bodyParser.json())
});
const app = server.build();
app.listen(API_PORT, () => logger.info(`Server started on *:${API_PORT}`));
