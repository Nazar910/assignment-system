import React from 'react';
import AssignmentItem from './item';

class AssignmentList extends React.Component {
    render() {
        return (
            <div>
                AssignmentsList
                {
                    (this.props.assignments || []).map(
                        a => <AssignmentItem key={a._id} {...a} />
                    )
                }
            </div>
        )
    }
}

export default AssignmentList;
