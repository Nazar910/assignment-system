const helpers = require('../helpers');
const rpcClient = helpers.getRpcClient();
const USER_QUEUES = helpers.getUserQueues();
const { expect } = require('chai');
const EMAIL = 'user@example.com';
const PASS = 'qwerty123';

describe('login', () => {
    let record;
    beforeEach(async () => {
        await helpers.cleanCollection('users');
        record = await helpers.ensureUser({
            email: EMAIL,
            password: helpers.hashPassword(PASS)
        });
    });
    after(async () => {
        await helpers.cleanCollection('users');
    });
    describe('valid creds', () => {
        it('should return user obj', async () => {
            const user = await rpcClient.call(USER_QUEUES['login'], EMAIL, PASS);
            expect(user.email).to.be.equal(record.email);
            expect(user.name).to.be.equal(record.name);
            expect(user.lastName).to.be.equal(record.lastName);
            expect(user.role).to.be.equal(record.role);
            expect(user.password).to.be.undefined;
        });
    });
    describe('wrong email', () => {
        it('should return user obj', async () => {
            try {
                await rpcClient.call(USER_QUEUES['login'], 'asda', PASS);
            } catch (e) {
                expect(e.message).to.be.equal('No user with such email');
                expect(e.login_fail).to.be.true;
            }
        });
    });
    describe('wrong password', () => {
        it('should return user obj', async () => {
            try {
                await rpcClient.call(USER_QUEUES['login'], EMAIL, 'dwrong');
            } catch (e) {
                expect(e.message).to.be.equal('Wrong password');
                expect(e.login_fail).to.be.true;
            }
        });
    });
});
