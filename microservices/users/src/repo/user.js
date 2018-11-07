const { USER_ROLES } = require('../schemas/user');

const userSchema = {
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nickName: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        required: true
    }
};

class UserRepo {
    constructor(User, bcryptjs) {
        this.User = User;
        this.bcryptjs = bcryptjs;
    }

    async create(data) {
        const salt = this.bcryptjs.genSaltSync();
        data.password = this.bcryptjs.hashSync(data.password, salt);
        return this.User.create(data);
    }

    async update(id, data) {
        const user = await this.User.findById(id);
        Object.assign(user, data);
        await user.save();
        return user;
    }

    async findAll() {
        return this.User.find();
    }

    async findById(id) {
        return this.User.findById(id);
    }
}

module.exports = function getUserRepo(mongoose, bcryptjs) {
    const schema = new mongoose.Schema(userSchema);
    const User = mongoose.model('User', schema);
    return new UserRepo(User, bcryptjs);
}
