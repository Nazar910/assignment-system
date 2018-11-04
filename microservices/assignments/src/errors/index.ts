const types = {
    NOT_FOUND: Symbol('Not found')
}

class Base extends Error {
    public code: Symbol;
    constructor(msg: string, code: Symbol) {
        super(msg);
        this.code = code;
    }
}

export class NotFound extends Base {
    constructor(msg: string) {
        super(msg, types.NOT_FOUND);
    }
};
