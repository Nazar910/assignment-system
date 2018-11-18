import 'mocha';
import * as _ from 'lodash';
import * as chai from 'chai';
const { expect } = chai;
import * as helpers from '../helpers';
const ASSIGNMENT_QUEUES = helpers.getAssignmentQueues();
const rpcClient = helpers.getRpcClient();

describe('GET-BY-ASSIGNEE-ID', () => {
    beforeEach(async () => {
        await helpers.cleanCollection('users');
        await helpers.cleanCollection('assignments');
    });
    after(async () => {
        await helpers.cleanCollection('users');
        await helpers.cleanCollection('assignments');
    });
    it('should return stored document', async () => {
        const author = await helpers.ensureUser({
            email: 'author@example.com'
        });
        const assignee = await helpers.ensureUser({
            email: 'assignee1@example.com'
        });
        const record1 = await helpers.ensureAssignment({
            author_id: author._id,
            assignee_id: assignee._id
        });
        const record2 = await helpers.ensureAssignment({
            author_id: author._id,
            assignee_id: assignee._id
        });
        await helpers.ensureAssignment({
            author_id: author._id
        });
        const assignments = await rpcClient.call(ASSIGNMENT_QUEUES['get-by-assignee-id'], String(assignee._id));
        expect(assignments).to.have.lengthOf(2);
        expect(assignments.map(a => a._id)).to.have.members([String(record1._id), String(record2._id)]);
    });
});
