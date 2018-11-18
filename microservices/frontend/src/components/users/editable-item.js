import React from 'react';
import UserForm from './user-form';

class EditableAssignmentItemView extends React.Component {
    async handleSubmit(data) {
        await this.props.update(data);
    }
    render() {
        return (
            <div>
                <UserForm
                    onSubmit={this.handleSubmit.bind(this)}
                    email={this.props.email}
                    name={this.props.name}
                    lastName={this.props.lastName}
                    nickName={this.props.nickName}
                />
            </div>
        )
    }
}

export default EditableAssignmentItemView;
