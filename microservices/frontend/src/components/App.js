import React from 'react';
import Login from './Login';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AssignmentsPage from './assignments/page';

import { getProfile } from './api'


class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            loggedIn: false
        }
    }

    async componentDidMount() {
        try {
            await getProfile();
            this.setState({
                loggedIn: true
            });
        } catch (_) {
            this.setState({
                loggedIn: false
            });
        }
    }

    login(token) {
        this.setState({ loggedIn: true });
        localStorage.setItem('token', token);
    }

    logout() {
        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() =>
                        this.state.loggedIn ?
                            <Redirect to="/assignments" /> :
                            <Login saveToken={this.login.bind(this)} />} />
                    <Route path="/assignments" render={() =>
                        this.state.loggedIn ?
                            <AssignmentsPage /> :
                            <Redirect to="/" />} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
