import IConfig from './i-config';
import { injectable } from 'inversify';
import nconf = require('nconf');

@injectable()
class NconfConfig implements IConfig {
    private _config;

    constructor() {
        nconf.file('../../config-files');
        nconf.env();
        nconf.defaults({
            API_PORT: 8080
        });
        this._config = nconf;
    }

    get(key: string): string {
        return this._config.get(key);
    }

    has(key: string): boolean {
        return !!this._config.get(key);
    }
}

export default NconfConfig;
