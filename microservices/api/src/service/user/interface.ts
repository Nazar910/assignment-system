interface IUserService {
    login(email: string, password: string): Promise<object>
    profile(id: string): Promise<object>
    register(userData): Promise<object>
}

export default IUserService;
