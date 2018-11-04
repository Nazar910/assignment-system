import IConfig from '../../../../../src/config/interface';

export default class IConfigMock implements IConfig {
    get(key: string): string {
        return key;
    }

    has(key: string): boolean {
        return false;
    }
}
