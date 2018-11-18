import { Controller, Get, interfaces, Post, Put, Delete } from 'inversify-restify-utils';
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
    private async getAll(req) {
        return this.assignmentService.getAll(req.decoded);
    }

    @Get('/:id')
    private async getById(req) {
        const { id } = req.params;
        return this.assignmentService.getById(id, req.decoded);
    }

    @Post('/')
    private async post(req) {
        const { body = {} } = req;
        body.author_id = req.decoded._id;
        return this.assignmentService.create(body);
    }

    @Put('/:id')
    private async put(req) {
        const { body } = req;
        const { id } = req.params;
        return this.assignmentService.updateById(id, body);
    }

    @Delete('/:id')
    private async delete(req) {
        const { id } = req.params;
        return this.assignmentService.deleteById(id);
    }
}
