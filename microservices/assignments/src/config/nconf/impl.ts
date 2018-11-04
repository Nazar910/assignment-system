import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import IConfig from '../interface';
import TYPES from '../../types';
import * as path from 'path';

@injectable()
export default class Nconf implements IConfig {
    private nconf;
    constructor(
        @inject(TYPES.NconfModule) nconf
    ) {
        const { NODE_ENV } = process.env;
        nconf.file(path.join(__dirname, `${NODE_ENV}.json`));
        nconf.env();
        nconf.defaults({
            API_PORT: 8080
        });
        this.nconf = nconf;
    }

    get(key: string): string {
        return this.nconf.get(key);
    }

    has(key: string): boolean {
        return !!this.nconf.get(key);
    }
}
