import container from './inversify.config';
import TYPES from './types';
import IServer from './server/i-server';

const server = container.get<IServer>(TYPES.Server);

export async function main() {
    await server.start();
}

if (!module.parent) {
    main();
}
