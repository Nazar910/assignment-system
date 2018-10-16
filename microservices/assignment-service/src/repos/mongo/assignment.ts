import IRepo from '../interface';
import { injectable, inject } from 'inversify';
import TYPES from '../../types';
import { NotFound } from '../../errors';

const PRIORITIES: Array<String> = [
    'low',
    'normal',
    'high',
    'urgent'
]

function getAssignmentModel() {
    return {
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
            enum: PRIORITIES
        }
    };
}

@injectable()
export default class MongoRepo implements IRepo {
    private _Assignment;
    constructor(
        @inject(TYPES.Mongoose) mongoose
    ) {
        const schema = new mongoose.Schema(getAssignmentModel());
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
    async updateById(id: string, data: object) {
        const assignment = await this.findById(id);
        Object.assign(assignment, data);
        await assignment.save();
        return assignment;
    }
    async deleteById(id: string) {
        const assignment = await this.findById(id);
        return assignment.remove();
    }
}
