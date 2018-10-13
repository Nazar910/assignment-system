import 'mocha';
import IConfig from '../../../src/config/interface';
import IConfigMock from '../helpers/IConfigMock';
import { mock, when, instance }  from 'ts-mockito';
import AmqpRpcServerFactory from '../../../src/rpc/server-factory/amqp';
import * as rpcModule from '@nazar910/rpc-module';
import IRpcServer from '../../../src/rpc/server/interface';

const RABBITMQ_URI = 'amqp://some-host.com';

describe('AMQP RPC server factory', () => {
    describe('getRpcServer', () => {
        let config: IConfig;
        beforeEach(() => {
            const mockedConfig = mock(IConfigMock);
            when(mockedConfig.get('RABBITMQ_URI')).thenReturn(RABBITMQ_URI);
            config = instance(mockedConfig);
        });
        it('should return rpc server', () => {
            const rpcFactory = new AmqpRpcServerFactory(config, rpcModule);
            const rpcServer: IRpcServer = rpcFactory.getRpcServer();
        });
    });
});
