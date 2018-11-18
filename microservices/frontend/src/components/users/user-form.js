import React from 'react';
import PropTypes from 'prop-types';

let email = '';
let password = '';
let name = '';
let lastName = '';
let nickName = '';

class UserForm extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            edit: false
        };
    }
    componentDidMount() {
        email.value = this.props.email || '';
        name.value = this.props.name || '';
        lastName.value = this.props.lastName || '';
        nickName.value = this.props.nickName || '';
        this.setState({
            edit: true
        });
    }
    valid() {
        if (!this.state.edit && !password.value.trim()) {
            return;
        }

        return email.value.trim()
            && name.value.trim()
            && lastName.value.trim()
    }
    cleanInputs() {
        if (email) {
            email.value = '';
        }
        if (name) {
            name.value = '';
        }
        if (lastName) {
            lastName.value = '';
        }
        if (nickName) {
            nickName.value = '';
        }
        if (password) {
            password.value = '';
        }
    }
    async handleSubmit(e) {
        e.preventDefault()
        if (!this.valid()) {
            return;
        }
        await this.props.onSubmit({
            email: email.value.trim(),
            password: password.value.trim(),
            name: name.value.trim(),
            lastName: lastName.value.trim(),
            nickName: nickName.value.trim()
        });
        this.cleanInputs();
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
                    /><br />
                    Password: <input
                        ref={node => {
                            password = node
                        }}
                        type="password"
                    /><br />
                    Name: <input
                        ref={node => {
                            name = node
                        }}
                    /><br />
                    LastName: <input
                        ref={node => {
                            lastName = node
                        }}
                    /><br />
                    NickName: <input
                        ref={node => {
                            nickName = node
                        }}
                    /><br />
                    <button type="submit">Save User</button>
                </form>
            </div>
        )
    }
}

UserForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default UserForm;
