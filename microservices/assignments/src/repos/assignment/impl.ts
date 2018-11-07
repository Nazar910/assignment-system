import IAssignmentRepo from './interface';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import TYPES from '../../types';
import { NotFound } from '../../errors';
import { PRIORITIES } from '../../schemas/assignment-schema';

@injectable()
export default class Assignment implements IAssignmentRepo {
    private _Assignment;
    constructor(
        @inject(TYPES.Mongoose) mongoose
    ) {
        const assignmentSchema = {
            title: {
                type: String,
                required: true
            },
            description: String,
            author_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            assignees: [mongoose.Schema.Types.ObjectId],
            priority: {
                type: String,
                enum: Object.values(PRIORITIES)
            }
        };

        const schema = new mongoose.Schema(assignmentSchema);
        this._Assignment = mongoose.model('Assignment', schema);
    }
    get Assignment() {
        return this._Assignment;
    }
    async findById(id: string) {
        const assignment = await this.Assignment.findOne({
            _id: id
        });
        if (!assignment) {
            throw new NotFound('No such assignment');
        }
        return assignment;
    }
    async findAll() {
        return this.Assignment.find();
    }
    async create(data: object) {
        const assignment = await this.Assignment.create(data);
        return assignment;
    }
    async updateById(id: string, data: object) {
        const assignment = await this.findById(id);
        Object.assign(assignment, data);
        await assignment.save();
        return assignment;
    }
    async deleteById(id: string) {
        const assignment = await this.findById(id);
        await assignment.remove();
    }
}
