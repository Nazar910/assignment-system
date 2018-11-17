module.exports = function getRpcServer(config, rpcModule, userService) {
    const { AMQPRPCServer } = rpcModule.getDriver('amqp');
    const rpcServer = AMQPRPCServer.create(config.get('RABBITMQ_URI'));
    const USER_QUEUES = config.get('USER_QUEUES');
    return async function () {
        console.log('About to init rpcServer');
        await rpcServer.start();
        console.log('Inited rpc server');
        rpcServer.addHandler(USER_QUEUES['create'], (data) => userService.create(data));
        rpcServer.addHandler(USER_QUEUES['update-by-id'], (id, data) => userService.update(id, data));
        rpcServer.addHandler(USER_QUEUES['get-all'], () => userService.findAll());
        rpcServer.addHandler(USER_QUEUES['get-by-id'], (id) => userService.findById(id));
        rpcServer.addHandler(USER_QUEUES['login'], (email, password) => userService.login(email, password));
    }
}
