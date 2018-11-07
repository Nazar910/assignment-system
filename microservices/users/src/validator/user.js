const { User: userSchema } = require('../schemas/user');
const updateUserSchema = JSON.parse(JSON.stringify(userSchema));
delete updateUserSchema.required;

class Validator {
    constructor(ajv) {
        this.ajv = ajv;
    }

    create(data) {
        this.assertAjv(this.ajv.validate(userSchema, data));
    }

    update(id, data) {
        this.assert(id != null, 'id is required');
        this.assert(typeof id === 'string', 'id should be string');
        this.assertAjv(this.ajv.validate(updateUserSchema, data));
    }

    findById(id) {
        this.assert(id != null, 'id is required');
        this.assert(typeof id === 'string', 'id should be string');
    }

    assertAjv(valid) {
        if (!valid) {
            const err = new Error();
            err.ajv_error = true;
            err.message = JSON.stringify(this.ajv.errors);
            throw err;
        }
    }

    assert(condition, message) {
        if (!condition) {
            const err = new Error();
            err.validation = true;
            err.message = message;
            throw err;
        }
    }
}

module.exports = function getUserValidator(ajv) {
    return new Validator(ajv);
}
