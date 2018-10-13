import 'mocha';
import IConfig from '../../../src/config/interface';
import * as sinon from 'sinon';
import IConfigFactory from '../../../src/config/factory/interface';
import NconfFactory from '../../../src/config/factory/nconf';
import { expect } from 'chai';

describe('Nconf config factory', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        if (sandbox) {
            sandbox.restore();
        }
    });
    describe('getConfig', () => {
        let nconf;
        let fileSpy;
        let envSpy;
        let defaultsSpy;
        let getStub;
        let hasStub;
        beforeEach(() => {
            fileSpy = sandbox.spy();
            envSpy = sandbox.spy();
            defaultsSpy = sandbox.spy();
            getStub = sandbox.stub().withArgs('foo').returns('bar');
            hasStub = sandbox.stub().withArgs('foo').returns(true);
            nconf = {
                file: fileSpy,
                env: envSpy,
                defaults: defaultsSpy,
                get: getStub,
                has: hasStub
            }
        });
        it('should return config', () => {
            const configFactory: IConfigFactory = new NconfFactory(nconf);
            const config: IConfig = configFactory.getConfig();
            expect(config.get('foo')).to.be.equal('bar');
            expect(config.has('foo')).to.be.equal(true);
        });
        it('should call fileSpy', () => {
            const configFactory: IConfigFactory = new NconfFactory(nconf);
            configFactory.getConfig();
            expect(fileSpy.callCount).to.be.equal(1);
            expect(fileSpy.firstCall.args).to.eql(['../../../config/nconf/test.json']);
        });
        it('should call envSpy', () => {
            const configFactory: IConfigFactory = new NconfFactory(nconf);
            configFactory.getConfig();
            expect(envSpy.callCount).to.be.equal(1);
            expect(envSpy.firstCall.args).to.have.lengthOf(0);
        });
        it('should call defaultsSpy', () => {
            const configFactory: IConfigFactory = new NconfFactory(nconf);
            configFactory.getConfig();
            expect(defaultsSpy.callCount).to.be.equal(1);
            expect(defaultsSpy.firstCall.args).to.eql([{
                API_PORT: 8080
            }]);
        });
    });
});
