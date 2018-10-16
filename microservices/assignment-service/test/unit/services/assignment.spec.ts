import 'mocha';
import { mock, when, instance, verify } from 'ts-mockito';
import { expect } from 'chai';

import IAssignmentService from '../../../src/services/assignment/interface';
import IAssignmentRepo from '../../../src/repos/assignment/interface';
import AssignmentRepoMock from '../helpers/mocks/repos/assignment';

import AssignmentService from '../../../src/services/assignment/impl';


describe('Assignment service', () => {
    let service: IAssignmentService;
    let mockedRepo: IAssignmentRepo;
    let repoInstance: IAssignmentRepo;
    describe('findAll', () => {
        const assignments = [{
            title: 'Some title',
            description: 'some description',
            author_id: '123'
        }];
        beforeEach(() => {
            mockedRepo = mock(AssignmentRepoMock);
            when(mockedRepo.findAll()).thenResolve(assignments);
            repoInstance = instance(mockedRepo);
            service = new AssignmentService(repoInstance);
        });
        it('should call assignmentRepo.findAll', async () => {
            await service.findAll();
            verify(mockedRepo.findAll()).once();
        });
        it('should returns assignments array', async () => {
            const actual = await service.findAll();
            expect(actual).to.eql(assignments);
        });
        describe('assignmentRepo.findAll rejects', () => {
            beforeEach(() => {
                mockedRepo = mock(AssignmentRepoMock);
                when(mockedRepo.findAll()).thenReject(new Error('repo.findAll error'));
                repoInstance = instance(mockedRepo);
                service = new AssignmentService(repoInstance);
            });
            it('should rejects', async () => {
                try {
                    await service.findAll();
                    throw new Error('Error should be thrown here');
                } catch (e) {
                    expect(e.message).to.be.equal('repo.findAll error');
                }
            });
        });
    });
    describe('findById', () => {
        const assignment = {
            title: 'Some title',
            description: 'some description',
            author_id: '123'
        };
        beforeEach(() => {
            mockedRepo = mock(AssignmentRepoMock);
            when(mockedRepo.findById('123')).thenResolve(assignment);
            repoInstance = instance(mockedRepo);
            service = new AssignmentService(repoInstance);
        });
        it('should call assignmentRepo.findById', async () => {
            await service.findById('123');
            verify(mockedRepo.findById('123')).once();
        });
        it('should return assignment', async () => {
            const actual = await service.findById('123');
            expect(actual).to.eql(assignment);
        });
        describe('assignmentRepo.findById rejects', () => {
            beforeEach(() => {
                mockedRepo = mock(AssignmentRepoMock);
                when(mockedRepo.findById('123')).thenReject(new Error('assignmentRepo.findById error'));
                repoInstance = instance(mockedRepo);
                service = new AssignmentService(repoInstance);
            });
            it('should reject', async () => {
                try {
                    await service.findById('123');
                    throw new Error('Error should be thrown');
                } catch (e) {
                    expect(e.message).to.be.equal('assignmentRepo.findById error');
                }
            });
        });
        describe('id is undefined', () => {
            it('should reject', async () => {
                try {
                    let id;
                    await service.findById(id);
                    throw new Error('Error should be thrown');
                } catch (e) {
                    expect(e.message).to.be.equal('"id" field is required');
                }
            });
        });
        describe('id is not a string', () => {
            it('should reject', async () => {
                try {
                    await service.findById(123);
                    throw new Error('Error should be thrown');
                } catch (e) {
                    expect(e.message).to.be.equal('"id" field should be a string');
                }
            });
        });
    });
});
