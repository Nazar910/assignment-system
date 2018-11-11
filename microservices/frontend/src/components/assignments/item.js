import React from 'react';
import PropTypes from 'prop-types';

class AssignmentItem extends React.Component {
    render() {
        return (
            <div style={{border: "1px dashed black"}}>
                <p>{this.props.title}</p>
                <p>{this.props.description}</p>
                <p>{this.props.status}</p>
                <p>{this.props.author_name}</p>
            </div>
        )
    }
}

AssignmentItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired
};

export default AssignmentItem;
