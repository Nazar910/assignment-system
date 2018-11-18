import React from 'react';
import UserItem from './item';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    async update(id, data) {
        await this.props.update(id, data);
    }
    async delete(id) {
        await this.props.delete(id);
    }
    render() {
        return (
            <div>
                {
                    (this.props.users || []).map(
                        u => <UserItem
                            key={u._id}
                            user={u}
                            update={this.update.bind(this)}
                            delete={this.delete.bind(this)}
                        />
                    )
                }
            </div>
        )
    }
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        nickName: PropTypes.string.isRequired
    })).isRequired,
    update: PropTypes.func.isRequired
};

export default UserList;
