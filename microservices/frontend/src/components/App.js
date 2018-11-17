import React from 'react';
import Login from './Login';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AssignmentsPage from './assignments/page';
import UsersPage from './users/page';

import { getProfile } from './api'

class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            loggedIn: false,
            currentUser: {}
        }
        this.doAssignmentVisible = this.doAssignmentVisible.bind(this);
        this.doUsersVisible = this.doUsersVisible.bind(this);
    }

    async componentDidMount() {
        try {
            const currentUser = await getProfile();
            this.setState({
                loggedIn: true,
                currentUser,
                visible: ''
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

    doAssignmentVisible() {
        this.setState({
            visible: <AssignmentsPage />
        });
    }

    doUsersVisible() {
        this.setState({
            visible: <UsersPage />
        });
    }

    rootRoute(loggedIn, role) {
        if (loggedIn) {
            return <div>
                <button onClick={this.doAssignmentVisible}>Assignments</button>
                {
                    role && role === 'admin'
                        ? <button onClick={this.doUsersVisible}>Users</button>
                        : ''
                }
                { this.state.visible }
            </div>;
        }
        return <Login saveToken={this.login.bind(this)} />;
    }

    render() {
        const { loggedIn, currentUser } = this.state;
        console.log('Current', currentUser);
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => this.rootRoute(loggedIn, currentUser.role)} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
