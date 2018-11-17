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
        localStorage.setItem('token', undefined);
    }

    rootRoute(loggedIn) {
        if (loggedIn) {
            return <Redirect to="/assignments" />;
        }
        return <Login saveToken={this.login.bind(this)} />;
    }

    assignmentsRoute(loggedIn) {
        if (loggedIn) {
            return <AssignmentsPage />;
        }
        return <Redirect to="/" />;
    }

    render() {
        const { loggedIn } = this.state;
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => this.rootRoute(loggedIn)} />
                    <Route path="/assignments" render={() => this.assignmentsRoute(loggedIn)} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
