import 'mocha';
import IConfig from '../../../src/config/interface';
import IConfigMock from '../helpers/IConfigMock';
import IConfigFactory from '../../../src/config/factory/interface';
import IConfigFactoryMock from '../helpers/IConfigFactoryMock';
import { mock, when, instance }  from 'ts-mockito';
import AmqpRpcServerFactory from '../../../src/rpc/server-factory/amqp';
import * as rpcModule from '@nazar910/rpc-module';
import IRpcServer from '../../../src/rpc/server/interface';

const RABBITMQ_URI = 'amqp://some-host.com';
//TODO: stub rpcModule
describe('AMQP RPC server factory', () => {
    describe('getRpcServer', () => {
        let configFactory: IConfigFactory;
        beforeEach(() => {
            const mockedConfig: IConfig = mock(IConfigMock);
            when(mockedConfig.get('RABBITMQ_URI')).thenReturn(RABBITMQ_URI);
            const config = instance(mockedConfig);
            const mockedConfigFactory: IConfigFactory = mock(IConfigFactoryMock);
            when(mockedConfigFactory.getConfig()).thenReturn(config);
            configFactory = instance(mockedConfigFactory);
        });
        it('should return rpc server', () => {
            const rpcFactory = new AmqpRpcServerFactory(configFactory, rpcModule);
            const rpcServer: IRpcServer = rpcFactory.getRpcServer();
        });
    });
});
