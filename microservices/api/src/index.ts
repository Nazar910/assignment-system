import * as bodyParser from 'body-parser';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import ILogger from './logger/i-logger';
import IConfig from './config/interface';
import TYPES from './types';
import container from './inversify.config';
import * as corsMiddleware from 'restify-cors-middleware';
import auth from './middleware/auth';

const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['Authorization']
});

const logger: ILogger = container.get<ILogger>(TYPES.Logger);
const config: IConfig = container.get<IConfig>(TYPES.Config);
const API_PORT = config.get('API_PORT');
const server = new InversifyRestifyServer(container, { defaultRoot: '/api' });
server.setConfig((app) => {
    app.pre(cors.preflight);
    app.use(cors.actual);
    app.use(auth(config.get('JWT_SECRET'), {
        allowedGlobalMethods: ['OPTIONS']
    }));
    app.use(require('morgan')('dev'));
    app.use(bodyParser.json());
});
const app = server.build();
app.listen(API_PORT, () => logger.info(`Server started on *:${API_PORT}`));
