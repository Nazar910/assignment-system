import { IAssignmentValidator } from './interfaces';
import { inject, injectable } from 'inversify';
import * as _ from 'lodash';
import 'reflect-metadata';
import TYPES from '../../types';
import * as schemas from '../../schemas/assignment-schema';

@injectable()
export class AssignmentValidator implements IAssignmentValidator {
    constructor(
        @inject(TYPES.Ajv) private ajv
    ) {}

    private assertAjv(schema: object, data: object) {
        const valid: boolean = this.ajv.validate(schema, data);
        if (!valid) {
            const err = new Error();
            Object.defineProperty(err, 'ajv_error', {
                value: true,
                enumerable: true
            });
            err.message = JSON.stringify(this.ajv.errors);
            throw err;
        }
    }

    private assert(condition, message) {
        if (!condition) {
            const err = new Error();
            Object.defineProperty(err, 'validation', {
                value: true,
                enumerable: true
            });
            err.message = message;
            throw err;
        }
    }

    create(data: object) {
        this.assertAjv(schemas.Assignment, data);
    }

    update(id: string, data: object) {
        this.assert(id != null, 'id is required');
        this.assert(_.isString(id), 'id should be a string');
        this.assertAjv(_.omit(schemas.Assignment, ['required']), data);
    }
}
