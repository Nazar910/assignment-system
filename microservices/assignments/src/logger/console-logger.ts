import ILogger from './i-logger';
import { injectable } from 'inversify';

@injectable()
class ConsoleLogger implements ILogger {
    info(msg) {
        console.log(msg);
    }
    error(msg) {
        console.error(msg);
    }
    debug(msg) {
        console.debug(msg);
    }
}

export default ConsoleLogger;
