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
            const user = await this.userService.login(body.email, body.password);
            return user;
        } catch (e) {
            if (e.login_fail) {
                return next(new errs.UnauthorizedError(e.message));
            }
            throw e;
        }
    }
}
