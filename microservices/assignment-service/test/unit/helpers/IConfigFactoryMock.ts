import IConfigFactory from '../../../src/config/factory/interface';
import IConfig from '../../../src/config/interface';

export default class IConfigFactoryMock implements IConfigFactory {
    getConfig() {
        return new class Config implements IConfig {
            get(key) {
                return key;
            }
            has(key) {
                return false;
            }
        }
    }
}
