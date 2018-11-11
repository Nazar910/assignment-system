import React from 'react';
import { login } from './api';

import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            error: ''
        }
    }

    async onSubmit() {
        try {
            const { token } = await login(this.refs.email.value, this.refs.password.value);
            this.props.saveToken(token);
        } catch (_) {
            console.error(_);
            this.setState({
                error: 'Email or Password are incorrect!'
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.error}
                <div className="form-group">
                    <input className="form-control" type="text" ref="email" placeholder="Email" /><br />
                    <input className="form-control" type="password" ref="password" placeholder="Password" /><br />
                    <button className="btn btn-success" onClick={this.onSubmit.bind(this)}>Submit</button>&nbsp;
                    <Link to='/register'>Sign up</Link>
                </div>
            </div>
        )
    }
}

export default Login;
