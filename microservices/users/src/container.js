const noder = require('noder.io');
const container = noder.createNoder();
const TYPES = require('./types');
const rpcModule = require('@nazar910/rpc-module');
const getConfig = require('./config');
const getUserRepo = require('./repo/user');
const getUserService = require('./service/user');
const getRpcServer = require('./rpc/server');
const Ajv = require('ajv');
const getUserValidator = require('./validator/user');

container.$singleton(TYPES.Lodash, () => require('lodash'));
container.$singleton(TYPES.Bcryptjs, () => require('bcryptjs'));
container.$singleton(TYPES.Nconf, () => require('nconf'));
container.$singleton(TYPES.Ajv, () => new Ajv({ coerceTypes: true, removeAdditional: true }));
container.$factory(TYPES.UserValidator, [TYPES.Ajv], getUserValidator);
container.$factory(TYPES.Config, [TYPES.Nconf], getConfig);
container.$singleton(TYPES.Mongoose, () => require('mongoose'));
container.$factory(TYPES.UserRepo, [TYPES.Mongoose, TYPES.Bcryptjs], getUserRepo);
container.$factory(TYPES.UserService, [TYPES.UserRepo, TYPES.UserValidator, TYPES.Lodash], getUserService);
container.$singleton(TYPES.RpcModule, () => rpcModule);
container.$factory(TYPES.RpcServer, [TYPES.Config, TYPES.RpcModule, TYPES.UserService], getRpcServer);

module.exports = container;
