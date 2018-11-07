import initConsumers from '../../src/init-consumers';

before(async () => {
    await initConsumers();
});
