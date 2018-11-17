import React from 'react';
import AssignmentItem from './item';
import PropTypes from 'prop-types';

class AssignmentList extends React.Component {
    async update(id, data) {
        await this.props.update(id, data);
    }
    render() {
        return (
            <div>
                {
                    (this.props.assignments || []).map(
                        a => <AssignmentItem
                                key={a._id}
                                assignment={a}
                                assignees={this.props.assignees}
                                update={this.update.bind(this)}
                            />
                    )
                }
            </div>
        )
    }
}

AssignmentList.propTypes = {
    assignments: PropTypes.array.isRequired,
    assignees: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        nickName: PropTypes.string.isRequired
    })).isRequired
};

export default AssignmentList;
