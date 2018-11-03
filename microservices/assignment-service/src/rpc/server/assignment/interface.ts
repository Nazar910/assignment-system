export default interface IAssignmentRpcServer {
    start(): Promise<void>;
    addCreateHandler(handler: Function): void;
    addGetAllHandler(handler: Function): void;
    addGetByIdHandler(handler: Function): void;
    addUpdateByIdHandler(handler: Function): void;
    addDeleteByIdHandler(handler: Function): void;
}
