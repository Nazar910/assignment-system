export interface IAssignmentValidator {
    create(data: object): void;
    update(id: string, data: object): void;
}
