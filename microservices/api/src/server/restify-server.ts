import restify = require('restify');
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import IServer from './i-server';
import IConfig from '../config/i-config';
import ILogger from '../logger/i-logger';
import TYPES from '../types';

@injectable()
class RestifyServer implements IServer {
    private _server;
    private _config: IConfig;
    private _logger: ILogger;

    constructor(
        @inject(TYPES.Config) config: IConfig,
        @inject(TYPES.Logger) logger: ILogger
    ) {
        this._config = config;
        this._logger = logger;
        this._server = restify.createServer();
    }

    public async start() {
        const server = this._server;
        const port = this._config.get('API_PORT');
        await new Promise(resolve => {
            server.listen(port, resolve);
        });
        this._logger.info(`Server started on ${port}`);
    }
    public async close() {

    }
}

export default RestifyServer;
