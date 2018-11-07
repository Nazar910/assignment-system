import IAssignmentService from "./interface";
import { injectable, inject } from "inversify";
import TYPES from '../../types';
import IAssignmentRepo from "../../repos/assignment/interface";
import * as assert from 'assert';
import 'reflect-metadata';
import { IAssignmentValidator } from "../../validation/ajv/interfaces";

@injectable()
export default class AssignmentService implements IAssignmentService {
    constructor(
        @inject(TYPES.AssignmentRepo) private assignmentRepo: IAssignmentRepo,
        @inject(TYPES.AssignmentValidator) private validator: IAssignmentValidator
    ) { }

    async findAll() {
        const assignments = await this.assignmentRepo.findAll();
        return assignments;
    }

    async findById(id: any) {
        assert.ok(id, '"id" field is required');
        assert.ok(typeof id === 'string', '"id" field should be a string');
        const assignment = await this.assignmentRepo.findById(id);
        return assignment;
    }

    async create(data: object) {
        this.validator.create(data);
        return this.assignmentRepo.create(data);
    }

    async updateById(id: any, data: Object) {
        this.validator.update(id, data);
        const assignment = await this.assignmentRepo.updateById(id, data);
        return assignment;
    }

    async deleteById(id: any) {
        assert.ok(id, '"id" field is required');
        assert.ok(typeof id === 'string', '"id" field should be a string');
        await this.assignmentRepo.deleteById(id);
    }
}
