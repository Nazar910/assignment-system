import React from 'react';
// import axios from 'axios';

class Register extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            error: ''
        }
    }

    onSubmit() {
        const password = this.refs.password.value;
        const password2 = this.refs.password2.value;

        if (password !== password2) {
            return this.setState({
                error: 'Passwords do not match!'
            })
        }

        this.setState({ error: '' });
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <input className="form-control" type="text" ref="name" placeholder="Name" /><br />
                    <input className="form-control" type="text" ref="lastName" placeholder="Last name" /><br />
                    <input className="form-control" type="text" ref="email" placeholder="Email" /><br />
                    <input className="form-control" type="text" ref="company" placeholder="Company name" /><br />
                    <input className="form-control" type="password" ref="password" placeholder="Password" /><br />
                    <input className="form-control" type="password" ref="password2" placeholder="Enter password again" /><br />
                    <button className="btn btn-success" onClick={this.onSubmit.bind(this)}>Submit</button>&nbsp;
                    {this.state.error}
                </div>
            </div>
        )
    }
}

export default Register;
