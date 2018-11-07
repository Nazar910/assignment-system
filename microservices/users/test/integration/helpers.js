const container = require('../../src/container');
const TYPES = require('../../src/types');
const rpcModule = container.$di.get(TYPES.RpcModule);
const bcryptjs = container.$di.get(TYPES.Bcryptjs);
const mongoose = container.$di.get(TYPES.Mongoose);
const config = container.$di.get(TYPES.Config);

function createRpcClient() {
    const { AMQPRPCClient } = rpcModule.getDriver('amqp');
    return AMQPRPCClient.create(config.get('RABBITMQ_URI'));
}

let rpcClient;
function getRpcClient() {
    if (!rpcClient) {
        rpcClient = createRpcClient();
    }
    return rpcClient;
}

function hashPassword(password) {
    const salt = bcryptjs.genSaltSync();
    const hashedPass = bcryptjs.hashSync(password, salt);
    return hashedPass;
}

function getUserQueues() {
    return config.get('USER_QUEUES');
}

function genObjectId(value) {
    return new mongoose.Types.ObjectId(value)
}

async function findOne(collectionName, query) {
    const { db } = mongoose.connection;
    const collection = await db.collection(collectionName);
    return collection.findOne(query);
}

async function cleanCollection(collectionName) {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Will not clean collection untill in test env');
    }
    const { db } = mongoose.connection;
    const collection = await db.collection(collectionName);
    return collection.deleteMany({});
}

function comparePass(expected, actual) {
    return bcryptjs.compareSync(expected, actual);
};

async function ensure(collectionName, data) {
    const { db } = mongoose.connection;
    const collection = await db.collection(collectionName);
    const { insertedId } = await collection.insertOne(data);
    return collection.findOne({ _id: insertedId });
}

async function ensureUser(data) {
    const defaultData = {
        email: 'user@example.com',
        name: 'John',
        lastName: 'Doe',
        password: 'qwerty123',
        role: 'admin'
    };
    return ensure('users', {
        ...defaultData,
        ...data
    });
}

module.exports = {
    getRpcClient,
    hashPassword,
    getUserQueues,
    genObjectId,
    findOne,
    cleanCollection,
    comparePass,
    ensureUser
}
