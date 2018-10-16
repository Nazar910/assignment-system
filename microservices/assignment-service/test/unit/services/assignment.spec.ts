import 'mocha';
import { mock, when, instance, verify } from 'ts-mockito';
import { expect } from 'chai';

import IAssignmentService from '../../../src/services/assignment/interface';
import IAssignmentRepo from '../../../src/repos/assignment/interface';
import AssignmentRepoMock from '../helpers/mocks/repos/assignment';

import AssignmentService from '../../../src/services/assignment/impl';


describe('Assignment service', () => {
    describe('findAll', () => {
        let service: IAssignmentService;
        let mockedRepo: IAssignmentRepo;
        let repoInstance: IAssignmentRepo;
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
                } catch (e) {
                    expect(e.message).to.be.equal('repo.findAll error');
                }
            });
        });
    });
});
