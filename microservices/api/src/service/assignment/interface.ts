export default interface IAssignmentService {
    getAll(): Promise<Array<object>>;
    getById(id: string): Promise<object>;
    create(data: object): Promise<object>;
    updateById(id: string, data: object): Promise<object>;
    deleteById(id: string): Promise<void>;
}
