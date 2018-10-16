import 'mocha';
import * as sinon from 'sinon';
import { expect } from 'chai';

import IRepo from '../../../src/repos/interface';
import AssignmentRepo from '../../../src/repos/mongo/assignment';

describe('mongo repo', () => {
    let sandbox;

    let mongoose;
    let SchemaStub;
    let modelStub;
    let modelObj;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        if (sandbox) {
            sandbox.restore();
        }
    });
    describe('constructor', () => {
        const schemaObj = {
            foo: 'bar'
        };
        const modelObj = {
            bar: 'foo'
        }

        const assignmentSchema = {
            title: {
                type: String,
                required: true
            },
            description: String,
            author_id: {
                type: String,
                required: true
            },
            assignees: [String],
            priority: {
                type: String,
                enum: ['low', 'normal', 'high', 'urgent']
            }
        };
        beforeEach(() => {
            SchemaStub = sandbox.stub().returns(schemaObj);
            modelStub = sandbox.stub().returns(modelObj);
            mongoose = {
                Schema: SchemaStub,
                model: modelStub
            }
        });
        it('should call SchemaStub', () => {
            const repo: IRepo = new AssignmentRepo(mongoose);
            expect(SchemaStub.callCount).to.be.equal(1);
            expect(SchemaStub.firstCall.args).to.eql([assignmentSchema]);
        });
        it('should call modelStub', () => {
            const repo = new AssignmentRepo(mongoose);
            expect(modelStub.callCount).to.be.equal(1);
            expect(modelStub.firstCall.args).to.eql(['Assignment', schemaObj]);
            expect(repo.Assignment).to.eql(modelObj);
        });
    });
    describe('findAll', () => {
        let findStub;
        const expected = [
            {
                title: 'Some title',
                author_id: '123'
            }
        ]
        beforeEach(() => {
            findStub = sandbox.stub().resolves(expected);
            modelObj = {
                find: findStub
            }
            modelStub = sandbox.stub()
                .returns(modelObj);
            SchemaStub = sandbox.stub().returns({});
            mongoose = {
                Schema: SchemaStub,
                model: modelStub
            }
        });
        it('should call find', async () => {
            const repo: IRepo = new AssignmentRepo(mongoose);
            await repo.findAll();
            expect(findStub.callCount).to.be.equal(1);
            expect(findStub.firstCall.args).to.have.lengthOf(0);
        });
        it('should return expected records', async () => {
            const repo: IRepo = new AssignmentRepo(mongoose);
            const actual = await repo.findAll();
            expect(actual).to.eql(expected);
        });
        describe('find rejects', () => {
            beforeEach(() => {
                findStub = sandbox.stub().rejects(new Error('Find error'));
                modelObj = {
                    find: findStub
                }
                modelStub = sandbox.stub()
                    .returns(modelObj);
                mongoose = {
                    Schema: SchemaStub,
                    model: modelStub
                }
            });
            it('should reject', async () => {
                const repo: IRepo = new AssignmentRepo(mongoose);
                try {
                    await repo.findAll();
                } catch (e) {
                    expect(e.message).to.be.equal('Find error');
                }
            });
        });
    });
    describe('findById', () => {
        let findOneStub;
        const expected = {
            title: 'Some title',
            author_id: '123'
        };
        beforeEach(() => {
            findOneStub = sandbox.stub()
                .resolves(expected);
            modelObj = {
                findOne: findOneStub
            }
            modelStub = sandbox.stub()
                .returns(modelObj);
            SchemaStub = sandbox.stub().returns({});
            mongoose = {
                Schema: SchemaStub,
                model: modelStub
            }
        });
        it('should call findOne', async () => {
            const repo: IRepo = new AssignmentRepo(mongoose);
            await repo.findById(12);
            expect(findOneStub.callCount).to.be.equal(1);
            expect(findOneStub.firstCall.args).to.eql([{
                _id: 12
            }]);
        });
        it('should return expected records', async () => {
            const repo: IRepo = new AssignmentRepo(mongoose);
            const actual = await repo.findById(12);
            expect(actual).to.eql(expected);
        });
        describe('findOne rejects', () => {
            beforeEach(() => {
                findOneStub = sandbox.stub().rejects(new Error('FindOne error'));
                modelObj = {
                    findOne: findOneStub
                }
                modelStub = sandbox.stub()
                    .returns(modelObj);
                mongoose = {
                    Schema: SchemaStub,
                    model: modelStub
                }
            });
            it('should reject', async () => {
                const repo: IRepo = new AssignmentRepo(mongoose);
                try {
                    await repo.findById(1234);
                    throw new Error('Error should be thrown here');
                } catch (e) {
                    expect(e.message).to.be.equal('FindOne error');
                }
            });
        });
        describe('no assignment found', () => {
            beforeEach(() => {
                findOneStub = sandbox.stub().resolves();
                modelObj = {
                    findOne: findOneStub
                }
                modelStub = sandbox.stub()
                    .returns(modelObj);
                mongoose = {
                    Schema: SchemaStub,
                    model: modelStub
                }
            });
            it('should reject', async () => {
                const repo: IRepo = new AssignmentRepo(mongoose);
                try {
                    await repo.findById(1234);
                    throw new Error('Error should be thrown here');
                } catch (e) {
                    expect(e.message).to.be.equal('No such assignment');
                }
            });
        });
    });
    describe('updateById', () => {
        let findByIdStub;
        let repo: IRepo;
        let saveStub;
        let assignment;
        beforeEach(() => {
            repo = new AssignmentRepo(mongoose);
            saveStub = sandbox.stub().resolves();
            assignment = {
                title: 'Some title',
                author_id: '123',
                save: saveStub
            };
            findByIdStub = sandbox.stub(repo, 'findById')
                .resolves(assignment);
        });
        it('should call findById', async () => {
            await repo.updateById(1, {});
            expect(findByIdStub.callCount).to.be.equal(1);
            expect(findByIdStub.firstCall.args).to.eql([1]);
        });
        describe('findById rejects', () => {
            beforeEach(() => {
                repo = new AssignmentRepo(mongoose);
                findByIdStub = sandbox.stub(repo, 'findById')
                    .rejects(new Error('FindById error'));
            });
            it('should reject', async () => {
                try {
                    await repo.updateById(2, {});
                } catch (e) {
                    expect(e.message).to.be.equal('FindById error');
                }
            });
        });
        it('should call save', async () => {
            await repo.updateById(1, {});
            expect(saveStub.callCount).to.be.equal(1);
            expect(saveStub.firstCall.args).to.have.lengthOf(0);
        });
        it('should return updated assignment', async () => {
            const actual = await repo.updateById(1, {
                description: 'Some description'
            });
            delete actual['save'];
            delete assignment.save;
            expect(actual).to.eql({
                ...assignment,
                description: 'Some description'
            });
        });
    });
});
