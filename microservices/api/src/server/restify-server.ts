import restify = require('restify');
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import IServer from './i-server';
import IConfig from '../config/i-config';
import ILogger from '../logger/i-logger';
import IUserService from '../service/i-user';
import TYPES from '../types';

const server = restify.createServer();
//set up auth
//set up middleware

@injectable()
class RestifyServer implements IServer {
    private _server;
    private _config: IConfig;
    private _logger: ILogger;
    private _userService: IUserService;

    constructor(
        @inject(TYPES.Config) config: IConfig,
        @inject(TYPES.Logger) logger: ILogger,
        @inject(TYPES.UserService) userService: IUserService
    ) {
        this._config = config;
        this._logger = logger;
        this._userService = userService;
        this._server = server;

        this._setUpUserRoutes();
        this._setUpAssignmentRoutes();
    }

    private _setUpUserRoutes() {
        const server = this._server;
        const userService = this._userService;

        server.get('/login', (req, res) => {
            res.json({foo: 'bar'});
        });
    }

    private _setUpAssignmentRoutes() {

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
