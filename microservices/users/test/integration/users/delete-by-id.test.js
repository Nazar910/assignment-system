const helpers = require('../helpers');
const rpcClient = helpers.getRpcClient();
const USER_QUEUES = helpers.getUserQueues();
const { expect } = require('chai');

describe('DELETE-BY-ID', () => {
    beforeEach(async () => {
        await helpers.cleanCollection('users');
    });
    after(async () => {
        await helpers.cleanCollection('users');
    });
    it('should delete db record', async () => {
        const record = await helpers.ensureUser();
        await rpcClient.call(USER_QUEUES['delete-by-id'], String(record._id));
        const recordAfter = await helpers.findOne('users', {});
        expect(recordAfter).to.be.null;
    });
});
