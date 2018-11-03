export default interface RpcClient {
    call(command: string, args?): Promise<any>;
}
