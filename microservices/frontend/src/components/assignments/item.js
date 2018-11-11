import React from 'react';
import PropTypes from 'prop-types';
import AssignmentItemView from './item-view';
import EditableAssignmentItemView from './editable-item';

class AssignmentItem extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            editable: false
        };
    }
    toggleEdit() {
        const { editable } = this.state;
        this.setState({
            editable: !editable
        });
    }
    async update(data) {
        await this.props.update(this.props.assignment._id, data);
        this.setState({
            editable: false
        });
    }
    render() {
        return (
            <div style={{border: "1px dashed black"}}>
                <button onClick={this.toggleEdit.bind(this)}>Edit</button>
                {
                    this.state.editable
                        ? <EditableAssignmentItemView {...this.props.assignment} update={this.update.bind(this)} />
                        : <AssignmentItemView {...this.props.assignment} />
                }
            </div>
        )
    }
}

AssignmentItem.propTypes = {
    assignment: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
            nickName: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
    update: PropTypes.func.isRequired
};

export default AssignmentItem;
