import 'mocha';
import IConfig from '../../../src/config/interface';
import IConfigMock from '../helpers/IConfigMock';
import IConfigFactory from '../../../src/config/factory/interface';
import IConfigFactoryMock from '../helpers/IConfigFactoryMock';
import { mock, when, instance }  from 'ts-mockito';
import AmqpRpcServerFactory from '../../../src/rpc/server-factory/amqp';
import IRpcServer from '../../../src/rpc/server/interface';
import * as sinon from 'sinon';
import { expect } from 'chai';

const RABBITMQ_URI = 'amqp://some-host.com';
//TODO: stub rpcModule
describe('AMQP RPC server factory', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        if (sandbox) {
            sandbox.restore();
        }
    });
    describe('getRpcServer', () => {
        let configFactory: IConfigFactory;
        let rpcModule;
        let getDriverStub;
        let AmqpRpcServerStub;
        let createStub;
        let startStub;
        let addHandlerSpy;
        beforeEach(() => {
            const mockedConfig: IConfig = mock(IConfigMock);
            when(mockedConfig.get('RABBITMQ_URI')).thenReturn(RABBITMQ_URI);
            const config = instance(mockedConfig);
            const mockedConfigFactory = mock(IConfigFactoryMock);
            when(mockedConfigFactory.getConfig()).thenReturn(config);
            configFactory = instance(mockedConfigFactory);

            startStub = sandbox.stub().resolves();
            addHandlerSpy = sandbox.spy();
            createStub = sandbox.stub().withArgs(RABBITMQ_URI)
                .returns({
                    start: startStub,
                    addHandler: addHandlerSpy
                })
            AmqpRpcServerStub = {
                create: createStub
            }
            getDriverStub = sandbox.stub().withArgs('amqp')
                .returns({
                    AMQPRPCServer: AmqpRpcServerStub
                });
            rpcModule = {
                getDriver: getDriverStub
            }
        });
        it('should getDriver', () => {
            const rpcFactory = new AmqpRpcServerFactory(configFactory, rpcModule);
            rpcFactory.getRpcServer();
            expect(getDriverStub.callCount).to.be.equal(1);
            expect(getDriverStub.firstCall.args).to.eql(['amqp']);
        });
        it('should call create', () => {
            const rpcFactory = new AmqpRpcServerFactory(configFactory, rpcModule);
            rpcFactory.getRpcServer();
            expect(createStub.callCount).to.be.equal(1);
            expect(createStub.firstCall.args).to.eql([RABBITMQ_URI]);
        });
        it('should call start correctly', async () => {
            const rpcFactory = new AmqpRpcServerFactory(configFactory, rpcModule);
            const rpcServer: IRpcServer = rpcFactory.getRpcServer();
            await rpcServer.start();
            expect(startStub.callCount).to.be.equal(1);
            expect(startStub.firstCall.args).to.have.lengthOf(0);
        });
        describe('internal rpcServer rejects', () => {
            beforeEach(() => {
                startStub = sandbox.stub().rejects(Error, 'Start error');
                createStub = sandbox.stub().withArgs(RABBITMQ_URI)
                    .returns({
                        start: startStub,
                        addHandler: addHandlerSpy
                    })
            });
            it('should reject', async () => {
                const rpcFactory = new AmqpRpcServerFactory(configFactory, rpcModule);
                const rpcServer: IRpcServer = rpcFactory.getRpcServer();
                try {
                    await rpcServer.start();
                } catch (e) {
                    expect(e.message).to.be.equal('Start error');
                }
            });
        });
        it('should call addHandler correctly', async () => {
            const rpcFactory = new AmqpRpcServerFactory(configFactory, rpcModule);
            const rpcServer: IRpcServer = rpcFactory.getRpcServer();
            const job = () => ({});
            rpcServer.registerCommand('command', job);
            expect(addHandlerSpy.callCount).to.be.equal(1);
            expect(addHandlerSpy.firstCall.args).to.eql([
                'command',
                job
            ]);
        });
    });
});
