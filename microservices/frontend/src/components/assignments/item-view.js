import React from 'react';

class AssignmentItemView extends React.Component {
    render() {
        const { assignee } = this.props;
        return (
            <div>
                <p>Title: {this.props.title}</p>
                <p>Description: {this.props.description}</p>
                <p>Status: {this.props.status.toUpperCase()}</p>
                <p>Author: {this.props.author.nickName}</p>
                {
                    assignee
                        ? <p>Assignee: {assignee.nickName}</p>
                        : ''
                }
            </div>
        )
    }
}

export default AssignmentItemView;
