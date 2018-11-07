const helpers = require('../helpers');
const rpcClient = helpers.getRpcClient();
const USER_QUEUES = helpers.getUserQueues();
const { expect } = require('chai');

describe('GET-BY-ID', () => {
    beforeEach(async () => {
        await helpers.cleanCollection('users');
    });
    after(async () => {
        await helpers.cleanCollection('users');
    });
    it('should get db record', async () => {
        const record = await helpers.ensureUser();
        const user = await rpcClient.call(USER_QUEUES['get-by-id'], String(record._id));
        expect(user.email).to.be.equal(record.email);
        expect(user.name).to.be.equal(record.name);
        expect(user.lastName).to.be.equal(record.lastName);
        expect(user.role).to.be.equal(record.role);
        expect(user.password).to.be.undefined;
    });
});
