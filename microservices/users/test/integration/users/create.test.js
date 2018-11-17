const helpers = require('../helpers');
const rpcClient = helpers.getRpcClient();
const USER_QUEUES = helpers.getUserQueues();
const { expect } = require('chai');
const _ = require('lodash');

describe('CREATE', () => {
    const data = {
        email: 'user@example.com',
        name: 'John',
        lastName: 'Doe',
        password: 'qwerty123',
        role: 'admin'
    };
    beforeEach(async () => {
        await helpers.cleanCollection('users');
    });
    after(async () => {
        await helpers.cleanCollection('users');
    });
    describe('email', () => {
        describe('is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.set(_.clone(data), 'email', {})
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.email');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
        describe('is not a valid email', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.set(_.clone(data), 'email', 'asdsa')
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.email');
                    expect(errMsg.message).to.be.equal('should match format "email"');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
        describe('is missing', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.omit(data, ['email'])
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.message).to.be.equal('should have required property \'email\'');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('name', () => {
        describe('is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.set(_.clone(data), 'name', {})
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.name');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
        describe('is missing', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.omit(data, ['name'])
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.message).to.be.equal('should have required property \'name\'');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('lastName', () => {
        describe('is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.set(_.clone(data), 'lastName', {})
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.lastName');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
        describe('is missing', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.omit(data, ['lastName'])
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.message).to.be.equal('should have required property \'lastName\'');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('password', () => {
        describe('is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.set(_.clone(data), 'password', {})
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.password');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
        describe('is missing', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.omit(data, ['password'])
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.message).to.be.equal('should have required property \'password\'');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('nickName', () => {
        describe('is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.set(_.clone(data), 'nickName', {})
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.nickName');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('role', () => {
        describe('is not valid', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        USER_QUEUES['create'],
                        _.set(_.clone(data), 'role', 'bog')
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.role');
                    expect(errMsg.message).to.be.equal('should be equal to one of the allowed values');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('all fields are valid', () => {
        it('should create db record', async () => {
            const user = await rpcClient.call(USER_QUEUES['create'], data);

            const record = await helpers.findOne('users', { _id: helpers.genObjectId(user._id) })
            expect(record.email).to.be.equal(data.email);
            expect(record.name).to.be.equal(data.name);
            expect(record.lastName).to.be.equal(data.lastName);
            expect(record.role).to.be.equal(data.role);
            expect(record.nickName).to.be.equal(`${data.name} ${data.lastName}`);
            expect(helpers.comparePass(data.password, record.password)).to.be.true;
        });
    });
});
