import 'mocha';
import * as _ from 'lodash';
import * as chai from 'chai';
const { expect } = chai;
import * as helpers from '../helpers';
const ASSIGNMENT_QUEUES = helpers.getAssignmentQueues();
const rpcClient = helpers.getRpcClient();

describe('DELETE-BY-ID', () => {
    beforeEach(async () => {
        await helpers.cleanCollection('assignments');
    });
    after(async () => {
        await helpers.cleanCollection('assignments');
    });
    it('should delete stored document', async () => {
        const recordBefore = await helpers.ensureAssignment();
        await rpcClient.call(ASSIGNMENT_QUEUES['delete-by-id'], String(recordBefore._id));
        const dbRecord = await helpers.findOne('assignments', { _id: recordBefore._id });
        expect(dbRecord).to.be.null;
    });
});
