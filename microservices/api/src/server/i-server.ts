export default interface IServer {
    start(): Promise<void>;
    close(): Promise<void>;
}
