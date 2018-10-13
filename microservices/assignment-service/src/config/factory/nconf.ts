import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import IConfigFactory from './interface';
import IConfig from '../interface';
import TYPES from '../../types';

@injectable()
export default class NconfFactory implements IConfigFactory {
    private _nconf;
    constructor(
        @inject(TYPES.Nconf) nconf
    ) {
        this._nconf = nconf;
    }

    getConfig(): IConfig {
        const nconf = this._nconf;
        const { NODE_ENV } = process.env;
        nconf.file(`../../../config/nconf/${NODE_ENV}.json`);
        nconf.env();
        nconf.defaults({
            API_PORT: 8080
        });
        return new class NconfConfig implements IConfig {
            get(key: string): string {
                return nconf.get(key);
            }

            has(key: string): boolean {
                return !!nconf.get(key);
            }
        }
    }
}
