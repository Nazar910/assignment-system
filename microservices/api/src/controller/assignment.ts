import { Controller, Get, interfaces } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import IAssignmentService from '../service/assignment/interface';

@Controller('/assignments')
@injectable()
export class AssignmentController implements interfaces.Controller {
    constructor(
        @inject(TYPES.AssignmentService) private assignmentService: IAssignmentService
    ) { }

    @Get('/')
    private async getAll() {
        return this.assignmentService.getAll();
    }
}
