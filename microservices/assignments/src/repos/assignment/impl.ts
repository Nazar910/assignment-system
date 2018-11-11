import IAssignmentRepo from './interface';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import TYPES from '../../types';
import { NotFound } from '../../errors';
import { PRIORITIES } from '../../schemas/assignment-schema';

@injectable()
export default class Assignment implements IAssignmentRepo {
    private _Assignment;
    private mongoose;
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
            status: String,
            priority: {
                type: String,
                enum: Object.values(PRIORITIES)
            }
        };

        const schema = new mongoose.Schema(assignmentSchema);
        this._Assignment = mongoose.model('Assignment', schema);

        this.mongoose = mongoose;
    }
    get Assignment() {
        return this._Assignment;
    }

    private toObjectId(value) {
        return new this.mongoose.Types.ObjectId(value);
    }

    async findById(id: string) {
        const [assignment] = await this.Assignment.aggregate([
            {
                $match: { _id: this.toObjectId(id) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'authors'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'assignees',
                    foreignField: '_id',
                    as: 'assignees'
                }
            }
        ]);
        //unmarshal array with one obj to just object
        [assignment.author] = assignment.authors;
        if (!assignment) {
            throw new NotFound('No such assignment');
        }
        return assignment;
    }
    async findAll() {
        const assignments = await this.Assignment.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'authors'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'assignees',
                    foreignField: '_id',
                    as: 'assignees'
                }
            }
        ]);
        //unmarshal array with one obj to just object
        return assignments.map(a => {
            [a.author] = a.authors;
            return a;
        })
    }
    async create(data: object) {
        const assignment = await this.Assignment.create(data);
        return assignment;
    }
    async updateById(id: string, data: object) {
        return this.Assignment.findOneAndUpdate({
            _id: this.toObjectId(id)
        },
        {
            $set: data
        },
        {
            returnNewDocument: true
        });
    }
    async deleteById(id: string) {
        return this.Assignment.findOneAndDelete({
            _id: this.toObjectId(id)
        });
    }
}
