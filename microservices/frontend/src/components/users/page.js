import React from 'react';
import UsersHeader from './header';
import UsersList from './list';
import { getAssignees, createUser, getUserById, deleteUserById, updateUserById } from '../api';

class UsersPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            users: []
        }
    }
    async componentDidMount() {
        this.setState({
            users: await getAssignees()
        });
    }
    async create(data) {
        const { _id } = await createUser(data);
        const user = await getUserById(_id);
        const { users } = this.state;
        users.push(user);
        this.setState({
            users
        });
    }
    async update(id, data) {
        console.log('Here');
        await updateUserById(id, data);
        const user = await getUserById(id);
        const { users } = this.state;
        this.setState({
            users: users.map(u => u._id !== id ? u : user)
        });
    }
    async delete(id) {
        await deleteUserById(id);
        const { users } = this.state;
        this.setState({
            users: users.filter(u => u._id !== id)
        });
    }
    render() {
        return (
            <div>
                <UsersHeader addUser={this.create.bind(this)} />
                <UsersList
                    users={this.state.users}
                    update={this.update.bind(this)}
                    delete={this.delete.bind(this)}
                />
            </div>
        )
    }
}

export default UsersPage;
