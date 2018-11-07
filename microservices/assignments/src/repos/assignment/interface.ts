export default interface IAssignmentRepo {
    findById(id): Promise<object>;
    findAll(): Promise<Array<object>>;
    create(data: object): Promise<object>;
    updateById(id, data: object): Promise<object>;
    deleteById(id): Promise<void>;
}
