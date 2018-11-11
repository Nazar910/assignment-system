import 'mocha';
import * as _ from 'lodash';
import * as chai from 'chai';
const { expect } = chai;
import * as helpers from '../helpers';
const ASSIGNMENT_QUEUES = helpers.getAssignmentQueues();
const rpcClient = helpers.getRpcClient();

describe('GET-ALL', () => {
    beforeEach(async () => {
        await helpers.cleanCollection('assignments');
        await helpers.cleanCollection('users');
    });
    after(async () => {
        await helpers.cleanCollection('assignments');
        await helpers.cleanCollection('users');
    });
    it('should return stored documents', async () => {
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
        const assignments = await rpcClient.call(ASSIGNMENT_QUEUES['get-all']);
        expect(assignments).to.have.lengthOf(2);
        expect(String(record1._id)).to.be.equal(assignments[0]._id);
        expect(String(record2._id)).to.be.equal(assignments[1]._id);
        const [assignment1, assignment2] = assignments;
        expect(String(assignment1.author._id)).to.be.equal(String(author._id));
        expect(_.omit(assignment1.author, ['_id'])).to.eql(_.omit(author, ['_id']));
        expect(String(assignment1.assignee._id)).to.be.equal(String(assignee._id));
        expect(_.omit(assignment1.assignee, ['_id'])).to.eql(_.omit(assignee, ['_id']));
        expect(_.pick(record1, ['title', 'description', 'priority'])).
            to.eql(_.pick(assignment1, ['title', 'description', 'priority']));
        expect(String(assignment2.author._id)).to.be.equal(String(author._id));
        expect(_.omit(assignment2.author, ['_id'])).to.eql(_.omit(author, ['_id']));
        expect(String(assignment2.assignee._id)).to.be.equal(String(assignee._id));
        expect(_.omit(assignment2.assignee, ['_id'])).to.eql(_.omit(assignee, ['_id']));
        expect(_.pick(record2, ['title', 'description', 'priority'])).
            to.eql(_.pick(assignment2, ['title', 'description', 'priority']));
    });
});
