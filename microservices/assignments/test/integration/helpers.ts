import container from '../../src/inversify.config';
import IConfig from '../../src/config/interface';
import TYPES from '../../src/types';
import { Mongoose, RpcModule } from '../../src/modules/interfaces';
const config: IConfig = container.get<IConfig>(TYPES.Config);
const mongoose = container.get<Mongoose>(TYPES.Mongoose);
const rpcModule = container.get<RpcModule>(TYPES.RpcModule);

let rpcClient;

function createRpcClient() {
    const { AMQPRPCClient } = rpcModule.getDriver('amqp');
    rpcClient = AMQPRPCClient.create(config.get('RABBITMQ_URI'));
    return rpcClient;
}

export function getRpcClient() {
    if (rpcClient) {
        return rpcClient;
    }
    return createRpcClient();
}

export function getAssignmentQueues() {
    return config.get('ASSIGNMENT_QUEUES');
}

export function genObjectId(value?) {
    return new mongoose.Types.ObjectId(value);
}

export async function findOne(collectionName, query) {
    const { db } = mongoose.connection;
    const collection = await db.collection(collectionName);
    return collection.findOne(query);
}

export async function cleanCollection(collectionName) {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Will not clean collection untill in test env');
    }
    const { db } = mongoose.connection;
    const collection = await db.collection(collectionName);
    return collection.deleteMany({});
}

export async function ensureAssignment(data?) {
    const defaultData = {
        title: 'Some title',
        description: 'Some description',
        author_id: genObjectId(),
        assignees: [genObjectId()],
        priority: 'low'
    };
    const { db } = mongoose.connection;
    const collection = await db.collection('assignments');
    const { insertedId } = await collection.insertOne({
        ...defaultData,
        ...data
    });
    return findOne('assignments', {_id: insertedId});
}
