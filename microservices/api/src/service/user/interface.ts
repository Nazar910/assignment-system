interface IUserService {
    login(email: string, password: string): Promise<object>
    profile(): Promise<object>
    register(userData): Promise<object>
}

export default IUserService;
