import IAssignmentRepo from '../../../../../src/repos/assignment/interface';

export default class AssignmentRepoMock implements IAssignmentRepo {
    async findAll() {
        return [{}];
    }
    async findById(id) {
        return {};
    }
    async updateById(id) {
        return {};
    }
    async deleteById(id) {

    }

    async create(data) {
        return {};
    }
}
