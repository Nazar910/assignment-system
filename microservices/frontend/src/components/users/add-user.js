import React from 'react';
import UserForm from './user-form';


class AddUser extends React.Component {
    async onSubmit(data) {
        await this.props.create(data);
    }

    render() {
        return (
            <div>
                <UserForm onSubmit={this.onSubmit.bind(this)}/>
            </div>
        )
    }
}

export default AddUser;
