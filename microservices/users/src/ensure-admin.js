const container = require('./container');
const TYPES = require('./types');

const admin = {
    email: 'admin@admin.com',
    name: 'Admin',
    lastName: 'Admin',
    password: '123456',
    role: 'admin'
};

async function ensureAdmin() {
    const userService = container.$di.get(TYPES.UserService);
    try {
        await userService.login(admin.email, admin.password);
    } catch (_) {
        await userService.create(admin);
    }
}

module.exports = ensureAdmin;
