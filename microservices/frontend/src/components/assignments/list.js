import React from 'react';
import AssignmentItem from './item';

class AssignmentList extends React.Component {
    async update(id, data) {
        await this.props.update(id, data);
    }
    render() {
        return (
            <div>
                {
                    (this.props.assignments || []).map(
                        a => <AssignmentItem key={a._id} assignment={{...a}} update={this.update.bind(this)}/>
                    )
                }
            </div>
        )
    }
}

export default AssignmentList;
