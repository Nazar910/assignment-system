export default interface IRepo {
    findById(id): Promise<object>;
    findAll(): Promise<Array<object>>;
    updateById(id, data: object): Promise<object>;
    deleteById(id): Promise<void>;
}
