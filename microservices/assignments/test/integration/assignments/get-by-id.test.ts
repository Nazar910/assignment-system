import 'mocha';
import * as _ from 'lodash';
import * as chai from 'chai';
const { expect } = chai;
import * as helpers from '../helpers';
const ASSIGNMENT_QUEUES = helpers.getAssignmentQueues();
const rpcClient = helpers.getRpcClient();

describe('GET-BY-ID', () => {
    beforeEach(async () => {
        await helpers.cleanCollection('assignments');
    });
    after(async () => {
        await helpers.cleanCollection('assignments');
    });
    it('should return stored document', async () => {
        const record = await helpers.ensureAssignment();
        const assignment = await rpcClient.call(ASSIGNMENT_QUEUES['get-by-id'], String(record._id));
        expect(String(record._id)).to.be.equal(assignment._id);
        expect(String(record.author_id)).to.be.equal(assignment.author_id);
        expect(record.assignees).to.have.lengthOf(assignment.assignees.length);
        expect(record.assignees.map(a_id => String(a_id))).to.have.members(assignment.assignees);
        expect(_.pick(record, ['title', 'description', 'priority'])).
            to.eql(_.pick(assignment, ['title', 'description', 'priority']));
    });
});
