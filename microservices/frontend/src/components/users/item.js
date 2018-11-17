import React from 'react';
import PropTypes from 'prop-types';
import UserItemView from './item-view';
import EditableUserItemView from './editable-item';

class UserItem extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            editable: false
        };
    }
    toggleEdit() {
        const { editable } = this.state;
        this.setState({
            editable: !editable
        });
    }
    async update(data) {
        await this.props.update(this.props.user._id, data);
        this.setState({
            editable: false
        });
    }
    async delete() {
        await this.props.delete(this.props.user._id);
    }
    render() {
        return (
            <div style={{border: "1px dashed black"}}>
                <button onClick={this.toggleEdit.bind(this)}>Edit</button>
                <button onClick={this.delete.bind(this)}>Delete</button>
                {
                    this.state.editable
                        ? <EditableUserItemView {...this.props.user} update={this.update.bind(this)}/>
                        : <UserItemView {...this.props.user} />
                }
            </div>
        )
    }
}

UserItem.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        nickName: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    }).isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
};

export default UserItem;
