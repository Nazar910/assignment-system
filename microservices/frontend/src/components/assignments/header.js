import React from 'react';
import AddAssignment from './add-assignment';

class AssignmentsHeader extends React.Component {
    render() {
        return (
            <div>
                <AddAssignment create={this.props.addAssignment}/>
            </div>
        )
    }
}

export default AssignmentsHeader;
