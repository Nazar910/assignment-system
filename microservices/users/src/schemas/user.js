const USER_ROLES = {
    admin: 'admin',
    supervisor: 'supervisor',
    assignee: 'assignee'
}

const User = {
    type: 'object',
    required: ['email', 'name', 'lastName', 'password', 'role'],
    properties: {
        email: {
            format: 'email',
            type: 'string'
        },
        name: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        nickName: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        role: {
            enum: Object.values(USER_ROLES)
        }
    }
}

module.exports = {
    USER_ROLES,
    User
}
