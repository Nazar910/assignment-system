import { Controller, Get, interfaces, Post, Put, Delete } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import IUserService from '../service/user/interface';
import * as errs from 'restify-errors';

@Controller('/users')
@injectable()
export default class UserController {
    constructor(
        @inject(TYPES.UserService) private userService: IUserService
    ) { }
    @Post('/login')
    private async login(req, res, next) {
        const { body } = req;
        try {
            return await this.userService.login(body.email, body.password);
        } catch (e) {
            if (e.login_fail) {
                return next(new errs.UnauthorizedError(e.message));
            }
            throw e;
        }
    }
    @Post('/')
    private async createUser(req, res, next) {
        const { body } = req;
        return await this.userService.create(body);
    }

    @Get('/profile')
    private async profile(req) {
        return this.userService.profile(req.decoded._id);
    }

    @Get('/')
    private async getUsers() {
        return this.userService.getUsers();
    }

    @Get('/:id')
    private async getById(req) {
        const { id } = req.params;
        return this.userService.profile(id);
    }

    @Delete('/:id')
    private async deleteById(req, res) {
        const { id } = req.params;
        await this.userService.deleteById(id);
        res.status(204);
        res.send();
    }

    @Put('/:id')
    private async putById(req) {
        const { id } = req.params;
        const { body } = req;
        console.log('Data is', body);
        return this.userService.updateById(id, body);
    }
}
