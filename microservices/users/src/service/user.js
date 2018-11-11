class UserService {
    constructor(userRepo, validator, lodash) {
        this.userRepo = userRepo;
        this.validator = validator;
        this.lodash = lodash;
    }

    async create(data) {
        this.validator.create(data);
        if (!data.nickName) {
            data.nickName = `${data.name} ${data.lastName}`;
        }
        return this.userRepo.create(data);
    }

    async update(id, data) {
        this.validator.update(id, data);
        if (!data.nickName) {
            data.nickName = `${data.name} ${data.lastName}`;
        }
        return this.userRepo.update(id, data);
    }

    async findAll() {
        const records = await this.userRepo.findAll();
        return records.map(r => this.whiteList(r));
    }

    async findById(id) {
        this.validator.findById(id);
        const user = await this.userRepo.findById(id);
        return this.whiteList(user);
    }

    async login(email, password) {
        const user = await this.userRepo.login(email, password);
        return this.whiteList(user);
    }

    whiteList(userData) {
        return this.lodash.pick(userData,
            [
                '_id', 'email', 'name', 'lastName',
                'nickName', 'role'
            ]
        );
    }
}

module.exports = function getUserService(userRepo, validator, lodash) {
    return new UserService(userRepo, validator, lodash);
}
