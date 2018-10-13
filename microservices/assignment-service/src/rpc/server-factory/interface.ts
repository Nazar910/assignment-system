import IRpcServer from '../server/interface';
interface IRpcServerFactory {
    getRpcServer(): IRpcServer,
}

export default IRpcServerFactory;
