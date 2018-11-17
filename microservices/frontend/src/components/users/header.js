import React from 'react';
import AddUser from './add-user';

class AssignmentsHeader extends React.Component {
    render() {
        return (
            <div>
                <AddUser create={this.props.addUser} />
            </div>
        )
    }
}

export default AssignmentsHeader;
