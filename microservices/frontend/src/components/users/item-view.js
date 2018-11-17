import React from 'react';

class UserItemView extends React.Component {
    render() {
        return (
            <div>
                <p>Email: {this.props.email}</p>
                <p>Name: {this.props.name}</p>
                <p>LastName: {this.props.lastName}</p>
                <p>NickName: {this.props.nickName}</p>
            </div>
        )
    }
}

export default UserItemView;
