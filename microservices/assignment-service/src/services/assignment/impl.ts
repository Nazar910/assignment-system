import IAssignmentService from "./interface";
import { injectable, inject } from "inversify";
import TYPES from '../../types';
import IAssignmentRepo from "../../repos/assignment/interface";

@injectable()
export default class AssignmentService implements IAssignmentService {
    private _assignmentRepo: IAssignmentRepo;
    constructor(
        @inject(TYPES.AssignmentRepo) assignmentRepo: IAssignmentRepo
    ) {
        this._assignmentRepo = assignmentRepo;
    }

    async findAll() {
        const assignments = await this._assignmentRepo.findAll();
        return assignments;
    }

    async findById(id: any) {
        return {};
    }

    async updateById(id: any, data: Object) {
        return {};
    }

    async deleteById(id: any) {

    }
}
