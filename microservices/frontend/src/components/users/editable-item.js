import React from 'react';
import UserForm from './user-form';

class EditableAssignmentItemView extends React.Component {
    async handleSubmit(data) {
        await this.props.update(data);
    }
    render() {
        return (
            <div>
                <UserForm onSubmit={this.onSubmit.bind(this)} />
            </div>
        )
    }
}

export default EditableAssignmentItemView;
