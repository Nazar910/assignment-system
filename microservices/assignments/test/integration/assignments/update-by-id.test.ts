import 'mocha';
import * as _ from 'lodash';
import * as chai from 'chai';
const { expect } = chai;
import * as helpers from '../helpers';
const ASSIGNMENT_QUEUES = helpers.getAssignmentQueues();
const rpcClient = helpers.getRpcClient();

describe('UPDATE-BY-ID', () => {
    const data = {
        title: 'Some updated title',
        description: 'Some updated description',
        author_id: helpers.genObjectId(),
        assignees: [helpers.genObjectId()],
        priority: 'normal'
    };
    beforeEach(async () => {
        await helpers.cleanCollection('assignments');
    });
    after(async () => {
        await helpers.cleanCollection('assignments');
    });
    describe('title', () => {
        describe('is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        ASSIGNMENT_QUEUES['update-by-id'],
                        await helpers.genObjectId(), _.set(_.clone(data), 'title', {})
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.title');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('description', () => {
        describe('is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        ASSIGNMENT_QUEUES['update-by-id'],
                        await helpers.genObjectId(), _.set(_.clone(data), 'description', {})
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.description');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('author_id', () => {
        describe('is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        ASSIGNMENT_QUEUES['update-by-id'],
                        await helpers.genObjectId(), _.set(_.clone(data), 'author_id', {})
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.author_id');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('assignees', () => {
        describe('is not a array', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        ASSIGNMENT_QUEUES['update-by-id'],
                        await helpers.genObjectId(), _.set(_.clone(data), 'assignees', 'asd')
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.assignees');
                    expect(errMsg.message).to.be.equal('should be array');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
        describe('items is not a string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        ASSIGNMENT_QUEUES['update-by-id'],
                        await helpers.genObjectId(), _.set(_.clone(data), 'assignees', [{}])
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.assignees[0]');
                    expect(errMsg.message).to.be.equal('should be string');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('priority', () => {
        describe('is not valid', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        ASSIGNMENT_QUEUES['update-by-id'],
                        await helpers.genObjectId(), _.set(_.clone(data), 'priority', 'red')
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    const [errMsg] = JSON.parse(e.message);
                    expect(errMsg.dataPath).to.be.equal('.priority');
                    expect(errMsg.message).to.be.equal('should be equal to one of the allowed values');
                    expect(e.ajv_error).to.be.true;
                }
            });
        });
    });
    describe('id', () => {
        describe('is not string', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        ASSIGNMENT_QUEUES['update-by-id'],
                        123, _.set(_.clone(data), 'priority', 'red')
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    expect(e.validation).to.be.true;
                    expect(e.message).to.be.equal('id should be a string');
                }
            });
        });
        describe('is missing', () => {
            it('should throw ajv error', async () => {
                try {
                    await rpcClient.call(
                        ASSIGNMENT_QUEUES['update-by-id'],
                        undefined, _.set(_.clone(data), 'priority', 'red')
                    );
                    expect.fail(null, null, 'Error should be thrown');
                } catch (e) {
                    expect(e.validation).to.be.true;
                    expect(e.message).to.be.equal('id is required');
                }
            });
        });
    });
    describe('all fields valid', () => {
        it('should update db record', async () => {
            const record = await helpers.ensureAssignment();
            const id = String(record._id);
            await rpcClient.call(ASSIGNMENT_QUEUES['update-by-id'], id, data);
            const dbRecord = await helpers.findOne('assignments', {_id: helpers.genObjectId(id)});
            expect(dbRecord.title).to.be.equal(data.title);
            expect(dbRecord.description).to.be.equal(data.description);
            expect(dbRecord.assignees).to.have.lengthOf(1);
            expect(dbRecord.assignees[0]).to.eql(data.assignees[0]);
            expect(dbRecord.author_id).to.eql(data.author_id);
            expect(dbRecord.priority).to.be.equal(data.priority);
        })
    });
});
