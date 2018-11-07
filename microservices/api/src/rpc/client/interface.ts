export default interface RpcClient {
    call(command: string, ...args: any[]): Promise<any>;
}
