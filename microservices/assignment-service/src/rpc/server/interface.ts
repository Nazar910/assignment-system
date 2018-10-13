export default interface IRpcServer {
    start(): Promise<void>;
    registerCommand(command: string, job: Function): void;
}
