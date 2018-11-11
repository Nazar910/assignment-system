import 'mocha';
import * as _ from 'lodash';
import * as chai from 'chai';
const { expect } = chai;
import * as helpers from '../helpers';
const ASSIGNMENT_QUEUES = helpers.getAssignmentQueues();
const rpcClient = helpers.getRpcClient();

describe('GET-BY-ID', () => {
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
        const assignee1 = await helpers.ensureUser({
            email: 'assignee1@example.com'
        });
        const assignee2 = await helpers.ensureUser({
            email: 'assignee2@example.com'
        });
        const record = await helpers.ensureAssignment({
            author_id: author._id,
            assignees: [assignee1._id, assignee2._id]
        });
        const assignment = await rpcClient.call(ASSIGNMENT_QUEUES['get-by-id'], String(record._id));
        expect(String(record._id)).to.be.equal(assignment._id);
        expect(String(assignment.author._id)).to.be.equal(String(author._id));
        expect(_.omit(assignment.author, ['_id'])).to.eql(_.omit(author, ['_id']));
        expect(String(assignment.assignees[0]._id)).to.be.equal(String(assignee1._id));
        expect(String(assignment.assignees[1]._id)).to.be.equal(String(assignee2._id));
        expect(_.omit(assignment.assignees[0], ['_id'])).to.eql(_.omit(assignee1, ['_id']));
        expect(_.omit(assignment.assignees[1], ['_id'])).to.eql(_.omit(assignee2, ['_id']));
        expect(_.pick(record, ['title', 'description', 'priority'])).
            to.eql(_.pick(assignment, ['title', 'description', 'priority']));
    });
});
