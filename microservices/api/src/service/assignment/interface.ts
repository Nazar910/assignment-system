export default interface IAssignmentService {
    getAll(decoded: object): Promise<Array<object>>;
    getById(id: string, decoded: object): Promise<object>;
    create(data: object): Promise<object>;
    updateById(id: string, data: object): Promise<object>;
    deleteById(id: string): Promise<void>;
}
