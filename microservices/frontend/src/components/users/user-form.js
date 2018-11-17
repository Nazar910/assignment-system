import React from 'react';
import PropTypes from 'prop-types';

let email = '';
let password = '';
let name = '';
let lastName = '';
let nickName = '';

class UserForm extends React.Component {
    valid() {
        return email.value.trim()
            && password.value.trim()
            && name.value.trim()
            && lastName.value.trim()
            && nickName.value.trim()
    }
    async handleSubmit(e) {
        e.preventDefault()
        if (!this.valid()) {
            return
        }
        await this.props.onSubmit({
            email: email.value.trim(),
            password: password.value.trim(),
            name: name.value.trim(),
            lastName: lastName.value.trim(),
            nickName: nickName.value.trim()
        });
        email = '';
        password = '';
        name = '';
        lastName = '';
        nickName = '';
    }
    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit.bind(this)}
                >
                    Email: <input
                        ref={node => {
                            email = node
                        }}
                        value={this.props.email}
                    /><br />
                    Password: <input
                        ref={node => {
                            password = node
                        }}
                        type="password"
                        value={this.props.password}
                    /><br />
                    Name: <input
                        ref={node => {
                            name = node
                        }}
                        value={this.props.name}
                    /><br />
                    LastName: <input
                        ref={node => {
                            lastName = node
                        }}
                        value={this.props.lastName}
                    /><br />
                    NickName: <input
                        ref={node => {
                            nickName = node
                        }}
                        value={this.props.nickName}
                    /><br />
                    <button type="submit">Add User</button>
                </form>
            </div>
        )
    }
}

UserForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default UserForm;
