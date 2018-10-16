export default interface IAssignmentService {
    findAll(): Promise<Array<Object>>;
    findById(id: any): Promise<Object>;
    updateById(id: any, data: Object): Promise<Object>;
    deleteById(id: any): Promise<void>
}
