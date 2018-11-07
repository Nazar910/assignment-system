const container = require('./container');
const TYPES = require('./types');

async function main() {
    const initRpcServer = container.$di.get(TYPES.RpcServer);
    const config = container.$di.get(TYPES.Config);
    const mongoose = container.$di.get(TYPES.Mongoose);
    await mongoose.connect(config.get('MONGO_URI'), { useNewUrlParser: true });
    await initRpcServer();
    console.log('Inited consumers');
}

if (!module.parent) {
    main();
}

module.exports = main;
