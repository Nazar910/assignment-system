import * as rpcModule from '@nazar910/rpc-module';
import * as nconf from 'nconf';
import * as mongoose from 'mongoose';
import * as Ajv from 'ajv';
const ajv = new Ajv();

export type RpcModule = typeof rpcModule;
export type NconfModule = typeof nconf;
export type Mongoose = typeof mongoose;
export type AjvType = typeof ajv;
